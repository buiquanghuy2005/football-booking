'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop"
          alt="Football Field"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <p className="text-green-400 font-semibold text-lg mb-4">
                ⚽ Football Booking Platform
              </p>

              <h1 className="text-6xl font-extrabold text-white leading-tight">
                Book Football Fields
                <br />
                Quickly & Easily
              </h1>

              <p className="mt-6 text-xl text-gray-200 leading-9">
                Find the best football fields
                near you, check available
                slots, and book instantly
                online.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="/fields"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition shadow-lg"
                >
                  Explore Fields
                </Link>

                <Link
                  href="/register"
                  className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-2xl text-lg font-semibold transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-green-600 font-semibold">
            WHY CHOOSE US
          </p>

          <h2 className="text-5xl font-bold text-black mt-4">
            Everything You Need
          </h2>

          <p className="text-gray-600 mt-5 text-lg">
            Modern football booking
            experience for players,
            owners and admins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl mb-6">
              ⚽
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">
              Easy Booking
            </h3>

            <p className="text-gray-600 leading-8">
              Book football fields in
              seconds with a clean and
              simple interface.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl mb-6">
              🕒
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">
              Real-time Slots
            </h3>

            <p className="text-gray-600 leading-8">
              See available schedules and
              avoid double bookings
              instantly.
            </p>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition">
            <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center text-3xl mb-6">
              🏆
            </div>

            <h3 className="text-2xl font-bold text-black mb-4">
              Professional System
            </h3>

            <p className="text-gray-600 leading-8">
              Designed for players,
              football field owners and
              administrators.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Ready To Play?
          </h2>

          <p className="text-gray-300 mt-6 text-xl leading-9">
            Discover football fields and
            reserve your slot today.
          </p>

          <Link
            href="/fields"
            className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}