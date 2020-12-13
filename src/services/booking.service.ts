import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Booking } from 'src/models/booking.model';
import { TimeSlot } from 'src/models/time.model';


@Injectable({
  providedIn: 'root'
})
export class BookingService {



  private bookingListBehaviorSubject: BehaviorSubject<Booking[]>;
  public bookingListObservable: Observable<Booking[]>;

  private bookingBehaviorSubject: BehaviorSubject<Booking>;
  public bookingObservable: Observable<Booking>;
  url: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.bookingListBehaviorSubject = new BehaviorSubject<Booking[]>(JSON.parse(localStorage.getItem('BookingsList')) || []);
    this.bookingBehaviorSubject = new BehaviorSubject<Booking>(JSON.parse(localStorage.getItem('currentBooking')) || null);
    this.bookingListObservable = this.bookingListBehaviorSubject.asObservable();
    this.bookingObservable = this.bookingBehaviorSubject.asObservable();
    this.url = environment.API_URL;
  }

  public get currentBookingValue(): Booking {
    return this.bookingBehaviorSubject.value;
  }
  public get currentBookingListValue(): Booking[] {
    return this.bookingListBehaviorSubject.value;
  }

  updateBookingListState(Bookings: Booking[]) {
    this.bookingListBehaviorSubject.next(Bookings);
    localStorage.setItem('BookingsList', JSON.stringify(Bookings));
  }
  updateBookingState(booking: Booking) {
    this.bookingBehaviorSubject.next(booking);
    localStorage.setItem('currentBooking', JSON.stringify(booking));
  }
  add(booking: Booking) {
    return this.http.post<Booking>(`${this.url}/api/booking/add-booking.php`, booking);
  }
  update(booking: Booking) {
    return this.http.post<Booking>(`${this.url}/api/booking/update-booking.php`, booking);
  }
  getBookings(companyId: string) {
    this.http.get<Booking[]>(`${this.url}/api/booking/get-booking.php?CompanyId=${companyId}`).subscribe(data => {
      if (data) {
        this.updateBookingListState(data);
      }
    });
  }

  getBooking(bookingId: string) {
    this.http.get<Booking>(`${this.url}/api/booking/get-booking.php?BookingId=${bookingId}`).subscribe(data => {
      if (data) {
        this.updateBookingState(data);
      }
    });
  }


  getBookingSync(bookingId: string) {
    return this.http.get<Booking>(`${this.url}/api/booking/get-booking.php?BookingId=${bookingId}`);
  }
  getTimeSlotListSync(companyId: string) {
    return this.http.get<TimeSlot[]>(`${this.url}/api/timeslot/get-by-company-id.php?CompanyId=${companyId}`);
  }
  updateTimeSlotListSync(timeSlot: TimeSlot) {
    return this.http.post<TimeSlot>(`${this.url}/api/timeslot/update-time-slot.php`,timeSlot);  }

  getBookingsByUserIdSync(userId: string) {
    return this.http.get<Booking[]>(`${this.url}/api/booking/get-bookings-for-user.php?UserId=${userId}`);
  }


}
