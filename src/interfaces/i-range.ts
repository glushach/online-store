export interface IRange {
  start: string;
  limit: number;
  behaviour: string;
  connect: boolean;
  step: number;
  range: {
    'min': number;
    'max': number;
  },
}
