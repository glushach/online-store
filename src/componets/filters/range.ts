import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './range.css';
import { target, API } from 'nouislider';
import { renderCards } from '../card';
import { IRange } from '../../interfaces/i-range';

export function rangeValue(
  limitSelector: string,
  btnLeftSelector: string,
  btnRightSelector: string,
  options: IRange,
  key: string): void {
  const limitSlider = document.getElementById(limitSelector) as target;
  const input0 = document.getElementById(btnLeftSelector);
  const input1 = document.getElementById(btnRightSelector);
  const inputs = [input0, input1];

  noUiSlider.create(<HTMLElement>limitSlider, options);

  const range = limitSlider.noUiSlider as API;
  range.on('update', (values, handle) => {
    (inputs[handle] as HTMLInputElement).value = String(Math.round(<number>values[handle]));
  });

  range.on('change', (values) => {
    localStorage.setItem(key, JSON.stringify(values.map(item => Math.round(+item))));
    renderCards();
  });
}

