'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export default function CreateFieldPage() {
    const router = useRouter();

    const [name, setName] =
        useState('');

    const [address, setAddress] =
        useState('');

    const [price, setPrice] =
        useState('');

    const [description, setDescription] =
        useState('');

    // ⭐ FILE
    const [image, setImage] =
        useState<File | null>(null);

    // ⭐ PREVIEW
    const [preview, setPreview] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const createField = async () => {
        try {
            setLoading(true);

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

            // ⭐ IMAGE FILE
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

            router.push('/owner');
        } catch (error) {
            console.log(error);

            alert(
                'Create field failed',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl">
                <h1 className="text-4xl font-bold mb-8">
                    Create Football Field
                </h1>

                <div className="space-y-5">
                    {/* NAME */}
                    <input
                        type="text"
                        placeholder="Field Name"
                        className="w-full border p-4 rounded-2xl"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value,
                            )
                        }
                    />

                    {/* ADDRESS */}
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full border p-4 rounded-2xl"
                        value={address}
                        onChange={(e) =>
                            setAddress(
                                e.target.value,
                            )
                        }
                    />

                    {/* PRICE */}
                    <input
                        type="number"
                        placeholder="Price Per Hour"
                        className="w-full border p-4 rounded-2xl"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value,
                            )
                        }
                    />

                    {/* DESCRIPTION */}
                    <textarea
                        placeholder="Description"
                        className="w-full border p-4 rounded-2xl h-36"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value,
                            )
                        }
                    />

                    {/* IMAGE */}
                    <div>
                        <label className="block text-lg font-semibold mb-3">
                            Upload Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file =
                                    e.target
                                        .files?.[0];

                                if (file) {
                                    setImage(
                                        file,
                                    );

                                    setPreview(
                                        URL.createObjectURL(
                                            file,
                                        ),
                                    );
                                }
                            }}
                            className="w-full"
                        />
                    </div>

                    {/* PREVIEW */}
                    {preview && (
                        <div>
                            <img
                                src={preview}
                                alt="preview"
                                className="
                                    w-full
                                    h-[300px]
                                    object-cover
                                    rounded-2xl
                                    border
                                "
                            />
                        </div>
                    )}

                    {/* BUTTON */}
                    <button
                        onClick={
                            createField
                        }
                        disabled={loading}
                        className="
                            w-full
                            bg-black
                            text-white
                            py-4
                            rounded-2xl
                            text-lg
                            font-semibold
                            hover:opacity-90
                            transition
                        "
                    >
                        {loading
                            ? 'Creating...'
                            : 'Create Field'}
                    </button>
                </div>
            </div>
        </div>
    );
}