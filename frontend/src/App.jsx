import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { useCart } from "./context/CartContext";

function App() {
  const location = useLocation();
  const { cartNotice } = useCart();
  const hideNavbar = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <AppRoutes />

      {cartNotice && (
        <div className="fixed inset-x-0 bottom-5 z-[70] flex justify-center px-4">
          <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-[#E8DCCF] bg-[#20130D] px-4 py-3 text-white shadow-2xl shadow-[#20130D]/25">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D79A4B] text-[#20130D]">
              <ShoppingCart size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-sm font-extrabold">
                <CheckCircle2 size={15} className="text-[#9DD6B2]" />
                Added to cart
              </p>
              <p className="mt-0.5 truncate text-sm font-semibold text-[#EBD6BA]">
                {cartNotice}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
