"use client";

/**
 * Hero Component
 * Full-screen hero section with video background
 * Extracted from new_index.html hero section (lines 1618-1649)
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center relative hero-bg overflow-hidden"
    >
      {/* Video Background */}
      <video className="hero-video" autoPlay muted loop playsInline>
        <source
          src="/media/_parvatislap_hero.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="text-center z-10 text-white relative">
        {/* 
          Main heading with responsive sizing:
          - text-6xl: base size
          - md:text-8xl: medium devices (≥768px)
          - lg:text-9xl: large devices (≥1024px)
          - 2xl:text-[10rem]: 2xl screens (≥1536px)
          - 3xl:text-[12rem]: ultra-wide screens (≥2560px)
        */}
        <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl [@media(min-width:1536px)]:text-[10rem] [@media(min-width:2560px)]:text-[12rem] font-light tracking-widest">
          PARVATI&apos;S LAP
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl font-light [@media(min-width:2560px)]:text-[3rem] tracking-wider opacity-95">
          A Hostel & Villa in the Heart of the Himalayas
        </p>

        {/* Location */}
        <p className="hero-location text-sm md:text-base lg:text-lg font-light opacity-85 leading-relaxed [@media(min-width:2560px)]:text-[2rem]">
          Lapas Village, Kasol, Parvati Valley — Adventure & Rest
        </p>
      </div>
    </section>
  );
}
