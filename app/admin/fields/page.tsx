'use client';

import { useEffect, useState } from 'react';

import {
    Pencil,
    Trash2,
    MapPin,
} from 'lucide-react';

import { api } from '@/lib/api';

interface Field {
    id: string;

    name: string;

    address: string;

    price: number;

    description?: string;

    imageUrl?: string;
}

export default function AdminFieldsPage() {
    const [fields, setFields] =
        useState<Field[]>([]);

    const [filteredFields, setFilteredFields] =
        useState<Field[]>([]);

    const [search, setSearch] =
        useState('');

    const [location, setLocation] =
        useState('');

    const [maxPrice, setMaxPrice] =
        useState('');

    const [editingField, setEditingField] =
        useState<Field | null>(null);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const [image, setImage] =
        useState<File | null>(null);

    const [name, setName] =
        useState('');

    const [address, setAddress] =
        useState('');

    const [price, setPrice] =
        useState('');

    const [description, setDescription] =
        useState('');

    useEffect(() => {
        fetchFields();
    }, []);

    useEffect(() => {
        filterFields();
    }, [
        search,
        location,
        maxPrice,
        fields,
    ]);

    const fetchFields = async () => {
        try {
            const res =
                await api.get(
                    '/fields/admin',
                );

            setFields(res.data);

            setFilteredFields(
                res.data,
            );
        } catch (error) {
            console.log(error);
        }
    };

    const filterFields = () => {
        let data = [...fields];

        if (search) {
            data = data.filter(
                (field) =>
                    field.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase(),
                        ),
            );
        }

        if (location) {
            data = data.filter(
                (field) =>
                    field.address
                        .toLowerCase()
                        .includes(
                            location.toLowerCase(),
                        ),
            );
        }

        if (maxPrice) {
            data = data.filter(
                (field) =>
                    field.price <=
                    Number(maxPrice),
            );
        }

        setFilteredFields(data);
    };

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
    };

    const handleCreate = async () => {
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

            await api.post(
                '/fields',
                formData,
                {
                    headers: {
                        'Content-Type':
                            'multipart/form-data',
                    },
                },
            );

            alert('Created');

            setShowCreateModal(false);

            fetchFields();
        } catch (error) {
            console.log(error);

            alert('Create failed');
        }
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

            alert('Updated');

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

            alert('Deleted');

            fetchFields();
        } catch (error) {
            console.log(error);

            alert('Delete failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-5xl font-black">
                        Admin Fields
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Manage all football fields
                    </p>
                </div>

                <button
                    onClick={() =>
                        setShowCreateModal(
                            true,
                        )
                    }
                    className="
                        bg-black
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        font-bold
                    "
                >
                    Add Field
                </button>
            </div>

            {/* FILTER */}
            <div className="bg-white p-6 rounded-3xl shadow mb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value,
                            )
                        }
                        className="border p-4 rounded-2xl"
                    />

                    <input
                        type="text"
                        placeholder="Filter by location"
                        value={location}
                        onChange={(e) =>
                            setLocation(
                                e.target.value,
                            )
                        }
                        className="border p-4 rounded-2xl"
                    />

                    <input
                        type="number"
                        placeholder="Max price"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(
                                e.target.value,
                            )
                        }
                        className="border p-4 rounded-2xl"
                    />
                </div>
            </div>

            {/* FIELD LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredFields.map(
                    (field) => (
                        <div
                            key={field.id}
                            className="bg-white rounded-3xl overflow-hidden shadow"
                        >
                            <img
                                src={
                                    field.imageUrl ||
                                    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop'
                                }
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-8">
                                <h2 className="text-3xl font-black">
                                    {field.name}
                                </h2>

                                <div className="flex items-center gap-2 mt-4 text-gray-600">
                                    <MapPin size={18} />

                                    <span>
                                        {
                                            field.address
                                        }
                                    </span>
                                </div>

                                <p className="mt-5 text-3xl font-black text-green-600">
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
                                        className="flex items-center gap-2 border px-5 py-3 rounded-2xl"
                                    >
                                        <Pencil size={18} />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                field.id,
                                            )
                                        }
                                        className="flex items-center gap-2 border border-red-300 text-red-500 px-5 py-3 rounded-2xl"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ),
                )}
            </div>

            {/* EDIT MODAL */}
            {editingField && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded-3xl w-full max-w-2xl">
                        <h2 className="text-4xl font-black mb-8">
                            Edit Field
                        </h2>

                        <div className="space-y-5">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                                placeholder="Field name"
                            />

                            <input
                                type="text"
                                value={address}
                                onChange={(e) =>
                                    setAddress(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                                placeholder="Address"
                            />

                            <input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                                placeholder="Price"
                            />

                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(
                                        e.target
                                            .files?.[0] ||
                                        null,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                            />

                            <textarea
                                value={
                                    description
                                }
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl h-40"
                                placeholder="Description"
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={
                                        handleUpdate
                                    }
                                    className="flex-1 bg-black text-white py-4 rounded-2xl font-bold"
                                >
                                    Save
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingField(
                                            null,
                                        )
                                    }
                                    className="flex-1 border py-4 rounded-2xl font-bold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded-3xl w-full max-w-2xl">
                        <h2 className="text-4xl font-black mb-8">
                            Create Field
                        </h2>

                        <div className="space-y-5">
                            <input
                                type="text"
                                placeholder="Field name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                            />

                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) =>
                                    setAddress(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                            />

                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                            />

                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl h-40"
                            />

                            <input
                                type="file"
                                onChange={(e) =>
                                    setImage(
                                        e.target
                                            .files?.[0] ||
                                        null,
                                    )
                                }
                                className="w-full border p-4 rounded-2xl"
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={
                                        handleCreate
                                    }
                                    className="flex-1 bg-black text-white py-4 rounded-2xl font-bold"
                                >
                                    Create
                                </button>

                                <button
                                    onClick={() =>
                                        setShowCreateModal(
                                            false,
                                        )
                                    }
                                    className="flex-1 border py-4 rounded-2xl font-bold"
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