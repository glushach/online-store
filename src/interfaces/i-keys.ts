export interface IKeys {
  getAmount: () => string;
  setAmount: (count: string) => void;
  getDB: () => string;
  setDB: (db: string) => void;
  getKeySort: () => string;
  setKeySort: (key: string) => void;
  getRangeAmount: () => string;
  setRangeAmount: (range: string) => void;
  getRangeYears: () => string;
  setRangeYears: (range: string) => void;
  getKeySearch: () => string;
  setKeySearch: (word: string) => void;
  getKeyMaker: () => string;
  setKeyMaker: (col: string) => void;
  getCameras: () => string;
  setCameras: (count: string) => void;
  getColors: () => string;
  setColors: (count: string) => void;
  getPopular: () => string;
  setPopular: (count: string) => void;
}
