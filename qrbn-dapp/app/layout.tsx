import type React from "react";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { WalletProvider } from "@/components/providers/web3-provider";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-cormorant",
	display: "swap",
});

export const metadata: Metadata = {
	title: "QRBN.app - Islamic Finance Donation Platform",
	description: "Transparent Islamic donations with blockchain technology",
	generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
			<body className="font-sans antialiased">
				<WalletProvider>
					<CurrencyProvider>
						<div className="min-h-screen bg-tawf-sand text-tawf-ink">
							<Navigation />
							<main>{children}</main>
						</div>
						<Toaster />
					</CurrencyProvider>
				</WalletProvider>
			</body>
		</html>
	);
}
