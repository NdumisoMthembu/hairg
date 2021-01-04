import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/models/booking.model';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  showLoader;
  heading = 'My Profile';
  isSignUp = true;
  error: string;
  booking: Booking;
  constructor(
    private router: Router,
    private bookingService: BookingService,

  ) { }

  ngOnInit() {
  this.booking = this.bookingService.currentBookingValue;


  }


  back() {
    this.router.navigate([``]);
  }
  Pay(){
    this.booking.Status = 'Paid'
    this.bookingService.update(this.booking).subscribe(data => {
      if (data && data.BookingId) {
        this.booking.BookingId = data.BookingId;
        this.bookingService.updateBookingState(null);
        this.router.navigate(['bookings']);
      }
    });
  }
}
