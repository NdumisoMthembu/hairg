import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product, User } from 'src/models';
import { ProductService, AccountService, UploadService } from 'src/services';
import { BookingService } from 'src/services/booking.service';
import { ZOWEH } from 'src/shared/constants';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  list = true;
  isAdd: boolean;
  products: Product[];
  user: User;
  modalHeading = 'Add product';
  showModal: boolean;
  showAddCustomer: boolean;
  allProducts: Product[];
  note = `The callout fee is R50.00 and is only available if you are in Empangeni.`;
  howto = `bring and collect your chothes at the following address.`;
  cat = 'saloon';
  service: Product;
  constructor(
    private productService: ProductService,
    private accountService: AccountService,
    private bookingService: BookingService,
    private uploadService: UploadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.loadServices();
  }

  loadServices() {
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
    }
    this.isAdd = !this.isAdd;
    this.service = product;
    this.list = !this.list;
  }
  closeModal() {
    this.showModal = false;
    this.showAddCustomer = false;
  }

  add() {
    this.isAdd = !this.isAdd;
    this.list = !this.list;
    this.service = {
      ProductId: '',
      CompanyId: 'hairgicia',
      Name: '',
      RegularPrice: 0,
      PriceFrom: 0,
      PriceTo: 0,
      Description: '',
      ProductSlug: '',
      CatergoryId: 0,
      ParentCategoryId: 0,
      CategoryName: 'Show to customer',
      ParentCategoryName: 'Saloon',
      FeaturedImageUrl: '',
      IsJustInTime: '',
      Notes: '',
      ProductType: '',
      Code: '',
      CreateDate: '',
      CreateUserId: 'hairgicia',
      ModifyDate: '',
      ModifyUserId: 'hairgicia',
      StatusId: 1,
    };
  }


  public uploadFile = (files: FileList) => {
    if (files.length === 0) {
      return;
    }

    Array.from(files).forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', `tybo.${file.name.split('.')[file.name.split('.').length - 1]}`); // file extention
      this.uploadService.uploadFile(formData).subscribe(url => {
        this.service.FeaturedImageUrl = `${environment.API_URL}/api/upload/${url}`;
      });

    });
  }

  saveProduct() {
    this.service.ProductSlug = this.productService.generateSlug(ZOWEH, this.service.Name, '');
    if (this.service.ProductId && this.service.CreateDate) {
      this.productService.update(this.service).subscribe(data => {
        if (data && data.ProductId) {
          this.loadServices();
          alert('Service updated');
          this.add();
          this.service
        }
      });
    } else {
      this.productService.add(this.service).subscribe(data => {
        if (data) {
          this.loadServices();
          alert('Service updated');
          this.add();
          this.service;

        }
      });
    }
  }

}
