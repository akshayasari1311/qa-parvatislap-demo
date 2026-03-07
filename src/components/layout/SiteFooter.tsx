import { ROUTES } from "@/lib/routes";

/**
 * SiteFooter Component
 * Footer section with quick links and contact info
 * Extracted from new_index.html footer section (lines 2274-2304)
 */
export function SiteFooter() {
  return (
    <footer className="py-12 px-6 bg-text-dark text-white 3xl:py-24 3xl:px-48">
      <div className="max-w-79rem mx-auto 3xl:max-w-[235rem]">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="max-w-80">
            <h3 className="font-light tracking-widest mb-4 text-xl 3xl:text-[2rem]">
              PARVATI&apos;S LAP
            </h3>
            <p className="text-gray-300 leading-relaxed 3xl:text-[1.5rem]">
              A sanctuary in the heart of the Himalayas, where adventure meets
              tranquility in perfect harmony.
            </p>
          </div>

          <div>
            <h4 className="font-light mb-4 text-lg 3xl:text-[2rem]">
              Quick links
            </h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href={ROUTES.VILLA}
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Villa
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.CAFE}
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Cafe
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.HOSTEL}
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Hostel
                </a>
              </li>
              <li>
                <a
                  href={ROUTES.TREKS}
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Treks
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="/views"
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Views
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 no-underline hover:text-white transition-colors 3xl:text-[1.5rem]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-light mb-4 text-lg 3xl:text-[2rem]">
              Phone
            </h4>
            <p className="text-gray-300 3xl:text-[1.5rem]">
              +91 908 222 9363
            </p>
          </div>

          <div>
            <h4 className="font-light mb-4 text-lg 3xl:text-[2rem]">
              Email
            </h4>
            <p className="text-gray-300 3xl:text-[1.5rem]">
              parvatislap@gmail.com
            </p>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-700 text-gray-400 3xl:text-[2rem]">
          © 2024 Parvati&apos;s Lap
        </div>
      </div>
    </footer>
  );
}

