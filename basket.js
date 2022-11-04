'use strict';

const numberBasket = document.querySelector('span > span');
const basket = document.querySelector('.cartIconWrap');
const headertableBasket = document.querySelector('.basketHeader');
const totalTableBasket = document.querySelector('.basketTotalValue')
const itembasket = {};

// Обнулить корзину при загрузки страницы
window.addEventListener('load', () =>
  numberBasket.textContent = 0
);

basket.addEventListener('click', () => {
  document.querySelector('.basket').classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', el => {
  let button = el.target; // один обработчик на их общего предка.
  if (!button.textContent.includes('Add to Cart')) {
    return;
  }
  numberBasket.textContent = +(numberBasket.textContent) + 1;

  // При изменении структуры index.html  путь этих значений может измениться
  const productName = button.parentNode.parentNode.nextElementSibling.querySelector('.featuredName').textContent.replace('\n', '')
  const productPrice = +button.parentNode.parentNode.nextElementSibling.querySelector('.featuredPrice').textContent.replace('$', '')
  const id = +button.parentNode.parentNode.nextElementSibling.querySelector('.id').textContent
  //цена актуально для долларов $

  addTocart(id, productName, productPrice);

});

function addTocart(id, productName, productPrice) {
  if (!(id in itembasket)) {
    itembasket[id] = { id, productName, productPrice, piece: 0 };
  }
  itembasket[id].piece++;

  // Ставим новое количество добавленных товаров у значка корзины.
  numberBasket.textContent = getTotalBasketCount().toString();
  // Ставим новую общую стоимость товаров в корзине.
  totalTableBasket.textContent = getTotalBasketPrice().toFixed(2);
  // Отрисовываем продукт.
  productRowBasket(id);
}


/**
 * Считает и возвращает количество продуктов в корзине.
 * @return {number} - Количество продуктов в корзине.
 */
function getTotalBasketCount() {
  return Object.values(itembasket).reduce((acc, product) => acc + product.piece, 0);
}
// reduce -перебор каждого элемента

/**
 * Считает и возвращает итоговую цену по всем добавленным продуктам.
 * @return {number} - Итоговую цену по всем добавленным продуктам.
 */
function getTotalBasketPrice() {
  return Object
    .values(itembasket)
    .reduce((acc, product) => acc + product.productPrice * product.piece, 0);
}

function productRowBasket(id) {
  const productRow = `
      <div class="basketRow">
        <div>${itembasket[id].productName}</div>
        <div>
          <span class="productCount">${itembasket[id].piece}</span> шт.
        </div>
        <div>$${itembasket[id].productPrice}</div>
        <div>
          $<span class="productTotalRow">${(itembasket[id].productPrice * itembasket[id].piece).toFixed(2)
    }</span >
        </div >
      </div >`;
  headertableBasket.insertAdjacentHTML("afterend", productRow);

  //console.log(document.querySelector('.basketRow').textContent);
}

