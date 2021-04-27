import firebase from 'firebase/app';

export class Product {
  id: string;
  name: string;
  sku: string;
  price = 0;
  quantity = 0;
  description = '';
  images: {
    name: string;
    url: string;
  }[];
  createdAt: firebase.firestore.Timestamp;
}
