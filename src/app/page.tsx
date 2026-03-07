import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import BookingWidget from "@/components/booking/BookingWidget";

/**
 * Lazy load below-fold components to reduce initial bundle size
 * These components are loaded only when they're about to enter the viewport
 */
const HomeContent = dynamic(() => import("@/components/sections/HomeContent"), {
  loading: () => <SectionLoader />,
});

const Accommodations = dynamic(() => import("@/components/sections/Accommodations"), {
  loading: () => <SectionLoader />,
});

const CafeThingsToDo = dynamic(() => import("@/components/sections/CafeThingsToDo"), {
  loading: () => <SectionLoader />,
});

const Reviews = dynamic(() => import("@/components/sections/Reviews"), {
  loading: () => <SectionLoader />,
});

const Views = dynamic(() => import("@/components/sections/Views"), {
  loading: () => <SectionLoader />,
});

const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionLoader />,
});

/**
 * Lightweight loading placeholder for lazy-loaded sections
 */
function SectionLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-secondary">
      <div className="w-8 h-8 border-2 border-[var(--border-color)] border-t-[var(--text-primary)] rounded-full animate-spin" />
    </div>
  );
}

/**
 * Home page component
 * Matches the structure of new_index.html sections
 * Uses dynamic imports to reduce initial JavaScript bundle
 */
export default function Home() {
  return (
    <>
      {/* Hero section with video background - loads immediately */}
      <Hero />
      
      {/* Fixed booking widget - loads immediately for conversions */}
      <BookingWidget />
      
      {/* Lazy-loaded sections - load on demand */}
      <HomeContent />
      <div id="hostel-villa-anchor">
        <Accommodations />
      </div>
      <div id="cafe-anchor">
        <CafeThingsToDo />
      </div>
      <div id="reviews-anchor">
        <Reviews />
      </div>
      <div id="views-anchor">
        <Views />
      </div>
      <div id="contact-anchor">
        <Contact />
      </div>
    </>
  );
}
