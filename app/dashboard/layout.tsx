import Sidebar from "@/components/ui/Sidebar";

export default function DashboardLayout({
    children,

}:{
    children: React.ReactNode;

}) {
    return (
       <div className="flex flex-col sm:flex-row">
        <Sidebar/>

        <main className="flex-1 p-4 pt-20 sm:p-6 sm:pt-6">
          {children}  
        </main>
       </div>
        
    );
}
