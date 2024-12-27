'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dashboard() {
    const [user, setUser] = useState(null); // State to store user data
    const router = useRouter();

    // Load user data from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push('/auth/Login');
        }
    }, [router]);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/auth/Login'); // Redirect to login page after logout
    };

    // Function to format numbers with thousand separator
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID').format(amount);
    };

    if (!user) {
        return <div>Loading...</div>; // Show loading while user data is being fetched
    }

    return (
        <div className="flex min-h-screen relative">
            {/* Background Grid Effect */}
            <div
                className="absolute inset-0 bg-white"
                style={{
                    backgroundImage: 'linear-gradient(90deg, #DFE5F2 1px, transparent 1px), linear-gradient(180deg, #DFE5F2 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            ></div>

            {/* Sidebar */}
            <div className="w-64 border-r-2 border-black bg-[#F3F4F6] p-4 z-10">
                <h2 className="text-xl font-bold text-[#333] mb-6">Dashboard</h2>
                <nav>
                    <ul>
                        <li><a href="#" className="block py-2 text-lg text-[#333] font-semibold hover:text-[#e84a5f]">Home</a></li>
                        <li><a href="#" className="block py-2 text-lg text-[#333] font-semibold hover:text-[#e84a5f]">Profile</a></li>
                        <li><a href="../Settings" className="block py-2 text-lg text-[#333] font-semibold hover:text-[#e84a5f]">Settings</a></li>
                        <li><a href="#" className="block py-2 text-lg text-[#333] font-semibold hover:text-[#e84a5f]">Help</a></li>
                        <li className="mt-6">
                            <button onClick={handleLogout} className="w-full py-2 bg-[#e84a5f] text-white font-semibold hover:bg-[#d42e46]">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 z-10">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-[#333]">Welcome, {user.nickName}!</h1>
                    <p className="text-lg text-[#666]">Here&apos;s your dashboard</p>
                </header>

                {/* User Data Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Game Money */}
                    <div className="bg-white p-4 border-2 border-[black] rounded-lg flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>

                        <div>
                            <h3 className="text-xl font-bold text-[#333]">Game Money</h3>
                            <p className="text-lg text-[#00B76A]">{formatCurrency(user.gameMoney)} Peso</p>
                        </div>
                    </div>

                    {/* Level */}
                    <div className="bg-white p-4 border-2 border-[black] rounded-lg flex items-center space-x-4">
                        <div>
                            <h3 className="text-xl font-bold text-[#333]">Level</h3>
                            <p className="text-xl text-gray-600">{user.userLevel}</p>
                        </div>
                    </div>

                    {/* Play Time */}
                    <div className="bg-white p-4 border-2 border-[black] rounded-lg flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div>
                            <h3 className="text-xl font-bold text-[#333]">Play Time</h3>
                            <p className="text-xl text-gray-600">{user.playTime} hours</p>
                        </div>
                    </div>

                    {/* Real Cash */}
                    <div className="bg-white p-4 border-2 border-[black] rounded-lg flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                        </svg>

                        <div>
                            <h3 className="text-xl font-bold text-[#333]">Real Cash</h3>
                            <p className="text-xl text-[#1D4ED8]">{formatCurrency(user.realCash)} Cash</p>
                        </div>
                    </div>

                    {/* Bonus Cash */}
                    <div className="bg-white p-4 border-2 border-[black] rounded-lg flex items-center space-x-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <div>
                            <h3 className="text-xl font-bold text-[#333]">Bonus Cash</h3>
                            <p className="text-xl text-[#1D4ED8]">{formatCurrency(user.bonusCash)} Cash</p>
                        </div>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-[#333]">Recent Activity</h3>
                    <ul className="bg-white p-4 border-2 border-[black] rounded-lg">
                        <li className="mb-4 border-b-2 pb-4 border-[black]">
                            <p className="font-semibold text-[#333]">Last Login</p>
                            <p className="text-lg text-gray-600">{user.connDate ? new Date(user.connDate).toLocaleString() : "Not available"}</p>
                        </li>
                        <li className="mb-2">
                            <p className="font-semibold text-[#333]">Last Claim Bonus</p>
                            <p className="text-lg text-gray-600">{user.lastClaimBonus ? new Date(user.lastClaimBonus).toLocaleString() : "Not available"}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}