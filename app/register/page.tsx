'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { api } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState('');

    // ⭐ ROLE
    const [role, setRole] =
        useState('USER');

    const [loading, setLoading] =
        useState(false);

    const handleRegister =
        async () => {
            // ⭐ confirm password
            if (
                password !==
                confirmPassword
            ) {
                alert(
                    'Passwords do not match',
                );

                return;
            }

            try {
                setLoading(true);

                // ⭐ register
                await api.post(
                    '/auth/register',
                    {
                        email,
                        password,
                        role,
                    },
                );

                // ⭐ auto login
                const loginRes =
                    await api.post(
                        '/auth/login',
                        {
                            email,
                            password,
                        },
                    );

                // ⭐ save token
                localStorage.setItem(
                    'token',
                    loginRes.data
                        .access_token,
                );

                localStorage.setItem(
                    'user',
                    JSON.stringify(
                        loginRes.data
                            .user,
                    ),
                );

                alert(
                    'Register success',
                );

                // ⭐ redirect by role
                if (
                    loginRes.data.user
                        .role === 'OWNER'
                ) {
                    window.location.href =
                        '/owner';
                } else {
                    window.location.href =
                        '/my-bookings';
                }
            } catch (error: any) {
                console.log(error);

                alert(
                    error?.response
                        ?.data
                        ?.message ||
                    'Register failed',
                );
            } finally {
                setLoading(false);
            }
        };

    return (
        <div
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-gray-100
                p-6
            "
        >
            <div
                className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-10
                "
            >
                <h1
                    className="
                        text-4xl
                        font-black
                        mb-8
                        text-center
                    "
                >
                    Register
                </h1>

                <div className="space-y-5">
                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="
                            w-full
                            border
                            p-4
                            rounded-2xl
                            outline-none
                            focus:border-black
                        "
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target
                                    .value,
                            )
                        }
                    />

                    {/* PASSWORD */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="
                            w-full
                            border
                            p-4
                            rounded-2xl
                            outline-none
                            focus:border-black
                        "
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target
                                    .value,
                            )
                        }
                    />

                    {/* CONFIRM PASSWORD */}
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="
                            w-full
                            border
                            p-4
                            rounded-2xl
                            outline-none
                            focus:border-black
                        "
                        value={
                            confirmPassword
                        }
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target
                                    .value,
                            )
                        }
                    />

                    {/* ROLE */}
                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value,
                            )
                        }
                        className="
                            w-full
                            border
                            p-4
                            rounded-2xl
                            outline-none
                            focus:border-black
                        "
                    >
                        <option value="USER">
                            User
                        </option>

                        <option value="OWNER">
                            Owner
                        </option>
                    </select>

                    {/* BUTTON */}
                    <button
                        onClick={
                            handleRegister
                        }
                        disabled={loading}
                        className="
                            w-full
                            bg-black
                            text-white
                            py-4
                            rounded-2xl
                            font-bold
                            hover:opacity-90
                            transition
                            disabled:opacity-50
                        "
                    >
                        {loading
                            ? 'Loading...'
                            : 'Register'}
                    </button>
                </div>

                {/* LOGIN */}
                <p className="text-center text-gray-500 mt-6">
                    Already have an
                    account?
                </p>

                <button
                    onClick={() =>
                        router.push(
                            '/login',
                        )
                    }
                    className="
                        w-full
                        mt-3
                        border
                        py-4
                        rounded-2xl
                        font-semibold
                    "
                >
                    Login
                </button>
            </div>
        </div>
    );
}