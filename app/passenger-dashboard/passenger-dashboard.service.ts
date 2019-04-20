import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Passenger } from './models/passenger.interface';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

const PASSENGER_API: string = '/api/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: Http) {}

  getPassengers = (): Observable<Passenger[]> =>
    this.http.get(PASSENGER_API).map((response: Response) => response.json());

  updatePassenger = (passenger: Passenger): Observable<Passenger> => {
    let headers = new Headers({
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({
      headers: headers,
    });
    return this.http
      .put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
      .map((response: Response) => response.json());
  };

  removePassenger = (passenger: Passenger): Observable<Passenger> =>
    this.http
      .delete(`${PASSENGER_API}/${passenger.id}`)
      .map((response: Response) => response.json());
}
