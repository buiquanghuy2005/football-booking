'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface Owner {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;

    fields: {
        id: string;
        name: string;
    }[];
}

export default function AdminOwnersPage() {
    const router = useRouter();

    const [owners, setOwners] =
        useState<Owner[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [authorized, setAuthorized] =
        useState(false);

    useEffect(() => {
        const user = JSON.parse(
            localStorage.getItem('user') ||
            '{}',
        );

        if (
            user &&
            user.role === 'ADMIN'
        ) {
            setAuthorized(true);
            fetchOwners();
        } else {
            alert('Access denied');
            router.replace('/');
        }
    }, [router]);

    const fetchOwners = async () => {
        try {
            setLoading(true);

            const res =
                await api.get(
                    '/admin/owners',
                );

            setOwners(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const toggleOwner = async (
        id: string,
    ) => {
        try {
            await api.patch(
                `/admin/owners/${id}/toggle`,
            );

            fetchOwners();
        } catch (error) {
            console.log(error);

            alert('Update failed');
        }
    };
    if (!authorized) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="mb-10">
                <h1 className="text-5xl font-black">
                    Manage Owners
                </h1>

                <p className="text-gray-500 mt-3">
                    View all football field
                    owners
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-xl font-bold">
                        Loading...
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-5">
                                    Email
                                </th>
                                <th className="text-left p-5">
                                    Status
                                </th>
                                <th className="text-left p-5">
                                    Fields
                                </th>

                                <th className="text-left p-5">
                                    Created
                                </th>

                                <th className="text-left p-5">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {owners.map(
                                (owner) => (
                                    <tr
                                        key={
                                            owner.id
                                        }
                                        className="border-t"
                                    >
                                        <td className="p-5">
                                            {
                                                owner.email
                                            }
                                        </td>

                                        <td className="p-5 font-bold">
                                            {owner.fields.length}
                                        </td>

                                        <td className="p-5">
                                            {owner.isActive ? (
                                                <span className="text-green-600 font-bold">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="text-red-500 font-bold">
                                                    Disabled
                                                </span>
                                            )}
                                        </td>

                                        <td className="p-5">
                                            {new Date(
                                                owner.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-5">
                                            <button
                                                onClick={() =>
                                                    toggleOwner(owner.id)
                                                }
                                                className={`
            px-4
            py-2
            rounded-xl
            text-white
            font-semibold
            ${owner.isActive
                                                        ? 'bg-red-500'
                                                        : 'bg-green-600'
                                                    }
        `}
                                            >
                                                {owner.isActive
                                                    ? 'Disable'
                                                    : 'Enable'}
                                            </button>
                                        </td>
                                    </tr>
                                ),
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}