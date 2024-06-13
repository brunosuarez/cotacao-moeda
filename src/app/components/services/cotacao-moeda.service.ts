import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CotacaoMoedaService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://economia.awesomeapi.com.br/json/last';
  }

  getCurrentExchangeRateData(currencyCodeFrom: string, currencyCodeTo: string): Observable<any> {
    const url = `${this.baseUrl}/${currencyCodeFrom}-${currencyCodeTo}`;

    return this.http.get<any>(url).pipe(
      map(response => response),
      catchError(error => {
        console.error('Erro na solicitação de taxa de câmbio:', error);
        return throwError(error);
      })
    );
  }
}

