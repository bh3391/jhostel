import { pgTable, text, timestamp, jsonb, uuid, primaryKey, integer, boolean, serial, date, unique,  } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";
import { sql } from "drizzle-orm";

// Skema untuk Konten Website (Control Panel)
export const siteContent = pgTable("site_content", {
  id: uuid("id").defaultRandom().primaryKey(),
  key: text("key").unique().notNull(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Skema untuk Admin (NextAuth)
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"), // Tambahkan manual untuk Credentials Provider
  role: text("role").default("admin"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    // Gunakan format array dan panggil primaryKey secara langsung
    primaryKey({ columns: [account.provider, account.providerAccountId] }),
  ]
);

// Skema untuk Tracking Leads
export const leadLogs = pgTable("lead_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  // Tipe lead: 'whatsapp', 'booking_engine', 'contact_form'
  type: text("type").notNull(),
  
  // Halaman tempat mereka mengklik (misal: /rooms/deluxe-room)
  sourcePage: text("source_page"),
  
  // Data tambahan (misal: { roomName: 'Deluxe', price: 500000 })
  metadata: jsonb("metadata"),
  
  // Waktu kejadian
  createdAt: timestamp("created_at").defaultNow(),
});

// 1. ROOMS TABLE
export const rooms = pgTable("rooms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  type: text("type", { enum: ["private", "dormitory"] }).notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  capacity: integer("capacity").notNull(),
  image: text("image"), 
  images: jsonb("images").default([]), // Main image
  amenities: text("amenities").array(), // Drizzle array support for PG
  status: text("status", { enum: ["available", "maintenance", "full"] }).default("available"),
  bookingEngineUrl: text("booking_engine_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. PROMOTIONS TABLE
export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  code: text("code").unique(),
  discountValue: integer("discount_value"),
  image: text("image"),
  isActive: boolean("is_active").default(true),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
});

// 3. EVENTS TABLE
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: text("location").default("Hostel Area"),
  image: text("image"),
  isPublic: boolean("is_public").default(true),
});

// 4. FAQS TABLE
export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: text("category", { enum: ["general", "rooms", "policy"] }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  order: integer("order").default(0),
});

export const siteTraffic = pgTable("site_traffic", {
  id: serial("id").primaryKey(),
  visitDate: date("visit_date").default(sql`CURRENT_DATE`),
  pagePath: text("page_path").default("/"),
  visitCount: integer("visit_count").default(1),
}, (table) => [
  // Gunakan array [] dan panggil fungsi unique() secara langsung
  unique("date_path_unique").on(table.visitDate, table.pagePath),
]);