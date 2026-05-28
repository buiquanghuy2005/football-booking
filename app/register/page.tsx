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

    const [loading, setLoading] =
        useState(false);

    const handleRegister =
        async () => {
            // ⭐ check confirm password
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

                await api.post(
                    '/auth/register',
                    {
                        email,
                        password,
                    },
                );

                alert(
                    'Register success',
                );

                router.push('/login');
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