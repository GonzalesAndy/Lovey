if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('✅ Service worker enregistré.'))
      .catch(err => console.error('❌ Erreur service worker :', err));
  }

import { setupGameCardExpander } from './utils/gameCardExpander.js';
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

export const firebaseConfig = {
  apiKey: "AIzaSyB_9CMyB0sVDqZRH8Dp1FU5KTPCNgyHt6c",
  authDomain: "lovey-43925.firebaseapp.com",
  projectId: "lovey-43925",
  storageBucket: "lovey-43925.firebasestorage.app",
  messagingSenderId: "741969244990",
  appId: "1:741969244990:web:1aaa5e4b3df4cbf9ce326f",
  measurementId: "G-GY3FTH29EY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkUserCredentials(login, pwd) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("login", "==", login), where("pwd", "==", pwd));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

function showLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.style.display = 'flex';
}
function hideLoginModal() {
  const modal = document.getElementById('login-modal');
  modal.style.display = 'none';
}
function isSessionActive() {
  return !!localStorage.getItem('loveySession');
}
function createSession(login) {
  localStorage.setItem('loveySession', login);
}
function removeSession() {
  localStorage.removeItem('loveySession');
}

function animateGameCards() {
  const cards = document.querySelectorAll('.game-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'none';
    card.style.animation = 'none';
  });
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 200 * i);
    });
  }, 100);
}

function setupLoginFlow() {
  const gamesContainer = document.querySelector('.games-container');
  if (!isSessionActive()) {
    gamesContainer.style.display = 'none';
    showLoginModal();
  } else {
    gamesContainer.style.display = '';
    hideLoginModal();
    animateGameCards();
  }
  const signInBtn = document.getElementById('sign-in-btn');
  signInBtn.onclick = async function () {
    const login = document.getElementById('login-input').value.trim();
    const pwd = document.getElementById('pwd-input').value.trim();
    if (login && pwd) {
      const valid = await checkUserCredentials(login, pwd);
      if (valid) {
        createSession(login);
        hideLoginModal();
        gamesContainer.style.display = '';
        animateGameCards();
      } else {
        alert('Identifiants incorrects.');
      }
    } else {
      alert('Veuillez remplir les deux champs.');
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  setupLoginFlow();
  setupGameCardExpander();
});
