import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { menuServices } from 'src/servicesv2/menu-services/menu-services';
import { getMenuModel } from 'src/model/menu/getAllOrGetById-menu.model';
import { getMenu } from 'src/model/menu/getAllOrGetById-menu';
import { BestsellerCarouselComponent } from '../bestseller-carousel/bestseller-carousel.component';
import { getAllCategory } from 'src/model/menu/getAllCategory';
import { getMenuItemById } from 'src/model/menu/getItemMenuById';
import { ToastrService } from 'ngx-toastr';
import { PaymentComponent } from '../payment/payment.component';
import { ToastrServComponent } from 'src/servicesv2/toastr-serv/toastr-serv/toastr-serv.component';
import { authservice } from 'src/servicesv2/user-services/auth-service';

interface CartItem {
  id: string; // Adjust the type based on your actual ID type
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    MatCardModule,
    MatChipsModule,
    TablerIconsModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    BestsellerCarouselComponent,
    PaymentComponent,
    ToastrServComponent,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserDashboardComponent implements OnInit {
  @ViewChild(PaymentComponent) paymentModal!: PaymentComponent;
  @ViewChild(ToastrServComponent) toastrComp!: ToastrServComponent;
  // @ViewChild(authservice) authserv!: authservice;

  constructor(
    private menuServ: menuServices,
    private toastr: ToastrService,
    private authserv: authservice
  ) {}

  alertThis: string;

  ngOnInit() {
    this.displayMenu();
    this.getMenuCategory();
    this.getCartItems();
    this.updateCartData();
  }

  data: getMenuModel[] = [];
  id: string = '';

  getMenu(id: string) {
    this.menuServ.getAllOrGetById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.data = res.data;
          console.log(this.data);
        }
      },
    });
  }

  menuCat: getAllCategory[] = [];
  getMenuCategory() {
    this.menuServ.getAllCategory().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.menuCat = res.data;
        }
      },
    });
  }

  onCategoryChange(id: string) {
    this.getMenu(id);
  }

  dataMenuItem: getMenuItemById;

  onGetMenuItemById(id: string) {
    this.menuServ.getMenuById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataMenuItem = res.data;
        }
      },
    });
  }

  addToCart() {
    if (!this.dataMenuItem) return;

    // Retrieve the cart items with expiration check
    const itemStr = localStorage.getItem('cartItems');
    const storedItem = itemStr ? JSON.parse(itemStr) : null;

    let cartItems = storedItem && storedItem.value ? storedItem.value : []; // Access the value property

    const cartItem = {
      id: this.dataMenuItem.id,
      name: this.dataMenuItem.itemName,
      description: this.dataMenuItem.itemDesc,
      price: this.dataMenuItem.price,
      quantity: this.foodQty, // Use the current quantity
      imageUrl: this.dataMenuItem.imgUrl,
    };

    const existingItemIndex = cartItems.findIndex(
      (item: any) => item.id === cartItem.id
    );

    if (existingItemIndex > -1) {
      // If the item exists, update the quantity
      cartItems[existingItemIndex].quantity += this.foodQty;
    } else {
      // If the item doesn't exist, add it to the cart
      cartItems.push(cartItem);
    }

    const now = new Date();
    const expiryTime = now.getTime() + 1000 * 60 * 60 * 8; // Expires in 8hours in seconds
    // const expiryTime = now.getTime() + 1000 * 60 * 2; // 2 minutes

    const itemWithExpiry = {
      value: cartItems,
      expiry: expiryTime,
    };

    // Save the updated cart back to local storage
    localStorage.setItem('cartItems', JSON.stringify(itemWithExpiry));

    this.toastrComp.showtoastr('Success', 'Item added to cart!');
    this.updateCartData();
    this.sidebarVisible2 = false;
  }

  updateCartData() {
    this.cartData = this.getCartItems();
  }

  cartData = { items: [] as CartItem[], totalPrice: 0 };

  getCartItems() {
    const itemStr = localStorage.getItem('cartItems');

    if (!itemStr) {
      return { items: [], totalPrice: 0 };
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Check if the item is expired
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('cartItems');
      return { items: [], totalPrice: 0 };
    }

    const cartItems: CartItem[] = item.value;

    // Calculate total price
    const totalPrice: number = cartItems.reduce(
      (total: number, cartItem: CartItem) =>
        total + cartItem.price * cartItem.quantity,
      0
    );

    return { items: cartItems, totalPrice };
  }

  // THIS IS FOR VIEW CART ITEM DECREASE OR INCREASE QUANTITY
  changeQuantity(item: CartItem, change: number): void {
    const { items: cartItems }: { items: CartItem[]; totalPrice: number } =
      this.getCartItems();

    const itemIndex = cartItems.findIndex(
      (cartItem: CartItem) => cartItem.id === item.id
    );

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += change;

      // Remove item if quantity is zero or negative
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }

      // Save the updated cart back to local storage
      const now = new Date();
      const expiryTime = now.getTime() + 1000 * 60 * 60 * 8; // 8 hours

      console.log('Expiry time in ms:', expiryTime);

      const itemWithExpiry = {
        value: cartItems,
        expiry: expiryTime,
      };

      localStorage.setItem('cartItems', JSON.stringify(itemWithExpiry));
      this.updateCartData(); // Update cart data after changing quantity
    }
  }

  // Reset cart data
  resetCartData() {
    this.cartData = { items: [] as CartItem[], totalPrice: 0 };
  }

  // THIS IS FOR SIDEBAR ITEM DECREASE OR INCREASE QUANTITY
  foodQty: number = 1;

  decreaseQty() {
    if (this.foodQty > 1) {
      this.foodQty--;
    }
  }

  increaseQty() {
    this.foodQty++;
  }

  onPayment() {
    this.paymentModal.showDialog();

    this.visible = false;
  }

  displayMenu() {
    const id = '';
    this.getMenu(id);
  }

  visible: boolean = false;
  sidebarVisible2: boolean = false;

  showDialog() {
    this.visible = true;
  }

  openRightSideBar(id: string) {
    this.sidebarVisible2 = true;
    this.foodQty = 1;
    this.onGetMenuItemById(id);
  }

  cartItems: string[] = [];
  cartQty: string[] = [];

  currentPage = 1;
  itemsPerPage = 9;

  // Calculate total pages for the menu
  get totalMenuPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  // Handle page change
  changePage(page: number) {
    if (page >= 1 && page <= this.totalMenuPages) {
      this.currentPage = page;
    }
  }
}
