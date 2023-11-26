import { ChakraUIListInferencer } from "@refinedev/inferencer/chakra-ui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function ParkingSlotList() {
    // Rendering logic for parking slots
    return <ChakraUIListInferencer />;
}

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
                destination: `/login?to=${encodeURIComponent("/parking-slots")}`,
                permanent: false,
            },
        };
    }

    // Fetch parking slot data from your SPMS backend here

    return {
        props: {
            ...translateProps,
            // Include parking slot data in props
        },
    };
}
