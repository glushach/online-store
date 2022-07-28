import { IPhones } from '../../interfaces/i-phones';
import { keys } from '../../database/key-storage';
import { coincidence } from '../../database/alerts';

export function filterLocalStorage(): Array<IPhones> {
  const db = JSON.parse(keys.getDB());

  const rangeAmount = JSON.parse(keys.getRangeAmount());
  const rangeYears = JSON.parse(keys.getRangeYears());
  const keySearch = keys.getKeySearch();

  const maker = JSON.parse(keys.getKeyMaker());
  const cameras = JSON.parse(keys.getCameras());
  const color = JSON.parse(keys.getColors());
  const popular = keys.getPopular();

  const isFiltered = db.filter((item: IPhones) => rangeAmount[0] <= item.amount && item.amount <= rangeAmount[1])
    .filter((item: IPhones) => rangeYears[0] <= item.debut && item.debut <= rangeYears[1])
    .filter((item: IPhones) => item.name.toLowerCase().includes(keySearch.toLowerCase()))
    .filter((item: IPhones) => (popular) ? item.popular === 'да' : item)
    .filter((item: IPhones) => (color.length) ? color.includes(item.color) : item)
    .filter((item: IPhones) => (maker.length) ? maker.includes(item.maker) : item)
    .filter((item: IPhones) => (cameras.length) ? cameras.includes(item.camera) : item);

  if (isFiltered.length === 0) {
    (document.getElementById('cards') as HTMLElement)
      .innerHTML = `<p class="banner">${coincidence}</p>`;
  }

  return isFiltered;
}

