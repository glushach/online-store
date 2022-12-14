import 'normalize.css';
import './global.css';
import './componets';
import phones from './database/db.json';
import { keys } from './database/key-storage';
import { renderCards } from './componets/card';
import { rangeValue } from './componets/filters';

class InitLocalStorage {
  initBasketAndSort(): void {
    keys.setAmount(keys.getAmount());
    keys.setDB(JSON.stringify(phones));
    keys.setKeySort(keys.getKeySort());
  }

  initFilters(): void {
    keys.setRangeAmount('[1,20]');
    keys.setRangeYears('[2018, 2022]');
    keys.setKeySearch('');
    keys.setKeyMaker('[]');
    keys.setCameras('[]');
    keys.setColors('[]');
    keys.setPopular('');
  }

  initSort(): void {
    (document.getElementById('sort') as HTMLSelectElement).value = <string>keys.getKeySort();
  }

  initPopularFilter(): void {
    if (localStorage.getItem('popular')) {
      (document.querySelector('.popular') as HTMLInputElement).checked = true;
    }
  }

  initActiveCheckboxes(elems: NodeList, key: string[]): void {
    elems.forEach(item => {
      if (key.includes((item as HTMLInputElement).value)) {
        (item as HTMLInputElement).checked = true;
      }
    });
  }
}

export const initLS = new InitLocalStorage();

if (localStorage.length === 0) initLS.initFilters(); // important for first exit on page
initLS.initBasketAndSort();
initLS.initSort();
initLS.initPopularFilter();
initLS.initActiveCheckboxes(
  document.querySelectorAll('.color__item'),
  JSON.parse(keys.getColors()),
);
initLS.initActiveCheckboxes(
  document.querySelectorAll('.maker__item'),
  JSON.parse(keys.getKeyMaker()),
);
initLS.initActiveCheckboxes(
  document.querySelectorAll('.camera__item'),
  JSON.parse(keys.getCameras()),
);

rangeValue(
  'amount',
  'amount__left',
  'amount__right',
  {
    start: JSON.parse(keys.getRangeAmount()),
    limit: 20,
    behaviour: 'drag',
    connect: true,
    step: 1,
    range: {
      'min': 1,
      'max': 20,
    },
  },
  'range-amount',
);
rangeValue(
  'debut',
  'debut__left',
  'debut__right',
  {
    start: JSON.parse(keys.getRangeYears()),
    limit: 2022,
    behaviour: 'drag',
    connect: true,
    step: 1,
    range: {
      'min': 2018,
      'max': 2022,
    },
  },
  'range-year',
);

renderCards();

console.log(`
  САМОПРОВЕРКА:
  
  1. Главная страница содержит все 22 товара из магазина а также фильтры, строку поиска, поле для сортировки. 
     Выполняются требования к вёрстке +10
  
  2. Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, 
  цвет, количество камер, производитель, популярность, и иконку по которй можно определить находится ли товар в 
  корзине +10
  
  3. Добавление товаров в корзину +20:
    + кликая по иконке кнопке на карточке, товар можно добавлять в корзину или удалять. Карточки 
      добавленных в корзину товаров внешне отличаются видом иконки +10
    + на иконке корзины отображается количество добавленных в корзину товаров. При попытке добавить в корзину больше 
      20 товаров, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены" +10
  
  4. Сортировка +20:
     Сортируются только те товары, которые в данный момент отображаются на странице
    + сортировка товаров по названию в возрастающем и убывающем порядке +10
    + сортировка товаров по году их выхода на рынок в возрастающем и убывающем порядке +10
    
  5. Фильтры в указанном диапазоне от и до +30
    + фильтры по количеству на складе +10
    + фильтры по году выпуска на рынок +10
    + для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков 
      отображается их текущее значение, разный цвет слайдера до и после ползунка +10
  
  6. Фильтры по значению +30
     Выбранные фильтры выделяются чекбоксом (стилем)
    + фильтры по производителю +5
    + фильтры по цвету +5
    + фильтры по количеству камер +5
    + можно отобразить только популярные товары +5
    + можно отфильтровать товары по нескольким фильтрам одного типа +10
    
  7. Можно отфильтровать товары по нескольким фильтрам разного типа +20
    + Для нескольких фильтров разного типа отображаются только те товары, которые соответствуют всем выбранным фильтрам
    + Например, можно отобразить только черные товары. Или популярные белые и красные товары впоступившие на рынок 
      в 2018-2022 годах.
    + Если товаров, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом 
    формате, например, "Извините, совпадений не обнаружено"
    
  8. Сброс фильтров +20
    + есть кнопка "Очистить фильтры" для сброса фильтров (но не для установки сортировки по умолчанию и 
      очистки корзины) +10
    + при сбросе фильтров кнопкой "Очистить фильтры", ползунки range slider сдвигаются к краям, значения ползунков 
      возвращаются к первоначальным, range slider закрашивается одним цветом +10
      
  9. Сохранение настроек в local storage +30
    + выбранные пользователем фильтры, порядок сортировки, добавленные в избранное товары сохраняются при перезагрузке 
      страницы. Есть кнопка "Очистить все настройки", которая очищает local storage и устанавливает его по умолчанию +10
  10. Поиск +30
    + при открытии приложения курсор находится в поле поиска +2
    + автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
    + есть placeholder +2
    + в поле поиска есть крестик, позволяющий очистить поле поиска +2
    + если нет совпадения последовательности букв в поисковом запросе с названием товара, выводится уведомление в 
      человекочитаемом формате, например "Извините, совпадений не обнаружено" +2
    + при вводе поискового запроса на странице остаются только те товары, в которых есть указанные в поиске буквы в 
      указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не 
      учитывается. Поиск ведётся только среди товаров, которые в данный момент отображаются на странице +10
    + если очистить поле поиска, на странице отображаются товары, соответствующие всем выбранным фильтрам и настройкам 
      сортировки +10
`);

