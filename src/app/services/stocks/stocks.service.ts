import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, combineLatest, distinctUntilChanged, switchMap } from 'rxjs';
import { IStocksData } from 'src/app/interfaces/stocks';
import { ApiService } from '../api/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  public stocks$ = new BehaviorSubject<IStocksData[]>([]);
  public page_number$ = new ReplaySubject<number>(1);
  public per_page$ = new Subject<number>();
  public stocks_loading$ = new ReplaySubject<boolean>(1);

  constructor(public api: ApiService) {
    combineLatest([this.page_number$, this.per_page$]).pipe(
      takeUntilDestroyed(),
      distinctUntilChanged(),
      switchMap(([page_number, per_page]) => {
        this.stocks$.next([]);
        this.stocks_loading$.next(true);
        return this.api.getStocksData(page_number, per_page);
      })
    ).subscribe((stocks_data) => {
      this.stocks$.next(stocks_data);
      this.stocks_loading$.next(false);
    });
  }
}
