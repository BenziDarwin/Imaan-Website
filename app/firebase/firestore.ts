import { fireStore } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  setDoc,
} from "firebase/firestore";

class FireStore {
  constructor(private collectionName: string) {}

  async assignRole(uid: string, role: string): Promise<void> {
    try {
      const userRef = doc(fireStore, 'users', uid);
      await setDoc(userRef, { role }, { merge: true });
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  }

  // Get a single document by ID
  async getDocument(id: string) {
    const docRef = doc(fireStore, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Document not found");
    }
  }

  // Get all documents in the collection
  async getDocuments() {
    const querySnapshot = await getDocs(
      collection(fireStore, this.collectionName),
    );
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return documents;
  }

  // Add a single document
  async addDocument(data: any) {
    const docRef = await addDoc(
      collection(fireStore, this.collectionName),
      data,
    );
    return docRef.id;
  }

  // Add multiple documents
  async addDocuments(dataArray: any[]) {
    const batch = writeBatch(fireStore);
    dataArray.forEach((data) => {
      const docRef = doc(collection(fireStore, this.collectionName));
      batch.set(docRef, data);
    });
    await batch.commit();
  }

  // Update a single document by ID
  async updateDocument(id: string, data: any) {
    const docRef = doc(fireStore, this.collectionName, id);
    await updateDoc(docRef, data);
  }

  // Update multiple documents
  async updateDocuments(updates: { id: string; data: any }[]) {
    const batch = writeBatch(fireStore);
    updates.forEach(({ id, data }) => {
      const docRef = doc(fireStore, this.collectionName, id);
      batch.update(docRef, data);
    });
    await batch.commit();
  }

  // Delete a single document by ID
  async deleteDocument(id: string) {
    const docRef = doc(fireStore, this.collectionName, id);
    await deleteDoc(docRef);
  }

  // Delete multiple documents by ID
  async deleteDocuments(ids: string[]) {
    const batch = writeBatch(fireStore);
    ids.forEach((id) => {
      const docRef = doc(fireStore, this.collectionName, id);
      batch.delete(docRef);
    });
    await batch.commit();
  }
}

export default FireStore;
