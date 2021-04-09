import firebase from 'firebase/app';
export class Product {
  id: string;
  name: string;
  images: string[] = [];
  createdAt: Date | firebase.firestore.Timestamp;
  isSelected: boolean;
}
