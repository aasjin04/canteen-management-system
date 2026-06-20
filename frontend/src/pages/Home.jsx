import { Link } from "react-router-dom";
import {
  ArrowRight,
  BellRing,
  ChefHat,
  Clock3,
  Flame,
  MapPin,
  Radio,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "framer-motion";
import { useFoods } from "../context/FoodContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const highlights = [
  { label: "Avg. pickup", value: "10 min", Icon: Clock3 },
  { label: "Live updates", value: "On", Icon: Radio },
  { label: "Campus counters", value: "Smart", Icon: MapPin },
];

const benefits = [
  {
    icon: UtensilsCrossed,
    title: "Order without the rush",
    text: "Pick favourites before the break starts and skip the counter queue.",
  },
  {
    icon: BellRing,
    title: "Know when it is ready",
    text: "Follow your order from kitchen to pickup with simple status updates.",
  },
  {
    icon: ShieldCheck,
    title: "Pay your way",
    text: "Choose UPI, wallet, or cash pickup based on what works that day.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse",
    text: "Open the menu and find fresh meals, snacks, and campus favourites.",
  },
  {
    number: "02",
    title: "Reserve",
    text: "Add dishes to cart, select pickup spot, and place the order.",
  },
  {
    number: "03",
    title: "Collect",
    text: "Arrive when it is ready and pick up from your chosen counter.",
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Home() {
  const { foods } = useFoods();

  const featuredFoods = foods.filter((food) => food.featured === true);
  const heroFoods =
    featuredFoods.length > 0 ? featuredFoods.slice(0, 3) : foods.slice(0, 3);
  const showcaseFoods = featuredFoods.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#FBF3E8] text-[#241713]">
      <section className="relative overflow-hidden bg-[#4A1F23] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,243,232,0.12)_0%,transparent_42%),linear-gradient(90deg,rgba(255,209,102,0.18)_0%,transparent_35%,rgba(217,93,57,0.18)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerParent}
              className="max-w-3xl"
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-[#FFD166]"
              >
                <Sparkles size={16} />
                Smart campus dining
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl font-semibold leading-none sm:text-6xl lg:text-7xl"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Fresh food, ready around your day.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-[#F5DFCA] sm:text-lg"
              >
                Order ahead from the canteen, track progress, and collect from
                the counter that fits your next class.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-[#D95D39] px-6 py-3.5 font-bold text-white shadow-lg shadow-black/20 transition hover:bg-[#E76F51]"
                >
                  Order now
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/orders"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  Track orders
                  <Radio size={18} />
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid gap-3 sm:grid-cols-3"
              >
                {highlights.map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/[0.08] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#F5DFCA]">{label}</p>
                      <Icon size={17} className="text-[#FFD166]" />
                    </div>
                    <p className="mt-2 text-xl font-extrabold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerParent}
              className="relative min-h-[430px]"
            >
              {heroFoods.length > 0 ? (
                <div className="relative h-[430px]">
                  {heroFoods.map((food, index) => {
                    const positions = [
                      "left-8 top-0 h-64 w-64 z-30",
                      "right-0 top-28 h-52 w-52 z-20",
                      "left-0 bottom-0 h-48 w-48 z-10",
                    ];

                    return (
                      <motion.div
                        key={food._id || food.id || index}
                        variants={fadeUp}
                        whileHover={{ y: -8 }}
                        className={`absolute overflow-hidden rounded-lg border border-white/20 bg-white shadow-2xl shadow-black/25 ${positions[index]}`}
                      >
                        <img
                          src={food.image}
                          alt={food.name || "Featured dish"}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#4A1F23]/90 to-transparent p-4 pt-12">
                          <p className="font-bold text-white">{food.name}</p>
                          <p className="text-sm font-semibold text-[#FFD166]">
                            {formatCurrency(food.price)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  variants={fadeUp}
                  className="grid h-[430px] place-items-center rounded-lg border border-white/10 bg-white/[0.08] text-center"
                >
                  <div>
                    <ChefHat size={42} className="mx-auto text-[#FFD166]" />
                    <p className="mt-3 text-[#F5DFCA]">
                      Today's menu is loading
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#D95D39]">
              Student Picks
            </p>
            <h2
              className="mt-2 text-4xl font-semibold text-[#241713]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Trending on campus
            </h2>
            <p className="mt-3 max-w-2xl text-[#766355]">
              A curated selection of the most ordered dishes students keep
              coming back for.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex w-fit items-center gap-2 rounded-md border border-[#4A1F23]/15 bg-white px-5 py-3 font-bold text-[#4A1F23] shadow-sm transition hover:border-[#D95D39] hover:text-[#D95D39]"
          >
            View full menu
            <ArrowRight size={17} />
          </Link>
        </motion.div>

        {showcaseFoods.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerParent}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {showcaseFoods.map((food) => (
              <motion.article
                key={food._id || food.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-lg border border-[#E7D8C9] bg-white shadow-sm transition hover:border-[#D95D39]/60 hover:shadow-xl hover:shadow-[#4A1F23]/10"
              >
                <div className="relative h-56 overflow-hidden bg-[#E7D8C9]">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-md bg-[#4A1F23] px-3 py-2 text-xs font-bold text-[#FFD166]">
                    <Flame size={14} />
                    Popular
                  </span>
                </div>

                <div className="p-5">
                  <h3
                    className="text-2xl font-semibold text-[#241713]"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {food.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#766355]">
                      Campus kitchen special
                    </p>
                    <span className="rounded-md bg-[#FFD166] px-3 py-2 font-extrabold text-[#241713]">
                      {formatCurrency(food.price)}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#CBB9A6] bg-white p-12 text-center shadow-sm">
            <UtensilsCrossed size={38} className="mx-auto text-[#D95D39]" />
            <h3
              className="mt-4 text-2xl font-semibold text-[#241713]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              No featured dishes yet
            </h3>
            <p className="mt-2 text-[#766355]">
              Check the full menu while today's picks are being prepared.
            </p>
          </div>
        )}
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerParent}
          >
            <motion.div variants={fadeUp} className="text-center">
              <p className="text-sm font-extrabold uppercase tracking-wide text-[#D95D39]">
                Why students use it
              </p>
              <h2
                className="mt-2 text-4xl font-semibold text-[#241713]"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Built for the campus rhythm
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {benefits.map(({ icon: Icon, title, text }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-lg border border-[#E7D8C9] bg-[#FBF3E8] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#4A1F23] text-[#FFD166]">
                    <Icon size={21} />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-[#241713]">
                    {title}
                  </h3>
                  <p className="mt-2 leading-7 text-[#766355]">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerParent}
          className="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start"
        >
          <motion.div variants={fadeUp}>
            <p className="text-sm font-extrabold uppercase tracking-wide text-[#D95D39]">
              How it works
            </p>
            <h2
              className="mt-2 text-4xl font-semibold text-[#241713]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Three steps, no counter chaos
            </h2>
            <p className="mt-3 text-[#766355]">
              The flow stays simple from menu browsing to pickup.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                className="rounded-lg border border-[#E7D8C9] bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-extrabold text-[#D95D39]">
                  {step.number}
                </span>
                <h3 className="mt-4 text-xl font-extrabold text-[#241713]">
                  {step.title}
                </h3>
                <p className="mt-2 leading-7 text-[#766355]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="overflow-hidden rounded-lg bg-[#D95D39] px-6 py-10 text-center text-white sm:px-10 lg:px-14"
        >
          <h3
            className="text-3xl font-semibold md:text-4xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Ready for your next order?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Explore today's menu and reserve your food before the next break.
          </p>

          <Link
            to="/menu"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#4A1F23] px-6 py-3.5 font-bold text-white transition hover:bg-[#5A292D]"
          >
            Browse menu
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
