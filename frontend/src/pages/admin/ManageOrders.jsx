import { useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  ChefHat,
  ClipboardList,
  Clock3,
  Filter,
  IndianRupee,
  MapPin,
  PackageCheck,
  Trash2,
  XCircle,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useOrders } from "../../context/OrderContext";

const filters = [
  "All",
  "Pending",
  "Accepted",
  "Preparing",
  "Ready",
  "Delivered",
  "Rejected",
  "Cancelled",
];

const statusMeta = {
  Pending: {
    Icon: Clock3,
    chip: "border-[#F2D486] bg-[#FFF5D8] text-[#9A650D]",
    button: "bg-[#9A650D] hover:bg-[#80520B]",
  },
  Accepted: {
    Icon: BadgeCheck,
    chip: "border-[#BDE4CB] bg-[#EEF9F2] text-[#24784A]",
    button: "bg-[#24784A] hover:bg-[#1D603B]",
  },
  Preparing: {
    Icon: ChefHat,
    chip: "border-[#F0B895] bg-[#FFF0E8] text-[#B84E25]",
    button: "bg-[#B84E25] hover:bg-[#973D1C]",
  },
  Ready: {
    Icon: CheckCircle2,
    chip: "border-[#A7DDB8] bg-[#EAF8EF] text-[#28764B]",
    button: "bg-[#28764B] hover:bg-[#1F613D]",
  },
  Delivered: {
    Icon: PackageCheck,
    chip: "border-[#B8CDF7] bg-[#EAF1FF] text-[#315CA8]",
    button: "bg-[#315CA8] hover:bg-[#284B87]",
  },
  Completed: {
    Icon: PackageCheck,
    chip: "border-[#B8CDF7] bg-[#EAF1FF] text-[#315CA8]",
    button: "bg-[#315CA8] hover:bg-[#284B87]",
  },
  Rejected: {
    Icon: XCircle,
    chip: "border-[#F1C6BC] bg-[#FFF3F0] text-[#B83224]",
    button: "bg-[#B83224] hover:bg-[#94281D]",
  },
  Cancelled: {
    Icon: XCircle,
    chip: "border-[#F1C6BC] bg-[#FFF3F0] text-[#B83224]",
    button: "bg-[#B83224] hover:bg-[#94281D]",
  },
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const getCustomerName = (order) =>
  order.userName || order.user?.name || order.customerName || "Customer";

const getShortOrderRef = (order, index) =>
  String(order.id || order._id || index + 1).slice(-6).toUpperCase();

function StatusChip({ status }) {
  const meta = statusMeta[status] || statusMeta.Pending;
  const Icon = meta.Icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold ${meta.chip}`}
    >
      <Icon size={13} />
      {status || "Pending"}
    </span>
  );
}

export default function ManageOrders() {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();

  const [filter, setFilter] = useState("All");
  const [deletingOrderId, setDeletingOrderId] = useState("");

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((order) => order.status === filter);

  const activeOrders = orders.filter(
    (order) =>
      !["Delivered", "Completed", "Rejected", "Cancelled"].includes(
        order.status
      )
  ).length;

  const deliveredRevenue = orders
    .filter((order) => ["Delivered", "Completed"].includes(order.status))
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const handleDeleteOrderHistory = async (orderId) => {
    const confirmed = window.confirm(
      "Delete this order from admin history?"
    );

    if (!confirmed) return;

    try {
      setDeletingOrderId(orderId);

      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      alert("Could not delete this order history right now.");
    } finally {
      setDeletingOrderId("");
    }
  };

  return (
    <AdminLayout>
      <div className="-m-6 min-h-screen bg-[#FBF6EF] p-6">
        <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#20130D_0%,#3B2416_55%,#8B4A24_100%)] p-6 text-white shadow-2xl shadow-[#3B2416]/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F6D49E]">
                <ClipboardList size={14} />
                Order Control
              </p>
              <h1
                className="mt-5 text-4xl font-semibold leading-tight md:text-5xl"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Manage Orders
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[#F2DDC2] md:text-base">
                Move orders from request to pickup with clear status updates
                and fast kitchen actions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="min-w-36">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Active
                </p>
                <p className="mt-2 text-3xl font-black">{activeOrders}</p>
              </div>
              <div className="min-w-36">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Revenue
                </p>
                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(deliveredRevenue)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                <Filter size={14} />
                Filters
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                Kitchen Queue
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((status) => {
                const count =
                  status === "All"
                    ? orders.length
                    : orders.filter((order) => order.status === status).length;

                return (
                  <button
                    type="button"
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`rounded-lg border px-4 py-2 text-sm font-extrabold transition ${
                      filter === status
                        ? "border-[#20130D] bg-[#20130D] text-white shadow-lg shadow-[#20130D]/15"
                        : "border-[#E2D2C0] bg-[#FBF6EF] text-[#5B4638] hover:border-[#B8752F] hover:text-[#B8752F]"
                    }`}
                  >
                    {status}
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#D9C6B2] bg-[#FBF6EF] p-8 text-center">
              <ClipboardList size={34} className="mx-auto text-[#B8752F]" />
              <p className="mt-4 font-extrabold text-[#20130D]">
                No orders found
              </p>
              <p className="mt-2 text-sm font-semibold text-[#756657]">
                Orders matching this status will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredOrders.map((order, orderIndex) => {
                const orderItems = order.items || [];
                const customerName = getCustomerName(order);
                const orderRef = getShortOrderRef(order, orderIndex);
                return (
                  <article
                    key={order._id || order.id || orderIndex}
                    className="rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#B8752F] hover:shadow-lg hover:shadow-[#3B2416]/10"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                          Ordered By
                        </p>
                        <h3 className="mt-1 text-2xl font-black text-[#20130D]">
                          {customerName}
                        </h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8A7A6C]">
                          Ref {orderRef}
                        </p>
                      </div>
                      <StatusChip status={order.status} />
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-[#E8DCCF] bg-white p-3">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7A6C]">
                          <MapPin size={14} />
                          Pickup Spot
                        </p>
                        <p className="mt-2 font-extrabold text-[#20130D]">
                          {order.pickupSpot || "Not assigned"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#E8DCCF] bg-white p-3">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7A6C]">
                          <IndianRupee size={14} />
                          Total
                        </p>
                        <p className="mt-2 font-extrabold text-[#2F7D59]">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="mb-3 text-sm font-extrabold text-[#20130D]">
                        Items
                      </p>
                      <div className="grid gap-2">
                        {orderItems.length === 0 ? (
                          <p className="rounded-lg border border-dashed border-[#D9C6B2] bg-white p-3 text-sm font-semibold text-[#756657]">
                            No items listed for this order.
                          </p>
                        ) : (
                          orderItems.map((item, itemIndex) => (
                            <div
                              key={item._id || item.id || `${item.name}-${itemIndex}`}
                              className="flex items-center justify-between rounded-lg border border-[#E8DCCF] bg-white px-3 py-2"
                            >
                              <span className="font-semibold text-[#20130D]">
                                {item.name}
                              </span>
                              <span className="rounded-full bg-[#FFF4D9] px-2.5 py-1 text-xs font-extrabold text-[#9A650D]">
                                x {item.quantity}
                              </span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-5 border-t border-[#E8DCCF] pt-4">
                      {order.status === "Pending" ? (
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateOrderStatus(order._id, "Accepted")
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-[#24784A] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#1D603B]"
                          >
                            <BadgeCheck size={16} />
                            Accept Order
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateOrderStatus(order._id, "Rejected")
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-[#B83224] px-4 py-2 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#94281D]"
                          >
                            <XCircle size={16} />
                            Reject Order
                          </button>
                        </div>
                      ) : ["Rejected", "Cancelled"].includes(order.status) ? (
                        <p className="rounded-lg border border-[#F1C6BC] bg-[#FFF3F0] px-4 py-3 text-sm font-extrabold text-[#B83224]">
                          This order was {order.status.toLowerCase()}.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {["Preparing", "Ready", "Delivered"].map((status) => {
                            const meta = statusMeta[status];
                            const isCurrent = order.status === status;
                            const isDone =
                              order.status === "Delivered" ||
                              order.status === "Completed";

                            return (
                              <button
                                type="button"
                                key={status}
                                onClick={() =>
                                  updateOrderStatus(order._id, status)
                                }
                                disabled={isCurrent || isDone}
                                className={`rounded-lg px-4 py-2 text-sm font-extrabold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-45 ${meta.button}`}
                              >
                                {isCurrent ? `${status} Now` : status}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => handleDeleteOrderHistory(order._id)}
                          disabled={deletingOrderId === order._id}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#F1C6BC] bg-[#FFF3F0] px-4 py-2 text-sm font-extrabold text-[#B83224] transition hover:bg-[#FFE4DE] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={16} />
                          {deletingOrderId === order._id
                            ? "Deleting"
                            : "Delete History"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
}
