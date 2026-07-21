import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";
import RecentSales from "@/components/dashboard/RecentSales";


export default function Home() {
  return (
    <main className="p-6 bg-pink-50 min-h-screen">

      <DashboardHeader />

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          
          <SalesChart />
        </div>
        <div>

        <InventoryAlerts />   
        </div>
      </div>
      
      <RecentSales />
    </main>
  );
}




