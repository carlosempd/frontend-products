import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(
    path: string,
    params?: HttpParams,
    headers?: HttpHeaders
  ): Observable<any> {
    const p = new HttpParams({ fromString: params?.toString() });
		return this.http.get(
			path,
			{ params: p, headers }
		)
	}
}
