import { getMenu } from './getAllOrGetById-menu';

export class getMenuModel implements getMenu {
  id: string;
  categoryName: string;
  itemName: string;
  itemDesc: string;
  price: number;
  stockQuantity: number;
  imgUrl: string;

  constructor() {
    this.id = '';
    this.categoryName = '';
    this.itemName = '';
    this.itemDesc = '';
    this.price = 0;
    this.stockQuantity = 0;
    this.imgUrl = '';
  }
}
