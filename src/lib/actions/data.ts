// src/lib/actions/data.ts
"use server"

import { db } from "@/db"; // Pastikan koneksi db sudah ada
import { rooms, promotions, events, faqs, siteContent } from "@/db/schema";
import { eq, asc, like } from "drizzle-orm";

export async function getRooms() {
  return await db.select().from(rooms).orderBy(asc(rooms.type));
}

export async function getActivePromos() {
  return await db.select().from(promotions).where(eq(promotions.isActive, true));
}

export async function getUpcomingEvents() {
  return await db.select().from(events).orderBy(asc(events.eventDate));
}

export async function getFaqs() {
  return await db.select().from(faqs).orderBy(asc(faqs.order));
}

export async function getRoomBySlug(slug: string) {
  const result = await db
    .select()
    .from(rooms)
    .where(eq(rooms.slug, slug))
    .limit(1);
  
  return result[0] || null;
}
export async function getAboutContent(): Promise<Record<string, string>> {
  const content = await db
    .select()
    .from(siteContent)
    .where(like(siteContent.key, 'about_%'));

  // Inisialisasi objek dengan index signature
  const formattedContent: { [key: string]: string } = {
    about_title: "",
    about_subtitle: "",
    about_description: "",
    about_vision: "",
    about_mission: "",
  };

  content.forEach((item) => {
    if (item.key) {
      // Karena item.value adalah jsonb, kita harus memastikan nilainya string
      // Jika jsonb berisi string murni, ia akan masuk ke sini.
      // Jika nilainya null atau bukan string, kita beri fallback ""
      const rawValue = item.value;
      formattedContent[item.key] = typeof rawValue === 'string' 
        ? rawValue 
        : JSON.stringify(rawValue ?? ""); 
    }
  });

  return formattedContent;
}