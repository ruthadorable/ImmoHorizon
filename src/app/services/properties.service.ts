import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties : Observable<Property[]>;

  constructor(private http: HttpClient) { }

  getProperties() {
    this.properties = this.http.get('http://localhost:8080/api/properties');
  }
}
