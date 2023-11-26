import { NavigateToResource } from "@refinedev/nextjs-router";

export default function Home() {
    // Redirect to the parking slots page as the default view
    return <NavigateToResource resource="parking-slots" />;
}

Home.noLayout = true;
