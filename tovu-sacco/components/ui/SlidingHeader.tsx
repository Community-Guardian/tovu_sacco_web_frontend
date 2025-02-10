"use client"

import { useState } from "react";
import { motion } from "framer-motion";

interface SlidingHeaderProps {
  step: "login" | "signup";
}

export default function SlidingHeader({ step }: SlidingHeaderProps) {
  return (
    <div className="relative h-12 w-full overflow-hidden bg-primary">
      <motion.div
        initial={{ x: step === "login" ? "-100%" : "100%" }}
        animate={{ x: "0%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold"
      >
        {step === "login" ? "Welcome Back" : "Create an Account"}
      </motion.div>
    </div>
  );
}
