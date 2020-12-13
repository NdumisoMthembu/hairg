import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from 'src/models/email.model';
import { Product } from 'src/models/product.model';
import { EmailService } from 'src/services/communication';
import { ProductService } from 'src/services/product.service';
import { STATUS_PENDING_PAYMENTS, STATUS_ACTIVE } from 'src/shared/constants';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.scss']
})
export class ProductProfileComponent implements OnInit {

  @Input() product: Product;
  current: Product;
  showModal: boolean;
  showConfirm: boolean;
  modalHeading: string;
  modalBody: string;
  modalCTA: string;
  showLoader: boolean;
  constructor(
    private emailService: EmailService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
  }
  productStatusChanged(product: Product) {
    this.current = product;
    this.showModal = true;
    this.showConfirm = true;
    this.modalHeading = 'Update student access'
    if (Number(product.StatusId) === STATUS_PENDING_PAYMENTS) {
      this.modalBody = `The student access will be locked`;
      this.modalCTA = `Lock student access`;
    }
  }

  updateStatus() {
    // this.showLoader = true;
    // this.productService
  }

  cancelStatusChange() {
    this.closeModal();
    this.ngOnInit();
  }

  closeModal() {
    this.showModal = false;
    this.showConfirm = false;
  }

}
