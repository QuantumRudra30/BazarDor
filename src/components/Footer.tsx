const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-5 text-center text-xs text-gray-600 sm:px-6 sm:text-sm md:flex-row md:items-center md:justify-between md:gap-6 md:text-left">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p className="text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;