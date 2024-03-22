import { Component, OnInit } from '@angular/core';
import { FlightFilter } from '../flight-filter';
import { FlightService } from '../flight.service';
import { Family } from '../models';

@Component({
  selector: 'app-flight',
  templateUrl: 'flight-list.component.html'
})
export class FlightListComponent implements OnInit {

  filter = new FlightFilter();
  selectedFlight!: Family;
  feedback: any = {};

  get flightList(): Family[] {
    return this.flightService.flightList;
  }

  constructor(private flightService: FlightService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.flightService.load(this.filter);
  }

  select(selected: Family): void {
    this.selectedFlight = selected;
  }

  delete(flight: Family): void {
    if (confirm('Are you sure?')) {
      this.flightService.delete(flight).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
