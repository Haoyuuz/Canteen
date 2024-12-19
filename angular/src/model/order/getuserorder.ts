export interface userOrderModel {
  orderDate: string;
  paymentMethod: string;
  totalAmount: number;
  amountPaid: number;
  status: number;
  orderNum: string;
  items: orderItem[];
  userLogs: userorderlogs[];
}

export interface orderItem {
  categoryName: string;
  itemName: string;
  price: number;
  quantity: number;
}

export interface userorderlogs {
  logsDescription: string;
  creationTime: string;
}
