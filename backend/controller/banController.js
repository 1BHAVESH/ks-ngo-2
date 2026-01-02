import { BankDetail } from "../models/BankDetail.js";

export const createDonationDetails = async (req, res) => {
  try {
    const { accountName, accountNumber, ifscCode, bankName } = req.body;

    let qrCode = null;

    if (req.file) {
      qrCode = `/uploads/qr/${req.file.filename}`;
    }

    const donation = await BankDetail.create({
      accountName,
      accountNumber,
      ifscCode,
      bankName,
      qrCode,
    });

    res.status(201).json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error("Create Error =", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateDonationDetails = async (req, res) => {

  try {
    const { id } = req.params;
    const { accountName, accountNumber, ifscCode, bankName, isActive, existingQrCode } = req.body;

    const updateData = {
      accountName,
      accountNumber,
      ifscCode,
      bankName,
      isActive,
    };

    // Handle QR Code
    if (req.file) {
      // New file uploaded
      updateData.qrCode = `/uploads/${req.file.filename}`;
      
      // Optional: Delete old file
      const oldBank = await BankInfo.findById(id);
      if (oldBank?.qrCode) {
        const oldPath = path.join(__dirname, '..', oldBank.qrCode);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    } else if (existingQrCode) {
      // No new file, keep existing
      updateData.qrCode = existingQrCode;
    }
    // If neither exists, qrCode won't be updated (keeps DB value)

    const updatedBank = await BankDetail.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBank) {
      return res.status(404).json({ message: "Bank info not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedBank,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }

};

export const getDonationDetails = async (req, res) => {
  try {
    const bank = await BankDetail.findOne({ isActive: true });

    if (!bank) {
      return res.status(404).json({
        success: false,
        message: "No active donation details found",
      });
    }

    res.status(200).json({
      success: true,
      data: bank,
    });
  } catch (error) {
    console.error("Get Donation Error =", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
