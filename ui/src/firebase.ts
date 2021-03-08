import firebase from 'firebase/app';
import 'firebase/auth';
var firebaseConfig = {
  apiKey: 'AIzaSyD38-xwPDfkFmBsFwsYv5GKLe9_fq-bStQ',
  authDomain: 'gqlreactnode-5571e.firebaseapp.com',
  projectId: 'gqlreactnode-5571e',
  storageBucket: 'gqlreactnode-5571e.appspot.com',
  //messagingSenderId: "519350020111",
  appId: '1:519350020111:web:dcaab0b1e392d1b0981b7a',
  measurementId: 'G-04X47LXP6Y',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
