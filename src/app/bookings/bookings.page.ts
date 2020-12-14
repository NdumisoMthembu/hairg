import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models';
import { Booking } from 'src/models/booking.model';
import { AccountService } from 'src/services';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  user: User;

  constructor(
    private accountService: AccountService,
    private bookingService: BookingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.bookings = this.bookingService.currentBookingListValue;
    this.user = this.accountService.currentUserValue;
    this.bookingService.getBookingsByUserIdSync('all').subscribe(data => {
      if (data) {
        this.bookings = data;
      }
    });
  }

  back() {
    this.router.navigate(['']);
  }

  cancel(){}

}
