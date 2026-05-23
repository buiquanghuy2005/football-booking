'use client';

import { useState } from 'react';

import { api } from '@/lib/api';

import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
    const setToken =
        useAuthStore((state) => state.setToken);

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState('');

    const handleLogin = async () => {
        try {
            setLoading(true);

            setError('');

            const res = await api.post(
                '/auth/login',
                {
                    email,
                    password,
                },
            );

            // TOKEN
            const token =
                res.data.access_token;

            // USER
            const user =
                res.data.user;

            // SAVE TOKEN
            setToken(token);

            localStorage.setItem(
                'token',
                token,
            );

            // SAVE USER
            localStorage.setItem(
                'user',
                JSON.stringify(user),
            );

            // SAVE COOKIE
            document.cookie =
                `token=${token}; path=/`;

            // FORCE FULL RELOAD
            if (user.role === 'ADMIN') {
                window.location.href =
                    '/admin';
            } else if (
                user.role === 'OWNER'
            ) {
                window.location.href =
                    '/owner';
            } else {
                window.location.href =
                    '/my-bookings';
            }

        } catch (err: any) {
            setError(
                err.response?.data
                    ?.message ||
                'Login failed',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-[400px]">
                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value,
                            )
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value,
                            )
                        }
                    />

                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-black text-white p-3 rounded-lg"
                    >
                        {loading
                            ? 'Loading...'
                            : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}