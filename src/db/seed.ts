// src/db/seed.ts
import { db } from "./index";
import { users } from "./schema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

async function main() {
  const hashedPassword = await bcrypt.hash("N3mbakan70%", 10);
  
  await db.insert(users).values({
    id: uuidv4(),
    name: "Bhakti Pratama",
    email: "admin@jimbaranhostel.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin user created!");
}

main();