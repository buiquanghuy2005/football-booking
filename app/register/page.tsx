'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/auth/register', {
                email,
                password,
            });

            alert('Register success');

            router.push('/login');
        } catch (error) {
            console.log(error);

            alert('Register failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[400px] border rounded-2xl p-8 shadow">
                <h1 className="text-3xl font-bold mb-6">
                    Register
                </h1>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-3 rounded-lg"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        onClick={handleRegister}
                        className="w-full bg-black text-white py-3 rounded-lg"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}