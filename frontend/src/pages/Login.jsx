import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BrandLogo from "../components/BrandLogo";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const user = await login(email, password);

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-[#FAF6F0] text-[#20130D]">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="hidden bg-[#3B2416] px-8 py-10 text-white lg:flex lg:flex-col lg:justify-between xl:px-12">
          <div className="flex items-center gap-3">
            <BrandLogo dark subtitle="Canteen Hub" />
          </div>

          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-[#D79A4B]">
              <Sparkles size={16} />
              Student dashboard
            </div>

            <h2
              className="text-5xl font-semibold leading-tight"
            >
              Sign in and keep every order moving.
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-[#EADBC8]">
              Access live kitchen updates, manage your cart, and pick up meals
              from the counter closest to your day.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              "Fast login for students and admins",
              "Secure token-based ordering",
              "One place for cart, menu, and order history",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.07] px-4 py-3"
              >
                <CheckCircle2 size={18} className="text-[#D79A4B]" />
                <span className="font-semibold text-[#FFF8EF]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
          <div className="w-full max-w-lg">
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#E8DCCF] bg-white px-3 py-2 text-sm font-bold text-[#3B2416] shadow-sm transition hover:border-[#D79A4B] hover:text-[#9A5B22]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <BrandLogo subtitle="Canteen Hub" />
              </div>
            </div>

            <div className="rounded-xl border border-[#E8DCCF] bg-white p-5 shadow-xl shadow-[#3B2416]/10 sm:p-8">
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#FFF3E4] text-[#9A5B22]">
                  <ShieldCheck size={24} />
                </div>

                <h2
                  className="text-3xl font-semibold text-[#101828]"
                >
                  Welcome back
                </h2>
                <p className="mt-2 text-[#667085]">
                  Sign in to continue to your canteen workspace.
                </p>
              </div>

              {errorMessage && (
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  <AlertCircle size={18} />
                  <p className="font-medium">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
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
                  {isSubmitting ? "Signing in" : "Sign in"}
                  <ArrowRight size={18} />
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#667085]">
                New to Veyra?{" "}
                <Link
                  to="/register"
                  className="font-bold text-[#3B2416] hover:text-[#9A5B22]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
