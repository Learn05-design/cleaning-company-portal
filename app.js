// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "AIzaSyDCh0O9cGKmKxkjk90aRaCZ7S4G1hOCFck",
  authDomain: "steam-ex.firebaseapp.com",
  projectId: "steam-ex",
  storageBucket: "steam-ex.appspot.com",
  messagingSenderId: "1026204699205",
  appId: "1:1026204699205:web:944070b606a2379dee712c",
  measurementId: "G-Q05ETLMLJC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Email Link Authentication
function sendLoginLink() {
  const email = document.getElementById('email').value;
  const actionCodeSettings = {
    url: window.location.origin, // Redirects back to your site after login
    handleCodeInApp: true
  };

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      // Save email to localStorage in case user opens link on different device
      localStorage.setItem('emailForSignIn', email);
      alert('Login link sent! Check your email.');
    })
    .catch(error => {
      console.error('Error sending email:', error);
      alert('Error: ' + error.message);
    });
}

// Check if returning from email link
if (auth.isSignInWithEmailLink(window.location.href)) {
  let email = localStorage.getItem('emailForSignIn');
  
  if (!email) {
    email = prompt('Please confirm your email:');
  }
  
  auth.signInWithEmailLink(email, window.location.href)
    .then(() => {
      localStorage.removeItem('emailForSignIn');
      window.location.assign('/'); // Redirect to clean URL
    })
    .catch(error => {
      console.error('Sign-in error:', error);
    });
}

// Track auth state
auth.onAuthStateChanged(user => {
  if (user) {
    // User is logged in
    console.log('User logged in:', user.email);
    showDashboard(user);
  } else {
    // User is logged out
    console.log('User logged out');
    showLogin();
  }
});

function showDashboard(user) {
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('dashboard-view').style.display = 'block';
  document.getElementById('user-email').textContent = user.email;
  loadJobs(user.email); // Load jobs for this worker
}

function showLogin() {
  document.getElementById('login-view').style.display = 'block';
  document.getElementById('dashboard-view').style.display = 'none';
}

// Example job loading function
async function loadJobs(workerEmail) {
  const jobsList = document.getElementById('jobs-list');
  
  try {
    const snapshot = await db.collection('jobs')
      .where('assignedWorkerEmail', '==', workerEmail)
      .where('status', '==', 'pending')
      .orderBy('date')
      .get();

    jobsList.innerHTML = '';
    
    snapshot.forEach(doc => {
      const job = doc.data();
      // Add job cards to the DOM
      jobsList.innerHTML += createJobCard(job);
    });
  } catch (error) {
    console.error('Error loading jobs:', error);
  }
}

function logout() {
  auth.signOut()
    .then(() => {
      window.location.reload();
    });
}
