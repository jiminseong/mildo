"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Person = {
  name: string;
  image: string;
  role: string;
};

type Props = {
  people: Person[];
};

export default function HeroPeopleMotion({ people }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".floating-hero-avatar",
        { y: 10, opacity: 0.85 },
        {
          y: -8,
          opacity: 1,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
        },
      );

      gsap.fromTo(
        ".hero-strip-title",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="mt-8">
      <p className="hero-strip-title text-center text-xs tracking-[0.12em] text-amber-200">
        전담 대응팀
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {people.map((person) => (
          <div
            key={person.name}
            className="floating-hero-avatar flex items-center gap-2 rounded-full border border-amber-200/30 bg-[#ffffff12] px-2 py-1"
          >
            <Image
              src={person.image}
              alt={`${person.name} 프로필`}
              width={34}
              height={34}
              className="h-[34px] w-[34px] rounded-full object-cover"
            />
            <span className="pr-2 text-xs text-stone-100">
              {person.name} · {person.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
