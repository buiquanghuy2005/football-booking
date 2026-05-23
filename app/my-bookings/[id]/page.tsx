'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useParams } from 'next/navigation';

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
        description?: string;
        imageUrl?: string;
        price: number;
    };
}

export default function BookingDetailPage() {
    const params = useParams();

    const [booking, setBooking] =
        useState<Booking | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const res =
                await api.get(
                    '/bookings/me',
                );

            const foundBooking =
                res.data.find(
                    (b: Booking) =>
                        b.id === params.id,
                );

            setBooking(foundBooking);
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl font-black">
                Loading...
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-5xl font-black">
                    Booking Not Found
                </h1>

                <Link
                    href="/my-bookings"
                    className="mt-8 bg-black text-white px-6 py-4 rounded-2xl font-bold"
                >
                    Back
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto bg-white rounded-[32px] overflow-hidden shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* IMAGE */}
                    <div>
                        <img
                            src={
                                booking.field
                                    .imageUrl ||
                                'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
                            }
                            className="w-full h-full object-cover min-h-[500px]"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between gap-4">
                                <h1 className="text-5xl font-black">
                                    {
                                        booking
                                            .field
                                            .name
                                    }
                                </h1>

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

                            <p className="text-gray-600 text-lg mt-6">
                                📍{' '}
                                {
                                    booking
                                        .field
                                        .address
                                }
                            </p>

                            <p className="text-4xl font-black text-green-600 mt-6">
                                {booking.field.price.toLocaleString()}{' '}
                                VND/h
                            </p>

                            <div className="mt-10 space-y-5">
                                <div>
                                    <p className="text-gray-500">
                                        Customer Name
                                    </p>

                                    <h3 className="text-2xl font-bold mt-1">
                                        {
                                            booking.customerName
                                        }
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Phone Number
                                    </p>

                                    <h3 className="text-2xl font-bold mt-1">
                                        {
                                            booking.phoneNumber
                                        }
                                    </h3>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Booking Time
                                    </p>

                                    <h3 className="text-2xl font-bold mt-1">
                                        {new Date(
                                            booking.startTime,
                                        ).toLocaleString()}
                                    </h3>
                                </div>
                            </div>

                            {booking.field
                                .description && (
                                    <div className="mt-10">
                                        <p className="text-gray-500 mb-3">
                                            Description
                                        </p>

                                        <p className="text-gray-700 leading-8 text-lg">
                                            {
                                                booking
                                                    .field
                                                    .description
                                            }
                                        </p>
                                    </div>
                                )}
                        </div>

                        {/* ACTION */}
                        <div className="flex gap-4 mt-10">
                            <Link
                                href="/my-bookings"
                                className="
                                    bg-black
                                    text-white
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                "
                            >
                                Back
                            </Link>

                            <Link
                                href={`/fields/${booking.field.id}`}
                                className="
                                    border
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                "
                            >
                                View Field
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}