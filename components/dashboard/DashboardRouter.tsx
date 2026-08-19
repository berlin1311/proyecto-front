"use client";

import { useUser } from "@clerk/nextjs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";
import RecentSales from "@/components/dashboard/RecentSales";
import VendedorDashboard from "@/components/dashboard/VendedorDashboard";

export default function DashboardRouter() {
  const { user, isLoaded } = useUser();
  const role = (user?.publicMetadata as { role?: string } | undefined)?.role;

  if (!isLoaded) {
    return <div className="w-full h-40" />;
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <DashboardHeader />

      {role === "admin" ? (
        <>
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <div className="lg:col-span-2 min-w-0">
              <SalesChart />
            </div>
            <div className="min-w-0">
              <InventoryAlerts />
            </div>
          </div>
          <RecentSales />
        </>
      ) : (
        <VendedorDashboard />
      )}
    </div>
  );
}