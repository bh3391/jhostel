"use server";

import { db } from "@/db";
import { rooms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Ambil semua kamar
export async function getRooms() {
  return await db.select().from(rooms).orderBy(rooms.name);
}

// Update data kamar
export async function updateRoom(id: string, data: any) {
  await db.update(rooms).set(data).where(eq(rooms.id, id));
  revalidatePath("/admin/rooms");
  revalidatePath("/rooms"); // Revalidate halaman publik juga
}