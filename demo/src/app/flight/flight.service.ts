import { Family } from './models';
import { FlightFilter } from './flight-filter';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class FlightService {
  flightList: Family[] = [];

  constructor(private http: HttpClient) {
  }

  findById(id: string): Observable<Family> {
    const url = `http://www.angular.at/api/flight/${id}`;
    const params = { 'id': id };
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<Family>(url, {params, headers});
  }

  load(filter: FlightFilter): void {
    this.find(filter).subscribe(result => {
        this.flightList = result;
      },
      err => {
        console.error('error loading', err);
      }
    );
  }

  find(filter: FlightFilter): Observable<Family[]> {
    const url = `http://www.angular.at/api/flight`;
    const headers = new HttpHeaders().set('Accept', 'application/json');

    const params = {
      'from': filter.from,
      'to': filter.to,
    };

    return this.http.get<Family[]>(url, {params, headers});
  }

  save(entity: Family): Observable<Family> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.tenantName) {
      url = `http://www.angular.at/api/flight/${entity.tenantName}`;
      params = new HttpParams().set('ID', entity.tenantName);
      return this.http.put<Family>(url, entity, {headers, params});
    } else {
      url = `http://www.angular.at/api/flight`;
      return this.http.post<Family>(url, entity, {headers, params});
    }
  }

  delete(entity: Family): Observable<Family> {
    let params = new HttpParams();
    let url = '';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    if (entity.tenantName) {
      url = `http://www.angular.at/api/flight/${entity.tenantName}`;
      params = new HttpParams().set('ID', entity.tenantName);
      return this.http.delete<Family>(url, {headers, params});
    }
    return EMPTY;
  }
}

