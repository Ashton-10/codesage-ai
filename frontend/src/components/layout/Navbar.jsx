
import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-3 text-slate-400"
          />

          <input
            placeholder="Search reviews..."
            className="bg-slate-800 rounded-xl pl-11 pr-4 py-3 w-80 outline-none"
          />

        </div>

      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <img
          src="https://i.pravatar.cc/45"
          className="rounded-full"
          alt="Profile"
        />

      </div>

    </header>
  );
}

