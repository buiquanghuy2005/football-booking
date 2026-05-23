'use client';

import './globals.css';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem('user');

    if (storedUser) {
      setUser(
        JSON.parse(storedUser),
      );
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    router.push('/login');

    window.location.reload();
  };

  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <header className="bg-black text-white shadow">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-2xl"
            >
              Football Booking
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/"
                className={
                  pathname === '/'
                    ? 'text-green-400'
                    : ''
                }
              >
                Home
              </Link>

              <Link
                href="/fields"
                className={
                  pathname ===
                    '/fields'
                    ? 'text-green-400'
                    : ''
                }
              >
                Fields
              </Link>

              {user?.role ===
                'USER' && (
                  <Link href="/my-bookings">
                    My Bookings
                  </Link>
                )}

              {user?.role ===
                'OWNER' && (
                  <Link href="/owner">
                    Owner
                  </Link>
                )}

              {user?.role ===
                'ADMIN' && (
                  <Link href="/admin">
                    Admin
                  </Link>
                )}
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="bg-white text-black px-4 py-2 rounded"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-green-500 px-4 py-2 rounded"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span>
                    {user.email}
                  </span>

                  <button
                    onClick={logout}
                    className="bg-red-500 px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}