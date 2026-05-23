'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

interface Booking {
    id: string;

    startTime: string;

    endTime: string;

    status: string;

    field: {
        name: string;
        address: string;
        price: number;
    };
}

export default function MyBookingsPage() {
    const [bookings, setBookings] =
        useState<Booking[]>([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await api.get(
                '/bookings/me',
            );

            setBookings(
                Array.isArray(res.data)
                    ? res.data
                    : [],
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                My Bookings
            </h1>

            <div className="space-y-6">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        className="border rounded-xl p-6 shadow"
                    >
                        <h2 className="text-2xl font-bold">
                            {booking.field.name}
                        </h2>

                        <p className="mt-2">
                            📍{' '}
                            {booking.field.address}
                        </p>

                        <p className="mt-2">
                            💰 {booking.field.price} VND
                        </p>

                        <p className="mt-4">
                            ⏰ Start:{' '}
                            {new Date(
                                booking.startTime,
                            ).toLocaleString()}
                        </p>

                        <p className="mt-2">
                            ⏰ End:{' '}
                            {new Date(
                                booking.endTime,
                            ).toLocaleString()}
                        </p>

                        <p className="mt-4 font-bold">
                            Status:{' '}
                            {booking.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}