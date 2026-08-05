import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
import SalesChart from "@/components/dashboard/SalesChart";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";
import RecentSales from "@/components/dashboard/RecentSales";


export default function Home() {
  return (
    <main className="w-full max-w-full overflow-hidden ">

      <DashboardHeader />

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <div className="lg:col-span-2 min-w-0">
          
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




