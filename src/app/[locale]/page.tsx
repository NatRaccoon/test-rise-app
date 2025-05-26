// app/page.tsx
"use client";

import BlockList from "@/component/BlockList";
import { useTranslations } from "next-intl";

import { usePathname, useRouter } from "next/navigation";
// import RaccoonLoader from "raccoon-loader"; // 👈 Import the loader


export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale; // Replace locale segment
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <main style={{ padding: "16px"}}>
      <div style={{ display: "flex" , alignContent: "center", justifyContent: "space-between", marginBottom: "16px"}}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "16px", color: "white" }}>{t("HEADER")}</h1>
      <div>
        <select onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="en">English</option>
        <option value="de">German</option>
        </select>
      </div>
      </div>

      <BlockList />

    </main>
  );
}
