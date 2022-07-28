import { sortOptions } from './sort';
import { IPhones } from '../../interfaces/i-phones';

describe('Test sort function', () => {
  const products = [
    { name: 'Apple iPhone 11', photo: './assets/Apple-iPhone-11.jpg',
      camera: '2', popular: 'да', amount: 5, debut: 2021, color: 'белый', maker: 'Apple', inBasket: false },
    { name: 'Apple iPhone 12', photo: './assets/Apple-iPhone-12.jpg',
      camera: '3', popular: 'нет', amount: 9, debut: 2022, color: 'зеленый', maker: 'Apple', inBasket: false },
    { name: 'Apple iPhone 13', photo: './assets/Apple-iPhone-13.jpg',
      camera: '3', popular: 'да', amount: 14, debut: 2022, color: 'золотой', maker: 'Apple', inBasket: false },
    { name: 'Motorola G60', photo: './assets/Motorola-G60.jpg',
      camera: '4', popular: 'нет', amount: 7, debut: 2019, color: 'серый', maker: 'Motorola', inBasket: false },
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  it('Should sort array in alphabet increase', () => {
    const sorted = products.sort((a: IPhones, b: IPhones) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });

    expect(sortOptions('alphabet_increase', products)).toEqual(sorted);
  });

  it('Should sort array in alphabet decrease', () => {
    const sorted = products.sort((a: IPhones, b: IPhones) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    });

    expect(sortOptions('alphabet_decrease', products)).toEqual(sorted);
  });

  it('Should sort array in year increase', () => {
    const sorted = products.sort((a: IPhones, b: IPhones) => a.debut - b.debut);

    expect(sortOptions('year_increase', products)).toEqual(sorted);
  });

  it('Should sort array in year decrease', () => {
    const sorted = products.sort((a: IPhones, b: IPhones) => b.debut - a.debut);

    expect(sortOptions('year_decrease', products)).toEqual(sorted);
  });
});
