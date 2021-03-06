import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel, Email, User } from 'src/models';
import { Booking } from 'src/models/booking.model';
import { AccountService, EmailService } from 'src/services';
import { BookingService } from 'src/services/booking.service';
import { CUSTOMER, SYSTEM } from 'src/shared/constants';
import { IS_DELETED_FALSE, AWAITING_ACTIVATION } from 'src/shared/status.const';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

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
    this.bookingService.getBookingsByUserIdSync(this.user.UserId).subscribe(data => {
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
