'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-5xl font-black mb-10">
                Admin Dashboard
            </h1>

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
                        Accept or cancel bookings
                    </p>
                </Link>
            </div>
        </div>
    );
}