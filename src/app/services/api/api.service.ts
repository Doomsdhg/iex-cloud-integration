import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { IStocksData } from 'src/app/interfaces/stocks';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) {}

  public getStocksData(page: number, limit: number): Promise<IStocksData[]> {
    return firstValueFrom<IStocksData[]>(
      this.http.get<IStocksData[]>(
        `${environment.API_ENDPOINT}?limit=${limit}&offset=${(page - 1) * limit}&token=sk_93284252ed604d3c85b47cb2118995e0`
      )
    );
  }
}
