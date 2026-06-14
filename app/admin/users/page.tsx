'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

interface User {
    id: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
}

export default function AdminUsersPage() {
    const router = useRouter();

    const [users, setUsers] =
        useState<User[]>([]);

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

            fetchUsers();
        } else {
            alert('Access denied');

            router.replace('/');
        }
    }, [router]);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res =
                await api.get(
                    '/admin/users',
                );

            setUsers(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleUser = async (
        id: string,
    ) => {
        try {
            await api.patch(
                `/admin/users/${id}/toggle`,
            );

            fetchUsers();
        } catch (error) {
            console.log(error);

            alert(
                'Update failed',
            );
        }
    };

    if (!authorized) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="mb-10">
                <h1 className="text-5xl font-black">
                    Manage Users
                </h1>

                <p className="text-gray-500 mt-3">
                    View and manage user
                    accounts
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
                                    Role
                                </th>

                                <th className="text-left p-5">
                                    Status
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
                            {users.map(
                                (user) => (
                                    <tr
                                        key={
                                            user.id
                                        }
                                        className="border-t"
                                    >
                                        <td className="p-5">
                                            {
                                                user.email
                                            }
                                        </td>

                                        <td className="p-5">
                                            {
                                                user.role
                                            }
                                        </td>

                                        <td className="p-5">
                                            {user.isActive ? (
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
                                                user.createdAt,
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-5">
                                            <button
                                                onClick={() =>
                                                    toggleUser(
                                                        user.id,
                                                    )
                                                }
                                                className={`
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    text-white
                                                    font-semibold
                                                    ${user.isActive
                                                        ? 'bg-red-500'
                                                        : 'bg-green-600'
                                                    }
                                                `}
                                            >
                                                {user.isActive
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