export interface GrepTagObject {
  tag: string;
  info?: string[];
}

export type GrepTagSimple = string;
export type GrepTag = GrepTagObject | GrepTagSimple;
