"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function F3Marquee() {
  // Row 1 companies (scrolling left)
  const row1Companies = [
    { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe/white" },
    { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/white" },
    { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/white" },
    { name: "Linear", logo: "https://cdn.simpleicons.org/linear/white" },
    { name: "Notion", logo: "https://cdn.simpleicons.org/notion/white" },
    { name: "Figma", logo: "https://cdn.simpleicons.org/figma/white" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github/white" },
    { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/white" },
  ];

  // Row 2 companies (scrolling right)
  const row2Companies = [
    { name: "Clerk", logo: "https://cdn.simpleicons.org/clerk/white" },
    { name: "Anthropic", logo: "https://cdn.simpleicons.org/anthropic/white" },
    { name: "Replicate", logo: "https://cdn.simpleicons.org/replicate/white" },
    { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface/white" },
    { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/white" },
    { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/white" },
    { name: "Perplexity", logo: "https://cdn.simpleicons.org/perplexity/white" },
    { name: "Resend", logo: "https://cdn.simpleicons.org/resend/white" },
  ];

  // Duplicate for seamless loop
  const duplicatedRow1 = [...row1Companies, ...row1Companies];
  const duplicatedRow2 = [...row2Companies, ...row2Companies];

  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0B0C0E' }}>
      <div className="w-full max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[28px] font-medium text-[#EDEDED] mb-3 tracking-tight">
            Powering the world's best product teams.
          </h2>
          <p className="text-[14px] text-[#8A8F98]">
            From next-gen startups to established enterprises.
          </p>
        </motion.div>
      </div>

      <div className="relative space-y-8">
        {/* Gradient Fade Left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0C0E] to-transparent z-10" />
        
        {/* Gradient Fade Right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0C0E] to-transparent z-10" />

        {/* Row 1 - Scrolling Left */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 pr-16"
            animate={{
              x: [0, -100 * row1Companies.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedRow1.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-24 h-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 pr-16"
            animate={{
              x: [-100 * row2Companies.length, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedRow2.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-24 h-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
