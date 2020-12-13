import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GET_PRODUCTS_URL, GET_PRODUCT_URL } from 'src/shared/constants';
import { Product } from 'src/models/product.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {



  private productListBehaviorSubject: BehaviorSubject<Product[]>;
  public productListObservable: Observable<Product[]>;

  private productBehaviorSubject: BehaviorSubject<Product>;
  public productObservable: Observable<Product>;
  url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.productListBehaviorSubject = new BehaviorSubject<Product[]>(JSON.parse(localStorage.getItem('ProductsList')) || []);
    this.productBehaviorSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('currentProduct')) || null);
    this.productListObservable = this.productListBehaviorSubject.asObservable();
    this.productObservable = this.productBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentProductValue(): Product {
    return this.productBehaviorSubject.value;
  }

  updateProductListState(grades: Product[]) {
    this.productListBehaviorSubject.next(grades);
    localStorage.setItem('ProductsList', JSON.stringify(grades));
  }
  updateProductState(product: Product) {
    this.productBehaviorSubject.next(product);
    localStorage.setItem('currentProduct', JSON.stringify(product));
  }
  add(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/add-product.php`, product);
  }
  update(product: Product) {
    return this.http.post<Product>(`${this.url}/api/product/update-product.php`, product);
  }
  getProducts(companyId: string) {
    this.http.get<Product[]>(`${this.url}/${GET_PRODUCTS_URL}?CompanyId=${companyId}`).subscribe(data => {
      this.updateProductListState(data || []);
    });
  }

  getProduct(ProductId: string) {
    this.http.get<Product>(`${this.url}/${GET_PRODUCT_URL}?ProductId=${ProductId}`).subscribe(data => {
      if (data) {
        this.updateProductState(data);
      }
    });
  }


  getProductSync(ProductId: string) {
    return this.http.get<Product>(`${this.url}/${GET_PRODUCT_URL}?ProductId=${ProductId}`);
  }


  generateSlug(company: string, name: string, code: string): string {
    let slug = name.toLocaleLowerCase().split(' ').join('-');
    slug = `${code.toLocaleLowerCase()}-${slug}`;
    slug = `${company.toLocaleLowerCase().split(' ').join('-')}-${slug}`;
    return slug;
  }



}
