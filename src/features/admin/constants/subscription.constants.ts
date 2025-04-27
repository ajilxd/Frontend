type FeatureType = {
  id: string;
  name: string;
};

export const subscripitonFeatures: FeatureType[] = [
  { id: "feature1", name: "Premium Support" },
  { id: "feature2", name: "Cloud Storage" },
  { id: "feature3", name: "Advanced Analytics" },
  { id: "feature4", name: "API Access" },
  { id: "feature5", name: "Custom Branding" },
  { id: "feature6", name: "Team Collaboration" },
  { id: "feature7", name: "Unlimited Projects" },
  { id: "feature8", name: "Priority Queue" },
];

export const addSubscriptionFormInitialValues = {
  name: "",
  amount: "",
  billingCycle: "month",
  isActive: true,
  features: [] as string[],
  description: "",
};
