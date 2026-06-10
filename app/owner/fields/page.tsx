'use client';

import { useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import {
    Pencil,
    Trash2,
    MapPin,
    Search,
    Plus,
    ImageIcon,
} from 'lucide-react';

import Link from 'next/link';

import { api } from '@/lib/api';

interface Field {
    id: string;

    name: string;

    address: string;

    price: number;

    description?: string;

    imageUrl?: string;
}

export default function OwnerFieldsPage() {
    const router = useRouter();

    const [authorized, setAuthorized] =
        useState(false);
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

    const [editingField, setEditingField] =
        useState<Field | null>(null);

    const [name, setName] =
        useState('');

    const [address, setAddress] =
        useState('');

    const [price, setPrice] =
        useState('');

    const [description, setDescription] =
        useState('');

    const [image, setImage] =
        useState<File | null>(null);

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem('user') ||
            '{}',
        );

        if (
            user &&
            (
                user.role === 'OWNER' ||
                user.role === 'ADMIN'
            )
        ) {
            setAuthorized(true);

            fetchFields();
        } else {
            alert('Access denied');

            router.replace('/');
        }
    }, [router]);

    const fetchFields = async () => {
        try {
            setLoading(true);

            const res =
                await api.get(
                    '/fields/owner',
                );

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

    const openEditModal = (
        field: Field,
    ) => {
        setEditingField(field);

        setName(field.name);

        setAddress(field.address);

        setPrice(
            field.price.toString(),
        );

        setDescription(
            field.description || '',
        );

        setImage(null);
    };

    const handleUpdate = async () => {
        try {
            const formData =
                new FormData();

            formData.append(
                'name',
                name,
            );

            formData.append(
                'address',
                address,
            );

            formData.append(
                'price',
                price,
            );

            formData.append(
                'description',
                description,
            );

            if (image) {
                formData.append(
                    'image',
                    image,
                );
            }

            await api.put(
                `/fields/${editingField?.id}`,
                formData,
                {
                    headers: {
                        'Content-Type':
                            'multipart/form-data',
                    },
                },
            );

            alert(
                'Field updated successfully',
            );

            setEditingField(null);

            fetchFields();
        } catch (error) {
            console.log(error);

            alert('Update failed');
        }
    };

    const handleDelete = async (
        id: string,
    ) => {
        const confirmDelete =
            confirm(
                'Delete this field?',
            );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `/fields/${id}`,
            );

            alert(
                'Field deleted successfully',
            );

            fetchFields();
        } catch (error) {
            console.log(error);

            alert('Delete failed');
        }
    };
    if (!authorized) {
        return null;
    }
    return (
        <div className="min-h-screen bg-gray-100">
            {/* HERO */}
            <section className="relative h-[350px] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="absolute inset-0 flex items-center">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <p className="text-green-400 font-bold uppercase">
                            Owner Panel
                        </p>

                        <h1 className="text-6xl font-black text-white mt-5">
                            Manage Your Fields
                        </h1>

                        <p className="text-gray-200 text-xl mt-6">
                            Add, edit and manage your
                            football fields professionally.
                        </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-10">
                    <div>
                        <p className="text-green-600 font-bold uppercase">
                            Management
                        </p>

                        <h2 className="text-5xl font-black mt-2">
                            My Football Fields
                        </h2>
                    </div>

                    <Link
                        href="/owner/create"
                        className="
                            bg-black
                            hover:bg-gray-800
                            text-white
                            px-8
                            py-4
                            rounded-2xl
                            font-bold
                            flex
                            items-center
                            gap-3
                            transition
                        "
                    >
                        <Plus size={22} />
                        Add Field
                    </Link>
                </div>

                {/* FILTER */}
                <div className="bg-white rounded-[32px] p-8 shadow mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="relative">
                            <Search
                                size={20}
                                className="absolute left-4 top-4 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search field..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target
                                            .value,
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    rounded-2xl
                                    py-4
                                    pl-12
                                    pr-4
                                "
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Location..."
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target
                                        .value,
                                )
                            }
                            className="
                                border
                                rounded-2xl
                                py-4
                                px-4
                            "
                        />

                        <input
                            type="number"
                            placeholder="Max price..."
                            value={maxPrice}
                            onChange={(e) =>
                                setMaxPrice(
                                    e.target
                                        .value,
                                )
                            }
                            className="
                                border
                                rounded-2xl
                                py-4
                                px-4
                            "
                        />
                    </div>
                </div>

                {/* LIST */}
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {filteredFields.map(
                            (field) => (
                                <div
                                    key={
                                        field.id
                                    }
                                    className="
                                        bg-white
                                        rounded-[32px]
                                        overflow-hidden
                                        shadow-sm
                                        border
                                        border-gray-100
                                    "
                                >
                                    <img
                                        src={
                                            field.imageUrl ||
                                            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
                                        }
                                        className="w-full h-72 object-cover"
                                    />

                                    <div className="p-8">
                                        <h2 className="text-3xl font-black">
                                            {
                                                field.name
                                            }
                                        </h2>

                                        <div className="flex items-center gap-2 mt-4 text-gray-600">
                                            <MapPin
                                                size={
                                                    18
                                                }
                                            />

                                            <span>
                                                {
                                                    field.address
                                                }
                                            </span>
                                        </div>

                                        <p className="mt-6 text-3xl font-black text-green-600">
                                            {field.price.toLocaleString()}{' '}
                                            VND
                                        </p>

                                        <div className="flex gap-4 mt-8">
                                            <button
                                                onClick={() =>
                                                    openEditModal(
                                                        field,
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    border
                                                    hover:bg-gray-100
                                                "
                                            >
                                                <Pencil
                                                    size={
                                                        18
                                                    }
                                                />
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        field.id,
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    border
                                                    border-red-300
                                                    text-red-500
                                                    hover:bg-red-50
                                                "
                                            >
                                                <Trash2
                                                    size={
                                                        18
                                                    }
                                                />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                )}
            </section>

            {/* EDIT MODAL */}
            {editingField && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-5">
                    <div className="bg-white w-full max-w-2xl rounded-[32px] p-10">
                        <h2 className="text-4xl font-black mb-8">
                            Edit Field
                        </h2>

                        <div className="space-y-5">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target
                                            .value,
                                    )
                                }
                                placeholder="Field name"
                                className="w-full border p-4 rounded-2xl"
                            />

                            <input
                                type="text"
                                value={address}
                                onChange={(e) =>
                                    setAddress(
                                        e.target
                                            .value,
                                    )
                                }
                                placeholder="Address"
                                className="w-full border p-4 rounded-2xl"
                            />

                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target
                                            .value,
                                    )
                                }
                                placeholder="Price"
                                className="w-full border p-4 rounded-2xl"
                            />

                            <textarea
                                value={
                                    description
                                }
                                onChange={(e) =>
                                    setDescription(
                                        e.target
                                            .value,
                                    )
                                }
                                placeholder="Description"
                                className="w-full border p-4 rounded-2xl h-40"
                            />

                            {/* IMAGE */}
                            <div>
                                <label className="font-bold flex items-center gap-2 mb-3">
                                    <ImageIcon
                                        size={18}
                                    />
                                    Field Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(
                                        e,
                                    ) => {
                                        if (
                                            e
                                                .target
                                                .files
                                        ) {
                                            setImage(
                                                e
                                                    .target
                                                    .files[0],
                                            );
                                        }
                                    }}
                                    className="w-full border p-4 rounded-2xl"
                                />
                            </div>

                            <div className="flex gap-4 pt-3">
                                <button
                                    onClick={
                                        handleUpdate
                                    }
                                    className="
                                        flex-1
                                        bg-black
                                        text-white
                                        py-4
                                        rounded-2xl
                                        font-bold
                                    "
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingField(
                                            null,
                                        )
                                    }
                                    className="
                                        flex-1
                                        border
                                        py-4
                                        rounded-2xl
                                        font-bold
                                    "
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}