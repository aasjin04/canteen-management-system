import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChefHat,
  Clock3,
  CreditCard,
  Hourglass,
  IndianRupee,
  MapPin,
  PackageCheck,
  ReceiptText,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
  Trash2,
  WalletCards,
  XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const statusStyles = {
  completed: {
    label: "Completed",
    classes: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Icon: CheckCircle2,
  },
  delivered: {
    label: "Delivered",
    classes: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Icon: CheckCircle2,
  },
  accepted: {
    label: "Accepted",
    classes: "border-green-200 bg-green-50 text-green-700",
    Icon: CheckCircle2,
  },
  preparing: {
    label: "Preparing",
    classes: "border-sky-200 bg-sky-50 text-sky-700",
    Icon: ChefHat,
  },
  ready: {
    label: "Ready",
    classes: "border-teal-200 bg-teal-50 text-teal-700",
    Icon: PackageCheck,
  },
  pending: {
    label: "Pending",
    classes: "border-amber-200 bg-amber-50 text-amber-700",
    Icon: Hourglass,
  },
  rejected: {
    label: "Rejected",
    classes: "border-red-200 bg-red-50 text-red-700",
    Icon: AlertCircle,
  },
  cancelled: {
    label: "Cancelled",
    classes: "border-red-200 bg-red-50 text-red-700",
    Icon: XCircle,
  },
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const formatDate = (value) => {
  if (!value) return "Just now";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const getStatusConfig = (status) =>
  statusStyles[status?.toLowerCase()] || {
    label: status || "Pending",
    classes: "border-stone-200 bg-stone-50 text-stone-700",
    Icon: Hourglass,
  };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingOrderId, setCancelingOrderId] = useState("");
  const [deletingOrderId, setDeletingOrderId] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (fetchError) {
      console.log(fetchError);
      setError("We could not load your orders right now.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(fetchOrders, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchOrders]);

  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Delete this order from your order history?",
    );

    if (!confirmed) return;

    try {
      setDeletingOrderId(orderId);
      setError("");

      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders((currentOrders) =>
        currentOrders.filter((order) => order._id !== orderId),
      );
    } catch (deleteError) {
      console.log(deleteError);
      setError("We could not delete this order right now.");
    } finally {
      setDeletingOrderId("");
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm("Cancel this order?");

    if (!confirmed) return;

    try {
      setCancelingOrderId(orderId);
      setError("");

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API_URL}/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) => (order._id === orderId ? res.data : order)),
      );
    } catch (cancelError) {
      console.log(cancelError);
      setError(
        cancelError.response?.data?.message ||
          "We could not cancel this order right now.",
      );
    } finally {
      setCancelingOrderId("");
    }
  };

  const orderStats = useMemo(() => {
    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0,
    );
    const inactiveStatuses = ["completed", "delivered", "rejected", "cancelled"];
    const activeOrders = orders.filter(
      (order) => !inactiveStatuses.includes(order.status?.toLowerCase()),
    ).length;
    const paidOrders = orders.filter(
      (order) => order.paymentStatus === "Paid",
    ).length;

    return [
      {
        label: "Total Orders",
        value: orders.length,
        Icon: ReceiptText,
      },
      {
        label: "Active",
        value: activeOrders,
        Icon: Clock3,
      },
      {
        label: "Paid",
        value: paidOrders,
        Icon: WalletCards,
      },
      {
        label: "Spent",
        value: formatCurrency(totalSpent),
        Icon: IndianRupee,
      },
    ];
  }, [orders]);

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#201A16]">
      <section className="relative overflow-hidden border-b border-[#DDD0C1] bg-[#16120F] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(194,135,69,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
          <Link
            to="/"
            className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-[#E9C48E] transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#E9C48E] sm:text-sm">
                <Sparkles size={16} />
                Order desk
              </div>

              <h1
                className="text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              >
                My Orders
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#D9CDC0] sm:text-lg sm:leading-7">
                A polished view of your recent canteen orders, pickup details,
                payments, and kitchen progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={fetchOrders}
                className="inline-flex w-fit items-center gap-2 rounded-md border border-[#E9C48E]/50 bg-[#E9C48E] px-4 py-2.5 text-sm font-bold text-[#21160D] shadow-lg shadow-black/20 transition hover:bg-[#F3D8A6]"
              >
                <RefreshCcw size={17} />
                Refresh
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 lg:grid-cols-4">
            {orderStats.map(({ label, value, Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-white/10 bg-white/[0.07] p-3 backdrop-blur sm:p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#C9B9A6]">{label}</p>
                  <Icon size={18} className="text-[#E9C48E]" />
                </div>
                <p className="mt-2 text-xl font-bold text-white sm:text-2xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={18} />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="rounded-lg border border-[#DDD0C1] bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-[#201A16] text-[#E9C48E]">
              <RefreshCcw size={24} className="animate-spin" />
            </div>
            <h2
              className="mt-5 text-2xl font-semibold"
            >
              Preparing your order history
            </h2>
            <p className="mt-2 text-[#756657]">
              Pulling the latest details from your account.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm">
            <div className="grid min-h-[320px] place-items-center bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF7EA_52%,#F4E3CD_100%)] px-6 py-14 text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#201A16] text-[#E9C48E] shadow-lg shadow-[#201A16]/15">
                  <ShoppingBag size={30} />
                </div>
                <h2
                  className="mt-6 text-3xl font-semibold text-[#201A16]"
                >
                  No orders yet
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[#756657]">
                  Your first order will appear here with its pickup counter,
                  payment status, and kitchen updates.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-5">
            {orders.map((order) => {
              const status = getStatusConfig(order.status);
              const StatusIcon = status.Icon;
              const orderItems = Array.isArray(order.items) ? order.items : [];
              const isPaid = order.paymentStatus === "Paid";
              const canCancelOrder = ["Pending", "Accepted"].includes(
                order.status,
              );

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#BE8A4C] hover:shadow-xl hover:shadow-[#6A3D18]/10"
                >
                  <div className="p-3 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#BE6F22] sm:text-xs">
                          Order #{order._id?.slice(-6) || "new"}
                        </p>
                        <h2 className="mt-0.5 truncate text-lg font-black text-[#201A16] sm:text-2xl">
                          {order.pickupSpot || "Canteen pickup"}
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#756657] sm:text-sm">
                          <Clock3 size={14} className="text-[#BE6F22]" />
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[11px] font-bold sm:text-sm ${status.classes}`}
                      >
                        <StatusIcon size={14} />
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4 md:grid-cols-4">
                      <div className="rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-2.5 sm:p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A7A6C] sm:text-xs">
                          <MapPin size={14} />
                          Spot
                        </p>
                        <p className="mt-1 truncate text-sm font-extrabold text-[#201A16] sm:text-base">
                          {order.pickupSpot || "Assigning"}
                        </p>
                      </div>

                      <div className="rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-2.5 sm:p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A7A6C] sm:text-xs">
                          <CreditCard size={14} />
                          Payment
                        </p>
                        <p className="mt-1 truncate text-sm font-extrabold text-[#201A16] sm:text-base">
                          {order.paymentMethod || "Not selected"}
                        </p>
                      </div>

                      <div className="rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-2.5 sm:p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A7A6C] sm:text-xs">
                          <IndianRupee size={14} />
                          Total
                        </p>
                        <p className="mt-1 truncate text-sm font-extrabold text-[#8D2C2C] sm:text-base">
                          {formatCurrency(order.total)}
                        </p>
                      </div>

                      <div className="rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-2.5 sm:p-3">
                        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8A7A6C] sm:text-xs">
                          <ReceiptText size={14} />
                          Items
                        </p>
                        <p className="mt-1 text-sm font-extrabold text-[#201A16] sm:text-base">
                          {orderItems.reduce(
                            (sum, item) => sum + Number(item.quantity || 0),
                            0,
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                      {orderItems.map((item, index) => (
                        <span
                          key={`${item.name}-${index}`}
                          className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-[#E6D8C7] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#3A2E25] sm:text-sm"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#BE6F22]" />
                          <span className="truncate">
                            {item.name} x {item.quantity}
                          </span>
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-col gap-2 border-t border-[#E6D8C7] pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-bold sm:text-sm ${
                          isPaid
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}
                      >
                        {isPaid ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <Hourglass size={15} />
                        )}
                        {isPaid ? "Paid" : "Payment Pending"}
                      </div>

                      <div
                        className={`grid gap-2 sm:flex sm:flex-wrap sm:justify-end ${
                          canCancelOrder ? "grid-cols-2" : "grid-cols-1"
                        }`}
                      >
                        {canCancelOrder && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            disabled={cancelingOrderId === order._id}
                            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-3 sm:py-2"
                          >
                            <XCircle size={14} />
                            {cancelingOrderId === order._id
                              ? "Cancelling"
                              : "Cancel Order"}
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          disabled={deletingOrderId === order._id}
                          className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 sm:gap-2 sm:px-3 sm:py-2"
                        >
                          <Trash2 size={14} />
                          {deletingOrderId === order._id
                            ? "Deleting"
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
