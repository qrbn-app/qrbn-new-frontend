import { defaultConfig } from "@xellar/kit";
import { liskSepolia } from "viem/chains";
import type { Config } from "wagmi";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_WALLET_CONNECT_PROJECT_ID";
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_APP_ID || "fa0c9416-cbee-4ebc-bda7-03d146734f77";
const xellarEnv = (process.env.NEXT_PUBLIC_XELLAR_ENV as "sandbox" | "production") || "sandbox";

export const getClientConfig = (): Config | null => {
  if (typeof window === "undefined") return null;

  return defaultConfig({
    appName: "QRBN.app",
    walletConnectProjectId,
    xellarAppId,
    xellarEnv,
    chains: [liskSepolia],
  }) as Config;
};