import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";
import type { AppData } from "../types";

export async function saveData(docId: string, data: AppData): Promise<void> {
  await setDoc(doc(db, "sites", docId), data as unknown as Record<string, unknown>);
}

export async function loadData(docId: string): Promise<AppData | null> {
  const snap = await getDoc(doc(db, "sites", docId));
  if (!snap.exists()) return null;
  return snap.data() as AppData;
}
