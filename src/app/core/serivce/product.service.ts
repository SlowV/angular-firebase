import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, CollectionReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import firebase from 'firebase';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import DocumentReference = firebase.firestore.DocumentReference;
import Query = firebase.firestore.Query;
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly FIELD_NAME = 'name';
  private readonly FIELD_ID = 'id';
  private readonly FIELD_DESCRIPTION = 'description';
  private readonly FIELD_CREATED_AT = 'createdAt';
  private readonly path = '/product';
  private storageRef: AngularFireStorageReference = null;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
  }

  private buildRefBase(): AngularFirestoreCollection<Product> {
    return this.afs.collection(this.path, ref => ref.orderBy(this.FIELD_CREATED_AT, 'desc'));
  }

  getAll(limit: number = null): Observable<Product[]> {
    return this.afs.collection<Product>(this.path, (ref: CollectionReference<DocumentData>) => {
      let query: CollectionReference<DocumentData> | Query<DocumentData> = ref;
      if (limit) {
        query = query.limit(limit);
      }
      return query.orderBy(this.FIELD_CREATED_AT, 'desc');
    }).valueChanges({
      idField: this.FIELD_ID
    });
  }

  getById(id: string): Observable<Product> {
    return this.buildRefBase().doc<Product>(id).valueChanges({
      idField: this.FIELD_ID
    });
  }

  update(key: string, product: Product): Promise<void> {
    return this.buildRefBase().doc(key).update(product);
  }

  deleteById(key: string): Promise<void> {
    return this.buildRefBase().doc(key).delete();
  }

  save(product: Product): Promise<DocumentReference<Product>> {
    return this.buildRefBase().add({...product});
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
    const tasks = files.map(async (file: File) => {
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
