import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  ChevronDown,
  CreditCard,
  IndianRupee,
  MapPin,
  Minus,
  Plus,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Trash2,
  WalletCards,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useSpots } from "../context/SpotContext";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const paymentMethods = [
  {
    value: "UPI",
    label: "UPI",
    detail: "Instant digital payment",
    Icon: Smartphone,
  },
  {
    value: "Cash",
    label: "Cash on Pickup",
    detail: "Pay at the counter",
    Icon: Banknote,
  },
  {
    value: "Wallet",
    label: "Wallet",
    detail: "Campus wallet balance",
    Icon: WalletCards,
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Cart() {
  const { spots } = useSpots();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
        0
      ),
    [cartItems]
  );

  const itemCount = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cartItems]
  );

  const handlePlaceOrder = async () => {
    if (!selectedSpot) {
      toast.error("Please select a pickup spot.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (!user) {
      setShowAuthPrompt(true);
      toast.error("Please login or create an account to place your order.");
      return;
    }

    if (user.role === "admin") {
      toast.error("Admin accounts cannot place student orders.");
      return;
    }

    const newOrder = {
      items: cartItems,
      total,
      pickupSpot: selectedSpot,
      status: "Pending",
      paymentMethod,
      paymentStatus: paymentMethod === "Cash" ? "Pending" : "Paid",
      orderTime: new Date().toLocaleTimeString(),
    };

    try {
      setIsPlacingOrder(true);
      setShowAuthPrompt(false);

      const token = localStorage.getItem("token");

      await axios.post(`${API_URL}/api/orders`, newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearCart();
      setPaymentMethod("");
      setSelectedSpot("");
      toast.success(
        "Order placed successfully. Your cart is ready for the next craving."
      );
    } catch (error) {
      console.log(error);
      toast.error("Order failed. Please try again in a moment.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#201A16]">
      <section className="border-b border-[#DDD0C1] bg-[#16120F] text-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/"
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-[#E9C48E] transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#E9C48E] sm:text-sm">
                <Sparkles size={16} />
                Secure checkout
              </div>

              <h1
                className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              >
                My Cart
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D9CDC0] sm:text-lg sm:leading-7">
                Review your dishes, choose a pickup counter, and place a clean,
                queue-free canteen order.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.07] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#C9B9A6]">Items</p>
                  <ShoppingBag size={18} className="text-[#E9C48E]" />
                </div>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">{itemCount}</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.07] p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#C9B9A6]">Total</p>
                  <IndianRupee size={18} className="text-[#E9C48E]" />
                </div>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {showAuthPrompt && (
          <div className="mb-6 rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-lg shadow-[#3B2416]/10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-extrabold text-[#201A16]">
                  Sign in to place your order
                </p>
                <p className="mt-1 text-sm font-semibold text-[#756657]">
                  You can browse the menu and build your cart first. Login only
                  when you are ready to checkout.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center justify-center rounded-md bg-[#201A16] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#332820]"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center justify-center rounded-md border border-[#D8C8B8] bg-[#FBF6EF] px-5 py-3 text-sm font-bold text-[#201A16] transition hover:border-[#BE8A4C]"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm">
            <div className="grid min-h-[330px] place-items-center bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF7EA_52%,#F4E3CD_100%)] px-6 py-14 text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#201A16] text-[#E9C48E] shadow-lg shadow-[#201A16]/15">
                  <ShoppingBag size={30} />
                </div>
                <h2
                  className="mt-6 text-3xl font-semibold text-[#201A16]"
                >
                  Your cart is empty
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[#756657]">
                  Add dishes from the menu and they will appear here for a
                  polished checkout.
                </p>
                <Link
                  to="/menu"
                  className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#201A16] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#332820]"
                >
                  Browse Menu
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <section className="space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#BE8A4C] hover:shadow-xl hover:shadow-[#6A3D18]/10"
                >
                  <div className="grid grid-cols-[96px_1fr] gap-0 sm:grid-cols-[135px_1fr]">
                    <div className="min-h-36 bg-[#F0E4D6] sm:min-h-40">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#B98545]">
                          <ReceiptText size={34} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 p-3 sm:p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#BE6F22] sm:text-sm">
                            Canteen selection
                          </p>
                          <h2
                            className="food-display mt-0.5 line-clamp-2 text-lg font-semibold leading-tight text-[#201A16] sm:text-2xl"
                          >
                            {item.name}
                          </h2>
                          <p className="mt-1 flex items-center gap-1 text-sm font-extrabold text-[#8D2C2C] sm:text-lg">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item._id)}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-100 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 sm:text-sm sm:font-bold"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={15} />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      <div className="mt-3 flex flex-col gap-3 border-t border-[#E6D8C7] pt-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
                        <div>
                          <p className="text-xs font-semibold text-[#756657] sm:text-sm">
                            Line Total
                          </p>
                          <p className="mt-0.5 text-base font-extrabold text-[#201A16] sm:text-xl">
                            {formatCurrency(
                              Number(item.price || 0) *
                                Number(item.quantity || 0)
                            )}
                          </p>
                        </div>

                        <div className="flex w-full items-center justify-between rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-1.5 sm:w-40 sm:p-2">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#8D2C2C] shadow-sm transition hover:bg-[#F5E9DB] sm:h-10 sm:w-10"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={17} />
                          </button>

                          <span className="font-extrabold text-[#201A16]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="flex h-8 w-8 items-center justify-center rounded-md bg-[#201A16] text-[#E9C48E] shadow-sm transition hover:bg-[#332820] sm:h-10 sm:w-10"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-lg border border-[#DDD0C1] bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 lg:self-start">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#BE6F22]">
                    Checkout Desk
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-[#201A16] sm:text-2xl">
                    Order Summary
                  </h2>
                </div>
                <ShieldCheck size={22} className="text-[#2F7D59]" />
              </div>

              <div className="mt-4 rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-3 sm:mt-6 sm:p-4">
                <p className="text-sm font-semibold text-[#756657]">
                  Total Amount
                </p>
                <p className="mt-1 text-2xl font-extrabold text-[#201A16] sm:mt-2 sm:text-3xl">
                  {formatCurrency(total)}
                </p>
              </div>

              <div className="mt-4 sm:mt-6">
                <label className="mb-2 flex items-center gap-2 text-sm font-bold text-[#201A16]">
                  <MapPin size={16} className="text-[#BE6F22]" />
                  Pickup Spot
                </label>

                <div className="relative">
                  <select
                    value={selectedSpot}
                    onChange={(event) => setSelectedSpot(event.target.value)}
                    className="w-full appearance-none rounded-lg border border-[#E6D8C7] bg-white px-4 py-3 pr-11 font-semibold text-[#201A16] outline-none transition focus:border-[#BE8A4C] focus:ring-4 focus:ring-[#BE8A4C]/15"
                  >
                    <option value="">Select pickup spot</option>

                    {spots.map((spot) => (
                      <option key={spot._id} value={spot.name}>
                        {spot.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#756657]"
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-6">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[#201A16]">
                  <CreditCard size={16} className="text-[#BE6F22]" />
                  Payment Method
                </h3>

                <div className="space-y-3">
                  {paymentMethods.map(({ value, label, detail, Icon }) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition sm:p-4 ${
                        paymentMethod === value
                          ? "border-[#BE8A4C] bg-[#FFF7EA] shadow-sm"
                          : "border-[#E6D8C7] bg-white hover:bg-[#FBF6EF]"
                      }`}
                    >
                      <input
                        type="radio"
                        value={value}
                        checked={paymentMethod === value}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                        className="sr-only"
                      />

                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-md ${
                          paymentMethod === value
                            ? "bg-[#201A16] text-[#E9C48E]"
                            : "bg-[#FBF6EF] text-[#BE6F22]"
                        }`}
                      >
                        <Icon size={18} />
                      </span>

                      <span className="min-w-0">
                        <span className="block font-bold text-[#201A16]">
                          {label}
                        </span>
                        <span className="block text-sm text-[#756657]">
                          {detail}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {paymentMethod === "UPI" && (
                <div className="mt-6 rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-4">
                  <p className="font-bold text-[#201A16]">UPI Payment</p>
                  <p className="mt-1 text-sm text-[#756657]">
                    UPI ID: canteen@upi
                  </p>
                  <p className="mt-1 text-sm text-[#756657]">
                    Amount: {formatCurrency(total)}
                  </p>
                </div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#201A16] px-5 py-3.5 font-bold text-white transition hover:bg-[#332820] disabled:cursor-not-allowed disabled:bg-[#756657] sm:mt-6 sm:py-4"
              >
                {isPlacingOrder ? "Placing Order" : "Place Order"}
                <ArrowRight size={18} />
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
