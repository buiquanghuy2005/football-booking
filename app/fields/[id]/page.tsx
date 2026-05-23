'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { api } from '@/lib/api';

interface Field {
    id: string;
    name: string;
    address: string;
    price: number;
    description: string;
    imageUrl?: string;
}

interface Booking {
    id: string;
    startTime: string;
    endTime: string;
    status: string;
}

export default function FieldDetailPage() {
    const params = useParams();

    const [field, setField] =
        useState<Field | null>(null);

    const [bookings, setBookings] =
        useState<Booking[]>([]);

    const [selectedDate, setSelectedDate] =
        useState('');

    const [selectedSlot, setSelectedSlot] =
        useState<string | null>(null);

    const [customerName, setCustomerName] =
        useState('');

    const [phoneNumber, setPhoneNumber] =
        useState('');

    const [showForm, setShowForm] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [user, setUser] =
        useState<any>(null);

    const slots = [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
    ];

    useEffect(() => {
        fetchData();

        const today =
            new Date()
                .toISOString()
                .split('T')[0];

        setSelectedDate(today);

        const storedUser =
            localStorage.getItem('user');

        if (storedUser) {
            setUser(
                JSON.parse(storedUser),
            );
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            const fieldRes =
                await api.get(
                    `/fields/${params.id}`,
                );

            setField(fieldRes.data);

            const bookingRes =
                await api.get(
                    `/bookings/field/${params.id}`,
                );

            setBookings(bookingRes.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const isBooked = (slot: string) => {
        return bookings.some((booking) => {
            if (
                booking.status ===
                'CANCELLED'
            ) {
                return false;
            }

            const bookingDate =
                new Date(
                    booking.startTime,
                );

            const date =
                bookingDate
                    .toISOString()
                    .split('T')[0];

            const hour =
                bookingDate
                    .getHours()
                    .toString()
                    .padStart(2, '0');

            return (
                date === selectedDate &&
                hour ===
                slot.split(':')[0]
            );
        });
    };

    const handleBooking = async () => {
        if (
            !selectedDate ||
            !selectedSlot
        ) {
            return;
        }

        if (
            !customerName ||
            !phoneNumber
        ) {
            alert(
                'Please enter your information',
            );

            return;
        }

        try {
            const start =
                new Date(
                    `${selectedDate}T${selectedSlot}:00`,
                );

            const end =
                new Date(start);

            end.setHours(
                start.getHours() + 1,
            );

            await api.post('/bookings', {
                fieldId: params.id,

                startTime:
                    start.toISOString(),

                endTime:
                    end.toISOString(),

                customerName,

                phoneNumber,
            });

            alert(
                'Booking created successfully',
            );

            setSelectedSlot(null);

            setCustomerName('');

            setPhoneNumber('');

            setShowForm(false);

            fetchData();
        } catch (error) {
            console.log(error);

            alert(
                'Booking failed',
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl font-black">
                Loading...
            </div>
        );
    }

    if (!field) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl font-black">
                Field not found
            </div>
        );
    }

    return (
        <div className="bg-[#f4f7fb] min-h-screen pb-20">
            {/* HERO */}
            <section className="relative h-[550px] overflow-hidden">
                <img
                    src={
                        field.imageUrl ||
                        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop'
                    }
                    alt={field.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute bottom-0 left-0 w-full p-10">
                    <div className="max-w-7xl mx-auto text-white">
                        <p className="text-green-400 font-bold mb-4 uppercase tracking-wider">
                            Premium Football Field
                        </p>

                        <h1 className="text-6xl font-black">
                            {field.name}
                        </h1>

                        <p className="mt-4 text-xl text-gray-200">
                            📍 {field.address}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl">
                                ⭐ 4.9 Rating
                            </div>

                            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl">
                                ⚽ Professional Field
                            </div>

                            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl">
                                🔥 Popular Choice
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 mt-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* LEFT */}
                    <div className="lg:col-span-2">
                        {/* DESCRIPTION */}
                        <div className="bg-white rounded-[32px] shadow-lg p-10">
                            <h2 className="text-4xl font-black text-gray-900 mb-8">
                                About This Field
                            </h2>

                            <p className="text-gray-600 leading-9 text-lg">
                                {field.description}
                            </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
                                <div className="bg-gray-100 rounded-2xl p-5 text-center">
                                    <p className="text-3xl mb-2">
                                        🚗
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        Parking
                                    </p>
                                </div>

                                <div className="bg-gray-100 rounded-2xl p-5 text-center">
                                    <p className="text-3xl mb-2">
                                        🚿
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        Shower
                                    </p>
                                </div>

                                <div className="bg-gray-100 rounded-2xl p-5 text-center">
                                    <p className="text-3xl mb-2">
                                        💡
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        Lighting
                                    </p>
                                </div>

                                <div className="bg-gray-100 rounded-2xl p-5 text-center">
                                    <p className="text-3xl mb-2">
                                        🥤
                                    </p>

                                    <p className="font-semibold text-gray-800">
                                        Drinks
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SLOTS */}
                        <div className="bg-white rounded-[32px] shadow-lg p-10 mt-10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
                                <div>
                                    <p className="text-green-600 font-bold mb-2 uppercase">
                                        Booking
                                    </p>

                                    <h2 className="text-4xl font-black text-gray-900">
                                        Available Slots
                                    </h2>
                                </div>

                                <input
                                    type="date"
                                    value={
                                        selectedDate
                                    }
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split(
                                                'T',
                                            )[0]
                                    }
                                    onChange={(e) => {
                                        setSelectedDate(
                                            e.target
                                                .value,
                                        );

                                        setSelectedSlot(
                                            null,
                                        );
                                    }}
                                    className="
                                        border
                                        border-gray-300
                                        p-4
                                        rounded-2xl
                                        text-lg
                                        text-gray-900
                                    "
                                />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                {slots.map(
                                    (slot) => {
                                        const booked =
                                            isBooked(
                                                slot,
                                            );

                                        return (
                                            <button
                                                key={
                                                    slot
                                                }
                                                disabled={
                                                    booked ||
                                                    user?.role !==
                                                    'USER'
                                                }
                                                onClick={() => {
                                                    setSelectedSlot(
                                                        slot,
                                                    );

                                                    setShowForm(
                                                        false,
                                                    );
                                                }}
                                                className={`
                                                    rounded-3xl
                                                    p-6
                                                    border-2
                                                    transition
                                                    duration-300
                                                    text-left

                                                    ${booked
                                                        ? 'bg-red-50 border-red-200 text-red-500 cursor-not-allowed'
                                                        : selectedSlot ===
                                                            slot
                                                            ? 'bg-black border-black text-white scale-105'
                                                            : user?.role !==
                                                                'USER'
                                                                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                                                : 'bg-white hover:border-black hover:scale-105'
                                                    }
                                                `}
                                            >
                                                <p className="text-2xl font-black">
                                                    {
                                                        slot
                                                    }
                                                </p>

                                                <p className="mt-2 text-sm">
                                                    {booked
                                                        ? 'Already booked'
                                                        : user?.role !==
                                                            'USER'
                                                            ? 'Only users can book'
                                                            : 'Available now'}
                                                </p>
                                            </button>
                                        );
                                    },
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <div className="sticky top-28 bg-white rounded-[32px] shadow-2xl p-8">
                            <p className="text-green-600 font-bold mb-2 uppercase">
                                Booking Summary
                            </p>

                            <h2 className="text-4xl font-black text-gray-900">
                                {field.price.toLocaleString()}
                            </h2>

                            <p className="text-gray-500 mb-8">
                                VND / hour
                            </p>

                            <div className="space-y-6 border-t border-b py-8">
                                <div>
                                    <p className="text-gray-500">
                                        Selected Date
                                    </p>

                                    <p className="font-bold text-lg mt-1 text-gray-900">
                                        {selectedDate ||
                                            'Select date'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Selected Slot
                                    </p>

                                    <p className="font-bold text-lg mt-1 text-gray-900">
                                        {selectedSlot ||
                                            'Select slot'}
                                    </p>
                                </div>
                            </div>

                            {user?.role ===
                                'USER' &&
                                selectedSlot && (
                                    <button
                                        onClick={() =>
                                            setShowForm(
                                                true,
                                            )
                                        }
                                        className="
                                            w-full
                                            mt-8
                                            bg-black
                                            text-white
                                            py-5
                                            rounded-2xl
                                            text-lg
                                            font-bold
                                            hover:bg-gray-800
                                            transition
                                        "
                                    >
                                        Continue Booking
                                    </button>
                                )}

                            {user?.role !==
                                'USER' && (
                                    <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                                        <p className="text-yellow-700 font-semibold leading-7">
                                            Only USER accounts can book football fields.
                                        </p>
                                    </div>
                                )}

                            {showForm && (
                                <div className="mt-8">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={
                                            customerName
                                        }
                                        onChange={(
                                            e,
                                        ) =>
                                            setCustomerName(
                                                e
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            p-4
                                            rounded-2xl
                                            mb-4
                                            text-gray-900
                                        "
                                    />

                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        value={
                                            phoneNumber
                                        }
                                        onChange={(
                                            e,
                                        ) =>
                                            setPhoneNumber(
                                                e
                                                    .target
                                                    .value,
                                            )
                                        }
                                        className="
                                            w-full
                                            border
                                            border-gray-300
                                            p-4
                                            rounded-2xl
                                            mb-5
                                            text-gray-900
                                        "
                                    />

                                    <button
                                        onClick={
                                            handleBooking
                                        }
                                        className="
                                            w-full
                                            bg-green-600
                                            hover:bg-green-700
                                            text-white
                                            py-5
                                            rounded-2xl
                                            font-bold
                                            text-lg
                                            transition
                                        "
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            )}

                            <div className="mt-8 text-sm text-gray-500 leading-7">
                                ✔ Instant booking confirmation
                                <br />
                                ✔ No hidden fees
                                <br />
                                ✔ Secure reservation
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}