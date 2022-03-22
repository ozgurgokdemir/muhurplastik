import productList from './product-list';

const container = document.querySelector('.category-page__products');
const categoryList = document.querySelector('.category-page__category-list');

const getSearchParams = (key) => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(key);
};

const setSearchParams = (key, value) => {
  if (!window.history.pushState) return;
  const { search, protocol, host, pathname } = window.location;
  const searchParams = new URLSearchParams(search);
  searchParams.set(key, value);
  const newURL = `${protocol}//${host}${pathname}?${searchParams.toString()}`;
  window.history.pushState({ path: newURL }, '', newURL);
};

const getCategories = (list) =>
  list
    .map(({ category }) => category)
    .filter(
      (category, index, array) =>
        array.indexOf(category) === index && category !== undefined
    );

const filterProducts = (products, category) => {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  return filteredProducts.length > 0 ? filteredProducts : productList;
};

const displayProductCategories = (categoryArray) => {
  categoryList.innerHTML = categoryArray
    .map(
      (category) => `
    <li class="category-page__category" data-category="${category}">
      <button type="button">
        ${category}
        <i class="fas fa-plus icon"></i>
      </button>
    </li>`
    )
    .join('');
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
    </div>`
    )
    .join('');
};

const toggleActive = (element, array) => {
  array.forEach((category) => {
    category.classList.remove('active');
  });
  element.classList.add('active');
};

const categories = ['Tüm Ürünler', ...getCategories(productList)];
let currentCategory = getSearchParams('kategori') ?? 'Tüm Ürünler';
let currentProducts = filterProducts(productList, currentCategory);

displayProductCategories(categories);
displayProductCards(currentProducts);

const categoryItems = categoryList.querySelectorAll('.category-page__category');
const categoryIndex = categories.findIndex((i) => i === currentCategory);
toggleActive(categoryItems[categoryIndex], categoryItems);

const handleClick = (element) => {
  const targetCategory = element.dataset.category;
  if (targetCategory === currentCategory) return;
  currentProducts = filterProducts(productList, targetCategory);
  currentCategory = targetCategory;
  setSearchParams('kategori', currentCategory);
  displayProductCards(currentProducts);
  toggleActive(element, categoryItems);
};

categoryItems.forEach((categoryItem) =>
  categoryItem.addEventListener('click', handleClick.bind(this, categoryItem))
);
