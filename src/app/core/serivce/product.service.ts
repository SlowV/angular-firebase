import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import firebase from 'firebase';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly FIELD_NAME = 'name';
  private readonly FIELD_ID = 'id';
  private readonly FIELD_DESCRIPTION = 'description';
  private readonly FIELD_CREATED_AT = 'createdAt';
  private readonly path = '/product';

  productRef: AngularFirestoreCollection<Product> = null;
  storageRef: AngularFireStorageReference = null;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.productRef = afs.collection(this.path, ref => ref.orderBy('createdAt', 'desc'));
  }

  getAll(val?: string, date?: any): Observable<Product[]> {
    if (val !== null) {
      this.productRef.ref
        .where(this.FIELD_NAME, '==', `%${val}%`)
        .where(this.FIELD_DESCRIPTION, '==', `%${val}%`);
    }
    if (date !== null) {
      this.productRef.ref.where(this.FIELD_CREATED_AT, '<=', date.start);
      this.productRef.ref.where(this.FIELD_CREATED_AT, '>=', date.end);
    }
    return this.productRef.valueChanges({
      idField: this.FIELD_ID
    });
  }

  getById(id: string): Observable<Product> {
    return this.productRef.doc<Product>(id).valueChanges({
      idField: this.FIELD_ID
    });
  }

  update(key: string, product: Product): Promise<void> {
    return this.productRef.doc(key).update(product);
  }

  deleteById(key: string): Promise<void> {
    return this.productRef.doc(key).delete();
  }

  save(product: Product): Promise<DocumentReference<Product>> {
    console.log('SERVICE', product);
    return this.productRef.add({...product});
  }

  private async uploadImage(file: File): Promise<AngularFireUploadTask> {
    this.storageRef = this.storage.ref(`${this.path}/${Date.now()}`);
    return this.storageRef.put(file).snapshotChanges().toPromise();
  }

  deleteImage(fullPath): Observable<any> {
    this.storageRef = this.storage.ref(fullPath);
    return this.storageRef.delete();
  }

  async uploadFiles(files: File[]): Promise<{ name: string, url: string }[]> {
    const tasks = files.map(async (file) => {
      const task = await this.uploadImage(file);
      return task.ref.getDownloadURL().then(url => {
        return {
          name: task.metadata.fullPath,
          url
        };
      });
    });
    return await Promise.all(tasks);
  }
}
