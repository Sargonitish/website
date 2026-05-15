import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { AppData, SiteConfig, LoveLetterData, Memory, Reason, Photo, BucketItem } from "../types";
import { defaultData } from "./defaults";

const STORAGE_KEY = "her-app-data";

function loadData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppData;
      return mergeDeep(defaultData, parsed);
    }
  } catch {}
  return { ...defaultData, memories: [...defaultData.memories], reasons: [...defaultData.reasons], photos: [...defaultData.photos], bucketList: [...defaultData.bucketList] };
}

function mergeDeep(defaults: AppData, overrides: Partial<AppData>): AppData {
  const result = { ...defaults };
  if (overrides.config) result.config = { ...defaults.config, ...overrides.config, birthday: { ...defaults.config.birthday, ...overrides.config.birthday } };
  if (overrides.loveLetter) result.loveLetter = { ...defaults.loveLetter, ...overrides.loveLetter, paragraphs: overrides.loveLetter.paragraphs ?? defaults.loveLetter.paragraphs };
  if (overrides.memories) result.memories = overrides.memories;
  if (overrides.reasons) result.reasons = overrides.reasons;
  if (overrides.photos) result.photos = overrides.photos;
  if (overrides.bucketList) result.bucketList = overrides.bucketList;
  return result;
}

function saveData(data: AppData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

interface DataStore {
  data: AppData;
  updateConfig: (c: SiteConfig) => void;
  updateLoveLetter: (l: LoveLetterData) => void;
  updateMemories: (m: Memory[]) => void;
  updateReasons: (r: Reason[]) => void;
  updatePhotos: (p: Photo[]) => void;
  updateBucketList: (b: BucketItem[]) => void;
  resetAll: () => void;
}

const DataContext = createContext<DataStore | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData);

  const persist = useCallback((next: AppData) => {
    setData(next);
    saveData(next);
  }, []);

  const updateConfig = useCallback((c: SiteConfig) => persist({ ...data, config: c }), [data, persist]);
  const updateLoveLetter = useCallback((l: LoveLetterData) => persist({ ...data, loveLetter: l }), [data, persist]);
  const updateMemories = useCallback((m: Memory[]) => persist({ ...data, memories: m }), [data, persist]);
  const updateReasons = useCallback((r: Reason[]) => persist({ ...data, reasons: r }), [data, persist]);
  const updatePhotos = useCallback((p: Photo[]) => persist({ ...data, photos: p }), [data, persist]);
  const updateBucketList = useCallback((b: BucketItem[]) => persist({ ...data, bucketList: b }), [data, persist]);
  const resetAll = useCallback(() => persist({ ...defaultData, memories: [...defaultData.memories], reasons: [...defaultData.reasons], photos: [...defaultData.photos], bucketList: [...defaultData.bucketList] }), [persist]);

  return (
    <DataContext.Provider value={{ data, updateConfig, updateLoveLetter, updateMemories, updateReasons, updatePhotos, updateBucketList, resetAll }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataStore() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataStore must be used within DataProvider");
  return ctx;
}
