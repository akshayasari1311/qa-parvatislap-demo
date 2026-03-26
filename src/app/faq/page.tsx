import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/StructuredData";
import { generateFAQSchema, generateMetadata } from "@/lib/seo";
import { FaqAccordion } from "@/components/faq/FaqAccordion";

export const metadata: Metadata = generateMetadata({
  title: "FAQs",
  description:
    "Frequently asked questions about Parvati's Lap (Kasol / Parvati Valley) - location, how to reach, rooms, amenities, and treks.",
  keywords: [
    "Parvati's Lap FAQs",
    "Kasol hostel FAQ",
    "Parvati Valley stay FAQ",
    "how to reach Lapas Village",
    "Kheerganga base stay",
  ],
  path: "/faq",
});

const faqs = [
  {
    question: "Where is Lapas village located in relation to Kasol?",
    answer:
      "Lapas is a hidden gem in the Parvati Valley, situated just a short drive or a scenic hike away from the main Kasol market. Unlike the crowded town center, Lapas offers a panoramic view of the valley and a peaceful, authentic Himachali village experience with magical sunsets year round and star gazing.",
  },
  {
    question: "Why should I stay in a village like Lapas instead of the main Kasol market?",
    answer:
      "Staying in a village near Kasol, specifically Lapas, offers the best of both worlds. You get the serenity, cleaner air, and stunning sunset views that are often missed in the valley floor, yet you remain close enough to Kasol to enjoy its cafes and connectivity. It is ideal for travelers looking for an offbeat stay in Parvati Valley.",
  },
  {
    question: "Is Lapas village suitable for digital nomads working remotely?",
    answer:
      "Absolutely. The Parvati Valley has become a hub for workcations. Lapas offers a quieter environment than Kasol, making it perfect for deep work. At Parvati's Lap Hostel, there is no wifi but amazing network from Airtel and Jio for connectivity and power backup needed to work and a work space with a mountain view.",
  },
  {
    question: "What is the weather like in Lapas compared to Kasol?",
    answer:
      "Since Lapas is situated at a slightly higher altitude than the main Kasol town, it often enjoys breezier days and clearer views of the snow-capped peaks. Evenings can get chilly, making it perfect for bonfires and cozying up in our common areas.",
  },
  {
    question: "How do I reach Parvati's Lap Hostel and Camps from Kasol?",
    answer:
      "Kasol is the last bus stop for Volvo. From here there are 4 options to reach our property:\n\nOPTION 1:\nYou can book a 4x4 cab up to 6 guests directly from Kasol to Lapas village. From Lapas Village it's a 30-45 min climb to our property. (Tourist speed) Just follow the yellow and orange arrows.\nPick Up Point\nhttps://maps.app.goo.gl/19mYSSZx4ssF2Hk56\n\nOPTION 2:\nTake a local bus till Manikaran village - Shivalik hotel - which is about 20 mins. From here there is an off-road camper which can take up to 6 guests till Lapas Village in 25 mins and from Lapas Village it's a 30-45 min climb to our property. (Tourist speed) Just follow the yellow and orange arrows.\nPick Up Point\nhttps://maps.app.goo.gl/wBTSouaEMQh7eFRM9\n\nOPTION 3:\nA 2 hr trek route from Ruskat Village.\n\nTrek start point\nhttps://maps.app.goo.gl/NigvuDRBtxHtpSfv8\n\nYou can have your cab or bus driver drop you at this point. There is a shop opposite the temple at the start of Ruskat village. Follow the Yellow arrows to reach Parvati's Lap Hostel. You can ask locals for directions to Lapas village for the trek.\n\nOPTION 4:\nTake a local bus to Shangna village Fruit wine shop. The trek to Lapas starts from here which takes about 2 1/2 hrs. Follow the steps to Lapas village and then follow yellow arrows to Parvati's Lap.\n\nhttps://maps.app.goo.gl/W5Snyy7TbpPdgb6N6",
  },
  {
    question: "Do you offer both dorms and private room options?",
    answer:
      "Yes! True to our name, Parvati's Lap Hostel and Camps offers varied accommodation. We have cozy backpacker dorms for social travelers, private luxury villa for couples, and self pitched personal tent space for rent for those who want to sleep under the stars with access to clean washroom facilities.",
  },
  {
    question: "Is there parking available at the hostel?",
    answer:
      "Yes, unlike many hostels in the main market where parking is a struggle, we have designated parking space for bikes and cars at Lapas village from where the 30-45 hike to our property starts. This makes us a favorite pitstop for bikers exploring the Parvati Valley.",
  },
  {
    question: "What food options are available at Parvati's Lap?",
    answer:
      "We have an in-house cafe serving fresh, home-cooked meals. From quintessential Himachali dishes to North Indian food with backpacker favorites like pancakes, maggi, and endless cups of chai and coffee, we've got you covered. Do check our reviews on google for food.",
  },
  {
    question: "Is the hostel safe for solo female travelers?",
    answer:
      "Safety is our priority. We have a 24/7 front desk, secure lockers in dorms, and a friendly, vetted staff. The community atmosphere at Parvati's Lap ensures you never feel alone unless you want to be! Do check our reviews on google from solo female travellers.",
  },
  {
    question: "Is there a direct bus from Delhi or Chandigarh to Kasol?",
    answer:
      "Yes, absolutely! Connectivity has improved significantly. Most premium Volvo bus operators (such as Zingbus, Laxmi Holidays, and others listed on RedBus and MakeMyTrip) now run direct overnight buses from Delhi (Majnu Ka Tila / ISBT) and Chandigarh straight to the Kasol Bus Stand or the main market drop-off points. You generally do not need to switch buses at Bhuntar anymore unless you are taking a state transport (HRTC) ordinary bus that specifically terminates there.",
  },
  {
    question: "How do I book a bus to Kasol?",
    answer:
      "We recommend booking online via RedBus.com, Zingbus, or MakeMyTrip for the most reliable schedules. Simply search for \"Delhi to Kasol\" or \"Chandigarh to Kasol.\" Direct Volvo buses are very comfortable for the 12-14 hour journey. Once you arrive at the Kasol main stand, our hostel is easily accessible via cab ride and a 30-45 min steep hike.",
  },
  {
    question: "Can I drive or take a direct cab to the hostel?",
    answer:
      "Yes. You can drive directly from Delhi or Chandigarh. The drive takes you through the scenic hills of Himachal. If you prefer not to drive, you can hire a private taxi directly from Chandigarh airport or Delhi. We offer safe parking space for guests arriving by private vehicles or bikes. Only Off road cars can reach Lapas Village. 4x2 Vehicles can park in Manikaran and book a cab to Lapas Village and then hike for 30-45 minutes to the property.",
  },
  {
    question: "Which famous villages are near the hostel?",
    answer:
      "Our hostel is the perfect base camp for exploring Parvati Valley. Chalal Village (a short, scenic walk across the river from Kasol), visit the spiritual Manikaran Sahib Gurudwara, or take day trips to Tosh, Malana, and Pulga. If you want to experience the true \"village vibe\" of Himachal, we are in the center of it all.",
  },
  {
    question: "Is the hostel close to the main market and river?",
    answer:
      "No, we are located in at the top of the mountain with magical sunset views. For the river you need to get down to the valley to experience it. The main market is Kasol and Manikaran market which is a short hike and then a 6-10 km cab ride.",
  },
  {
    question: "Why is your hostel top-rated on Google and booking platforms?",
    answer:
      "It's all about the community and comfort. We are consistently top-rated on Google Reviews, Booking.com, Hostelworld, Agoda, and TripAdvisor because we balance a fun social vibe with cleanliness. Whether you need space for a workation or a bonfire night to meet fellow travelers, we have you covered.",
  },
  {
    question: "Do you help with trek planning?",
    answer:
      "Yes! We can help you plan your adventures to Kheerganga, Sar Pass, Grahan Village, and more. Our front desk team has all the local knowledge you need.",
  },
  {
    question: "What is the best time to visit Parvati's Lap (Kasol / Parvati Valley)?",
    answer:
      "Summer (March-June) has pleasant weather (around 15-25C) and is great for trekking. Monsoon (July-September) is lush and quieter but we are closed for this time. Autumn (October-November) often has clearer skies. Winter (December-February) can be cold (about -5 to 10C) with snow views.",
  },
  {
    question: "Do all rooms have attached bathrooms?",
    answer:
      "Meghbari Villa, 4 Beds Wood Room, 3 Beds Attic Room, and 4 Beds Balcony Room have attached washrooms. 4 Beds Hemp Room and 14 Beds Stone Room have clean outside washrooms.",
  },
  {
    question: "Is food available at the property?",
    answer:
      "Yes. ADHIKARA Cafe serves breakfast, lunch, and dinner (with Himachali and international and North indian cuisine) on-site.",
  },
  {
    question: "Is WiFi available?",
    answer:
      "No, WiFi is not available but there is amazing network from Airtel and Jio for workation and a dedicated mountain view workspace with solar power back in case of power outages.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation policies can vary by date/season/room type. Please check the booking platform for the current cancellation rules for your dates or call us on 9082229363.",
  },
  {
    question: "Is Parvati's Lap suitable for solo travelers (including solo female travelers)?",
    answer:
      "Parvati's Lap aims to maintain a safe, respectful environment for all guests. Please do check our google reviews from solo female travellers for their experience. If you have specific concerns, contact the property before booking.",
  },
] as const;

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqs.map(({ question, answer }) => ({ question, answer })));

  return (
    <>
      <StructuredData data={faqSchema} />

      <section
        className="py-24 px-10 sm:px-14 md:px-20 lg:px-29 [@media(min-width:1280px)]:px-24 xl:px-40 2xl:px-60 bg-secondary [@media(min-width:1536px)]:px-32 [@media(min-width:2560px)]:py-24 [@media(min-width:2560px)]:px-64"
      >
        <div className="max-w-79rem mx-auto [@media(min-width:2560px)]:max-w-[235rem]">
          <div className="text-center mb-12">
            <h1 className="section-title title-section">FAQ</h1>
            <p className="text-lg text-secondary max-w-[700px] mx-auto leading-normal [@media(min-width:2560px)]:text-[2rem] [@media(min-width:2560px)]:max-w-[59rem]">
              Parvati&apos;s Lap - Luxury Hostel &amp; Villa in Lapas Village (Kasol), Parvati Valley
            </p>
          </div>

          <div className="max-w-4xl [@media(min-width:2560px)]:max-w-[112rem] mx-auto">
            <div className="max-h-[70vh] overflow-y-auto pr-2 rounded-[22px]">
              <FaqAccordion items={faqs} />
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-3 bg-[#808000] text-white px-6 py-3 rounded-xl text-sm no-underline hover:bg-[#556b2f] hover:-translate-y-1 transition-all duration-300 font-semibold [@media(min-width:2560px)]:text-[1.75rem] [@media(min-width:2560px)]:py-6 dark:bg-[#39ff14] dark:text-black dark:hover:bg-[#2ecc11]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

