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

  softDelete(path: string): Observable<any> {
    return this.http.delete(path);
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(
      path,
      body
    );
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
        path,
        JSON.stringify(body)
    );
  }
}
