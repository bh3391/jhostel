"use server";

import { db } from "@/db";
import { leadLogs, siteTraffic } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function trackVisit(path: string = '/') {
  try {
    await db
      .insert(siteTraffic)
      .values({
        pagePath: path,
        visitCount: 1,
      })
      .onConflictDoUpdate({
        target: [siteTraffic.visitDate, siteTraffic.pagePath],
        set: { visitCount: sql`${siteTraffic.visitCount} + 1` },
      });
  } catch (error) {
    console.error("Error tracking visit:", error);
  }
}
export async function logLead(type: string, sourcePage: string, data?: any) {
  try {
    // Sekarang 'id' tidak perlu dimasukkan secara manual
    await db.insert(leadLogs).values({
      type: type,
      sourcePage: sourcePage,
      metadata: data || {},
    });
  } catch (error) {
    console.error("Failed to log lead:", error);
  }
}

export async function getDashboardStats() {
  // 1. Ambil Total Visits
  const totalVisitsResult = await db
    .select({ total: sql<number>`SUM(${siteTraffic.visitCount})` })
    .from(siteTraffic);
  const totalVisits = Number(totalVisitsResult[0]?.total || 0);

  // 2. Ambil Total Leads
  const totalLeadsResult = await db
    .select({ total: sql<number>`COUNT(*)` })
    .from(leadLogs);
  const totalLeads = Number(totalLeadsResult[0]?.total || 0);

  // 3. Hitung Conversion Rate
  const conversionRate = totalVisits > 0 
    ? ((totalLeads / totalVisits) * 100).toFixed(2) 
    : "0";

  // 4. Data untuk Chart (7 Hari Terakhir)
  const chartData = await db.execute(sql`
    SELECT 
      v.visit_date as date,
      COALESCE(SUM(v.visit_count), 0) as visits,
      (SELECT COUNT(*) FROM lead_logs l WHERE DATE(l.created_at) = v.visit_date) as leads
    FROM site_traffic v
    WHERE v.visit_date > CURRENT_DATE - INTERVAL '7 days'
    GROUP BY v.visit_date
    ORDER BY v.visit_date ASC
  `);

  return {
    totalVisits,
    totalLeads,
    conversionRate,
    chartData: chartData.rows
  };
}