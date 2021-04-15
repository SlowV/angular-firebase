import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import DocumentReference = firebase.firestore.DocumentReference;
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly path = '/product';

  productRef: AngularFirestoreCollection<Product> = null;
  storageRef: AngularFireStorageReference = null;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.productRef = afs.collection(this.path, ref => ref.orderBy('createdAt', 'desc'));
  }

  getAll(): Observable<Product[]> {
    return this.productRef.valueChanges({
      idField: 'id'
    });
  }

  getById(id: string): Observable<Product> {
    return this.productRef.doc<Product>(id).valueChanges({
      idField: 'id'
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

  getStorageRef(): AngularFireStorageReference {
    return this.storageRef;
  }

  deleteImage(fullPath): Observable<any> {
    this.storageRef = this.storage.ref(fullPath);
    return this.storageRef.delete();
  }

  async uploadFiles(files: File[]): Promise<{ name: string, url: string }[]> {
    console.log('START ', 'task upload Image');
    const tasks = files.map(async (file) => {
      const task = await this.uploadImage(file);
      console.log('INSIDE ', 'task upload Image');
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
