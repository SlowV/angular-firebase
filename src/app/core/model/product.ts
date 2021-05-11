import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

export class Product {
  id: string;
  name = '';
  sku = '';
  price = 0;
  quantity = 0;
  description = '';
  images: {
    name: string;
    url: string;
  }[];
  createdAt: Timestamp = Timestamp.fromDate(new Date());
  updatedAt: Timestamp = Timestamp.fromDate(new Date());
  createdBy = '';
  updatedBy = '';
}
