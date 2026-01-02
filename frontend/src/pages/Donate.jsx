import DonationForm from "@/components/DonateForm"
import { Card } from "@/components/ui/card"
import { useGetBankDetailQuery } from "@/redux/features/shubamdevApi"
import { Heart, Shield } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";


export default function DonatePage() {
  const {data, isLoading} = useGetBankDetailQuery()

  if(isLoading) return <h1>wait...</h1>

  const bankInfo = data?.data

  console.log(bankInfo)
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-forest text-center mb-6">
            Support Our Cause
          </h1>
          <p className="text-xl text-earth text-center max-w-3xl mx-auto">
            Your donation helps us rescue, feed, and care for cows in need
          </p>
        </div>
      </section>

      {/* Donation Appeal */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-16 h-16 text-forest mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-forest mb-6">
              Every Contribution Makes a Difference
            </h2>
            <p className="text-earth leading-relaxed text-lg">
              Your generous donation directly impacts the lives of abandoned and injured cows.
              From nutritious meals and medical treatment to shelter and rehabilitation,
              every rupee goes toward providing comprehensive care.
              Join us in our mission to protect these gentle beings.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Section (LEFT = QR + Bank / RIGHT = FORM) */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">

            {/* LEFT SIDE */}
            <div className="space-y-8">

              {/* Scan to Donate */}
              <Card className="p-8 border-sage">
                <h3 className="text-2xl font-bold text-forest mb-6 text-center">
                  Scan to Donate
                </h3>

                <div className="w-56 h-56 bg-sage-light mx-auto flex items-center justify-center rounded-lg">
                  <img
                    src={`${API_URL}${bankInfo.qrCode}`}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-center text-earth mt-4">
                  Scan with any UPI app
                </p>
              </Card>

              {/* Bank Details */}
              <Card className="p-8 border-sage">
                <h3 className="text-2xl font-bold text-forest mb-6">
                  Bank Details
                </h3>

                <div className="space-y-3 text-earth">
                  <div>
                    <p className="font-semibold text-forest">Account Name:</p>
                    <p>{bankInfo.accountName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-forest">Account Number:</p>
                    <p>{bankInfo.accountNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-forest">IFSC Code:</p>
                    <p>{bankInfo.ifscCode}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-forest">Bank Name:</p>
                    <p>{bankInfo.bankName}</p>
                  </div>
                </div>
              </Card>

            </div>

            {/* RIGHT SIDE — FORM */}
            <div>
              <DonationForm />
            </div>

          </div>
        </div>
      </section>

      {/* Demo Note */}
      <section className="py-8 bg-forest text-cream">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-center">
            <Shield className="w-6 h-6" />
            <p className="text-lg">
              <strong>Note:</strong> This is a demo website. No real payment processing is enabled.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
