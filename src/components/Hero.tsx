import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const now = new Date();

  const fullDate = now.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  // shorter version for phones: ৬ অক্টোবর, ২০২৬
  const shortDate = now.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <section className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6">
      <div className="flex flex-col-reverse items-center justify-between gap-4 overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-br from-white via-white to-green-50 px-4 py-6 shadow-sm sm:gap-6 sm:rounded-3xl sm:px-8 sm:py-8 md:flex-row md:gap-8 md:px-10 md:py-10 lg:px-14">
        {/* Text */}
        <div className="w-full max-w-xl text-center md:text-left">
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-700 sm:text-xs">
            <span className="sm:hidden">{shortDate}</span>
            <span className="hidden sm:inline">{fullDate}</span>
          </span>

          <h2 className="mt-3 text-2xl font-extrabold leading-snug text-gray-900 sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl lg:leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 text-[13px] leading-relaxed text-gray-600 sm:mt-4 sm:text-sm md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="/products"
            className="btn mt-5 w-full rounded-lg border-none bg-green-600 px-5 font-semibold text-white shadow-md shadow-green-600/30 hover:bg-green-700 sm:mt-6 sm:w-auto"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Illustration */}
        <div className="flex w-full justify-center md:w-auto md:shrink-0 md:pr-4 lg:pr-8">
          <Image
            src="/bazar-hero.png"
            alt=""
            width={320}
            height={250}
            priority
            sizes="(max-width: 640px) 160px, (max-width: 768px) 220px, (max-width: 1024px) 240px, 320px"
            className="h-auto w-full max-w-[160px] object-contain sm:max-w-[220px] md:max-w-[240px] lg:max-w-[320px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;