import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private readonly API = 'http://127.0.0.1:8000/api/contacts';

  constructor(private http: HttpClient) {}

  list(search?: string, page: number = 1): Observable<any> {
    let params = new HttpParams().set('page', page);
    if (search && search.trim().length > 0) params = params.set('search', search.trim());
    return this.http.get<any>(this.API, { params });
  }


  get(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  create(payload: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.API, payload);
  }

  update(id: number, payload: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.API}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
