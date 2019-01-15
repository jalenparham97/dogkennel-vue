import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB8B-arxMWU6g4btfaWeAABMDplaIY5NWA",
    authDomain: "beekelfarmskennel-1.firebaseapp.com",
    databaseURL: "https://beekelfarmskennel-1.firebaseio.com",
    projectId: "beekelfarmskennel-1",
    storageBucket: "beekelfarmskennel-1.appspot.com",
    messagingSenderId: "955426638441"
};
firebase.initializeApp(config);

export default firebase;