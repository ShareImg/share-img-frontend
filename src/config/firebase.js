
import firebase from 'firebase/app';

var firebaseConfig = {
  apiKey: "AIzaSyDhdgbU_1I1lDfrTYCfH2bOTu21kVlRbXc",
  authDomain: "shareimg-9e9c0.firebaseapp.com",
  databaseURL: "https://shareimg-9e9c0.firebaseio.com",
  projectId: "shareimg-9e9c0",
  storageBucket: "shareimg-9e9c0.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default firebase
