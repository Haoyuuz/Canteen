import { createOrEditMenu } from './createOrEditMenu';

export class createOrEditMenuModel implements createOrEditMenu {
  id?: string;
  categoryId: string;
  itemName: string;
  itemDesc: string;
  price: number | null;
  stockQuantity: number | null;
  file: File | null;
  imgUrl?: string;

  constructor() {
    this.id = '';
    this.categoryId = '';
    this.itemName = '';
    this.itemDesc = '';
    this.price = null;
    this.stockQuantity = null;
    this.file = null;
    this.imgUrl = '';
  }
}
