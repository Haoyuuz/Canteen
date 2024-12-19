export interface createOrEditMenu {
  id?: string; // GUID is usually represented as a string in TypeScript
  categoryId: string; // GUID as string
  itemName: string;
  itemDesc: string;
  price: number | null;
  stockQuantity: number | null;
  file: File | null; // File type for handling file uploads
  imgUrl?: string;
}
