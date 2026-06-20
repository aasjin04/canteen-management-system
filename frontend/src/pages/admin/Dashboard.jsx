import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChefHat,
  ClipboardList,
  Clock3,
  IndianRupee,
  PackageCheck,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useFoods } from "../../context/FoodContext";
import { useOrders } from "../../context/OrderContext";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const statusStyles = {
  Pending: "bg-[#FFF5D8] text-[#9A650D] border-[#F2D486]",
  Accepted: "bg-[#EEF9F2] text-[#24784A] border-[#BDE4CB]",
  Preparing: "bg-[#FFF0E8] text-[#B84E25] border-[#F0B895]",
  Ready: "bg-[#EAF8EF] text-[#28764B] border-[#A7DDB8]",
  Delivered: "bg-[#EAF1FF] text-[#315CA8] border-[#B8CDF7]",
  Completed: "bg-[#EAF1FF] text-[#315CA8] border-[#B8CDF7]",
  Rejected: "bg-[#FFF3F0] text-[#B83224] border-[#F1C6BC]",
  Cancelled: "bg-[#FFF3F0] text-[#B83224] border-[#F1C6BC]",
};

const getCustomerName = (order) =>
  order.userName || order.user?.name || order.customerName || "Customer";

const getShortOrderRef = (order, index) =>
  String(order.id || order._id || index + 1).slice(-6).toUpperCase();

