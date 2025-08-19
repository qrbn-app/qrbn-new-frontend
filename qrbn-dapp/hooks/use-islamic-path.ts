import { useState } from "react";

// Islamic jurisprudence paths
export interface IslamicPath {
	id: string;
	name: string;
	description: string;
	nisabMultiplier: number;
	rateMultiplier: number;
}

const islamicPaths: IslamicPath[] = [
	{
		id: "sunni",
		name: "Sunni (Hanafi/Shafi'i/Maliki/Hanbali)",
		description: "Standard Sunni jurisprudence - most widely followed",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
	{
		id: "shia",
		name: "Shia (Twelver/Imami)",
		description: "Shia jurisprudence with some variations in calculation",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
	{
		id: "ibadi",
		name: "Ibadi",
		description: "Ibadi school with specific interpretations",
		nisabMultiplier: 1.0,
		rateMultiplier: 1.0,
	},
];

export function useIslamicPath() {
	const [selectedIslamicPath, setSelectedIslamicPath] = useState<IslamicPath>(islamicPaths[0]);
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

	const onSelectIslamicPath = (id: string) => {
		const path = islamicPaths.find((p) => p.id === id);
		if (path) {
			setSelectedIslamicPath(path);
		}
	};

	return {
		islamicPaths,
		selectedIslamicPath,
		showAdvancedOptions,
		setShowAdvancedOptions,
		onSelectIslamicPath,
	};
}
