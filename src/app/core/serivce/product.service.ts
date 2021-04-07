import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {map} from 'rxjs/operators';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly dbPath = '/product';

  productRef: AngularFirestoreCollection<Product> = null;

  constructor(private afs: AngularFirestore) {
    this.productRef = afs.collection(this.dbPath, ref => ref.orderBy('createdAt', 'desc'));
  }

  getAll(): Observable<Product[]> {
    return this.productRef.valueChanges({
      idField: 'id'
    });
  }

  getById(id: string): Observable<Product> {
    return this.productRef.doc<Product>().valueChanges().pipe(
      map(product => {
        return {
          ...product,
          id
        } as Product;
      })
    );
  }

  update(key: string, product: Product): Promise<void> {
    return this.productRef.doc(key).update(product);
  }

  deleteById(key: string): Promise<void> {
    return this.productRef.doc(key).delete();
  }

  save(product: Product): Promise<DocumentReference<Product>> {
    return this.productRef.add({...product});
  }

}
