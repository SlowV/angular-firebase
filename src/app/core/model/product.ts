import firebase from 'firebase/app';
export class Product {
  id: string;
  name: string;
  sku: string;
  price = 0;
  description: string;
  images: {
    name: string;
    url: string;
  }[];
  createdAt: firebase.firestore.Timestamp;
}
