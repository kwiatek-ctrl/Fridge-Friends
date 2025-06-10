export type PantryItemType = {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    location: string;
    category?: string;
    expiryDate: string;
  };