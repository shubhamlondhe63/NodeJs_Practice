// laptop.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {
  private apiUrl = 'http://localhost:3000/api/laptops'; // Replace this URL with your Node.js backend URL

  constructor(private http: HttpClient) { }

  getLaptops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addLaptop(laptopData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, laptopData);
  }

  getLaptopById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  updateLaptop(id: string, laptopData: any): Observable<any> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.put<any>(url, laptopData);
  }

  deleteLaptop(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<any>(url);
  }
}
