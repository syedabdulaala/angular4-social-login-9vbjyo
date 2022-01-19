import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from '../firebase.config';
var firebaseui = require('firebaseui');

// const firebaseConfig = {
//     apiKey: process.env.API_KEY,
//     authDomain: process.env.AUTH_DOMAIN,
//     databaseURL: process.env.DATABASE_URL,
//     projectId: process.env.PROJECT_ID,
//     messagingSenderId: process.env.MESSAGING_SENDER_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.MEASUREMENT_ID,
// };

const app = initializeApp(config);
const auth = getAuth(app);
var ui = new firebaseui.auth.AuthUI(auth);

ui.start('#firebaseui-auth-container', {
    callbacks: {
        signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
            document.getElementById('json').innerText = JSON.stringify({
                token: await auth.currentUser.getIdToken(),
                user: auth.currentUser
            });
            return true;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    // signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        'facebook.com',
        'apple.com',
        'google.com'
    ],
    // tosUrl: '<your-tos-url>',
    // privacyPolicyUrl: '<your-privacy-policy-url>'
});