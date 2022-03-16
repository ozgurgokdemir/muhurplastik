import productList from './product-list';

const container = document.querySelector('.category-page__products');
const categoryList = document.querySelector('.category-page__category-list');

const getCategories = (list) =>
  list
    .map(({ category }) => category)
    .filter(
      (category, index, array) =>
        array.indexOf(category) === index && category !== undefined
    );

const getCategoryHTML = (category) => `
  <li class="category-page__category" data-category="${category}">
    <button type="button">
      ${category}
      <i class="fas fa-plus icon"></i>
    </button>
  </li>`;

const displayProductCategories = (categoryArray) => {
  const categoriesHTML = categoryArray
    .map((category) => getCategoryHTML(category))
    .join('');
  categoryList.innerHTML = `
    ${getCategoryHTML('Tüm Ürünler')}
    ${categoriesHTML}
  `;
};

const categories = getCategories(productList);
displayProductCategories(categories);

const toggleActive = (element, array) => {
  array.forEach((category) => {
    category.classList.remove('active');
  });
  element.classList.add('active');
};

const categoryItems = categoryList.querySelectorAll('.category-page__category');
toggleActive(categoryItems[0], categoryItems);

const displayProductCards = (products) => {
  container.innerHTML = products
    .map(
      (product) => `
    <div class="card">
    <a href="${product.href}">
      <div class="card__media">
        <img class="card__image" src="${product.src}"
          srcset="${product.srcset}"
          alt="${product.name}" loading="lazy">
      </div>
      <div class="card__info">
        <h3 class="card__title">${product.name}</h3>
      </div>
    </a>
    </div>
  `
    )
    .join('');
};

displayProductCards(productList);

let currentCategory = 'Tüm Ürünler';

const filterProducts = (targetCategory) =>
  targetCategory === 'Tüm Ürünler'
    ? productList
    : productList.filter((product) => product.category === targetCategory);

const handleClick = (element) => {
  const targetCategory = element.dataset.category;
  if (targetCategory === currentCategory) return;
  const products = filterProducts(targetCategory);
  currentCategory = targetCategory;
  displayProductCards(products);
  toggleActive(element, categoryItems);
};

categoryItems.forEach((categoryItem) =>
  categoryItem.addEventListener('click', handleClick.bind(this, categoryItem))
);
