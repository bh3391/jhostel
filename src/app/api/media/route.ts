import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Konfigurasi menggunakan kredensial server-side
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, // Ambil dari Cloudinary Dashboard
  api_secret: process.env.CLOUDINARY_API_SECRET, // Jangan bocorkan ke Client
});

export async function GET() {
  try {
    // Menggunakan resources() untuk list semua media
    const result = await cloudinary.api.resources({
      resource_type: "image", // atau "video" jika ingin mengambil video
      type: "upload",
      max_results: 50,
    });
    
    return NextResponse.json(result.resources);
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

// Tambahkan endpoint DELETE sekalian agar admin/media bisa menghapus foto
export async function DELETE(request: Request) {
  try {
    const { public_id } = await request.json();
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}