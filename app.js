// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCh0O9cGKmKxkjk90aRaCZ7S4G1hOCFck",
  authDomain: "steam-ex.firebaseapp.com",
  projectId: "steam-ex",
  storageBucket: "steam-ex.firebasestorage.app",
  messagingSenderId: "1026204699205",
  appId: "1:1026204699205:web:944070b606a2379dee712c",
  measurementId: "G-Q05ETLMLJC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Send login link
function sendLoginLink() {
  const email = document.getElementById('email').value;
  const actionCodeSettings = {
    url: window.location.origin + '/dashboard.html',
    handleCodeInApp: true
  };

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      alert('Login link sent! Check your email.');
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
}

// Check if returning from email link
if (auth.isSignInWithEmailLink(window.location.href)) {
  const email = prompt('Confirm your email:');
  auth.signInWithEmailLink(email, window.location.href)
    .then(() => {
      window.location.href = 'dashboard.html';
    });
}
