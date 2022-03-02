import productList from './productList';

const container = document.querySelector('.category-page__products');
const categories = document.querySelectorAll('.category-page__category');

let currentCategory = 'all';

const filterProducts = (targetCategory) =>
  targetCategory === 'all'
    ? productList
    : productList.filter((product) => product.category === targetCategory);

const toggleActive = (e) => {
  categories.forEach((category) => {
    category.classList.remove('active');
  });
  e.classList.add('active');
};

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

const displayProductCounters = (productCategories) => {
  productCategories.forEach((category) => {
    const button = category.querySelector('button');
    const counter = category.querySelector('.category-page__product-count');
    const targetCategory = button.dataset.category;
    const products = filterProducts(targetCategory);
    counter.textContent = products.length;
  });
};

toggleActive(categories[0]);
displayProductCards(productList);
displayProductCounters(categories);

function handleClick() {
  const targetCategory = this.querySelector('button').dataset.category;
  if (targetCategory === currentCategory) return;
  const filteredProducts = filterProducts(targetCategory);
  currentCategory = targetCategory;
  displayProductCards(filteredProducts);
  toggleActive(this);
}

categories.forEach((category) =>
  category.addEventListener('click', handleClick)
);
