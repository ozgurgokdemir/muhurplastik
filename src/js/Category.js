import productList from './productList';

const container = document.querySelector('.category-page__products');
// const categoryList = document.querySelectorAll('.category-page__category-list');
const categories = document.querySelectorAll('.category-page__category');

let currentCategory = 'all';

const displayProducts = (products) => {
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

const toggleActive = (e) => {
  categories.forEach((category) => {
    category.classList.remove('active');
  });
  e.classList.add('active');
};

displayProducts(productList);
toggleActive(categories[0]);

function handleClick() {
  const targetCategory = this.querySelector('button').dataset.category;
  if (targetCategory === currentCategory) return;
  const products =
    targetCategory === 'all'
      ? productList
      : productList.filter((product) => product.category === targetCategory);
  displayProducts(products);
  toggleActive(this);
  currentCategory = targetCategory;
}

categories.forEach((category) =>
  category.addEventListener('click', handleClick)
);
