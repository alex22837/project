import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as firebase from 'firebase/app'
import './css/bootstrap.min.css'
import './css/style.css'
import './css/animate.min.css'

const config = {
  apiKey: "AIzaSyCs-ecliLB8lYX1sCftWoFeetbnmB_Qg9E",
  authDomain: "hello-5c5f5-restore.firebaseapp.com",
  databaseURL: "https://hello-5c5f5-restore-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hello-5c5f5-restore",
  storageBucket: "hello-5c5f5-restore.appspot.com",
  messagingSenderId: "789887253073",
  appId: "1:789887253073:web:1bfc1fc1d46d79ab2a9670"
}

firebase.initializeApp(config)

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
