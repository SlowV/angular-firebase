import firebase from 'firebase/app';
export class Product {
  id: string;
  name: string;
  images: any = [];
  createdAt: Date | firebase.firestore.Timestamp;
  isSelected: boolean;
}
