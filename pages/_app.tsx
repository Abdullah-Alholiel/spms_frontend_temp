import React from "react";
import { AppProps } from "next/app";
import type { NextPage } from "next";
import { Refine, GitHubBanner, AuthBindings, } from '@refinedev/core';
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { SessionProvider, useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
    import { notificationProvider
,RefineThemes
,ThemedLayoutV2} from '@refinedev/chakra-ui';
import routerProvider, { UnsavedChangesNotifier } from "@refinedev/nextjs-router";

import dataProvider from "@refinedev/simple-rest";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Header } from "@components/header"

const API_URL = "https://api.fake-rest.refine.dev";



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
     noLayout?: boolean;
 };

 type AppPropsWithLayout = AppProps & {
     Component: NextPageWithLayout;
 };

 const App = (props: React.PropsWithChildren) => {
    const { t, i18n } = useTranslation();
    
    const { data, status } = useSession();
    const router = useRouter();
    const { to } = router.query;

    
            const i18nProvider = {
                translate: (key: string, params: object) => t(key, params),
                changeLocale: (lang: string) => i18n.changeLanguage(lang),
                getLocale: () => i18n.language,
            };
            

    if (status === "loading") {
        return <span>loading...</span>;
    }

    const authProvider: AuthBindings = {
        login: async () => {
            signIn("auth0", {
                    callbackUrl: to ? to.toString() : "/",
                    redirect: true,
                });

                return {
                    success: true,
                };
        },
        logout: async () => {
            signOut({
                redirect: true,
                callbackUrl: "/login",
            });

            return {
                success: true,
            };
        },
        onError: async (error) => {
            console.error(error);
            return {
                error,
            };
        },
        check: async () => {
            if (status === "unauthenticated") {
                return {
                    authenticated: false,
                    redirectTo: "/login",
                };
            }

            return {
                authenticated: true,
            };
        },
        getPermissions: async () => {
            return null;
        },
        getIdentity: async () => {
            if (data?.user) {
                const { user } = data;
                return {
                    name: user.name,
                    avatar: user.image,
                };
            }

            return null;
        },
    };

    return (
        <>
            <GitHubBanner />
            <RefineKbarProvider>
                <ChakraProvider theme={RefineThemes.Blue}>
                    <Refine 
                        routerProvider={routerProvider}
                        dataProvider={dataProvider(API_URL)}
                        notificationProvider={notificationProvider}
                        authProvider={authProvider}
                        i18nProvider={i18nProvider}
                        resources={[
                            {
                                name: "parking-slots",
                                list: "/parking-slots",
                                create: "/parking-slots/create",
                                edit: "/parking-slots/edit/:id",
                                show: "/parking-slots/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            },
                            {name: "dashboard", list: "/dashboard", meta: {canDelete: false} },
                            {
                                name: "reservations",
                                list: "/reservations",
                                create: "/reservations/create",
                                edit: "/reservations/edit/:id",
                                show: "/reservations/show/:id",
                                meta: {
                                    canDelete: true,
                                },
                            }
                        ]}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                        }}
                    >
                        {props.children}
                        <RefineKbar />
                        <UnsavedChangesNotifier />
                    </Refine>
                </ChakraProvider>
            </RefineKbarProvider>
        </>
    );
};


function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppPropsWithLayout): JSX.Element {
    const renderComponent = () => {
        if (Component.noLayout) {
            return <Component {...pageProps} />;
        }

            return (
                <ThemedLayoutV2
                    Header={() => <Header sticky />}
                >
                    <Component {...pageProps} />
                </ThemedLayoutV2>
            );
    };

    return (
        <SessionProvider session={session}>
            <App>{renderComponent()}</App>
        </SessionProvider>
    );
};


export default appWithTranslation(MyApp);
