import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input
          #name
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
        />
      </div>
      <div *ngIf="!editing">{{ detail.fullname }}</div>
      <div class="date">
        Check in date:
        {{
          detail.checkInDate
            ? (detail.checkInDate | date: 'yMMMMd' | uppercase)
            : 'Not checked in'
        }}
      </div>
      <div class="children">Children: {{ detail.children?.length || 0 }}</div>
      <button (click)="toggleEdit()">{{ editing ? 'Done' : 'Edit' }}</button>
      <button (click)="onRemove()">Remove</button>
    </div>
  `,
})
export class PassengerDetailComponent implements OnChanges, OnInit {
  @Input()
  detail: Passenger;
  editing: boolean = false;

  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: { detail: SimpleChange }): void {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  ngOnInit() {
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }
}
