import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleProductsModel, Product, User } from 'src/models';
import { ProductService, AccountService } from 'src/services';
import { BookingService } from 'src/services/booking.service';
import { ZOWEH } from 'src/shared/constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // @Input() categoryListing: LocaleProductsModel;
  products: Product[];
  user: User;
  modalHeading = 'Add product';
  showModal: boolean;
  showAddCustomer: boolean;
  allProducts: Product[];
  note = `The callout fee is R50.00 and is only available if you are in Empangeni.`;
  howto = `bring and collect your chothes at the following address.`;
  cat = 'saloon';
  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private bookingService: BookingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.productService.productListObservable.subscribe(data => {
      this.allProducts = data;
      this.products = this.allProducts.filter(x => x.ParentCategoryName === 'Saloon');
    });
    this.productService.getProducts(ZOWEH);
  }
  view(product: Product) {
    if (this.bookingService.currentBookingValue) {
      if (this.bookingService.currentBookingValue.BookingItems.find(x => x.ServiceId === product.ProductId)) {
        alert(`product already booked`);
        return false;
      }
      this.productService.updateProductState(product);
      this.router.navigate(['book', product.ProductSlug]);
    } else {
      this.bookingService.updateBookingState({
        BookingId: '',
        UserId: '',
        BookingDate: undefined,
        StartTime: undefined,
        FinishTime: undefined,
        TimeId: undefined,
        Place: 'Zoweh office',
        TotalAmount: 0,
        Status: 'Up coming',
        CreateUserId: '',
        ModifyUserId: '',
        StatusId: 1,
        BookingItems: []
      });
      this.productService.updateProductState(product);
      this.router.navigate(['book', product.ProductSlug]);
    }

  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }

  tab(cat: string) {
    this.cat = cat;
    if (cat === 'carwash') {
      cat = 'Car wash';
      this.note = `Car wash callout service is comming soon across Empangeni.`;

    }
    if (cat === 'laundry') {
      cat = 'Laundry';
      this.note = `Laundry’s pick up and delivery service is comming soon across Empangeni.`;

    }
    if (cat === 'shopping') {
      cat = 'Shopping';
      this.note = `Shopping is comming soon.`;
    }
    if (cat === 'saloon') {
      cat = 'Saloon';
      this.note = `The callout fee is R50.00 and is only available if you are in Empangeni`;
    }
    this.products = this.allProducts.filter(x => x.ParentCategoryName === cat);
  }

}
