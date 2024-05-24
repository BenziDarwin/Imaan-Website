import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { auth } from "./config";
import FireStore from './firestore';

class Authentication {
  
    // Register a new user with email and password
    async register(email: string, password: string): Promise<User | null> {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await new FireStore("users").assignRole(email, "Admin");
        return userCredential.user;
      } catch (error) {
        alert("An error occured!");
        console.error("Error registering new user:", error);
        return null;
      }
    }
  
    // Sign in a user with email and password
    async signIn(email: string, password: string): Promise<User | null> {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (error) {
        console.error("Error signing in:", error);
        return null;
      }
    }
  
    // Sign out the current user
    async signOut(): Promise<void> {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  
    // Send password reset email
    async resetPassword(email: string): Promise<void> {
      try {
        await sendPasswordResetEmail(auth, email);
      } catch (error) {
        console.error("Error sending password reset email:", error);
      }
    }
  
    // Observe user state changes
    onAuthStateChanged(callback: (user: User | null) => void): void {
      onAuthStateChanged(auth, callback);
    }
  
    // Get the current authenticated user
    getCurrentUser(): User | null {
      return auth.currentUser;
    }
  }
  
  export default Authentication;