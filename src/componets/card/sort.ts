import { IPhones } from '../../interfaces/i-phones';
import { renderCards } from './card';
import { keys } from '../../database/key-storage';

export function sortOptions(value: string, db: Array<IPhones>): Array<IPhones> {
  switch (value) {
    case 'alphabet_increase':
      db.sort((a: IPhones, b: IPhones) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      break;
    case 'alphabet_decrease':
      db.sort((a: IPhones, b: IPhones) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
      break;
    case 'year_increase':
      db.sort((a: IPhones, b: IPhones) => a.debut - b.debut);
      break;
    case 'year_decrease':
      db.sort((a: IPhones, b: IPhones) => b.debut - a.debut);
      break;
    default:
  }

  return db;
}

export function sort(): void {
  const maker = document.querySelector('#sort');

  maker?.addEventListener('change', function (e: Event): void {
    const getValue = (e.target as HTMLSelectElement).value;
    const db = JSON.parse(<string>keys.getDB());

    sortOptions(getValue, db);

    keys.setDB(JSON.stringify(db));
    keys.setKeySort(getValue);
    renderCards();
  });
}
sort();
