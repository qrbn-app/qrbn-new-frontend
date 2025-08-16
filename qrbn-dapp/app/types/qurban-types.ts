type Animal = {
	id: bigint;
	name: string;
	animalType: bigint;
	totalShares: bigint;
	availableShares: bigint;
	pricePerShare: bigint;
	location: string;
	image: string;
	description: string;
	breed: string;
	weight: bigint;
	age: bigint;
	farmName: string;
	sacrificeDate: bigint;
	status: bigint;
	vendorAddr: string;
	createdAt: bigint;
};

type QurbanAnimals = {
	sheeps: Animal[];
	cows: Animal[];
	goats: Animal[];
	camels: Animal[];
};
