import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export function RomanticQuote() {
  return (
    <section className="bg-ivory px-6 py-24 text-ink">
      <div
        lang="ar"
        dir="rtl"
        className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center font-arabic text-lg leading-loose text-ink/90 sm:text-xl"
      >
        {wedding.heroQuoteAr.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: "easeOut" }}
          >
            {line}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="mt-14 text-center font-script text-5xl text-burgundy sm:text-6xl"
      >
        {wedding.quoteClosing}
      </motion.p>
    </section>
  );
}
