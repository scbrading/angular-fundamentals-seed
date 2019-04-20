import { Component, OnInit } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';
import { PassengerDashboardService } from '../../passenger-dashboard.service';

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  template: `
    <passenger-count [items]="passengers"></passenger-count>
    <div *ngFor="let passenger of passengers">{{ passenger.fullname }}</div>
    <passenger-detail
      *ngFor="let passenger of passengers"
      [detail]="passenger"
      (edit)="handleEdit($event)"
      (remove)="handleRemove($event)"
    ></passenger-detail>
  `,
})
export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];
  constructor(private passengerService: PassengerDashboardService) {}
  ngOnInit(): void {
    this.passengerService
      .getPassengers()
      .subscribe((data: Passenger[]) => this.passengers = data)
  }

  handleEdit(event: Passenger) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }
      return passenger;
    });
  }

  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      return passenger.id !== event.id;
    });
  }
}
