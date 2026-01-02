import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEnquirySendMutation } from "@/redux/features/shubamdevApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useGetGeneralSettingQueryQuery } from "@/redux/features/adminApi";

/* ------------------ YUP VALIDATION SCHEMA ------------------ */
const contactSchema = yup.object({
  name: yup.string().trim().required("Name is required").min(3),
  email: yup.string().trim().required("Email is required").email(),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Only digits are allowed")
    .length(10),
  message: yup.string().trim().required("Message is required").min(10),
});

export default function ContactPage() {
  const { data: genralData, isLoading: genralDataLoading } =
    useGetGeneralSettingQueryQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const [enquirySend] = useEnquirySendMutation();

  const onSubmit = async (data) => {
    const response = await enquirySend(data).unwrap();
    if (response.success) toast.success("Enquiry sent successfully");
    reset();
  };

  if (genralDataLoading) return <h1>Loading…</h1>;

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO ===== */}
      <section className="bg-[#fff7f0] py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center text-4xl font-bold text-[#0d3811]  md:text-5xl">
            Get in <span className="gradient-text"> Touch </span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground text-center text-xl text-[#65504a]">
            Get in touch with us for inquiries, volunteer opportunities, or to
            visit our sanctuary
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-[#0d3811]">
            Contact Information
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl">
            Reach out to us for any inquiries about cow rescue, donations, or
            volunteering opportunities.
          </p>
        </div>
      </section>

      {/* ===== CONTACT GRID ===== */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {/* LEFT — INFO */}
            <div className="space-y-6">
              <InfoCard icon={MapPin} title="Address">
                123 Gaushala Road, Vrindavan <br />
                Uttar Pradesh, 281121 <br />
                India
              </InfoCard>

              <InfoCard icon={Phone} title="Phone">
                <Link to={`tel:+91${genralData?.data?.phone}`}>
                  +91 {genralData?.data?.phone}
                </Link>
              </InfoCard>

              <InfoCard icon={Mail} title="Email">
                <Link to={`mailto:${genralData?.data?.email}`}>
                  {genralData?.data?.email}
                </Link>
              </InfoCard>

              <InfoCard icon={Clock} title="Working Hours">
                Monday – Saturday: 9:00 AM – 6:00 PM
              </InfoCard>
            </div>

            {/* RIGHT — FORM */}
            <Card className="rounded-2xl border border-gray-200 shadow-md p-8">
              <h2 className="text-2xl font-bold mb-2 text-[#0d3811]">
                Send us a Message
              </h2>

              <p className="mb-6 text-gray-600">
                Fill out the form below and we'll get back to you soon.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="font-semibold">Name</label>
                  <Input {...register("name")} placeholder="Your full name" />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="font-semibold">Email</label>
                  <Input {...register("email")} placeholder="your@email" />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="font-semibold">Phone</label>
                  <Input
                    {...register("phone")}
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="font-semibold">Message</label>
                  <Textarea
                    rows={5}
                    {...register("message")}
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Gradient Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 cursor-pointer rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 to-yellow-400 hover:opacity-90"
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ------------------ INFO CARD ------------------ */
function InfoCard({ icon: Icon, title, children }) {
  return (
    <Card className="rounded-2xl border border-gray-200 shadow-md p-6">
      <div className="flex items-start gap-4">
        {/* ICON CONTAINER */}
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600">
          <Icon className="h-6 w-6" />
        </div>

        {/* TEXT */}
        <div>
          <h3 className="font-bold text-[#0d3811] mb-1">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{children}</p>
        </div>
      </div>
    </Card>
  );
}
