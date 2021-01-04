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
    this.accountService.user.subscribe(data => {
      if (data) {
        this.user = data;
      }
    })
    if (!this.user) {
      this.router.navigate([`login`]);
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
    this.isSignUp = true;
    this.heading = 'Sign up'
  }

  logout() {
    this.user = null;
    this.accountService.updateUserState(this.user);
    this.router.navigate(['']);
  }

}
