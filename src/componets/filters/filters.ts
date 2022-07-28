import './filters.css';
import { renderCards } from '../card';
import { keys } from '../../database/key-storage';

function displayPopularProducts(): void {
  const checkbox = document.querySelector('.popular') as HTMLInputElement;

  checkbox.addEventListener('change', (): void => {
    if (checkbox.checked) {
      keys.setPopular(String(checkbox.checked));
      renderCards();
    } else {
      keys.setPopular('');
      renderCards();
    }
  });
}

displayPopularProducts();

function displayValueFilters(elems: NodeList, key: string): void {
  elems.forEach(item => {
    item.addEventListener('change', (): void => {
      const checkboxesChecked = JSON.parse(<string>localStorage.getItem(key));
      if ((item as HTMLInputElement).checked) {
        checkboxesChecked.push((item as HTMLInputElement).value);
        localStorage.setItem(key, JSON.stringify(checkboxesChecked));
      } else {
        const value = (item as HTMLInputElement).value;
        localStorage.setItem(key, JSON.stringify(checkboxesChecked.filter((el: string) => el !== value)));
      }
      renderCards();
    });
  });

}
displayValueFilters(document.querySelectorAll('.color__item'), 'color');
displayValueFilters(document.querySelectorAll('.maker__item'), 'maker');
displayValueFilters(document.querySelectorAll('.camera__item'), 'count_cameras');
