"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * BookingWidget Component
 * Fixed position booking widget with glassmorphism effect
 * Features booking form and external booking link
 * Replica of new_index.html Booking Widget (lines 1549-1616)
 * Starts in minimized state by default
 */

// Google Analytics gtag type
type GtagFunction = (command: string, eventName: string, params: Record<string, string | number>) => void;

// Get booking URL from environment variable
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  "https://live.ipms247.com/booking/book-rooms-parvatislaphostelcamps";

export default function BookingWidget() {
  // Collapsed by default (minimized state)
  const [isCollapsed] = useState(true);

  /**
   * Track booking widget click for analytics
   */
  const handleBookingClick = () => {
    // Google Analytics tracking (if GA is configured)
    if (typeof window !== "undefined" && (window as unknown as { gtag?: GtagFunction }).gtag) {
      ((window as unknown as { gtag: GtagFunction }).gtag)("event", "booking_click", {
        event_category: "engagement",
        event_label: "booking_widget_header",
        value: 1,
      });
    }

    // Console log for development/debugging
    // console.log("Booking widget clicked - redirecting to booking system");
  };

  /**
   * Track internal form submission for analytics
   */
  const handleFormBookingClick = () => {
    // Google Analytics tracking
    if (typeof window !== "undefined" && (window as unknown as { gtag?: GtagFunction }).gtag) {
      ((window as unknown as { gtag: GtagFunction }).gtag)("event", "booking_submit", {
        event_category: "conversion",
        event_label: "booking_widget_form",
        value: 1,
      });
    }

    // console.log("Booking form submitted - redirecting to booking system");
  };

  return (
    <div
      id="booking-widget"
      className={`fixed bottom-4 z-40 overflow-hidden transition-all duration-300 shadow-2xl booking-glass
        rounded-full
        ${/* Mobile (default): Centered */ ""}
        left-1/2 -translate-x-1/2
        ${/* Desktop (lg: 1024px+): Right corner */ ""}
        lg:left-auto lg:right-6 lg:translate-x-0
        xl:right-8
        2xl:right-10
        [@media(min-width:2560px)]:right-16
        ${/* Width handling */ ""}
        ${isCollapsed ? "max-w-[11.5rem] lg:max-w-[13rem] 2xl:max-w-[15rem] [@media(min-width:2560px)]:max-w-[28rem]" : "w-11/12 lg:w-80 xl:w-85 [@media(min-width:2560px)]:w-[33rem]"}`}
    >
      {/* Header - Always Visible */}
      <div
        id="booking-header"
        className="px-3 py-2.5 flex items-center justify-center relative booking-content-glass min-h-14 cursor-pointer lg:px-4 lg:py-3 2xl:px-5 2xl:py-3.5 [@media(min-width:2560px)]:px-7 [@media(min-width:2560px)]:py-5 [@media(min-width:2560px)]:min-h-[10rem]"
      >
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 lg:gap-3 no-underline pr-3 lg:pr-4"
          onClick={handleBookingClick}
        >
          <Image
            src="/images/Parvati's Lap - Luxury Hostel & Villa - BookNow3.png"
            alt="Parvati's Lap - Luxury Hostel & Villa, Kasol (Parvati Valley) — Book Now button"
            width={48}
            height={48}
            priority
            quality={100}
            sizes="(min-width:2560px) 88px, (min-width:1920px) 66px, (min-width:1536px) 66px, (min-width:1024px) 57px, 48px"
            className="w-[48px] h-[48px] lg:w-[57px] lg:h-[57px] 2xl:w-[66px] 2xl:h-[66px] [@media(min-width:2560px)]:w-[88px] [@media(min-width:2560px)]:h-[88px]"
          />
          <h3 
            className="text-base lg:text-lg 2xl:text-xl font-bold tracking-wide whitespace-nowrap [@media(min-width:2560px)]:text-xl"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              color: '#fbbf24',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.05em'
            }}
          >
            Book Now
          </h3>
        </a>
        
        {/* Minimize/Expand button - for future use
        To enable: uncomment this code and add setIsCollapsed to useState above
        <div>
          <button
            id="minimize-btn"
            onClick={(e) => {
              e.preventDefault();
              setIsCollapsed(!isCollapsed);
            }}
            className="absolute top-4 right-5 bg-white bg-opacity-10 backdrop-blur-10 border border-white border-opacity-20 px-2.5 py-1.5 2xl:px-3.5 2xl:py-3 2xl:rounded-xl 2xl:text-5xl 2xl:top-4 rounded-lg text-sm cursor-pointer font-semibold hover:bg-opacity-20 hover:scale-105 transition-all"
            aria-label={isCollapsed ? "Expand booking form" : "Collapse booking form"}
          >
            {isCollapsed ? "+" : "−"}
          </button>
        </div>
        */}
      </div>

      {/* Booking Form - Hidden when collapsed */}
      {!isCollapsed && (
        <div id="booking-content" className="p-6 max-h-96 overflow-auto">
          {/* Experience Type */}
          <div className="mb-4">
            <label
              htmlFor="experienceType"
              className="block text-xs text-muted mb-2 uppercase tracking-wide font-semibold"
            >
              Experience Type
            </label>
            <select
              id="experienceType"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium transition-all focus:border-white focus:border-opacity-40 focus:bg-white focus:bg-opacity-15 focus:-translate-y-0.5"
            >
              <option>Hostel Stay</option>
              <option>Villa Stay</option>
            </select>
          </div>

          {/* Check-in / Check-out */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label
                htmlFor="checkin"
                className="block text-xs text-muted mb-2 uppercase tracking-wide font-semibold"
              >
                Check-in
              </label>
              <input
                id="checkin"
                type="date"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium transition-all focus:border-white focus:border-opacity-40 focus:bg-white focus:bg-opacity-15 focus:-translate-y-0.5"
              />
            </div>
            <div>
              <label
                htmlFor="checkout"
                className="block text-xs text-muted mb-2 uppercase tracking-wide font-semibold"
              >
                Check-out
              </label>
              <input
                id="checkout"
                type="date"
                className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium transition-all focus:border-white focus:border-opacity-40 focus:bg-white focus:bg-opacity-15 focus:-translate-y-0.5"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="mb-4">
            <label
              htmlFor="guests"
              className="block text-xs text-muted mb-2 uppercase tracking-wide font-semibold"
            >
              Guests
            </label>
            <select
              id="guests"
              className="w-full px-4 py-3 rounded-xl glass-input text-sm font-medium transition-all focus:border-white focus:border-opacity-40 focus:bg-white focus:bg-opacity-15 focus:-translate-y-0.5"
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
              <option>5 Guests</option>
              <option>6 Guests</option>
              <option>7 Guests</option>
              <option>8 Guests</option>
              <option>9 Guests</option>
              <option>10 Guests</option>
              <option>11 Guests</option>
              <option>12 Guests</option>
              <option>13 Guests</option>
              <option>14 Guests</option>
            </select>
          </div>

          {/* Book Now Button */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFormBookingClick}
            className="w-full inline-block bg-gradient-to-r from-black to-gray-800 text-white border-0 px-4 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg uppercase tracking-wide relative overflow-hidden text-center no-underline"
          >
            <span className="relative z-10">Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-500"></div>
            <span className="block text-[0.95em] text-yellow-300 font-normal relative z-10 mt-1">
              click here to book online
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