function StatCard({ title, value, detail, Icon, accent, dark = false }) {
  return (
    <article
      className={`group overflow-hidden rounded-lg border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "border-[#F0B35B]/25 bg-[#20130D] text-white shadow-[#20130D]/15"
          : "border-[#E8DCCF] bg-white text-[#20130D] shadow-[#3B2416]/5"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-extrabold uppercase tracking-[0.16em] ${
              dark ? "text-[#F0B35B]" : "text-[#9A7A5A]"
            }`}
          >
            {title}
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${accent} text-white shadow-lg shadow-black/10 transition group-hover:scale-105`}
        >
          <Icon size={22} />
        </div>
      </div>

      <p
        className={`mt-4 text-sm font-semibold ${
          dark ? "text-[#EBD6BA]" : "text-[#756657]"
        }`}
      >
        {detail}
      </p>
    </article>
  );
}

function PipelineStep({ label, value, total, Icon, color }) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="rounded-lg border border-[#E8DCCF] bg-white p-4 shadow-sm shadow-[#3B2416]/5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            <Icon size={18} />
          </span>
          <div>
            <p className="font-extrabold text-[#20130D]">{label}</p>
            <p className="text-xs font-semibold text-[#8A7A6C]">
              {percent}% of orders
            </p>
          </div>
        </div>
        <p className="text-2xl font-black text-[#20130D]">{value}</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F2E6D8]">
        <div
          className="h-full rounded-full bg-[#D79A4B] transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { orders } = useOrders();
  const { foods } = useFoods();

  const pendingOrders = orders.filter((order) => order.status === "Pending");
  const acceptedOrders = orders.filter((order) => order.status === "Accepted");
  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  );
  const readyOrders = orders.filter((order) => order.status === "Ready");
  const deliveredOrders = orders.filter((order) =>
    ["Delivered", "Completed"].includes(order.status)
  );
  const rejectedOrders = orders.filter((order) => order.status === "Rejected");
  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  );

  const activeOrders =
    pendingOrders.length +
    acceptedOrders.length +
    preparingOrders.length +
    readyOrders.length;

  const totalRevenue = deliveredOrders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const averageOrderValue =
    deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0;

  const recentOrders = orders.slice(0, 4);

  return (
    <AdminLayout>
      <div className="-m-6 min-h-screen bg-[#FBF6EF] p-6">
        <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#20130D_0%,#3B2416_52%,#8B4A24_100%)] p-6 text-white shadow-2xl shadow-[#3B2416]/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1
                className="mt-5 text-4xl font-semibold leading-tight md:text-5xl"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[#F2DDC2] md:text-base">
                Track live kitchen movement, menu strength, and delivered
                revenue from one elegant admin workspace.
              </p>
            </div>

            <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur sm:grid-cols-2">
              <div className="min-w-36">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Active Orders
                </p>
                <p className="mt-2 text-3xl font-black">{activeOrders}</p>
              </div>
              <div className="min-w-36">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Avg. Order
                </p>
                <p className="mt-2 text-3xl font-black">
                  {formatCurrency(averageOrderValue)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={orders.length}
            detail="All orders received by the canteen."
            Icon={ClipboardList}
            accent="from-[#F7C873] to-[#D9902F]"
          />
          <StatCard
            title="Total Foods"
            value={foods.length}
            detail="Items currently available in your menu."
            Icon={UtensilsCrossed}
            accent="from-[#FF9B73] to-[#D95D39]"
          />
          <StatCard
            title="Delivered"
            value={deliveredOrders.length}
            detail="Completed orders ready for reporting."
            Icon={PackageCheck}
            accent="from-[#9DD6B2] to-[#2F8D62]"
          />
          <StatCard
            title="Revenue"
            value={formatCurrency(totalRevenue)}
            detail="Calculated from delivered orders."
            Icon={IndianRupee}
            accent="from-[#A8C7FF] to-[#4F75D9]"
            dark
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                  Order Pipeline
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                  Kitchen Flow
                </h2>
              </div>
              <ArrowUpRight className="text-[#B8752F]" size={24} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <PipelineStep
                label="Pending"
                value={pendingOrders.length}
                total={orders.length}
                Icon={Clock3}
                color="bg-[#FFF5D8] text-[#9A650D]"
              />
              <PipelineStep
                label="Accepted"
                value={acceptedOrders.length}
                total={orders.length}
                Icon={BadgeCheck}
                color="bg-[#EEF9F2] text-[#24784A]"
              />
              <PipelineStep
                label="Preparing"
                value={preparingOrders.length}
                total={orders.length}
                Icon={ChefHat}
                color="bg-[#FFF0E8] text-[#B84E25]"
              />
              <PipelineStep
                label="Ready"
                value={readyOrders.length}
                total={orders.length}
                Icon={CheckCircle2}
                color="bg-[#EAF8EF] text-[#28764B]"
              />
              <PipelineStep
                label="Delivered"
                value={deliveredOrders.length}
                total={orders.length}
                Icon={PackageCheck}
                color="bg-[#EAF1FF] text-[#315CA8]"
              />
              <PipelineStep
                label="Rejected"
                value={rejectedOrders.length}
                total={orders.length}
                Icon={XCircle}
                color="bg-[#FFF3F0] text-[#B83224]"
              />
              <PipelineStep
                label="Cancelled"
                value={cancelledOrders.length}
                total={orders.length}
                Icon={XCircle}
                color="bg-[#FFF3F0] text-[#B83224]"
              />
            </div>
          </div>

          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                Latest Activity
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                Recent Orders
              </h2>
            </div>

            {recentOrders.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#D9C6B2] bg-[#FBF6EF] p-6 text-center">
                <p className="font-extrabold text-[#20130D]">No orders yet</p>
                <p className="mt-2 text-sm font-semibold text-[#756657]">
                  New orders will appear here as customers place them.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <article
                    key={order._id || order.id || index}
                    className="rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black text-[#20130D]">
                          {getCustomerName(order)}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8A7A6C]">
                          Ref {getShortOrderRef(order, index)}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-[#756657]">
                          Pickup: {order.pickupSpot || "Not assigned"}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-extrabold ${
                          statusStyles[order.status] ||
                          "border-[#D9C6B2] bg-white text-[#756657]"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-[#E8DCCF] pt-3">
                      <p className="text-xs font-semibold text-[#756657]">
                        {order.items?.length || 0} items
                      </p>
                      <p className="font-black text-[#2F7D59]">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
