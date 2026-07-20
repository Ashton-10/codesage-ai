import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  GitBranch,
  Upload,
  History,
  User,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "AI Review",
    icon: Code2,
    path: "/review",
  },
  {
    title: "GitHub Review",
    icon: GitBranch,
    path: "/github",
  },
  {
    title: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    title: "History",
    icon: History,
    path: "/history",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-8 text-3xl font-bold text-indigo-400">
        CodeSage AI
      </div>

      <nav className="flex-1 px-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-5 text-sm text-slate-500">
        Version 2.0
      </div>

    </aside>
  );
}