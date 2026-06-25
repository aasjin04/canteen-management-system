import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardList,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShoppingCart,
  UserPlus,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import BrandLogo from "./BrandLogo";

function NavItem({
  to,
  label,
  Icon,
  badge,
  primary = false,
  active = false,
  onClick,
  block = false,
  layoutId = "nav-active-pill",
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-lg px-3.5 py-2 text-sm font-bold transition ${
        block ? "w-full justify-start" : ""
      } ${
        primary
          ? "bg-[#3B2416] text-white shadow-sm hover:bg-[#4A2D1C]"
          : active
            ? "text-[#9A5B22]"
            : block
              ? "bg-[#FBF6EF] text-[#3B2416] hover:bg-[#FFF3E4] hover:text-[#9A5B22]"
              : "text-[#5B4638] hover:bg-[#FFF7EF] hover:text-[#9A5B22]"
      }`}
    >
      {!primary && active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-lg bg-[#FFF3E4]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        <Icon size={17} />
        {label}
      </span>
      {badge > 0 && (
        <span className="absolute -right-2 -top-2 z-20 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D95D39] px-1.5 text-[11px] font-extrabold text-white shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const closeMenu = () => setIsOpen(false);
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const studentLinks = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/menu", label: "Menu", Icon: UtensilsCrossed },
    { to: "/cart", label: "Cart", Icon: ShoppingCart, badge: cartCount },
    { to: "/orders", label: "Orders", Icon: ClipboardList },
  ];

  const guestLinks = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/menu", label: "Menu", Icon: UtensilsCrossed },
    { to: "/cart", label: "Cart", Icon: ShoppingCart, badge: cartCount },
    { to: "/login", label: "Login", Icon: LogIn },
    { to: "/register", label: "Register", Icon: UserPlus, primary: true },
  ];

  const navLinks =
    user?.role === "student" ? studentLinks : user ? [] : guestLinks;

  return (
    <nav className="relative z-50 border-b border-[#E8DCCF] bg-white/95 shadow-sm shadow-[#3B2416]/5 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
            <BrandLogo animated />
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <NavItem
                key={link.to}
                {...link}
                active={isActive(link.to)}
                onClick={closeMenu}
                layoutId="desktop-nav-active-pill"
              />
            ))}

            {user?.role === "admin" && (
              <NavItem
                to="/admin/dashboard"
                label="Admin Panel"
                Icon={LayoutDashboard}
                primary
                active={isActive("/admin/dashboard")}
                onClick={closeMenu}
                layoutId="desktop-nav-active-pill"
              />
            )}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {user && (
              <>
                <div className="flex items-center gap-3 rounded-lg border border-[#E8DCCF] bg-[#FAF6F0] px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#D79A4B] font-extrabold text-[#3B2416]">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#8A7A6C]">
                      Welcome back
                    </p>
                    <p className="max-w-32 truncate text-sm font-extrabold text-[#20130D]">
                      {user.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#F2D6D0] bg-[#FFF5F3] px-3.5 py-2 text-sm font-bold text-[#B83224] transition hover:bg-[#FFE8E3]"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8DCCF] bg-white text-[#3B2416] shadow-sm transition hover:bg-[#FFF7EF] lg:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <div className="lg:hidden">
              <motion.button
                type="button"
                aria-label="Close navigation"
                className="fixed inset-0 z-[80] bg-[#20130D]/45 backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
              />
              <motion.aside
                className="fixed bottom-0 right-0 top-0 z-[90] flex w-[84vw] max-w-sm flex-col border-l border-[#E8DCCF] bg-[#FFFBF6] p-4 shadow-2xl shadow-[#20130D]/25"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 360, damping: 34 }}
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#E8DCCF] pb-4">
                  <BrandLogo />
                  <button
                    onClick={closeMenu}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] text-[#3B2416]"
                    aria-label="Close navigation"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-5 grid gap-2">
                  {navLinks.map((link) => (
                    <NavItem
                      key={link.to}
                      {...link}
                      active={isActive(link.to)}
                      onClick={closeMenu}
                      block
                      layoutId="mobile-nav-active-pill"
                    />
                  ))}

                  {user?.role === "admin" && (
                    <NavItem
                      to="/admin/dashboard"
                      label="Admin Panel"
                      Icon={LayoutDashboard}
                      primary
                      active={isActive("/admin/dashboard")}
                      onClick={closeMenu}
                      block
                      layoutId="mobile-nav-active-pill"
                    />
                  )}
                </div>

                {user && (
                  <div className="mt-auto grid gap-3 border-t border-[#E8DCCF] pt-4">
                    <div className="flex items-center gap-3 rounded-lg border border-[#E8DCCF] bg-[#FAF6F0] px-3 py-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#D79A4B] font-extrabold text-[#3B2416]">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#8A7A6C]">
                          Welcome back
                        </p>
                        <p className="truncate font-extrabold text-[#20130D]">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#F2D6D0] bg-[#FFF5F3] px-3.5 py-2 text-sm font-bold text-[#B83224] transition hover:bg-[#FFE8E3]"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </motion.aside>
            </div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
