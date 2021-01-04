import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models';
import { Booking } from 'src/models/booking.model';
import { UploadService, UserService, AccountService } from 'src/services';
import { BookingService } from 'src/services/booking.service';
import { ADMIN } from 'src/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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


  back() {
    this.router.navigate([``]);
  }
  dashboard() {
    this.router.navigate([`dashboard`]);
  }

  dologin() {
    this.isSignUp = false;
    this.heading = 'Login now'
  }
  doreg() {
    this.router.navigate([`register`]);
  }
  Login() {
    this.showLoader = true;
    this.accountService.login({ email: this.user.Email, password: this.user.Password }).subscribe(user => {
      if (user && user.UserId) {
        this.error = '';
        this.accountService.updateUserState(user);
        if (user.UserType === ADMIN) {
          this.router.navigate(['dashboard']);
        } else {
          const booking: Booking = this.bookingService.currentBookingValue;
          if (booking && booking.UserId) {
            booking.UserId = user.UserId;
            booking.Customer = user;
            this.bookingService.updateBookingState(booking);

          }
          this.router.navigate(['']);
        }
        this.showLoader = false;
      }
      else {
        let err: any = user;
        this.error = err + '. , Or contact us if you did not get the mail.' || 'your email or password is incorrect';
        this.showLoader = false;
      }
    });
  }

  logout() {
    this.user = null;
    this.accountService.updateUserState(this.user);
    this.router.navigate(['']);
  }

}
