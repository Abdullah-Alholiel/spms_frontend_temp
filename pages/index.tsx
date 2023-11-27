import SmartParkingDashboard from "@components/Dashboard";
import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
        // Dashboard logic
        
        <SmartParkingDashboard />
        
        return <NavigateToResource resource="dashboard" />;


}

Home.noLayout = true;
