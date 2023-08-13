class LocalStorageKeys {
  public static readonly STOCKS_PER_PAGE = 'stocks_per_page';
  public static readonly STOCKS_PAGE_NUMBER = 'stocks_page_number';
}

class DefaultPagination {
  public static readonly PER_PAGE = 10;
  public static readonly PAGE_NUMBER = 1;
}

export class Constants {
  public static readonly LOCAL_STORAGE_KEYS = LocalStorageKeys;
  public static readonly DEFAULT_PAGINATION = DefaultPagination;
}
