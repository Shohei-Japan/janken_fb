const config = {
  apiKey: "AIzaSyBOlMYvrnAEYvjbUZ7DMa5UMxkF2rjJ8fA",
  authDomain: "janken-d0158.firebaseapp.com",
  databaseURL: "https://janken-d0158.firebaseio.com",
  projectId: "janken-d0158",
  storageBucket: "janken-d0158.appspot.com",
  messagingSenderId: "298960947951"
};
firebase.initializeApp(config);

const db = firebase.firestore();
