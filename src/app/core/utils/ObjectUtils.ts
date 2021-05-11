export class ObjectUtils {
  static isEqualData<T>(obj1: T, obj2: T): boolean {
    Object.keys(obj1).forEach(key => {
      console.log('Compare ', obj1[key], obj2[key]);
      if (obj1[key] !== obj2[key]) {
        console.log('Vào đây');
        return false;
      }
    });
    return true;
  }

  static convertDataToNewObject<T>(obj: T): T {
    const t = {} as T;
    Object.keys(obj).forEach(key => {
      t[key] = obj[key];
    });
    return t;
  }
}
