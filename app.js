// Firebase Initialization (same as before)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Check if coming back from email link
if (auth.isSignInWithEmailLink(window.location.href)) {
  handleEmailLinkRedirect();
}

// Handle email link authentication
async function handleEmailLinkRedirect() {
  let email = localStorage.getItem('emailForSignIn');
  
  if (!email) {
    email = prompt('Please provide your email for confirmation');
  }
  
  try {
    await auth.signInWithEmailLink(email, window.location.href);
    localStorage.removeItem('emailForSignIn');
    window.location.href = '/'; // Remove auth params from URL
  } catch (error) {
    alert('Authentication error: ' + error.message);
  }
}

// Send authentication email
function sendLoginLink() {
  const email = document.getElementById('email').value;
  
  const actionCodeSettings = {
    url: window.location.origin, // Your GitHub Pages URL
    handleCodeInApp: true
  };

  // Save email in case user opens link on different device
  localStorage.setItem('emailForSignIn', email);
  
  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      alert('Login link sent to your email! Check your inbox.');
    })
    .catch((error) => {
      alert('Error sending email: ' + error.message);
    });
}

// Logout function
function logout() {
  auth.signOut()
    .then(() => {
      window.location.reload();
    });
}

// Track auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    loadWorkerJobs(user.email); // Load jobs for this worker
  } else {
    // User is signed out
    document.getElementById('login-view').style.display = 'block';
    document.getElementById('dashboard-view').style.display = 'none';
  }
});