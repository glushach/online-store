import { renderCards } from './card';
import { keys } from '../../database/key-storage';

function search(): void | null {
  const valueSearch = document.querySelector('.search') as HTMLInputElement;
  const clearSearch = document.querySelector('.clear-search') as HTMLElement;

  if (valueSearch) {
    valueSearch.value = <string>keys.getKeySearch();
  } else {
    return null;
  }

  function toggleIcon(): void {
    if (valueSearch.value) {
      valueSearch.style.backgroundImage = 'none';
      clearSearch.style.display = 'block';
      keys.setKeySearch(valueSearch.value);
    } else {
      valueSearch.style.backgroundImage = 'url(./assets/icons/search.svg)';
      clearSearch.style.display = 'none';
    }
  }
  toggleIcon();

  valueSearch.addEventListener('input', (): void => {
    if (!valueSearch.value) keys.setKeySearch('');
    toggleIcon();
    renderCards();
  });

  clearSearch.addEventListener('click', (): void => {
    valueSearch.style.backgroundImage = 'url(./assets/icons/search.svg)';
    clearSearch.style.display = 'none';
    keys.setKeySearch('');
    valueSearch.value = '';
    renderCards();
  });
}

search();
