import { useState } from "react";
import { useDataStore } from "../data/store";
import { useAuth } from "../firebase/auth";
import type { BucketItem, Memory, Photo, Reason } from "../types";

function AdminLogin() {
  const { signIn, loading } = useAuth();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-warm-coral/20 to-sky-blue/20 backdrop-blur-xl">
      <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/30 p-8 shadow-2xl backdrop-blur-2xl">
        <h1 className="text-center font-display text-2xl font-bold text-gray-800">Admin Panel</h1>
        <p className="mt-2 text-center text-sm text-gray-500">Sign in with your Google account to manage content</p>
        <button
          onClick={signIn}
          disabled={loading}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading ? "Loading..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl md:p-8">
      <h2 className="font-display text-xl font-bold text-gray-800">{title}</h2>
      <p className="mb-6 text-sm text-gray-500">{desc}</p>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, multiline = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm outline-none transition-all focus:border-warm-coral focus:ring-2 focus:ring-warm-coral/20"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white/50 px-3 py-2 text-sm outline-none transition-all focus:border-warm-coral focus:ring-2 focus:ring-warm-coral/20"
        />
      )}
    </label>
  );
}

function ArrayEditor<T extends { id: number }>({ items, renderItem, onAdd, onRemove }: {
  items: T[];
  renderItem: (item: T, i: number) => React.ReactNode;
  onAdd: () => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.id} className="relative rounded-xl border border-gray-200 bg-white/40 p-4">
          <button
            onClick={() => onRemove(item.id)}
            className="absolute right-2 top-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-100 text-xs text-red-500 transition-colors hover:bg-red-200"
          >
            ✕
          </button>
          <div className="mb-2 text-xs font-medium text-gray-400">#{i + 1}</div>
          {renderItem(item, i)}
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full cursor-pointer rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm text-gray-500 transition-all hover:border-warm-coral hover:text-warm-coral"
      >
        + Add Item
      </button>
    </div>
  );
}

function ShareModal({ docId, onClose }: { docId: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const base = window.location.origin + window.location.pathname.replace("#admin", "").replace(/\/$/, "");
  const link = `${base}?id=${docId}`;

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(link); } catch {
      const ta = document.createElement("textarea");
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="mx-4 w-full max-w-lg rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="font-display text-xl font-bold text-gray-800">Share Your Custom Site</h2>
        <p className="mt-2 text-sm text-gray-500">
          Your data is saved to the cloud. Share this link so your best friend sees everything.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3">
          <input readOnly value={link} className="flex-1 bg-transparent text-xs text-gray-600 outline-none" />
          <button onClick={copyLink} className="shrink-0 cursor-pointer rounded-lg bg-gradient-to-r from-warm-coral to-sky-blue px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg">
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
        <button onClick={onClose} className="mt-4 w-full cursor-pointer rounded-lg bg-gray-100 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200">Close</button>
      </div>
    </div>
  );
}

