import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models';
import { Booking } from 'src/models/booking.model';
import { UploadService, UserService, AccountService } from 'src/services';
import { BookingService } from 'src/services/booking.service';
import { ADMIN } from 'src/shared/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;
  showLoader;
  heading = 'My Profile';
  isSignUp = true;
  error: string;
  constructor(
    private uploadService: UploadService,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router,
    private bookingService: BookingService,

  ) { }

  ngOnInit() {
    this.user = this.accountService.currentUserValue;
    if (!this.user) {
      this.user = {
        UserId: '',
        CompanyId: 'hairgicia',
        UserType: 'Customer',
        Name: '',
        Surname: '',
        Email: '',
        PhoneNumber: '',
        Password: 'notset',
        Dp: '',
        CreateUserId: 'hairgicia',
        ModifyUserId: 'hairgicia',
        StatusId: '1',
        UserToken: ''
      };
      this.heading = 'Sign up';

    }

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
        this.user.Dp = `${environment.API_URL}/api/upload/${url}`;
      });

    });
  }

  save() {
    if (this.user.UserId && this.user.UserId.length > 5) {
      this.userService.updateUser(this.user);
      alert('Customer account updated');
      this.back();
    }
    else {
      this.userService.add(this.user).subscribe(data => {
        console.log(data);
        if (data && data.UserId) {
          let user = data;
          alert('Customer account created');
          const booking: Booking = this.bookingService.currentBookingValue;
          if (booking && booking.UserId) {
            booking.UserId = user.UserId;
            booking.Customer = user;
            this.bookingService.updateBookingState(booking);
          }
        }

        this.back();
      });
    }
  }
  back() {
    this.router.navigate([``]);
  }
  dashboard() {
    this.router.navigate([`dashboard`]);
  }

  dologin() {
    this.router.navigate([`login`]);
  }


  logout() {
    this.user = null;
    this.accountService.updateUserState(this.user);
    this.router.navigate(['']);
  }


}
