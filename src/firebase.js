import Firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyA1ChuSlQVJ2bsfXdnxYjsd2Iq9WSOZ5t0',
  authDomain: 'finaltest-8bfb1.firebaseapp.com',
  databaseURL: 'https://finaltest-8bfb1.firebaseio.com',
  projectId: 'finaltest-8bfb1',
  storageBucket: 'finaltest-8bfb1.appspot.com',
  messagingSenderId: '196468234025',
  appId: '1:196468234025:web:936dc38ec72b27568d4938'
}
const app = Firebase.initializeApp(config)
export const db = app.database()