export default function Admin() {
  const { data, saving, updateConfig, updateLoveLetter, updateMemories, updateReasons, updatePhotos, updateBucketList, resetAll, saveToFirestore } = useDataStore();
  const { user, loading: authLoading, signOut } = useAuth();
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [shareDocId, setShareDocId] = useState<string | null>(null);
  const [shareError, setShareError] = useState("");

  if (authLoading) return <div className="fixed inset-0 flex items-center justify-center text-sm text-gray-500">Loading...</div>;
  if (!user) return <AdminLogin />;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-cyan-50 px-4 py-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-800 md:text-4xl">
              <span className="gradient-text">Admin Panel</span>
            </h1>
            <p className="mt-1 text-sm text-gray-500">Edit all content. Changes save to your browser.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={async () => {
              setShareError("");
              try {
                const id = await saveToFirestore();
                setShareDocId(id);
                setShowShare(true);
              } catch {
                setShareError("Failed to save. Check your Firebase config.");
              }
            }} disabled={saving} className="cursor-pointer rounded-lg bg-gradient-to-r from-sunshine to-warm-coral px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50">
              {saving ? "⏳ Saving..." : "🔗 Share Link"}
            </button>
            <button onClick={() => setShowReset(true)} className="cursor-pointer rounded-lg border border-red-200 px-4 py-2 text-xs text-red-500 transition-colors hover:bg-red-50">Reset</button>
            <button onClick={handleSave} className="cursor-pointer rounded-lg bg-gradient-to-r from-warm-coral to-sky-blue px-6 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:shadow-xl">
              {saved ? "✓ Saved!" : "Save"}
            </button>
            <button onClick={signOut} className="cursor-pointer rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-xs text-gray-500 transition-colors hover:bg-white/80">Sign Out</button>
            <a href="/" className="rounded-lg bg-white/50 px-4 py-2 text-xs text-gray-500 shadow-sm transition-colors hover:bg-white/80">← Back</a>
          </div>
        </div>

        <div className="rounded-2xl border border-sunshine/30 bg-sunshine/10 p-4 text-sm text-gray-700">
          💡 <strong>Changes are only visible to you</strong> until you click <strong>"Share Link"</strong> and send that link to your friend.
        </div>

        <Section title="Site Configuration" desc="Change the name, birthday date, and hero message">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Her Name" value={data.config.herName} onChange={(v) => updateConfig({ ...data.config, herName: v })} />
            <Input label="Hero Message" value={data.config.heroMessage} onChange={(v) => updateConfig({ ...data.config, heroMessage: v })} />
            <Input label="Birthday Month (1-12)" type="number" value={String(data.config.birthday.month)} onChange={(v) => updateConfig({ ...data.config, birthday: { ...data.config.birthday, month: Number(v) } })} />
            <Input label="Birthday Day (1-31)" type="number" value={String(data.config.birthday.day)} onChange={(v) => updateConfig({ ...data.config, birthday: { ...data.config.birthday, day: Number(v) } })} />
            <Input label="Birthday Year" type="number" value={String(data.config.birthday.year)} onChange={(v) => updateConfig({ ...data.config, birthday: { ...data.config.birthday, year: Number(v) } })} />
          </div>
        </Section>

        <Section title="Love Letter" desc="Edit the heartfelt letter">
          <div className="space-y-4">
            <Input label="Greeting" value={data.loveLetter.greeting} onChange={(v) => updateLoveLetter({ ...data.loveLetter, greeting: v })} />
            {data.loveLetter.paragraphs.map((p, i) => (
              <Input key={i} label={`Paragraph ${i + 1}`} value={p} multiline onChange={(v) => {
                const copy = [...data.loveLetter.paragraphs];
                copy[i] = v;
                updateLoveLetter({ ...data.loveLetter, paragraphs: copy });
              }} />
            ))}
            <Input label="Closing" value={data.loveLetter.closing} onChange={(v) => updateLoveLetter({ ...data.loveLetter, closing: v })} />
            <Input label="Signature" value={data.loveLetter.signature} onChange={(v) => updateLoveLetter({ ...data.loveLetter, signature: v })} />
          </div>
        </Section>

        <Section title="Memories Timeline" desc="Edit relationship timeline entries">
          <ArrayEditor<Memory>
            items={data.memories}
            onRemove={(id) => updateMemories(data.memories.filter((m) => m.id !== id))}
            onAdd={() => { const m = Math.max(...data.memories.map((x) => x.id), 0); updateMemories([...data.memories, { id: m + 1, date: "", title: "", caption: "", image: "" }]); }}
            renderItem={(item) => (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Date" value={item.date} onChange={(v) => updateMemories(data.memories.map((m) => m.id === item.id ? { ...m, date: v } : m))} />
                <Input label="Title" value={item.title} onChange={(v) => updateMemories(data.memories.map((m) => m.id === item.id ? { ...m, title: v } : m))} />
                <div className="md:col-span-2"><Input label="Caption" value={item.caption} multiline onChange={(v) => updateMemories(data.memories.map((m) => m.id === item.id ? { ...m, caption: v } : m))} /></div>
                <div className="md:col-span-2"><Input label="Image URL" value={item.image} onChange={(v) => updateMemories(data.memories.map((m) => m.id === item.id ? { ...m, image: v } : m))} /></div>
              </div>
            )}
          />
        </Section>

        <Section title="Reasons" desc="Edit the reasons why she's the best">
          <ArrayEditor<Reason>
            items={data.reasons}
            onRemove={(id) => updateReasons(data.reasons.filter((r) => r.id !== id))}
            onAdd={() => { const m = Math.max(...data.reasons.map((x) => x.id), 0); updateReasons([...data.reasons, { id: m + 1, text: "" }]); }}
            renderItem={(item) => <Input label="Reason Text" value={item.text} multiline onChange={(v) => updateReasons(data.reasons.map((r) => r.id === item.id ? { ...r, text: v } : r))} />}
          />
        </Section>

        <Section title="Photo Gallery" desc="Edit gallery image URLs">
          <ArrayEditor<Photo>
            items={data.photos}
            onRemove={(id) => updatePhotos(data.photos.filter((p) => p.id !== id))}
            onAdd={() => { const m = Math.max(...data.photos.map((x) => x.id), 0); updatePhotos([...data.photos, { id: m + 1, src: "", alt: "", width: 600, height: 800 }]); }}
            renderItem={(item) => (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Image URL" value={item.src} onChange={(v) => updatePhotos(data.photos.map((p) => p.id === item.id ? { ...p, src: v } : p))} />
                <Input label="Alt Text" value={item.alt} onChange={(v) => updatePhotos(data.photos.map((p) => p.id === item.id ? { ...p, alt: v } : p))} />
                <Input label="Width" type="number" value={String(item.width)} onChange={(v) => updatePhotos(data.photos.map((p) => p.id === item.id ? { ...p, width: Number(v) } : p))} />
                <Input label="Height" type="number" value={String(item.height)} onChange={(v) => updatePhotos(data.photos.map((p) => p.id === item.id ? { ...p, height: Number(v) } : p))} />
              </div>
            )}
          />
        </Section>

        <Section title="Bucket List" desc="Edit future adventure plans">
          <ArrayEditor<BucketItem>
            items={data.bucketList}
            onRemove={(id) => updateBucketList(data.bucketList.filter((b) => b.id !== id))}
            onAdd={() => { const m = Math.max(...data.bucketList.map((x) => x.id), 0); updateBucketList([...data.bucketList, { id: m + 1, title: "", icon: "✨", description: "" }]); }}
            renderItem={(item) => (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input label="Title" value={item.title} onChange={(v) => updateBucketList(data.bucketList.map((b) => b.id === item.id ? { ...b, title: v } : b))} />
                <Input label="Icon (emoji)" value={item.icon} onChange={(v) => updateBucketList(data.bucketList.map((b) => b.id === item.id ? { ...b, icon: v } : b))} />
                <div className="md:col-span-2"><Input label="Description" value={item.description} multiline onChange={(v) => updateBucketList(data.bucketList.map((b) => b.id === item.id ? { ...b, description: v } : b))} /></div>
              </div>
            )}
          />
        </Section>

        <p className="text-center text-[10px] text-gray-400">Changes are stored in your browser. Use "Share Link" to let others see your custom content.</p>
      </div>

      {shareError && <p className="text-center text-sm text-red-500">{shareError}</p>}
      {showShare && shareDocId && <ShareModal docId={shareDocId} onClose={() => setShowShare(false)} />}

      {showReset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl">
            <h2 className="text-center font-display text-xl font-bold text-gray-800">Reset All Data?</h2>
            <p className="mt-2 text-center text-sm text-gray-500">This will restore default content. Cannot be undone.</p>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => setShowReset(false)} className="cursor-pointer rounded-lg bg-gray-100 px-6 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200">Cancel</button>
              <button onClick={() => { resetAll(); setShowReset(false); }} className="cursor-pointer rounded-lg bg-red-500 px-6 py-2 text-sm text-white transition-colors hover:bg-red-600">Reset All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
