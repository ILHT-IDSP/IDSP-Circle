import type {Metadata} from "next";
import "./globals.css";
import NextThemeProvider from "../components/theme/NextThemeProvider";
// import SessionWrapper from "./session-wrapper";

export const metadata: Metadata = {
    title: "Circles",
    description: "A social media app for connecting with friends",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
        >
            <body className="antialiased">
                <NextThemeProvider>
					{children}
                    {/* <SessionWrapper>{children}</SessionWrapper> */}
                </NextThemeProvider>
            </body>
        </html>
    );
}
