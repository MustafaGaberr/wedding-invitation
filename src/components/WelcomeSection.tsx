import { wedding } from "@/data/wedding";
import { SectionDivider } from "./SectionDivider";

export function WelcomeSection() {
  return (
    <section className="bg-ivory px-8 pb-12 pt-14 text-burgundy">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-script text-[2.8rem] leading-none text-burgundy sm:text-[3.25rem]">
          Welcome !
        </h2>
        <p className="mt-8 font-serif-display text-[1.25rem] font-semibold leading-[1.32] text-burgundy sm:text-[1.45rem]">
          {wedding.welcome}
        </p>
        <SectionDivider />
      </div>
    </section>
  );
}
