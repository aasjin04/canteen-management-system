import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChefHat,
  Search,
  ShoppingCart,
  Sparkles,
  Soup,
  UtensilsCrossed,
} from "lucide-react";
import { useFoods } from "../context/FoodContext";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/FoodCard";

export default function Menu() {
  const { foods } = useFoods();
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");

  const filteredFoods = useMemo(
    () =>
      foods.filter((food) =>
        food.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [foods, search]
  );

  const featuredCount = foods.filter((food) => food.featured).length;
  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#F7F1E8] text-[#201A16]">
      <section className="relative overflow-hidden border-b border-[#DDD0C1] bg-[#16120F] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(194,135,69,0.24),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="mb-8 inline-flex w-fit items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-bold text-[#E9C48E] transition hover:bg-white/15"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-[#E9C48E]">
                <Sparkles size={16} />
                Signature canteen menu
              </div>

              <h1
                className="text-4xl font-semibold leading-none sm:text-5xl lg:text-6xl"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Explore Delicious Food
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-[#D9CDC0] sm:text-lg">
                Choose from fresh meals, campus favourites, and signature
                plates prepared for quick pickup.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#C9B9A6]">Showing</p>
                  <Soup size={18} className="text-[#E9C48E]" />
                </div>
                <p className="mt-3 text-2xl font-bold text-white">
                  {filteredFoods.length}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-[#C9B9A6]">Featured</p>
                  <ChefHat size={18} className="text-[#E9C48E]" />
                </div>
                <p className="mt-3 text-2xl font-bold text-white">
                  {featuredCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg border border-[#DDD0C1] bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-sm font-bold text-[#201A16]">
              <Search size={16} className="text-[#BE6F22]" />
              Search Menu
            </label>

            <Link
              to="/cart"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[#201A16] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#332820]"
            >
              <ShoppingCart size={16} />
              Go to Cart
              {cartCount > 0 && (
                <span className="rounded-full bg-[#E9C48E] px-2 py-0.5 text-xs font-extrabold text-[#201A16]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="relative">
            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#A7773E]"
            />
            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-[#E6D8C7] bg-[#FBF6EF] py-4 pl-12 pr-4 font-semibold text-[#201A16] outline-none transition placeholder:text-[#9B8A78] focus:border-[#BE8A4C] focus:bg-white focus:ring-4 focus:ring-[#BE8A4C]/15"
            />
          </div>
        </div>

        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-[#DDD0C1] bg-white shadow-sm">
            <div className="grid min-h-[320px] place-items-center bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF7EA_52%,#F4E3CD_100%)] px-6 py-14 text-center">
              <div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#201A16] text-[#E9C48E] shadow-lg shadow-[#201A16]/15">
                  <UtensilsCrossed size={30} />
                </div>
                <h2
                  className="mt-6 text-3xl font-semibold text-[#201A16]"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  No food found
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[#756657]">
                  Try another search or clear the search box to view the full
                  canteen menu.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
