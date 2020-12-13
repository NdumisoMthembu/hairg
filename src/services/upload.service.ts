import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private uploadBehaviorSubject: BehaviorSubject<string>;
  public uploadObservable: Observable<string>;
  url: string;


  private stringBehaviorSubject: BehaviorSubject<string>;
  public stringObservable: Observable<string>;

  constructor(
    private http: HttpClient,
  ) {
    this.uploadBehaviorSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('upload')) || []);
    this.uploadObservable = this.uploadBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }


  uploadFile(formData): Observable<any> {
    return this.http.post<any>(`${this.url}/api/upload/upload.php`,
      formData
    );
  }

}
