"use client";

import { createContext, useContext, type ReactNode, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSignMessage, WagmiProvider, type Config } from "wagmi";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, defaultConfig, darkTheme, useConnectModal } from "@xellar/kit";
import axios from "axios";
import { liskSepolia } from "viem/chains";
import { getClientConfig } from "@/lib/client-config";

const queryClient = new QueryClient();

type WalletContextType = {
	address: string | undefined;
	isConnected: boolean;
	balance: string;
	connect: () => Promise<void>;
	disconnect: () => void;
};

const WalletContext = createContext<WalletContextType>({
	address: undefined,
	isConnected: false,
	balance: "0",
	connect: async () => {
		console.warn("Connect function should be triggered by XellarKit UI components.");
	},
	disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

// Inner component to handle context logic and wagmi hooks
function WalletStateController({ children }: { children: ReactNode }) {
	const { toast } = useToast();

	const { address: wagmiAddress, isConnected: wagmiIsConnected, status: wagmiStatus } = useAccount();
	const { data: wagmiBalanceData } = useBalance({ address: wagmiAddress });
	const { disconnect: wagmiDisconnect } = useDisconnect();
	const { signMessageAsync } = useSignMessage();

	const address = wagmiAddress;
	const isConnected = wagmiIsConnected;
	const balance = wagmiBalanceData?.formatted ?? "0";

	const { open } = useConnectModal();

	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	const signAuthMessage = async () => {
		// Check if access token already exists
		const existingToken = localStorage.getItem("access_token");
		if (existingToken) {
			console.log("Access token already exists");
			return;
		}
		try {
			const response = await axios.post(`${baseUrl}/auth/request-message`, {
				wallet_address: address,
			});

			const { message } = response.data;
			const signature = await signMessageAsync({ message });

			const signatureResponse = await axios.post(`${baseUrl}/auth/verify`, {
				message: message,
				signature: signature,
				wallet_address: address,
			});

			const { access_token } = signatureResponse.data;
			console.log("Access token received:", access_token);
			localStorage.setItem("access_token", access_token);
			console.log("Message signed successfully:", signature);
		} catch (error) {
			console.error("Error requesting or signing message:", error);
			toast({
				variant: "destructive",
				title: "Error",
				description: "Failed to authenticate wallet",
			});
		}
	};

	useEffect(() => {
		if (wagmiStatus === "connected") {
			console.log("Wallet connected successfully via wagmi:", address);
			// TODO: fix this
			// signAuthMessage();
		} else if (wagmiStatus === "disconnected") {
			console.log("Wallet disconnected via wagmi");
		}
	}, [wagmiStatus, address, toast]);

	const connect = async () => {
		console.warn("Programmatic connect via context is not standard with XellarKit. Please use XellarKit's UI components.");
		toast({
			variant: "default",
			title: "Connect Wallet",
			description: "Please use the dedicated UI button to connect your wallet.",
		});
		open();
	};

	const disconnect = () => {
		wagmiDisconnect();
		// Remove the access token from localStorage when disconnecting
		localStorage.removeItem("access_token");
		console.log("Wallet disconnect initiated via context");
		toast({
			title: "Wallet disconnected",
			description: "Your wallet has been disconnected.",
		});
	};

	return (
		<WalletContext.Provider
			value={{
				address,
				isConnected,
				balance,
				connect,
				disconnect,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}

export function WalletProvider({ children }: { children: ReactNode }) {
	const [isClient, setIsClient] = useState(false);
	const [clientConfig, setClientConfig] = useState<Config | null>(null);

	useEffect(() => {
		setIsClient(true); // mark client
		setClientConfig(getClientConfig()); // safe to call browser-only APIs here
	}, []);

	if (!isClient || !clientConfig) return null; // prevent SSR and invalid config

	return (
		<WagmiProvider config={clientConfig}>
			<QueryClientProvider client={queryClient}>
				<XellarKitProvider theme={darkTheme}>
					<WalletStateController>{children}</WalletStateController>
				</XellarKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
