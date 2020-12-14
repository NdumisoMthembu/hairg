import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, User } from 'src/models';
import { BookingItem } from 'src/models/booking.item.model';
import { Booking } from 'src/models/booking.model';
import { TimeSlot } from 'src/models/time.model';
import { AccountService, ProductService } from 'src/services';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  product: Product;
  productSlug: string;
  totalPrice = 0;
  quantity = 0;
  showModal: boolean;
  modalHeading: string;
  orderProducts: Product[];
  booking: Booking;
  bookingItem: BookingItem;
  times: TimeSlot[];
  user: User;
  showBookingDateTime: boolean;
  showSuccess: boolean;
  showDone: boolean;
  selectedTime: TimeSlot;


  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private productService: ProductService,
    private router: Router,


  ) {

  }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    this.product = this.productService.currentProductValue;
    this.booking = this.bookingService.currentBookingValue;

    if (this.booking && this.product) {
      this.bookingItem = {
        BookingItemId: '',
        BookingId: this.booking.BookingId,
        ServiceId: this.product.ProductId,
        ServiceName: this.product.Name,
        ServicePrice: this.product.RegularPrice,
        ServiceQuantity: 1,
        ServiceTotal: this.product.RegularPrice,
        FeaturedImageUrl: this.product.FeaturedImageUrl,
        Status: 'Up coming',
        CreateUserId: '',
        ModifyUserId: '',
        StatusId: 1,
      };

      if (!this.booking.TimeId) {
        this.showBookingDateTime = true;
      }


    }

    this.bookingService.getTimeSlotListSync('zoweh').subscribe(data => {
      if (data && data.length) {
        this.times = data;
        this.times = this.times.filter(x => Number(x.StatusId) === 1 && Number(x.MaxCapacity) > Number(x.CurrentCapacity));
      }
    })

  }

  ngOnChanges() {
    this.updateTotalPrice(this.quantity);
  }
  updateTotalPrice(quantity) {
    if (!quantity) {
      quantity = 1;
    }
    this.quantity = quantity;
    this.totalPrice = this.product.RegularPrice * quantity;
  }


  closeModal() {
    this.showModal = false;
  }
  continueShopping() {
    this.router.navigate(['']);
  }

  onNavItemClicked(event) { }
  selectColor(option) {
    console.log(option);
  }



  selectTime(item: TimeSlot) {
    this.times.map(x => x.Class = []);
    item.Class = ['active'];
    this.booking.StartTime = item.StartTime;
    this.booking.FinishTime = item.FinishTime;
    this.booking.TimeId = item.TimeId;
    this.selectedTime = item;
  }
  book() {
    if (!this.user) {
      this.showModal = true;
      this.modalHeading = 'Please enter your details';
      return;
    }
    this.booking.UserId = this.user.UserId;
    this.booking.CreateUserId = this.user.UserId;
    this.booking.ModifyUserId = this.user.UserId;
    this.bookingService.updateBookingState(this.booking);
    this.addToCart();

  }

  userLoggedInDone(user: User) {
    if (user && user.UserId) {
      this.showModal = false;
      this.user = user;
      this.book();
    }
  }
  back() {
    this.router.navigate(['']);
  }
  bookings() {
    this.router.navigate(['my-bookings']);
  }

  addToCart() {
    if (!this.user) {
      this.showModal = true;
      this.modalHeading = 'Please enter your details';
      return;
    }
    if (this.product && this.booking) {
      this.booking.BookingItems.push(this.bookingItem);
      this.booking.TotalAmount += Number(this.product.RegularPrice);
      this.bookingService.updateBookingState(this.booking);
      this.product.IsBooked = true;
      this.productService.updateProductState(this.product);
      this.addedToCart();
    }
  }

  addedToCart() {
    this.showSuccess = true;
  }
  deleteItem(item: BookingItem, i) {
    this.booking.TotalAmount -= Number(item.ServicePrice);
    this.booking.BookingItems.splice(i, 1);
    this.bookingService.updateBookingState(this.booking);

  }

  cancel() {
    this.bookingService.updateBookingState(null);
    this.back();
  }


  checkout() {
    this.booking.Status = 'Upcoming'
    this.bookingService.add(this.booking).subscribe(data => {
      if (data && data.BookingId) {
        this.updateTimeSlotCurrentCapacity(this.selectedTime, 1);
        this.booking.BookingId = data.BookingId;
        this.bookingService.updateBookingState(this.booking);
        alert('Your booking was successful')
        this.router.navigate(['bookings']);
      }
    });
  }

  updateTimeSlotCurrentCapacity(time: TimeSlot, i) {
    if (time && time.TimeSlotId) {
      time.CurrentCapacity = Number(time.CurrentCapacity) + i;
      this.bookingService.updateTimeSlotListSync(time).subscribe(data => {
        if (data && data.TimeSlotId) {
        }
      });
    }
  }

}
