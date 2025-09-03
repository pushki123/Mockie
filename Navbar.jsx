// Sidebar.jsx
import { useState } from "react";
import {
    LayoutDashboard,
    Mic,
    ClipboardList,
    Users,
    CreditCard,
    ShieldCheck,
    Settings,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const menus = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "Manage Podcast", icon: Mic },
        { name: "Manage Quiz", icon: ClipboardList },
        { name: "Manage Users", icon: Users },
        { name: "Subscription", icon: CreditCard },
        { name: "Content Moderation", icon: ShieldCheck },
        { name: "Settings", icon: Settings },
    ];

    return (
        <div
            className={`h-screen ${collapsed ? "w-20" : "w-64"
                } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 absolute z-90`}
        >

            <div className="flex items-center justify-between px-4 py-4 border-b">
                {!collapsed && (
                    <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                        <span className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center text-white font-bold">
                            M
                        </span>
                        <span>
                            Mockie<span className="text-violet-500"></span>
                        </span>
                    </h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-md hover:bg-gray-100"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>


            <nav className="flex-1 px-3 mt-4 space-y-2">
                {menus.map((menu, idx) => (
                    <a
                        key={idx}
                        href="#"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-violet-50 hover:text-violet-600 transition
              ${idx === 0 ? "bg-violet-100 text-violet-600 font-medium" : ""}`}
                    >
                        <menu.icon size={20} />
                        {!collapsed && <span>{menu.name}</span>}
                    </a>
                ))}
            </nav>
        </div>
    );
}
