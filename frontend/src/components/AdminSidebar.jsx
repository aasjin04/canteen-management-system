import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronRight,
  ClipboardList,
  MapPinned,
  UtensilsCrossed,
} from "lucide-react";
import { BrandMark } from "./BrandLogo";

const navItems = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    description: "Live overview",
    Icon: BarChart3,
    accent: "from-[#F7C873] to-[#D9902F]",
  },

  {
    to: "/admin/orders",
    label: "Manage Orders",
    description: "Kitchen queue",
    Icon: ClipboardList,
    accent: "from-[#9DD6B2] to-[#2F8D62]",
  },
    {
    to: "/admin/foods",
    label: "Manage Foods",
    description: "Menu inventory",
    Icon: UtensilsCrossed,
    accent: "from-[#FF9B73] to-[#D95D39]",
  },
  {
    to: "/admin/spots",
    label: "Manage Spots",
    description: "Pickup points",
    Icon: MapPinned,
    accent: "from-[#A8C7FF] to-[#4F75D9]",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="relative w-full shrink-0 overflow-hidden bg-[#160F0B] text-white shadow-2xl shadow-[#160F0B]/20 lg:sticky lg:top-0 lg:h-screen lg:w-72">
      <div className="absolute -left-16 top-10 h-44 w-44 rounded-full bg-[#D79A4B]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-56 w-56 rounded-full bg-[#8B3A20]/30 blur-3xl" />

      <div className="relative flex w-full flex-col border-b border-white/10 bg-[linear-gradient(155deg,#20130D_0%,#2B190F_48%,#120B08_100%)] px-3 py-4 lg:h-full lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="rounded-lg border border-white/10 bg-white/[0.07] p-3 shadow-xl shadow-black/20 backdrop-blur lg:p-4">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10 lg:h-12 lg:w-12" dark />

            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F0B35B] lg:hidden">
                Admin Workspace
              </p>
              <h2
                className="mt-1 truncate text-2xl font-semibold leading-none text-white lg:mt-2"
              >
                Admin Panel
              </h2>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-sm lg:mt-5 lg:max-w-none lg:gap-3">
            <div className="rounded-lg border border-white/10 bg-[#F9E1BA]/10 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#D9B985]">
                Role
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">Admin</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-[#8ED6AE]/10 px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9DD6B2]">
                Status
              </p>
              <p className="mt-1 text-sm font-extrabold text-white">Online</p>
            </div>
          </div>
        </div>

        <nav className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-8 lg:flex lg:flex-col lg:gap-3">
          {navItems.map(({ to, label, description, Icon, accent }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group relative overflow-hidden rounded-lg border px-2.5 py-2.5 transition duration-300 lg:px-3.5 lg:py-3.5 ${
                  isActive
                    ? "border-[#F0B35B]/40 bg-white text-[#21130C] shadow-xl shadow-[#F0B35B]/15"
                    : "border-white/10 bg-white/[0.06] text-[#F7E8D4] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.11]"
                }`
              }
            >
              {({ isActive }) => (
                <div className="relative flex items-center gap-2 lg:gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${accent} shadow-lg shadow-black/20 lg:h-11 lg:w-11 ${
                      isActive ? "text-[#21130C]" : "text-white"
                    }`}
                  >
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-extrabold sm:text-sm">
                      {label}
                    </span>
                    <span
                      className={`mt-0.5 hidden text-xs font-semibold lg:block ${
                        isActive ? "text-[#7E6041]" : "text-[#CBB9A6]"
                      }`}
                    >
                      {description}
                    </span>
                  </span>

                  <ChevronRight
                    size={18}
                    className={`hidden transition lg:block ${
                      isActive
                        ? "translate-x-0 text-[#B8752F]"
                        : "text-[#9B8673] group-hover:translate-x-1 group-hover:text-white"
                    }`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto hidden rounded-lg border border-[#F0B35B]/20 bg-[#F0B35B]/10 p-4 lg:block">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0B35B]">
            Veyra
          </p>
          <p className="mt-2 text-sm font-semibold leading-6 text-[#F7E8D4]">
            Control orders, food items, and pickup spots from one polished
            workspace.
          </p>
        </div>
      </div>
    </aside>
  );
}
