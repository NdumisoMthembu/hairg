import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/models';
import { AccountService, UploadService, UserService } from 'src/services';
import { ADMIN } from 'src/shared/constants';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
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
        alert('Customer account created');
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
    this.isSignUp = false;
    this.heading = 'Login now'
  }
  doreg() {
    this.isSignUp = true;
    this.heading = 'Sign up'
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
