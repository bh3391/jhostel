"use server";

import { db } from "@/db";
import { promotions, events } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Promotions
export async function getPromotions() {
  return await db.select().from(promotions);
}

export async function upsertPromotion(data: any) {
  if (data.id) {
    await db.update(promotions).set(data).where(eq(promotions.id, data.id));
  } else {
    await db.insert(promotions).values(data);
  }
  revalidatePath("/admin/promos");
}

// Events
export async function getEvents() {
  return await db.select().from(events);
}

export async function upsertEvent(data: any) {
  if (data.id) {
    await db.update(events).set(data).where(eq(events.id, data.id));
  } else {
    await db.insert(events).values(data);
  }
  revalidatePath("/admin/promos");
}