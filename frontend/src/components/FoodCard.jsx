import {
  CheckCircle2,
  ArrowRight,
  Flame,
  Minus,
  Plus,
  ReceiptText,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function FoodCard({ food }) {
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const cartItem = cartItems.find((item) => item._id === food._id);

  return (
    <article className="group h-full overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#BE8A4C] hover:shadow-xl hover:shadow-[#6A3D18]/10">
      <div className="relative h-36 overflow-hidden bg-[#F0E4D6] sm:h-48 lg:h-52">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#B98545]">
            <ReceiptText size={38} />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#16120F]/70 to-transparent" />

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-white/30 bg-white/90 px-2.5 py-1.5 text-[11px] font-bold text-[#201A16] shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:text-xs">
          <Flame size={14} className="text-[#BE6F22]" />
          Fresh
        </div>

        {food.featured && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-[#201A16] px-2.5 py-1.5 text-[11px] font-bold text-[#E9C48E] shadow-lg shadow-black/20 sm:right-4 sm:top-4 sm:text-xs">
            <Sparkles size={14} />
            Featured
          </div>
        )}

        <div className="absolute bottom-3 left-3 rounded-md bg-[#E9C48E] px-3 py-1.5 text-sm font-extrabold text-[#201A16] shadow-lg shadow-black/20 sm:bottom-4 sm:left-4 sm:text-base">
          {formatCurrency(food.price)}
        </div>
      </div>

      <div className="p-3.5 sm:p-4">
        <div className="min-h-[70px] sm:min-h-[82px]">
          <p className="text-xs font-bold text-[#BE6F22] sm:text-sm">
            Campus kitchen
          </p>
          <h2
            className="food-display mt-0.5 text-xl font-semibold leading-tight text-[#201A16] sm:text-2xl"
          >
            {food.name}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[#756657] sm:text-sm sm:leading-6">
            Prepared fresh and packed for quick pickup.
          </p>
        </div>

        {!cartItem ? (
          <button
            onClick={() => addToCart(food)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#201A16] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#332820] sm:mt-4 sm:py-3"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        ) : (
          <div className="mt-3 rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-2.5 sm:mt-4">
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => decreaseQuantity(food._id)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-white text-[#8D2C2C] shadow-sm transition hover:bg-[#F5E9DB]"
                aria-label={`Decrease ${food.name} quantity`}
              >
                <Minus size={17} />
              </button>

              <div className="text-center">
                <p className="flex items-center gap-1 text-xs font-bold text-[#2F7D59]">
                  <CheckCircle2 size={13} />
                  Added
                </p>
                <span className="text-base font-extrabold text-[#201A16]">
                  {cartItem.quantity}
                </span>
              </div>

              <button
                onClick={() => increaseQuantity(food._id)}
                className="flex h-9 w-9 items-center justify-center rounded-md bg-[#201A16] text-[#E9C48E] shadow-sm transition hover:bg-[#332820]"
                aria-label={`Increase ${food.name} quantity`}
              >
                <Plus size={17} />
              </button>
            </div>

            <Link
              to="/cart"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#2F7D59] px-3 py-2 text-sm font-extrabold text-white transition hover:bg-[#256548]"
            >
              Go to Cart
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
