import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const recipesCollection = collection(db, "recipes");

export const getAllRecipes = async () => {
  const q = query(recipesCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getRecipe = async (id) => {
  const docRef = doc(db, "recipes", id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("Recipe not found");
  return { id: snapshot.id, ...snapshot.data() };
};

export const createRecipe = async (recipeData, userId) => {
  const data = {
    ...recipeData,
    createdBy: userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  const docRef = await addDoc(recipesCollection, data);
  return docRef.id;
};

export const updateRecipe = async (id, recipeData) => {
  const docRef = doc(db, "recipes", id);
  const data = { ...recipeData, updatedAt: serverTimestamp() };
  await updateDoc(docRef, data);
};

export const deleteRecipe = async (id) => {
  const docRef = doc(db, "recipes", id);
  await deleteDoc(docRef);
};

export const getRecipesByUser = async (userId) => {
  const q = query(
    recipesCollection,
    where("createdBy", "==", userId),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const uploadRecipeImage = async (file, recipeId) => {
  const storageRef = ref(storage, `recipe-images/${recipeId}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const createMultipleRecipes = async (recipesArray, userId) => {
  const batch = writeBatch(db);
  recipesArray.forEach((recipeData) => {
    const docRef = doc(recipesCollection);
    const data = {
      ...recipeData,
      createdBy: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    batch.set(docRef, data);
  });
  await batch.commit();
};
