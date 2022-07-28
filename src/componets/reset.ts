import { initLS } from '../index';

export function clearOptions(): void {
  const btnFilters = document.getElementById('clear-filters') as HTMLElement;
  const btnSortBasket = document.getElementById('clear-basket-sort') as HTMLElement;

  btnFilters.addEventListener('click', (): void => {

    initLS.initFilters();
    location.reload();
  });

  btnSortBasket.addEventListener('click', (): void => {
    localStorage.clear();
    initLS.initFilters();
    initLS.initBasketAndSort();
    location.reload();
  });
}
