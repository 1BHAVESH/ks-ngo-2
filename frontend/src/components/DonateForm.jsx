import { useState } from "react"
import { Upload, CheckCircle } from "lucide-react"
import { useSendDonateMutation } from "@/redux/features/adminApi"

export default function DonationForm() {
  const [sendDonate, { isLoading }] = useSendDonateMutation()

  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    paymentMethod: "UPI",
    paymentScreenshot: null,
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, paymentScreenshot: file }))
    if (errors.paymentScreenshot) setErrors((prev) => ({ ...prev, paymentScreenshot: "" }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.donorName.trim()) newErrors.donorName = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits"

    if (!formData.amount.trim()) newErrors.amount = "Amount is required"
    else if (isNaN(formData.amount) || formData.amount <= 0) newErrors.amount = "Amount must be valid"

    if (!formData.paymentScreenshot) newErrors.paymentScreenshot = "Payment screenshot is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError("")

    if (!validateForm()) return

    try {
      const fd = new FormData()
      fd.append("donorName", formData.donorName)
      fd.append("email", formData.email)
      fd.append("phone", formData.phone)
      fd.append("amount", formData.amount)
      fd.append("paymentMethod", formData.paymentMethod)
      fd.append("paymentScreenshot", formData.paymentScreenshot)

      await sendDonate(fd).unwrap()

      setSubmitted(true)

      setTimeout(() => {
        setFormData({
          donorName: "",
          email: "",
          phone: "",
          amount: "",
          paymentMethod: "UPI",
          paymentScreenshot: null,
        })
        setSubmitted(false)
      }, 3000)

    } catch (err) {
      setApiError(err?.data?.message || "Something went wrong")
    }
  }

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="p-12 text-center border border-green-200 bg-white rounded-lg shadow-lg">
          <CheckCircle className="w-20 h-20 text-green-700 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-bold text-green-900 mb-4">Thank You for Your Donation!</h2>

          <p className="text-lg text-green-800 mb-6">
            Dear <span className="font-semibold">{formData.donorName}</span>, your generous donation of{" "}
            <span className="font-bold text-green-900">₹{formData.amount}</span> has been received.
          </p>

          <p className="text-sm text-green-700 mt-6 italic">Redirecting in a moment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-900 mb-2 text-center">Support Cow Seva</h2>
      <p className="text-green-800 text-center mb-8">Submit your donation with payment proof</p>

      <div className="bg-white p-8 rounded-lg shadow-lg border border-green-200">
        <h3 className="text-2xl font-bold text-green-900 mb-6">Donation Details</h3>

        {apiError && <p className="text-red-600 mb-4">{apiError}</p>}

        <div className="space-y-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Full Name *</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.donorName ? "border-red-500" : "border-green-200"
              }`}
              placeholder="Enter your full name"
            />
            {errors.donorName && <p className="text-red-500 text-sm mt-1">{errors.donorName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.email ? "border-red-500" : "border-green-200"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength="10"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.phone ? "border-red-500" : "border-green-200"
              }`}
              placeholder="10-digit phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Donation Amount (₹) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 ${
                errors.amount ? "border-red-500" : "border-green-200"
              }`}
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Method */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Debit/Credit Card</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Screenshot */}
          <div>
            <label className="block text-sm font-semibold text-green-900 mb-2">Payment Screenshot *</label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                errors.paymentScreenshot ? "border-red-500 bg-red-50" : "border-green-300 hover:bg-green-50"
              }`}
            >
              <input
                type="file"
                accept="image/*"
                id="screenshotInput"
                onChange={handleFileChange}
                className="hidden"
              />

              <label htmlFor="screenshotInput" className="cursor-pointer">
                <Upload className="w-8 h-8 text-green-700 mx-auto mb-2" />
                <p className="text-green-900 font-semibold">Click to upload</p>
                <p className="text-green-700 text-xs mt-2">PNG, JPG up to 10MB</p>
              </label>

              {formData.paymentScreenshot && (
                <p className="text-green-900 font-semibold mt-3">
                  {formData.paymentScreenshot.name}
                </p>
              )}
            </div>

            {errors.paymentScreenshot && (
              <p className="text-red-500 text-sm mt-1">{errors.paymentScreenshot}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 text-lg font-semibold rounded-lg transition-colors disabled:opacity-60"
          >
            {isLoading ? "Submitting..." : "Submit Donation"}
          </button>
        </div>
      </div>
    </div>
  )
}
