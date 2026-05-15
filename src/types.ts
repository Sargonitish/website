export interface Memory {
  id: number;
  date: string;
  title: string;
  caption: string;
  image: string;
}

export interface Reason {
  id: number;
  text: string;
}

export interface Photo {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BucketItem {
  id: number;
  title: string;
  icon: string;
  description: string;
}

export interface LoveLetterData {
  greeting: string;
  paragraphs: string[];
  closing: string;
  signature: string;
}

export interface BirthdayConfig {
  month: number;
  day: number;
  year: number;
}

export interface SiteConfig {
  herName: string;
  birthday: BirthdayConfig;
  heroMessage: string;
}

export interface AppData {
  config: SiteConfig;
  loveLetter: LoveLetterData;
  memories: Memory[];
  reasons: Reason[];
  photos: Photo[];
  bucketList: BucketItem[];
}
