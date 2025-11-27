'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, FileText, Settings, LogOut, Crown, Gauge, Users, Camera, CreditCard } from 'lucide-react';
import AuthGuard from '@/components/AuthGuard';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: Gauge },
        { name: 'Leads', href: '/admin/leads', icon: LayoutDashboard },
        { name: 'Clients', href: '/admin/clients', icon: Users },
        { name: 'Shoots', href: '/admin/shoots', icon: Camera },
        { name: 'Invoices', href: '/admin/invoices', icon: CreditCard },
        { name: 'Knowledge Base', href: '/admin', icon: BookOpen },
        { name: 'Content', href: '/admin/content', icon: FileText },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <AuthGuard>
            <div className="min-h-screen bg-[#080808] flex">
                {/* Sidebar */}
                <aside className="w-64 border-r border-white/10 bg-[#0A0A0A] flex flex-col fixed h-full z-10">
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-white">
                            <Crown className="h-6 w-6 text-brand-gold" />
                            <span>GETTUPP<span className="text-brand-gold">OS</span></span>
                        </div>
                    </div>

                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                            ? 'bg-brand-gold text-black shadow-[0_0_20px_rgba(217,174,67,0.2)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className={`h-5 w-5 ${isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-medium"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
