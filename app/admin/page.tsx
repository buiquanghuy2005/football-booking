'use client';

import Link from 'next/link';

import {
    useEffect,
    useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export default function AdminDashboard() {
    const router = useRouter();

    const [authorized, setAuthorized] =
        useState(false);

    const [stats, setStats] =
        useState({
            users: 0,
            owners: 0,
            fields: 0,
            bookings: 0,
        });

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

            fetchStats();
        } else {
            alert('Access denied');

            router.replace('/');
        }
    }, [router]);

    const fetchStats = async () => {
        try {
            const res =
                await api.get(
                    '/admin/stats',
                );

            setStats(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!authorized) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-5xl font-black mb-10">
                Admin Dashboard
            </h1>

            {/* STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-3xl shadow">
                    <p className="text-gray-500">
                        Users
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                        {stats.users}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow">
                    <p className="text-gray-500">
                        Owners
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                        {stats.owners}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow">
                    <p className="text-gray-500">
                        Fields
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                        {stats.fields}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow">
                    <p className="text-gray-500">
                        Bookings
                    </p>

                    <h2 className="text-4xl font-black mt-2">
                        {stats.bookings}
                    </h2>
                </div>
            </div>

            {/* MENU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                    href="/admin/fields"
                    className="
                        bg-white
                        p-10
                        rounded-3xl
                        shadow
                        hover:scale-105
                        transition
                    "
                >
                    <h2 className="text-3xl font-black">
                        Manage Fields
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Manage all football fields
                    </p>
                </Link>

                <Link
                    href="/admin/bookings"
                    className="
                        bg-white
                        p-10
                        rounded-3xl
                        shadow
                        hover:scale-105
                        transition
                    "
                >
                    <h2 className="text-3xl font-black">
                        Manage Bookings
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Manage all bookings
                    </p>
                </Link>

                <Link
                    href="/admin/users"
                    className="
                        bg-white
                        p-10
                        rounded-3xl
                        shadow
                        hover:scale-105
                        transition
                    "
                >
                    <h2 className="text-3xl font-black">
                        Manage Users
                    </h2>

                    <p className="mt-4 text-gray-500">
                        View, lock and delete users
                    </p>
                </Link>

                <Link
                    href="/admin/owners"
                    className="
                        bg-white
                        p-10
                        rounded-3xl
                        shadow
                        hover:scale-105
                        transition
                    "
                >
                    <h2 className="text-3xl font-black">
                        Manage Owners
                    </h2>

                    <p className="mt-4 text-gray-500">
                        View all field owners
                    </p>
                </Link>
            </div>
        </div>
    );
}