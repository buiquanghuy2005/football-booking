'use client';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import { Search, MapPin } from 'lucide-react';

import { api } from '@/lib/api';

interface Field {
    id: string;
    name: string;
    address: string;
    price: number;
    description: string;
    imageUrl?: string;
}

export default function FieldsPage() {
    const [fields, setFields] =
        useState<Field[]>([]);

    const [search, setSearch] =
        useState('');

    const [location, setLocation] =
        useState('');

    const [maxPrice, setMaxPrice] =
        useState('');

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        try {
            setLoading(true);

            const res =
                await api.get('/fields');

            setFields(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredFields = useMemo(() => {
        return fields.filter((field) => {
            const matchSearch =
                field.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase(),
                    );

            const matchLocation =
                field.address
                    .toLowerCase()
                    .includes(
                        location.toLowerCase(),
                    );

            const matchPrice =
                maxPrice === ''
                    ? true
                    : field.price <=
                    Number(maxPrice);

            return (
                matchSearch &&
                matchLocation &&
                matchPrice
            );
        });
    }, [
        fields,
        search,
        location,
        maxPrice,
    ]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* HERO */}
            <section className="relative h-[420px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <p className="text-green-400 font-bold uppercase tracking-wider">
                            Football Booking
                        </p>

                        <h1 className="text-6xl font-black text-white mt-5 max-w-3xl leading-tight">
                            Find Your Perfect Football Field
                        </h1>

                        <p className="text-gray-200 text-xl mt-6 max-w-2xl">
                            Search football fields by name,
                            location and price.
                        </p>
                    </div>
                </div>
            </section>

            {/* FILTER */}
            <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
                <div className="bg-white rounded-[32px] shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* SEARCH */}
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-4 text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search field..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value,
                                )
                            }
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-2xl
                                py-4
                                pl-12
                                pr-4
                                outline-none
                                focus:border-black
                            "
                        />
                    </div>

                    {/* LOCATION */}
                    <div className="relative">
                        <MapPin
                            className="absolute left-4 top-4 text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Location..."
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target.value,
                                )
                            }
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-2xl
                                py-4
                                pl-12
                                pr-4
                                outline-none
                                focus:border-black
                            "
                        />
                    </div>

                    {/* PRICE */}
                    <input
                        type="number"
                        placeholder="Max price..."
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(
                                e.target.value,
                            )
                        }
                        className="
                            border
                            border-gray-200
                            rounded-2xl
                            py-4
                            px-4
                            outline-none
                            focus:border-black
                        "
                    />
                </div>
            </section>

            {/* LIST */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="text-green-600 font-bold uppercase">
                            Available Fields
                        </p>

                        <h2 className="text-5xl font-black mt-2">
                            Football Fields
                        </h2>
                    </div>

                    <div className="text-gray-500 font-semibold">
                        {filteredFields.length} fields found
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-3xl font-black">
                        Loading...
                    </div>
                ) : filteredFields.length ===
                    0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center shadow">
                        <h3 className="text-3xl font-black">
                            No fields found
                        </h3>

                        <p className="text-gray-500 mt-4">
                            Try changing your filters.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFields.map(
                            (field) => (
                                <div
                                    key={field.id}
                                    className="
                                        bg-white
                                        rounded-[28px]
                                        overflow-hidden
                                        shadow-sm
                                        border
                                        border-gray-100
                                        hover:shadow-2xl
                                        transition
                                    "
                                >
                                    <img
                                        src={
                                            field.imageUrl ||
                                            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
                                        }
                                        alt={
                                            field.name
                                        }
                                        className="w-full h-60 object-cover"
                                    />

                                    <div className="p-7">
                                        <h2 className="text-3xl font-black">
                                            {
                                                field.name
                                            }
                                        </h2>

                                        <p className="text-gray-600 mt-3 flex items-center gap-2">
                                            <MapPin
                                                size={
                                                    18
                                                }
                                            />
                                            {
                                                field.address
                                            }
                                        </p>

                                        <p className="mt-5 text-gray-600 line-clamp-3 leading-7">
                                            {
                                                field.description
                                            }
                                        </p>

                                        <div className="mt-8 flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-500 text-sm">
                                                    Price
                                                </p>

                                                <p className="text-2xl font-black text-green-600">
                                                    {field.price.toLocaleString()}{' '}
                                                    VND/h
                                                </p>
                                            </div>

                                            <Link
                                                href={`/fields/${field.id}`}
                                                className="
                                                    bg-black
                                                    hover:bg-gray-800
                                                    text-white
                                                    px-6
                                                    py-3
                                                    rounded-2xl
                                                    font-bold
                                                    transition
                                                "
                                            >
                                                Book
                                            </Link>
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