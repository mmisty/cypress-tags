export interface GrepTagObject {
  tag: string;
  info?: string[];
  isOwnTag?: boolean;
}

export type GrepTagSimple = string;
export type GrepTag = GrepTagObject | GrepTagSimple;
