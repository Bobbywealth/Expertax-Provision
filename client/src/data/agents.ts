export interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  imageUrl: string;
  credentials: string[];
}

export const agents: Agent[] = [
  {
    id: "sandy-001",
    name: "Sandy",
    title: "Tax Preparation Specialist, CPA",
    bio: "Experienced tax professional specializing in individual and family tax preparation. Dedicated to helping clients maximize their refunds and navigate complex tax situations with ease.",
    email: "sandy@provisionexpertax.com",
    imageUrl: "https://iili.io/KG5hSj4.png",
    credentials: ["CPA", "Individual Tax Prep", "Family Tax Planning"]
  },
  {
    id: "ai-tax-agent-001",
    name: "AI Tax Agent",
    title: "Automated Tax Assistant",
    bio: "Our cutting-edge AI technology provides 24/7 tax assistance, instant calculations, and preliminary tax guidance. Perfect for quick questions and initial tax planning support.",
    email: "ai@provisionexpertax.com",
    imageUrl: "https://iili.io/KEhUXcu.png",
    credentials: ["AI Technology", "24/7 Support", "Tax Calculations", "Quick Assistance"]
  },
  {
    id: "jennifer-001",
    name: "Jennifer Constantino",
    title: "Senior Tax Consultant",
    bio: "Dedicated tax professional based in Hollywood, FL, providing comprehensive tax preparation and consultation services. Committed to delivering personalized solutions for individuals and businesses throughout South Florida.",
    email: "jennconstantino93@gmail.com",
    imageUrl: "https://iili.io/KG5vRR9.png",
    credentials: ["Tax Preparation", "Business Consulting", "Individual Returns"]
  }
];
