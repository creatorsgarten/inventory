import { atom } from 'nanostores'

export const readerStateAtom = atom<'start' | 'stop'>('stop')
