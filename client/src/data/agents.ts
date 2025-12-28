export interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  imageUrl: string;
  credentials: string[];
}

export const agents: Agent[] = [
  {
    id: "sandy-001",
    name: "Alexandra Isaac",
    title: "Tax specialist Master EFIN",
    bio: "Experienced tax professional specializing in individual and family tax preparation. Dedicated to helping clients maximize their refunds and navigate complex tax situations with ease.",
    email: "Isaacalexandra.ststaxrepair@gmail.com",
    phone: "786-352-2038",
    imageUrl: "https://iili.io/f1vE9Qp.jpg",
    credentials: ["Master EFIN", "Individual Tax Prep", "Family Tax Planning"]
  },
  {
    id: "jennifer-001",
    name: "Jennifer Constantino",
    title: "Tax specialist Master EFIN",
    bio: "Dedicated tax professional based in Hollywood, FL, providing comprehensive tax preparation and consultation services. Committed to delivering personalized solutions for individuals and businesses throughout South Florida.",
    email: "jennconstantino93@gmail.com",
    phone: "(954) 629-6424",
    imageUrl: "https://iili.io/f1vNNN1.jpg",
    credentials: ["Master EFIN", "Tax Preparation", "Business Consulting"]
  }
];
