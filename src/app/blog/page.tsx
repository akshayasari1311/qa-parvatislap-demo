import { generateMetadata } from "@/lib/seo";
import type { Metadata } from "next";

/**
 * Blog Landing Page
 * Future implementation for travel guides and trek information
 */

export const metadata: Metadata = generateMetadata({
  title: "Travel Guides & Trek Information",
  description: "Explore Kasol, Parvati Valley, and nearby treks. Comprehensive guides for Kheerganga, Sargi, and more.",
  keywords: ["Kasol travel guide", "Kheerganga trek", "Parvati Valley guide", "Sargi trek"],
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main className="min-h-screen py-24 px-6 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-light text-center mb-6">
          Travel Guides & Trek Information
        </h1>
        <p className="text-xl text-center text-muted mb-12">
          Coming Soon: Comprehensive guides for exploring Parvati Valley
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for future blog posts */}
          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">Kheerganga Trek Guide</h2>
            <p className="text-muted mb-4">
              Complete guide to the famous Kheerganga trek including route, duration, and tips.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>

          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">Sargi Trek Experience</h2>
            <p className="text-muted mb-4">
              Discover the serene Sargi trek, a short but beautiful hike near Parvati's Lap.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>

          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">Things to Do in Kasol</h2>
            <p className="text-muted mb-4">
              Explore cafes, markets, and activities in Kasol and Parvati Valley.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>

          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">How to Reach Parvati's Lap</h2>
            <p className="text-muted mb-4">
              Detailed directions from Delhi, Chandigarh, and major cities to our property.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>

          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">Best Time to Visit</h2>
            <p className="text-muted mb-4">
              Season-wise guide to visiting Kasol and Parvati Valley for the best experience.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>

          <div className="bg-primary rounded-xl p-6 border-2 border-[var(--border-color)]">
            <h2 className="text-2xl font-semibold mb-3">Budget Travel Guide</h2>
            <p className="text-muted mb-4">
              Tips for traveling to Parvati Valley on a budget with cost breakdowns.
            </p>
            <span className="text-sm text-muted italic">Coming Soon</span>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/#contact"
            className="inline-block bg-[#808000] dark:bg-[#39ff14] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Contact Us for Travel Tips
          </a>
        </div>
      </div>
    </main>
  );
}

