import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { AppData, SiteConfig, LoveLetterData, Memory, Reason, Photo, BucketItem } from "../types";
import { defaultData } from "./defaults";
import { saveData as fbSave, loadData as fbLoad } from "../firebase/db";

const STORAGE_KEY = "her-app-data";

function cloneDefaults(): AppData {
  return {
    ...defaultData,
    memories: defaultData.memories.map((m) => ({ ...m })),
    reasons: defaultData.reasons.map((r) => ({ ...r })),
    photos: defaultData.photos.map((p) => ({ ...p })),
    bucketList: defaultData.bucketList.map((b) => ({ ...b })),
    loveLetter: { ...defaultData.loveLetter, paragraphs: [...defaultData.loveLetter.paragraphs] },
    config: { ...defaultData.config, birthday: { ...defaultData.config.birthday } },
  };
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

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 via-sky-50 to-cyan-50">
      <div className="text-center">
        <div className="animate-spin text-4xl">✨</div>
        <p className="mt-4 text-sm text-gray-500">Loading your surprise...</p>
      </div>
    </div>
  );
}

interface DataStore {
  data: AppData;
  docId: string | null;
  saving: boolean;
  updateConfig: (c: SiteConfig) => void;
  updateLoveLetter: (l: LoveLetterData) => void;
  updateMemories: (m: Memory[]) => void;
  updateReasons: (r: Reason[]) => void;
  updatePhotos: (p: Photo[]) => void;
  updateBucketList: (b: BucketItem[]) => void;
  resetAll: () => void;
  saveToFirestore: () => Promise<string>;
}

const DataContext = createContext<DataStore | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<AppData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return mergeDeep(cloneDefaults(), JSON.parse(raw));
    } catch {}
    return cloneDefaults();
  });
  const [docId, setDocId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const legacyData = params.get("data");

    if (id) {
      fbLoad(id).then((fireData) => {
        if (fireData) {
          setData(fireData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fireData));
          setDocId(id);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    } else if (legacyData) {
      try {
        const json = decodeURIComponent(atob(legacyData));
        const parsed = JSON.parse(json) as AppData;
        if (parsed && parsed.config && parsed.loveLetter) {
          setData(parsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch {}
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const persist = useCallback((next: AppData) => {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const saveToFirestore = useCallback(async () => {
    setSaving(true);
    try {
      const id = docId || crypto.randomUUID();
      await fbSave(id, data);
      setDocId(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return id;
    } finally {
      setSaving(false);
    }
  }, [data, docId]);

  const updateConfig = useCallback((c: SiteConfig) => persist({ ...data, config: c }), [data, persist]);
  const updateLoveLetter = useCallback((l: LoveLetterData) => persist({ ...data, loveLetter: l }), [data, persist]);
  const updateMemories = useCallback((m: Memory[]) => persist({ ...data, memories: m }), [data, persist]);
  const updateReasons = useCallback((r: Reason[]) => persist({ ...data, reasons: r }), [data, persist]);
  const updatePhotos = useCallback((p: Photo[]) => persist({ ...data, photos: p }), [data, persist]);
  const updateBucketList = useCallback((b: BucketItem[]) => persist({ ...data, bucketList: b }), [data, persist]);
  const resetAll = useCallback(() => persist(cloneDefaults()), [persist]);

  if (loading) return <LoadingScreen />;

  return (
    <DataContext.Provider value={{ data, docId, saving, updateConfig, updateLoveLetter, updateMemories, updateReasons, updatePhotos, updateBucketList, resetAll, saveToFirestore }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataStore() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDataStore must be used within DataProvider");
  return ctx;
}
