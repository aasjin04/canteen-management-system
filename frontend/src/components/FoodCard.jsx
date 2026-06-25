import {
  CheckCircle2,
  Flame,
  Minus,
  Plus,
  ReceiptText,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
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
      <div className="relative h-56 overflow-hidden bg-[#F0E4D6]">
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

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#16120F]/70 to-transparent" />

        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/90 px-3 py-2 text-xs font-bold text-[#201A16] shadow-sm backdrop-blur">
          <Flame size={14} className="text-[#BE6F22]" />
          Fresh
        </div>

        {food.featured && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-md bg-[#201A16] px-3 py-2 text-xs font-bold text-[#E9C48E] shadow-lg shadow-black/20">
            <Sparkles size={14} />
            Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4 rounded-md bg-[#E9C48E] px-3 py-2 text-lg font-extrabold text-[#201A16] shadow-lg shadow-black/20">
          {formatCurrency(food.price)}
        </div>
      </div>

      <div className="p-5">
        <div className="min-h-[88px]">
          <p className="text-sm font-bold text-[#BE6F22]">Campus kitchen</p>
          <h2
            className="food-display mt-1 text-2xl font-semibold leading-tight text-[#201A16]"
          >
            {food.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#756657]">
            Prepared fresh and packed for quick pickup.
          </p>
        </div>

        {!cartItem ? (
          <button
            onClick={() => addToCart(food)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#201A16] px-4 py-3 font-bold text-white transition hover:bg-[#332820]"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        ) : (
          <div className="mt-5 rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] p-3">
            <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-[#2F7D59]">
              <CheckCircle2 size={16} />
              Added to cart
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => decreaseQuantity(food._id)}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-[#8D2C2C] shadow-sm transition hover:bg-[#F5E9DB]"
                aria-label={`Decrease ${food.name} quantity`}
              >
                <Minus size={17} />
              </button>

              <div className="text-center">
                <p className="text-xs font-semibold text-[#756657]">
                  Quantity
                </p>
                <span className="text-lg font-extrabold text-[#201A16]">
                  {cartItem.quantity}
                </span>
              </div>

              <button
                onClick={() => increaseQuantity(food._id)}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#201A16] text-[#E9C48E] shadow-sm transition hover:bg-[#332820]"
                aria-label={`Increase ${food.name} quantity`}
              >
                <Plus size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
