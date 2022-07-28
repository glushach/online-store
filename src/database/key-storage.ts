import { IKeys } from '../interfaces/i-keys';

export const keys: IKeys = {
  getAmount: () => localStorage.getItem('amount') || '0',
  setAmount: (amount: string) => localStorage.setItem('amount', amount),
  getDB: () => localStorage.getItem('db') || '',
  setDB: (db: string) => localStorage.setItem('db', db),
  getKeySort: () => localStorage.getItem('key_sort') || 'alphabet_increase',
  setKeySort: (key: string) => localStorage.setItem('key_sort', key),
  getRangeAmount: () => localStorage.getItem('range-amount') || '[1,20]',
  setRangeAmount: (range: string) => localStorage.setItem('range-amount', range),
  getRangeYears: () => localStorage.getItem('range-year') || '[2018, 2022]',
  setRangeYears: (range: string) => localStorage.setItem('range-year', range),
  getKeySearch: () => localStorage.getItem('key_search') || '',
  setKeySearch: (word: string) => localStorage.setItem('key_search', word),
  getKeyMaker: () => localStorage.getItem('maker') || '[]',
  setKeyMaker: (col: string) => localStorage.setItem('maker', col),
  getCameras: () => localStorage.getItem('count_cameras') || '[]',
  setCameras: (count: string) => localStorage.setItem('count_cameras', count),
  getColors: () => localStorage.getItem('color') || '[]',
  setColors: (colors: string) => localStorage.setItem('color', colors),
  getPopular: () => localStorage.getItem('popular') || '',
  setPopular: (populars: string) => localStorage.setItem('popular', populars),
};
