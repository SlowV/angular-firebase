export class LocalStorageUtil {
  static getData<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
}
