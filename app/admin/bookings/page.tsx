'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

interface Booking {
    id: string;

    customerName: string;

    phoneNumber: string;

    startTime: string;

    status: string;

    field: {
        name: string;

        address: string;
    };

    user: {
        email: string;
    };
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] =
        useState<Booking[]>([]);

    const [filteredBookings, setFilteredBookings] =
        useState<Booking[]>([]);

    const [search, setSearch] =
        useState('');

    const [statusFilter, setStatusFilter] =
        useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [
        search,
        statusFilter,
        bookings,
    ]);

    const fetchBookings = async () => {
        try {
            const res =
                await api.get(
                    '/bookings/admin',
                );

            setBookings(res.data);

            setFilteredBookings(
                res.data,
            );
        } catch (error) {
            console.log(error);
        }
    };

    const filterBookings = () => {
        let data = [...bookings];

        if (search) {
            data = data.filter(
                (booking) =>
                    booking.customerName
                        .toLowerCase()
                        .includes(
                            search.toLowerCase(),
                        ) ||
                    booking.field.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase(),
                        ),
            );
        }

        if (statusFilter) {
            data = data.filter(
                (booking) =>
                    booking.status ===
                    statusFilter,
            );
        }

        setFilteredBookings(data);
    };

    const confirmBooking = async (
        id: string,
    ) => {
        try {
            await api.post(
                `/bookings/confirm/${id}`,
            );

            fetchBookings();
        } catch (error) {
            console.log(error);

            alert('Accept failed');
        }
    };

    const cancelBooking = async (
        id: string,
    ) => {
        try {
            await api.post(
                `/bookings/cancel/${id}`,
            );

            fetchBookings();
        } catch (error) {
            console.log(error);

            alert('Cancel failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="mb-10">
                <h1 className="text-5xl font-black">
                    Admin Bookings
                </h1>

                <p className="text-gray-500 mt-3">
                    Manage all bookings
                </p>
            </div>

            {/* FILTER */}
            <div className="bg-white p-6 rounded-3xl shadow mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                        type="text"
                        placeholder="Search booking"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value,
                            )
                        }
                        className="border p-4 rounded-2xl"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value,
                            )
                        }
                        className="border p-4 rounded-2xl"
                    >
                        <option value="">
                            All Status
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="CONFIRMED">
                            Confirmed
                        </option>

                        <option value="CANCELLED">
                            Cancelled
                        </option>
                    </select>
                </div>
            </div>

            {/* BOOKING LIST */}
            <div className="space-y-6">
                {filteredBookings.map(
                    (booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-3xl shadow p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                        >
                            <div>
                                <h2 className="text-3xl font-black">
                                    {
                                        booking
                                            .field
                                            .name
                                    }
                                </h2>

                                <p className="text-gray-600 mt-3">
                                    Customer:{' '}
                                    {
                                        booking.customerName
                                    }
                                </p>

                                <p className="text-gray-600">
                                    Phone:{' '}
                                    {
                                        booking.phoneNumber
                                    }
                                </p>

                                <p className="text-gray-600">
                                    User:{' '}
                                    {
                                        booking
                                            .user
                                            .email
                                    }
                                </p>

                                <p className="text-gray-600">
                                    Address:{' '}
                                    {
                                        booking
                                            .field
                                            .address
                                    }
                                </p>

                                <p className="text-gray-600">
                                    Time:{' '}
                                    {new Date(
                                        booking.startTime,
                                    ).toLocaleString()}
                                </p>

                                <p className="mt-3">
                                    Status:{' '}
                                    <span
                                        className={`
                                            font-bold

                                            ${booking.status ===
                                                'CONFIRMED'
                                                ? 'text-green-600'
                                                : booking.status ===
                                                    'CANCELLED'
                                                    ? 'text-red-500'
                                                    : 'text-yellow-600'
                                            }
                                        `}
                                    >
                                        {
                                            booking.status
                                        }
                                    </span>
                                </p>
                            </div>

                            <div className="flex gap-4">
                                {booking.status ===
                                    'PENDING' && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    confirmBooking(
                                                        booking.id,
                                                    )
                                                }
                                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold"
                                            >
                                                Accept
                                            </button>

                                            <button
                                                onClick={() =>
                                                    cancelBooking(
                                                        booking.id,
                                                    )
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                {booking.status ===
                                    'CONFIRMED' && (
                                        <div className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-bold">
                                            Accepted
                                        </div>
                                    )}

                                {booking.status ===
                                    'CANCELLED' && (
                                        <div className="bg-red-100 text-red-600 px-6 py-3 rounded-2xl font-bold">
                                            Cancelled
                                        </div>
                                    )}
                            </div>
                        </div>
                    ),
                )}

                {filteredBookings.length ===
                    0 && (
                        <div className="bg-white rounded-3xl p-20 text-center text-gray-500 text-xl">
                            No bookings found
                        </div>
                    )}
            </div>
        </div>
    );
}