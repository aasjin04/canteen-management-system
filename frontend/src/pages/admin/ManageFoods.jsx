import { useState } from "react";
import { toast } from "react-toastify";
import {
  Check,
  ImageIcon,
  IndianRupee,
  Pencil,
  Plus,
  Search,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useFoods } from "../../context/FoodContext";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function ManageFoods() {
  const { foods, addFood, updateFood, deleteFood } = useFoods();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPriceId, setEditingPriceId] = useState("");
  const [draftPrice, setDraftPrice] = useState("");

  const filteredFoods = foods.filter((food) =>
    food.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredCount = foods.filter((food) => food.featured).length;

  const handleAddFood = () => {
    if (!name.trim() || !price || !image.trim()) {
      toast.error("Fill all fields");
      return;
    }

    addFood({
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
      featured,
    });

    setName("");
    setPrice("");
    setImage("");
    setFeatured(false);
  };

  const handleToggleFeatured = (food) => {
    updateFood(food._id, {
      featured: !food.featured,
    });
  };

  const startEditingPrice = (food) => {
    setEditingPriceId(food._id);
    setDraftPrice(String(food.price || ""));
  };

  const cancelEditingPrice = () => {
    setEditingPriceId("");
    setDraftPrice("");
  };

  const handleSavePrice = (food) => {
    if (!draftPrice || Number(draftPrice) <= 0) {
      toast.error("Enter a valid price");
      return;
    }

    updateFood(food._id, {
      price: Number(draftPrice),
    });
    cancelEditingPrice();
  };

  return (
    <AdminLayout>
      <div className="-m-3 min-h-screen bg-[#FBF6EF] p-3 sm:-m-4 sm:p-4 lg:-m-6 lg:p-6">
        <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#20130D_0%,#3B2416_58%,#9A5B22_100%)] p-6 text-white shadow-2xl shadow-[#3B2416]/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F6D49E]">
                <UtensilsCrossed size={14} />
                Kitchen Catalog
              </p>
              <h1
                className="mt-5 text-4xl font-semibold leading-tight md:text-5xl"
              >
                Manage Foods
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[#F2DDC2] md:text-base">
                Add dishes, highlight favorites, and keep the menu ready for
                hungry students.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="min-w-32">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Total Items
                </p>
                <p className="mt-2 text-3xl font-black">{foods.length}</p>
              </div>
              <div className="min-w-32">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                  Featured
                </p>
                <p className="mt-2 text-3xl font-black">{featuredCount}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                Add Item
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                New Food Details
              </h2>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-[#4E3929]">
                  Food Name
                </span>
                <input
                  type="text"
                  placeholder="Paneer roll"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-4 py-3 font-semibold text-[#20130D] outline-none transition focus:border-[#B8752F] focus:bg-white focus:ring-4 focus:ring-[#F0B35B]/20"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-[#4E3929]">
                  Price
                </span>
                <div className="flex items-center rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-4 transition focus-within:border-[#B8752F] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F0B35B]/20">
                  <IndianRupee size={18} className="text-[#B8752F]" />
                  <input
                    type="number"
                    placeholder="80"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 font-semibold text-[#20130D] outline-none"
                  />
                </div>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-[#4E3929]">
                  Image URL
                </span>
                <div className="flex items-center rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-4 transition focus-within:border-[#B8752F] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F0B35B]/20">
                  <ImageIcon size={18} className="text-[#B8752F]" />
                  <input
                    type="text"
                    placeholder="https://..."
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 font-semibold text-[#20130D] outline-none"
                  />
                </div>
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] p-4">
                <span>
                  <span className="block font-extrabold text-[#20130D]">
                    Show on Home Page
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-[#756657]">
                    Mark this item as featured.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                  className="h-5 w-5 accent-[#B8752F]"
                />
              </label>

              <button
                type="button"
                onClick={handleAddFood}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#20130D] px-5 py-3 font-extrabold text-white shadow-lg shadow-[#20130D]/15 transition hover:-translate-y-0.5 hover:bg-[#3B2416]"
              >
                <Plus size={19} />
                Add Food
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                  Menu Items
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                  Food Library
                </h2>
              </div>

              <div className="flex items-center rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-3 transition focus-within:border-[#B8752F] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F0B35B]/20">
                <Search size={17} className="text-[#B8752F]" />
                <input
                  type="text"
                  placeholder="Search food"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm font-semibold text-[#20130D] outline-none md:w-52"
                />
              </div>
            </div>

            {filteredFoods.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#D9C6B2] bg-[#FBF6EF] p-8 text-center">
                <UtensilsCrossed
                  size={34}
                  className="mx-auto text-[#B8752F]"
                />
                <p className="mt-4 font-extrabold text-[#20130D]">
                  No food items found
                </p>
                <p className="mt-2 text-sm font-semibold text-[#756657]">
                  Add a dish or adjust your search to see menu items here.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredFoods.map((food) => (
                  <article
                    key={food._id}
                    className="overflow-hidden rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] shadow-sm transition hover:-translate-y-0.5 hover:border-[#B8752F] hover:shadow-lg hover:shadow-[#3B2416]/10"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#EFE0CF]">
                        {food.image ? (
                          <img
                            src={food.image}
                            alt={food.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#B8752F]">
                            <ImageIcon size={26} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="truncate text-lg font-black text-[#20130D]">
                              {food.name}
                            </h3>
                            {editingPriceId === food._id ? (
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <div className="flex max-w-32 items-center rounded-lg border border-[#E2D2C0] bg-white px-2">
                                  <IndianRupee
                                    size={15}
                                    className="text-[#B8752F]"
                                  />
                                  <input
                                    type="number"
                                    value={draftPrice}
                                    onChange={(event) =>
                                      setDraftPrice(event.target.value)
                                    }
                                    className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm font-extrabold text-[#20130D] outline-none"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleSavePrice(food)}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#24784A] text-white"
                                  aria-label={`Save ${food.name} price`}
                                >
                                  <Check size={16} />
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEditingPrice}
                                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E8DCCF] bg-white text-[#756657]"
                                  aria-label="Cancel price edit"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ) : (
                              <p className="mt-1 font-extrabold text-[#2F7D59]">
                                {formatCurrency(food.price)}
                              </p>
                            )}
                          </div>

                          {food.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#F0B35B]/40 bg-[#FFF4D9] px-2.5 py-1 text-xs font-extrabold text-[#9A650D]">
                              <Sparkles size={12} />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(food)}
                            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-extrabold transition ${
                              food.featured
                                ? "border-[#D4B56E] bg-[#FFF4D9] text-[#8A5A0A] hover:bg-[#FFEABB]"
                                : "border-[#D6DDE8] bg-white text-[#4F647A] hover:bg-[#EEF4FB]"
                            }`}
                          >
                            {food.featured ? (
                              <ToggleRight size={18} />
                            ) : (
                              <ToggleLeft size={18} />
                            )}
                            {food.featured
                              ? "Remove from Home"
                              : "Show on Home"}
                          </button>

                          <button
                            type="button"
                            onClick={() => startEditingPrice(food)}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#D6DDE8] bg-white px-3 py-2 text-sm font-extrabold text-[#4F647A] transition hover:bg-[#EEF4FB]"
                          >
                            <Pencil size={16} />
                            Edit Price
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteFood(food._id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#F1C6BC] bg-[#FFF3F0] px-3 py-2 text-sm font-extrabold text-[#B83224] transition hover:bg-[#FFE4DE]"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
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
