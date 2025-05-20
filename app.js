// Firebase v8 compatible config
const firebaseConfig = {
  apiKey: "AIzaSyDCh0O9cGKmKxkjk90aRaCZ7S4G1hOCFck",
  authDomain: "steam-ex.firebaseapp.com",
  projectId: "steam-ex",
  storageBucket: "steam-ex.firebasestorage.app",
  messagingSenderId: "1026204699205",
  appId: "1:1026204699205:web:944070b606a2379dee712c",
  measurementId: "G-Q05ETLMLJC"
};

// Initialize Firebase (v8)
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
      // Save the email locally so we can use it when the link is clicked
      window.localStorage.setItem('emailForSignIn', email);
      alert('Login link sent! Check your email.');
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
}

// Handle sign-in from link
if (auth.isSignInWithEmailLink(window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = prompt('Please provide your email for confirmation:');
  }

  auth.signInWithEmailLink(email, window.location.href)
    .then(() => {
      window.localStorage.removeItem('emailForSignIn');
      window.location.href = 'dashboard.html';
    })
    .catch(error => {
      alert('Login failed: ' + error.message);
    });
}

