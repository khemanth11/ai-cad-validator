'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MdDashboard,
    MdUploadFile,
    MdViewInAr,
    MdAssignment,
    MdSettings
} from 'react-icons/md';

const navItems = [
    { name: 'Dashboard', href: '/', icon: MdDashboard },
    { name: 'Validate', href: '/validate', icon: MdUploadFile },
    { name: '3D Viewer', href: '/viewer', icon: MdViewInAr },
    { name: 'Report', href: '/report', icon: MdAssignment },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            {/* Logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">🔍</div>
                <div>
                    <div className="sidebar-logo-text">CAD Validator</div>
                    <div className="sidebar-logo-sub">AI Design Intelligence</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                    >
                        <span className="nav-item-icon">
                            <item.icon />
                        </span>
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Bottom - Settings */}
            <div className="nav-item" style={{ marginTop: 'auto' }}>
                <span className="nav-item-icon">
                    <MdSettings />
                </span>
                Settings
            </div>
        </aside>
    );
}
