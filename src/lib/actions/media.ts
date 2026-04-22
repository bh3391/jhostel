"use server";

import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Mengambil daftar aset media dari Cloudinary dengan dukungan pagination kursor.
 * @param next_cursor Kursor untuk halaman berikutnya (opsional)
 * @param max_results Jumlah item per halaman (default 30)
 */
export async function getMediaResources(next_cursor?: string | null, max_results: number = 30) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      asset_folder: 'JhAsset', // Folder tujuan di Cloudinary
      max_results: max_results,
      next_cursor: next_cursor || undefined,
      // Menambahkan metadata tambahan jika diperlukan
      context: true,
      tags: true
    });

    

    // Kita mapping agar formatnya lebih bersih untuk digunakan di frontend
    const resources = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at,
    }));

    return {
      resources,
      next_cursor: result.next_cursor || null,
    };
  } catch (error) {
    console.error("Cloudinary Admin API Error:", error);
    throw new Error("Gagal mengambil data media dari Cloudinary");
  }
}

/**
 * Menghapus aset media berdasarkan public_id
 * @param public_id ID unik file di Cloudinary
 */
export async function deleteMediaResource(public_id: string) {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return { success: result.result === 'ok' };
  } catch (error) {
    console.error("Delete Media Error:", error);
    return { success: false, error: "Gagal menghapus media" };
  }
}