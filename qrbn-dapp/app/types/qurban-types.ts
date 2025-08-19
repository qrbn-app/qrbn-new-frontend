type Animal = {
	id: bigint;
	name: string;
	animalType: number;
	totalShares: number;
	availableShares: number;
	pricePerShare: bigint;
	location: string;
	image: string;
	description: string;
	breed: string;
	weight: number;
	age: number;
	farmName: string;
	sacrificeDate: bigint;
	status: number;
	vendorAddr: string;
	createdAt: bigint;
};

type QurbanAnimals = {
	sheeps: Animal[];
	cows: Animal[];
	goats: Animal[];
	camels: Animal[];
};
