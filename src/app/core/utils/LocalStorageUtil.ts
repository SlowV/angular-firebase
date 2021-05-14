export class LocalStorageUtil {
  static getData<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  static setData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
