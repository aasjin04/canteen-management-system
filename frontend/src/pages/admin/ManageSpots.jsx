import { useState } from "react";
import {
  MapPinned,
  Navigation,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useSpots } from "../../context/SpotContext";

export default function ManageSpots() {
  const { spots, addSpot, deleteSpot } = useSpots();

  const [spotName, setSpotName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpots = spots.filter((spot) =>
    spot.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSpot = () => {
    if (!spotName.trim()) {
      alert("Enter spot name");
      return;
    }

    addSpot(spotName.trim());
    setSpotName("");
  };

  return (
    <AdminLayout>
      <div className="-m-6 min-h-screen bg-[#FBF6EF] p-6">
        <section className="overflow-hidden rounded-lg bg-[linear-gradient(135deg,#20130D_0%,#3B2416_58%,#9A5B22_100%)] p-6 text-white shadow-2xl shadow-[#3B2416]/20">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#F6D49E]">
                <MapPinned size={14} />
                Pickup Network
              </p>
              <h1
                className="mt-5 text-4xl font-semibold leading-tight md:text-5xl"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Manage Spots
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[#F2DDC2] md:text-base">
                Organize pickup points so students can find their food quickly
                across campus.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wider text-[#F0B35B]">
                Total Spots
              </p>
              <p className="mt-2 text-4xl font-black">{spots.length}</p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                Add Spot
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                Pickup Details
              </h2>
            </div>

            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-[#4E3929]">
                  Spot Name
                </span>
                <div className="flex items-center rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-4 transition focus-within:border-[#B8752F] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F0B35B]/20">
                  <Navigation size={18} className="text-[#B8752F]" />
                  <input
                    type="text"
                    placeholder="Main gate"
                    value={spotName}
                    onChange={(event) => setSpotName(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 font-semibold text-[#20130D] outline-none"
                  />
                </div>
              </label>

              <button
                type="button"
                onClick={handleAddSpot}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#20130D] px-5 py-3 font-extrabold text-white shadow-lg shadow-[#20130D]/15 transition hover:-translate-y-0.5 hover:bg-[#3B2416]"
              >
                <Plus size={19} />
                Add Spot
              </button>
            </div>

            <div className="mt-6 rounded-lg border border-[#F0B35B]/25 bg-[#FFF4D9] p-4">
              <p className="text-sm font-extrabold text-[#20130D]">
                Quick tip
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#756657]">
                Use short names that students already recognize, like Library
                Gate or Block A.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#E8DCCF] bg-white p-5 shadow-sm shadow-[#3B2416]/5">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#B8752F]">
                  Active Locations
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#20130D]">
                  Pickup Spots
                </h2>
              </div>

              <div className="flex items-center rounded-lg border border-[#E2D2C0] bg-[#FBF6EF] px-3 transition focus-within:border-[#B8752F] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#F0B35B]/20">
                <Search size={17} className="text-[#B8752F]" />
                <input
                  type="text"
                  placeholder="Search spots"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm font-semibold text-[#20130D] outline-none md:w-52"
                />
              </div>
            </div>

            {filteredSpots.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#D9C6B2] bg-[#FBF6EF] p-8 text-center">
                <MapPinned size={34} className="mx-auto text-[#B8752F]" />
                <p className="mt-4 font-extrabold text-[#20130D]">
                  No pickup spots found
                </p>
                <p className="mt-2 text-sm font-semibold text-[#756657]">
                  Add a new spot or adjust your search.
                </p>
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {filteredSpots.map((spot, index) => (
                  <article
                    key={spot._id}
                    className="rounded-lg border border-[#E8DCCF] bg-[#FBF6EF] p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#B8752F] hover:shadow-lg hover:shadow-[#3B2416]/10"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#20130D] text-[#F0B35B]">
                          <MapPinned size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-black text-[#20130D]">
                            {spot.name}
                          </p>
                          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8A7A6C]">
                            Spot {index + 1}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteSpot(spot._id)}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F1C6BC] bg-[#FFF3F0] text-[#B83224] transition hover:bg-[#FFE4DE]"
                        aria-label={`Delete ${spot.name}`}
                      >
                        <Trash2 size={17} />
                      </button>
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
