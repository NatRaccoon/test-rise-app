"use client";

import BlockList from "@/component/BlockList";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Home() {
  // const t = useTranslations();
  const router = useRouter();

  const handleLanguageChange = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/;`;
    router.refresh();
  };

  return (
    <main style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>
          Rise 360 Style Editor
        </h1>
        <div>
          <select onChange={(e) => handleLanguageChange(e.target.value)} defaultValue="en">
            <option value="en">English</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <BlockList />
    </main>
  );
}
