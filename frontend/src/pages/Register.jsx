import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserRound,
  UtensilsCrossed,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setMessage({ type: "", text: "" });

      await register(formData.name, formData.email, formData.password);

      setMessage({
        type: "success",
        text: "Registration successful. Redirecting to login...",
      });

      setTimeout(() => navigate("/login"), 600);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] text-[#20130D]">
      <div className="grid min-h-screen lg:grid-cols-[520px_1fr]">
        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#E8DCCF] bg-white px-3 py-2 text-sm font-bold text-[#3B2416] shadow-sm transition hover:border-[#D79A4B] hover:text-[#9A5B22]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#3B2416] text-[#D79A4B]">
                  <UtensilsCrossed size={23} />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold">CanteenHub</h1>
                  <p className="text-sm text-[#667085]">
                    Smart campus ordering
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E8DCCF] bg-white p-6 shadow-xl shadow-[#3B2416]/10 sm:p-8">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF3E4] text-[#9A5B22]">
                  <Rocket size={24} />
                </div>

                <h2
                  className="text-3xl font-semibold text-[#101828]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Create your account
                </h2>
                <p className="mt-2 text-[#667085]">
                  Join CanteenHub and start ordering ahead on campus.
                </p>
              </div>

              {message.text && (
                <div
                  className={`mt-6 flex items-center gap-3 rounded-lg border px-4 py-3 ${
                    message.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <p className="font-medium">{message.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-[#344054]">
                    Full name
                  </label>
                  <div className="relative">
                    <UserRound
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#D8C8B8] bg-white py-3.5 pl-12 pr-4 font-semibold text-[#20130D] outline-none transition placeholder:text-[#A4917F] focus:border-[#9A5B22] focus:ring-4 focus:ring-[#9A5B22]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#344054]">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#D8C8B8] bg-white py-3.5 pl-12 pr-4 font-semibold text-[#20130D] outline-none transition placeholder:text-[#A4917F] focus:border-[#9A5B22] focus:ring-4 focus:ring-[#9A5B22]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-[#344054]">
                    Password
                  </label>
                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-[#D8C8B8] bg-white py-3.5 pl-12 pr-4 font-semibold text-[#20130D] outline-none transition placeholder:text-[#A4917F] focus:border-[#9A5B22] focus:ring-4 focus:ring-[#9A5B22]/10"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#3B2416] px-5 py-3.5 font-bold text-white transition hover:bg-[#4A2D1C] disabled:cursor-not-allowed disabled:bg-[#8A7A6C]"
                >
                  {isSubmitting ? "Creating account" : "Create account"}
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#667085]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-[#3B2416] hover:text-[#9A5B22]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="hidden bg-[#3B2416] px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#D79A4B] text-[#3B2416]">
              <UtensilsCrossed size={23} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">CanteenHub</h1>
              <p className="text-sm text-white/60">Smart campus ordering</p>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-[#D79A4B]">
              <Sparkles size={16} />
              SaaS-grade campus ordering
            </div>

            <h2
              className="text-5xl font-semibold leading-tight"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Start ordering ahead in minutes.
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#EADBC8]">
              Create your account once, then use the same dashboard for menu
              discovery, cart checkout, and order tracking.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              "Simple student onboarding",
              "Protected account access",
              "Designed for daily campus use",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3"
              >
                <ShieldCheck size={18} className="text-[#D79A4B]" />
                <span className="font-semibold text-[#FFF8EF]">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
