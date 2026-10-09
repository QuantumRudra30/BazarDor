"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navlinks = () => {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const result = await response.json();

        const data: Category[] = Array.isArray(result)
          ? result
          : Array.isArray(result.categories)
            ? result.categories
            : Array.isArray(result.data)
              ? result.data
              : [];

        setCategories(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="border-t border-gray-100" aria-label="ক্যাটাগরি">
      <div className="flex items-center justify-start gap-1 overflow-x-auto py-1.5 [scrollbar-width:none] sm:py-2 md:justify-center [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="flex gap-4 px-2 py-2 sm:gap-6 sm:px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-5 w-14 shrink-0 animate-pulse rounded bg-gray-200 sm:w-16"
              />
            ))}
          </div>
        ) : (
          categories.map((category) => {
            const categoryPath = `/category/${category.slug}`;
            const isActive = pathname === categoryPath;

            return (
              <Link
                key={category.id}
                href={categoryPath}
                className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[13px] transition-all sm:gap-1.5 sm:px-3 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-green-50 font-semibold text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                }`}
              >
                <span className="text-sm sm:text-base">{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })
        )}
      </div>
    </nav>
  );
};

export default Navlinks;