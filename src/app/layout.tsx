import type { Metadata } from "next";
import "./globals.css";
import NextThemeProvider from "../components/theme/NextThemeProvider";

export const metadata: Metadata = {
    title: "Circles",
    description: "A social media app for connecting with friends",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <NextThemeProvider>
                    <div className="mobile-container">
                        {children}
                    </div>
                </NextThemeProvider>
            </body>
        </html>
    );
}
