"use client";

import { useWhatsAppContact } from "@/hooks/useWhatsAppContact";

/**
 * Contact Component
 * Contact information and WhatsApp contact form
 * Replica of new_index.html Contact section (lines 2150-2272)
 */

export default function Contact() {
  const { formData, handleInputChange, handleWhatsAppSubmit } =
    useWhatsAppContact();

  return (
    <section
      id="contact"
      className="py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 bg-secondary [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64"
    >
      <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
        <div className="text-center mb-12">
          <h2 className="section-title title-section">CONTACT US</h2>
          <p className="text-xl font-light text-secondary max-w-[700px] mx-auto leading-[1.7] tracking-[0.5px] italic [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[59rem]">
            We&apos;re here to help you plan your perfect Himalayan retreat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-light mb-6 text-primary [@media(min-width:2560px)]:text-[3rem]">
              GET IN TOUCH
            </h3>

            <div className="space-y-6">
              {/* Location */}
              <div>
                <strong className="text-primary text-lg [@media(min-width:2560px)]:text-[2rem]">
                  Location
                </strong>
                <p className="text-muted mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                  Lapas Village, Manikaran Rd,
                  <br />
                  Kasol, Himachal Pradesh-175105
                </p>
                
                {/* Google Maps Link */}
                <div className="mt-3">
                  <a
                    href="https://www.google.com/maps?q=32.029589960716486,77.36743339627803"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11]"
                    aria-label="View on Google Maps"
                  >
                    <svg 
                      className="w-6 h-6 [@media(min-width:2560px)]:w-10 [@media(min-width:2560px)]:h-10" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="font-medium [@media(min-width:2560px)]:text-[1.75rem]">
                      View on Google Maps
                    </span>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div>
                <strong className="text-primary text-lg [@media(min-width:2560px)]:text-[2rem]">
                  Phone
                </strong>
                <p className="text-muted mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                  +91 908 222 9363
                </p>
              </div>

              {/* Email */}
              <div>
                <strong className="text-primary text-lg [@media(min-width:2560px)]:text-[2rem]">
                  Email
                </strong>
                <p className="text-muted mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                  parvatislap@gmail.com
                </p>
              </div>

              {/* How to Reach Us */}
              <div>
                <strong className="text-primary text-lg [@media(min-width:2560px)]:text-[2rem]">
                  How to Reach Us
                </strong>

                {/* YouTube Link */}
                <div className="mt-3 mb-4">
                  <a
                    href="https://youtube.com/shorts/F8MC3NGpUw0?si=y-NsCzuN0uHCIWoZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11]"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.106C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.404.58A2.974 2.974 0 0 0 .502 6.186 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.094 2.106C4.309 20.5 12 20.5 12 20.5s7.691 0 9.404-.58a2.974 2.974 0 0 0 2.094-2.106A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    </svg>
                    <span className="font-medium [@media(min-width:2560px)]:text-[1.75rem]">
                      Watch How to Reach Video
                    </span>
                  </a>
                </div>

                <p className="text-muted mt-2 mb-3 [@media(min-width:2560px)]:text-[1.75rem]">
                  Kasol is the last bus stop for Volvo. From here there are 4
                  options to reach our property:
                </p>

                <div className="space-y-5 text-muted">
                  <div>
                    <strong className="text-primary [@media(min-width:2560px)]:text-[2rem]">
                      OPTION 1:
                    </strong>
                    <p className="mt-1 [@media(min-width:2560px)]:text-[1.75rem]">
                      You can book a 4x4 cab for up to 6 guests directly from
                      Kasol to Lapas village. From Lapas Village it&apos;s a 30-45
                      min climb to our property. (Tourist speed) Just follow the
                      yellow and orange arrows.
                    </p>
                    <p className="mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                      <strong className="text-primary">Pick Up Point:</strong>{" "}
                      <a
                        href="https://maps.app.goo.gl/19mYSSZx4ssF2Hk56"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11] break-all"
                      >
                        https://maps.app.goo.gl/19mYSSZx4ssF2Hk56
                      </a>
                    </p>
                  </div>

                  <div>
                    <strong className="text-primary [@media(min-width:2560px)]:text-[2rem]">
                      OPTION 2:
                    </strong>
                    <p className="mt-1 [@media(min-width:2560px)]:text-[1.75rem]">
                      Take a local bus till Manikaran village - Shivalik hotel -
                      which is about 20 mins. From here there is an off-road
                      camper which can take up to 6 guests till Lapas Village in
                      25 mins and from Lapas Village it&apos;s a 30-45 min climb
                      to our property. (Tourist speed) Just follow the yellow
                      and orange arrows.
                    </p>
                    <p className="mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                      <strong className="text-primary">Pick Up Point:</strong>{" "}
                      <a
                        href="https://maps.app.goo.gl/wBTSouaEMQh7eFRM9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11] break-all"
                      >
                        https://maps.app.goo.gl/wBTSouaEMQh7eFRM9
                      </a>
                    </p>
                  </div>

                  <div>
                    <strong className="text-primary [@media(min-width:2560px)]:text-[2rem]">
                      OPTION 3:
                    </strong>
                    <p className="mt-1 [@media(min-width:2560px)]:text-[1.75rem]">
                      A 2 hr trek route from Ruskat Village.
                    </p>
                    <p className="mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                      <strong className="text-primary">Trek Start Point:</strong>{" "}
                      <a
                        href="https://maps.app.goo.gl/NigvuDRBtxHtpSfv8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11] break-all"
                      >
                        https://maps.app.goo.gl/NigvuDRBtxHtpSfv8
                      </a>
                    </p>
                    <p className="mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                      You can have your cab or bus driver drop you at this
                      point. There is a shop opposite the temple at the start of
                      Ruskat village. Follow the yellow arrows to reach
                      Parvati&apos;s Lap Hostel. You can ask locals for directions
                      to Lapas village for the trek.
                    </p>
                  </div>

                  <div>
                    <strong className="text-primary [@media(min-width:2560px)]:text-[2rem]">
                      OPTION 4:
                    </strong>
                    <p className="mt-1 [@media(min-width:2560px)]:text-[1.75rem]">
                      Take a local bus to Shangna village Fruit wine shop. The
                      trek to Lapas starts from here which takes about 2 1/2
                      hrs. Follow the steps to Lapas village and then follow
                      yellow arrows to Parvati&apos;s Lap.
                    </p>
                    <p className="mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                      <a
                        href="https://maps.app.goo.gl/W5Snyy7TbpPdgb6N6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11] break-all"
                      >
                        https://maps.app.goo.gl/W5Snyy7TbpPdgb6N6
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* For Complaints */}
              <div>
                <strong className="text-primary text-lg [@media(min-width:2560px)]:text-[2rem]">
                  For Complaints
                </strong>
                <p className="text-muted mt-2 [@media(min-width:2560px)]:text-[1.75rem]">
                  parvatislap@gmail.com
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="text-xl font-light mb-4 text-primary [@media(min-width:2560px)]:text-[2rem]">
                  Follow Our Journey
                </h4>
                <div className="flex gap-6">
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/parvatis_lap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11]"
                    aria-label="Follow us on Instagram"
                  >
                    <svg
                      className="w-6 h-6 transition-transform duration-300 hover:scale-110 [@media(min-width:2560px)]:w-[60px] [@media(min-width:2560px)]:h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61556916640840&mibextid=ZbWKwL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11]"
                    aria-label="Follow us on Facebook"
                  >
                    <svg
                      className="w-6 h-6 transition-transform duration-300 hover:scale-110 [@media(min-width:2560px)]:w-[60px] [@media(min-width:2560px)]:h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.325 24h11.49v-9.294H9.691v-3.622h3.125V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/shorts/F8MC3NGpUw0?si=y-NsCzuN0uHCIWoZ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#808000] hover:text-[#556b2f] transition-colors dark:text-[#39ff14] dark:hover:text-[#2ecc11]"
                    aria-label="Watch our YouTube videos"
                  >
                    <svg
                      className="w-6 h-6 transition-transform duration-300 hover:scale-110 [@media(min-width:2560px)]:w-[60px] [@media(min-width:2560px)]:h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.106C19.691 3.5 12 3.5 12 3.5s-7.691 0-9.404.58A2.974 2.974 0 0 0 .502 6.186 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .502 5.814 2.974 2.974 0 0 0 2.094 2.106C4.309 20.5 12 20.5 12 20.5s7.691 0 9.404-.58a2.974 2.974 0 0 0 2.094-2.106A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="sticky top-[100px] h-fit [@media(min-width:2560px)]:top-[320px]">
            <div className="bg-primary p-5 rounded-2xl border-2 border-[var(--border-color)] [@media(min-width:2560px)]:p-12">
              <form
                onSubmit={handleWhatsAppSubmit}
                className="space-y-3 [@media(min-width:2560px)]:space-y-8"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-xs text-muted mb-1.5 uppercase tracking-wide font-semibold [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:mb-2.5"
                    >
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border-color)] bg-white bg-opacity-90 text-sm text-[var(--text-primary)] focus:border-[#808000] transition-colors dark:bg-[rgba(255,255,255,0.1)] dark:text-white dark:focus:border-[#39ff14] [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:py-2.5 [@media(min-width:2560px)]:px-4"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-xs text-muted mb-1.5 uppercase tracking-wide font-semibold [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:mb-2.5"
                    >
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border-color)] bg-white bg-opacity-90 text-sm text-[var(--text-primary)] focus:border-[#808000] transition-colors dark:bg-[rgba(255,255,255,0.1)] dark:text-white dark:focus:border-[#39ff14] [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:py-2.5 [@media(min-width:2560px)]:px-4"
                    />
                  </div>
                </div>

                {/* Phone Field (Replaced Email) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs text-muted mb-1.5 uppercase tracking-wide font-semibold [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:mb-2.5"
                  >
                    Phone No.
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border-color)] bg-white bg-opacity-90 text-sm text-[var(--text-primary)] focus:border-[#808000] transition-colors dark:bg-[rgba(255,255,255,0.1)] dark:text-white dark:focus:border-[#39ff14] [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:py-2.5 [@media(min-width:2560px)]:px-4"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-muted mb-1.5 uppercase tracking-wide font-semibold [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:mb-2.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border-2 border-[var(--border-color)] bg-white bg-opacity-90 text-sm text-[var(--text-primary)] min-h-20 resize-none focus:border-[#808000] transition-colors dark:bg-[rgba(255,255,255,0.1)] dark:text-white dark:focus:border-[#39ff14] [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:py-2.5 [@media(min-width:2560px)]:px-4 [@media(min-width:2560px)]:min-h-28"
                  ></textarea>
                </div>

                {/* WhatsApp Submit Button */}
                <button
                  type="submit"
                  className="bg-[#25D366] text-white flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border-0 cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_15px_rgba(37,211,102,0.3)] w-full hover:bg-[#1fae52] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] dark:bg-[#31da12] dark:shadow-[0_4px_15px_rgba(49,218,18,0.3)] dark:hover:bg-[#28b80f] dark:hover:shadow-[0_8px_25px_rgba(49,218,18,0.4)] [@media(min-width:2560px)]:text-[1.5rem] [@media(min-width:2560px)]:py-3 [@media(min-width:2560px)]:gap-3"
                >
                  <svg className="w-4 h-4 [@media(min-width:2560px)]:w-6 [@media(min-width:2560px)]:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" />
                  </svg>
                  <span className="font-medium [@media(min-width:2560px)]:text-[1.5rem]">
                    Send Message
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




