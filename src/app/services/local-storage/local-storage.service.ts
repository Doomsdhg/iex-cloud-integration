import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getStocksPageNumber(): number {
    return Number(localStorage.getItem(Constants.LOCAL_STORAGE_KEYS.STOCKS_PAGE_NUMBER)) || Constants.DEFAULT_PAGINATION.PAGE_NUMBER;
  }

  public getStocksPerPage(): number {
    return Number(localStorage.getItem(Constants.LOCAL_STORAGE_KEYS.STOCKS_PER_PAGE)) || Constants.DEFAULT_PAGINATION.PER_PAGE;
  }

  public setStocksPageNumber(value: number): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEYS.STOCKS_PAGE_NUMBER, String(value));
  }

  public setStocksPerPage(value: number): void {
    localStorage.setItem(Constants.LOCAL_STORAGE_KEYS.STOCKS_PER_PAGE, String(value));
  }
}
