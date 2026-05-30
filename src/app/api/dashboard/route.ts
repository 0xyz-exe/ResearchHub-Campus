import { NextResponse } from "next/server";
import { kaprodiDashboardMock, lppmDashboardMock, personalDashboardMock } from "@/features/dashboard/mock-data";

export async function GET() {
  return NextResponse.json({
    data: {
      personal: personalDashboardMock,
      lppm: lppmDashboardMock,
      kaprodi: kaprodiDashboardMock
    }
  });
}
