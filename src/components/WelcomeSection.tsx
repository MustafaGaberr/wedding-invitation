import { wedding } from "@/data/wedding";
import { SectionDivider } from "./SectionDivider";

export function WelcomeSection() {
  return (
    <section className="bg-ivory px-6 py-20 text-ink">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-script text-6xl text-burgundy sm:text-7xl">Welcome !</h2>
        <SectionDivider />
        <p className="font-serif-display text-lg leading-relaxed text-ink/85 sm:text-xl">
          {wedding.welcome}
        </p>
      </div>
    </section>
  );
}