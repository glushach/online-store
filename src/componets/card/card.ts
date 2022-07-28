import './card.css';
import { IPhones } from '../../interfaces/i-phones';
import { keys } from '../../database/key-storage';
import { warning } from '../../database/alerts';
import { filterLocalStorage } from '../filters/filters-storage';

export function renderCards(): void {
  const cards = document.querySelector('.cards');
  cards!.innerHTML = '';
  const db = filterLocalStorage();

  for (let i = 0; i < db.length; i++) {
    const card = `
      <div class="card">
        <h3 class="card__title">${db[i].name}</h3>
        <div class="card__photo"><img src="${db[i].photo}" alt="phone"></div>
        <div class="card__description">
          <div class="card__amount">Количество на складе: ${db[i].amount}</div>
          <div class="card__debut">Год выхода на рынок: ${db[i].debut}</div>
          <div class="card__color">Цвет: ${db[i].color}</div>
          <div class="card__camera">Количество камер: ${db[i].camera}</div>
          <div class="card__maker">Производитель: ${db[i].maker}</div>
          <div class="card__popular">Популярный: ${db[i].popular}</div>
        </div>
        <div class="card__footer">
          <button class="btn__footer" data-id=${i}>
         </button>
        </div>
      </div>
    `;
    (cards as HTMLElement).insertAdjacentHTML('beforeend', card);
  }

  addInBasket(db);
}

function addInBasket(db: Array<IPhones>): void {
  const allCardsButtons = document.querySelectorAll('.btn__footer');
  const allAmount = document.getElementById('amount-in-basket');
  allAmount!.textContent = keys.getAmount();

  db.forEach((item: IPhones, idx: number) => {
    if (item.inBasket) {
      (allCardsButtons[idx] as HTMLElement).style.backgroundImage = 'url(./assets/icons/cross.svg)';
    }
  });

  allCardsButtons.forEach(btn => {
    btn.addEventListener('click', (e: Event): void => {
      const idx = +((e.target as HTMLElement).dataset.id as string);
      const card = document.querySelectorAll('.btn__footer')[idx] as HTMLElement;
      let amount = +keys.getAmount();

      if (db[idx].inBasket) {
        db[idx].inBasket = false;
        card.style.backgroundImage = 'url(./assets/icons/car.png)';
        amount -= 1;
        keys.setAmount(`${amount}`);
        allAmount!.textContent = keys.getAmount();
      } else {
        if (amount < 20) {
          db[idx].inBasket = true;
          card.style.backgroundImage = 'url(./assets/icons/cross.svg)';
          amount += 1;
          keys.setAmount(`${amount}`);
          allAmount!.textContent = keys.getAmount();
        } else {
          alert(warning);
        }
      }
      keys.setDB(JSON.stringify(db));
    });
  });
}
