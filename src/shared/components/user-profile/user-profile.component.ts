import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from 'src/models/email.model';
import { User } from 'src/models/user.model';
import { EmailService } from 'src/services/communication';
import { UserService } from 'src/services/user.service';
import { STATUS_ACTIVE, STATUS_PENDING_PAYMENTS } from 'src/shared/constants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  current: User;
  showModal: boolean;
  showConfirm: boolean;
  modalHeading: string;
  modalBody: string;
  modalCTA: string;
  showLoader: boolean;
  constructor(
    private emailService: EmailService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }
  learnerStatusChanged(user: User) {
    this.current = user;
    this.showModal = true;
    this.showConfirm = true;
    this.modalHeading = 'Update student access'
    if (Number(user.StatusId) === STATUS_PENDING_PAYMENTS) {
      this.modalBody = `The student access will be locked`;
      this.modalCTA = `Lock student access`;
    }
    if (Number(user.StatusId) === STATUS_ACTIVE) {
      this.modalBody = `The student access will activated!`;
      this.modalCTA = `Grant student access`;
    }
  }

  updateStatus() {
    this.showLoader = true;
    this.userService.updateUser(this.user);
  }

  cancelStatusChange() {
    this.closeModal();
    this.ngOnInit();
  }

  closeModal() {
    this.showModal = false;
    this.showConfirm = false;
  }

  sendEmail(subject, body, data: User) {
    const emailToSend: Email = {
      Email: data.Email,
      Subject: subject,
      Message: body,
      Link: environment.BASE_URL,
      UserFullName: data.Name
    };
    this.showLoader = true;
    this.emailService.sendGeneralTextEmail(emailToSend)
      .subscribe(response => {
        if (response > 0) {
          alert('User saved,  And email was send to ' + data.Name);
        }
      });
  }

}
