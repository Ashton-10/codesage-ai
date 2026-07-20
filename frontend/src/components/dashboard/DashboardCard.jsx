import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "text-indigo-400",
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h1 className="text-4xl font-bold mt-3">{value}</h1>
        </div>

        <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center">
          <Icon size={30} className={color} />
        </div>
      </div>
    </motion.div>
  );
}