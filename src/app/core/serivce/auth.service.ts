import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {User} from '../model/user';
import {Subscription} from 'rxjs';
import firebase from 'firebase';
import auth = firebase.auth;
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  useRef: AngularFirestoreCollection;
  private path = '/users';

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.useRef = afs.collection(this.path);
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserByUid(user.uid).then(async () => this.saveUserLocalStore(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  saveUserLocalStore(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async getUserByUid(uid: string): Promise<void> {
    this.afs.collection<User>(this.path, ref => ref.where('uid', '==', uid)).get().toPromise()
      .then((value) => {
        value.forEach((result) => {
          this.userData = result.data();
          return this.userData;
        });
      });
  }

  // Sign in with email/password
  signIn(email, password): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['admin/welcome']);
        });
        localStorage.setItem('user', JSON.stringify(result.user));
        this.getUSerData(result.user.uid);
      }).catch((error) => {
        console.error(error.message);
      });
  }

  // Sign up with email/password
  signUp(user: User, password): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, password)
      .then((result) => {
        user.uid = result.user.uid;
        this.sendVerificationMail();
        this.setUserData(result.user);
        console.log('UPDATE user', user);
      }).catch((error) => {
        console.log(error.message);
      });
  }

  // Send email verification when new user sign up
  sendVerificationMail(): Subscription {
    return this.afAuth.user.subscribe((user) => {
      user.sendEmailVerification().then(() => {
        this.router.navigate(['admin/auth', 'verify-email']);
      });
    });
  }

  // Reset Forgot password
  forgotPassword(passwordResetEmail): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        console.log('Password reset email sent, check your inbox.');
      }).catch((error) => {
        console.log(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return user !== null && user.emailVerified !== false;
  }

  setUserData(user): Promise<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc<User>('users/' + user.uid);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: user.role || ['CUSTOMER']
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  getUSerData(uid: string): any {
    return this.useRef.doc(uid).valueChanges({
      idField: 'uid'
    });
  }

  // Sign in with Google
  GoogleAuth(): Promise<void> {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider): Promise<void> {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['admin/welcome']);
        });
        this.setUserData(result.user);
      }).catch((error) => {
        console.log(error);
      });
  }

  // Sign out
  signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['admin/auth']);
    });
  }
}
