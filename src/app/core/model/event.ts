import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export class Event {
  id: string;
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  reduce: number;
  createdBy: string;
  status: EventStatus.KHOA;
}

enum EventStatus {
  HOAT_DONG,
  KHOA
}
