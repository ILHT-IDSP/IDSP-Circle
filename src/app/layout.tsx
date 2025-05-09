import type {Metadata} from "next";
import "./globals.css";
import NextThemeProvider from "../components/theme/NextThemeProvider";
<<<<<<< HEAD
=======
// import SessionWrapper from "./session-wrapper";
>>>>>>> bd1ef4ae7eada3fa1c0686834797d4ff6f7954af

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
<<<<<<< HEAD
                <NextThemeProvider>{children}</NextThemeProvider>
=======
                <NextThemeProvider>
					{children}
                    {/* <SessionWrapper>{children}</SessionWrapper> */}
                </NextThemeProvider>
>>>>>>> bd1ef4ae7eada3fa1c0686834797d4ff6f7954af
            </body>
        </html>
    );
}
