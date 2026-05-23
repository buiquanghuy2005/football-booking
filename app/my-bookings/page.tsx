'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { api } from '@/lib/api';

interface Booking {
    id: string;

    customerName: string;

    phoneNumber: string;

    startTime: string;

    status: string;

    field: {
        id: string;
        name: string;
        address: string;
        imageUrl?: string;
        price: number;
    };
}

export default function MyBookingsPage() {
    const [bookings, setBookings] =
        useState<Booking[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res =
                await api.get(
                    '/bookings/me',
                );

            setBookings(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (
        status: string,
    ) => {
        switch (status) {
            case 'CONFIRMED':
                return 'bg-green-100 text-green-700';

            case 'CANCELLED':
                return 'bg-red-100 text-red-600';

            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    };

    const getStatusText = (
        status: string,
    ) => {
        switch (status) {
            case 'CONFIRMED':
                return 'Confirmed';

            case 'CANCELLED':
                return 'Cancelled';

            default:
                return 'Pending';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* HERO */}
            <section className="px-6 pt-10">
                <div className="max-w-7xl mx-auto bg-black rounded-[32px] overflow-hidden relative">
                    <div className="absolute inset-0 opacity-30">
                        <img
                            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 px-10 py-16">
                        <p className="text-green-400 font-bold uppercase tracking-wide">
                            User Dashboard
                        </p>

                        <h1 className="text-5xl font-black text-white mt-4">
                            My Bookings
                        </h1>

                        <p className="text-gray-200 text-lg mt-5 max-w-2xl">
                            View all your football field bookings and track their status.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center py-20 text-2xl font-bold">
                        Loading...
                    </div>
                ) : bookings.length ===
                    0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow">
                        <h2 className="text-4xl font-black">
                            No bookings yet
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Start booking your favorite football fields.
                        </p>

                        <Link
                            href="/fields"
                            className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-2xl font-bold"
                        >
                            Explore Fields
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {bookings.map(
                            (booking) => (
                                <div
                                    key={
                                        booking.id
                                    }
                                    className="bg-white rounded-3xl overflow-hidden shadow"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-3">
                                        {/* IMAGE */}
                                        <div className="lg:h-full">
                                            <img
                                                src={
                                                    booking
                                                        .field
                                                        .imageUrl ||
                                                    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
                                                }
                                                className="w-full h-full object-cover min-h-[260px]"
                                            />
                                        </div>

                                        {/* INFO */}
                                        <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <h2 className="text-4xl font-black">
                                                        {
                                                            booking
                                                                .field
                                                                .name
                                                        }
                                                    </h2>

                                                    <div
                                                        className={`
                                                            px-5
                                                            py-2
                                                            rounded-2xl
                                                            font-bold
                                                            ${getStatusColor(
                                                            booking.status,
                                                        )}
                                                        `}
                                                    >
                                                        {getStatusText(
                                                            booking.status,
                                                        )}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mt-5 text-lg">
                                                    📍{' '}
                                                    {
                                                        booking
                                                            .field
                                                            .address
                                                    }
                                                </p>

                                                <p className="text-gray-700 mt-3 text-lg">
                                                    👤{' '}
                                                    {
                                                        booking.customerName
                                                    }
                                                </p>

                                                <p className="text-gray-700 mt-3 text-lg">
                                                    📞{' '}
                                                    {
                                                        booking.phoneNumber
                                                    }
                                                </p>

                                                <p className="text-gray-700 mt-3 text-lg">
                                                    🕒{' '}
                                                    {new Date(
                                                        booking.startTime,
                                                    ).toLocaleString()}
                                                </p>

                                                <p className="text-3xl font-black text-green-600 mt-6">
                                                    {booking.field.price.toLocaleString()}{' '}
                                                    VND/h
                                                </p>
                                            </div>

                                            {/* ACTION */}
                                            <div className="flex gap-4 mt-8">
                                                <Link
                                                    href={`/fields/${booking.field.id}`}
                                                    className="
                                                        bg-black
                                                        text-white
                                                        px-6
                                                        py-4
                                                        rounded-2xl
                                                        font-bold
                                                    "
                                                >
                                                    View Field
                                                </Link>

                                                <Link
                                                    href={`/my-bookings/${booking.id}`}
                                                    className="
                                                        border
                                                        px-6
                                                        py-4
                                                        rounded-2xl
                                                        font-bold
                                                    "
                                                >
                                                    Booking Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}