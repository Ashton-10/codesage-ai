import { motion } from "framer-motion";

export default function WelcomeCard({ username }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-10 mb-8"
    >
      <h1 className="text-4xl font-bold">
        Welcome back, {username}! 
      </h1>

      <p className="mt-3 text-lg opacity-90">
        Ready to review some code today?
      </p>
    </motion.div>
  );
}