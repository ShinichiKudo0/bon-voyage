
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAe3ohIMbZ6lhBJRvedJD7xTAu9ztjDQfU",
  authDomain: "ai-trip-planner-project.firebaseapp.com",
  projectId: "ai-trip-planner-project",
  storageBucket: "ai-trip-planner-project.appspot.com",
  messagingSenderId: "260865497892",
  appId: "1:260865497892:web:50c3ddaca597f32fc131b1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);