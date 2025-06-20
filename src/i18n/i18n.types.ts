import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Replacement<M extends [unknown, unknown], T> = M extends unknown
  ? [T] extends [M[0]]
    ? M[1]
    : never
  : never;
export type DeepReplace<T, M extends [unknown, unknown]> = {
  [P in keyof T]: T[P] extends M[0]
    ? Replacement<M, T[P]>
    : T[P] extends object
      ? DeepReplace<T[P], M>
      : T[P];
};
