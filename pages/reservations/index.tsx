// Import necessary modules and components
import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

// Renamed the component to ReservationList
export default function ReservationList() {
    // Rendering logic for reservations
    return <ChakraUIListInferencer />;
}

// Updated getServerSideProps function
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    const translateProps = await serverSideTranslations(
        context.locale ?? "en",
        ["common"],
    );

    if (!session) {
        return {
            props: {
                ...translateProps,
            },
            redirect: {
                destination: `/login?to=${encodeURIComponent("/reservations")}`,
                permanent: false,
            },
        };
    }

    // Fetch reservation data from your SPMS backend here

    return {
        props: {
            ...translateProps,
            // Include reservation data in props
        },
    };
}
