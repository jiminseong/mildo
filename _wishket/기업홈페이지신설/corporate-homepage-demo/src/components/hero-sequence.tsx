"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "slide-1",
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b",
    subtitle: "Eco Innovation",
    title: "지속 가능한 내일을 연구합니다",
    description: "더 나은 환경과 미래 세대를 위해, 남들이 가지 않은 새로운 화학의 길을 개척합니다.",
  },
  {
    id: "slide-2",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    subtitle: "Absolute Quality",
    title: "세계 최고 수준의 기술력",
    description: "독보적인 기술력과 엄격한 품질 관리로 글로벌 스탠다드를 제시합니다.",
  },
  {
    id: "slide-3",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    subtitle: "Human & Environment",
    title: "사람과 환경, 그 중심에 서다",
    description: "모두가 안심하고 누릴 수 있는 풍요로운 삶을 완성합니다.",
  },
];

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Explicitly scope to containerRef
    const panels = gsap.utils.toArray<HTMLElement>(".hero-slide", containerRef.current);
    const texts = gsap.utils.toArray<HTMLElement>(".hero-text", containerRef.current);
    const images = gsap.utils.toArray<HTMLElement>(".hero-image", containerRef.current);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2, // smoother scrub
      },
    });

    // Initial resets
    gsap.set(panels[0], { opacity: 1, zIndex: 10 });
    gsap.set(panels.slice(1), { opacity: 0, zIndex: 1 });
    gsap.set(images, { scale: 1.15 });
    gsap.set(texts, { y: 60, opacity: 0, filter: "blur(10px)" });

    // Global Initial Animation
    gsap.to(images[0], { scale: 1, duration: 2.5, ease: "power3.out" });
    gsap.to(texts[0], { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)", 
      duration: 1.8, 
      delay: 0.6, 
      ease: "power3.out" 
    });

    // Scroll Timeline Setup
    tl.to(images[0], { scale: 1.1, ease: "none" }, 0)
      .to(texts[0], { y: -80, opacity: 0, filter: "blur(8px)", ease: "power2.in" }, 0.2)
      
      // Slide 2 Transition
      .to(panels[1], { opacity: 1, zIndex: 11, ease: "power1.inOut" }, 0.4)
      .fromTo(images[1], { scale: 1.15 }, { scale: 1.05, ease: "none" }, 0.4)
      .fromTo(texts[1], { y: 80, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" }, 0.6)
      
      .to(images[1], { scale: 1.1, ease: "none" }, 1)
      .to(texts[1], { y: -80, opacity: 0, filter: "blur(8px)", ease: "power2.in" }, 1.2)

      // Slide 3 Transition
      .to(panels[2], { opacity: 1, zIndex: 12, ease: "power1.inOut" }, 1.4)
      .fromTo(images[2], { scale: 1.15 }, { scale: 1.05, ease: "none" }, 1.4)
      .fromTo(texts[2], { y: 80, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out" }, 1.6)
      
      .to(images[2], { scale: 1.1, ease: "none" }, 2)
      .to(texts[2], { opacity: 0.6, ease: "none" }, 2.5); // hold last frame slightly

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative h-[400vh] bg-[#051410]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#051410]">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="hero-slide absolute inset-0 h-full w-full overflow-hidden bg-[#0a2e25]"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={slide.id === "slide-1"}
              className="hero-image object-cover opacity-80"
              sizes="100vw"
            />
            
            {/* Extremely smooth and natural radial/linear gradients combo. */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#051410]/90" />
            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white z-20">
              <div className="hero-text w-full max-w-[1400px] flex flex-col items-center justify-center px-4 md:px-8" style={{ opacity: 0 }}>
                <span className="mb-6 lg:mb-8 text-xs md:text-sm lg:text-base font-semibold tracking-[0.4em] uppercase text-[#00ff9d] drop-shadow-[0_0_15px_rgba(0,255,157,0.4)]">
                  {slide.subtitle}
                </span>
                
                {/* break-keep ensures Korean words don't get awkwardly split */}
                <h1 className="font-heading text-[2.5rem] md:text-7xl lg:text-[6.5rem] font-black mb-6 md:mb-10 leading-[1.1] md:leading-[1.15] text-white break-keep w-full"
                    style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)" }}
                >
                  {slide.title}
                </h1>
                
                <p className="text-base md:text-2xl lg:text-3xl text-white/80 font-light max-w-4xl leading-relaxed break-keep"
                   style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
          <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase font-medium">Scroll to explore</span>
          <div className="w-px h-16 bg-white/10 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/80 absolute top-0 -translate-y-full animate-scrolldown" />
          </div>
        </div>
      </div>
    </div>
  );
}
