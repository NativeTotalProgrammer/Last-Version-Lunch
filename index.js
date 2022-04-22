import { menudata } from './data/menu.js';

const sectionCenter      = document.querySelector('.main__products');
const ulButtonsContainer = document.querySelector('.ul__buttons');

// HTMlContentLoaded START

window.addEventListener('DOMContentLoaded', function() {
  displayAllDishes(menudata);
  displayMenuButtons(); 
  buttonsReady();
  
  // displayCartItem();
});

// HTMlContentLoaded END

// AUX FUNCTION TO MENUDATA START

function menuObjectToArray(menuObjectComplete) {
  const arrayCategory = Object.values(menuObjectComplete);
  let allDishesArray  = []
  
  for (let i = 0; i < arrayCategory.length; i++) {
    for (let j = 0; j < arrayCategory[i].length; j++) {
      allDishesArray.push(arrayCategory[i][j]);
    };
  };
  
  return allDishesArray 
}

// AUX FUNCTION TO MENUDATA START

// FUNCTION 1 DISPLAY ITEMS START

function displayAllDishes(menuProducts) {
  
  const myDish = menuObjectToArray(menuProducts).map(dish => {
    // console.log(dish);
    return `
    <article class='article__dish'>
      <img src="./assets/${dish.image}.jpg" />
      <div class='dish__info'>
        <header class='header__dish'>
          <h4 class='title__dish'>${dish.title}</h4>
          <h4 class='price'>$${dish.price}</h4>
        </header>
        <header class='header__Add'>
          <p>
            ${dish.description}
          </p>
          <button class='btn__To__Cart'>ADD</button>
        </header>
      </div>
    </article>
    `;
  }).join('');   
  
  sectionCenter.innerHTML = myDish;
};

// FUNCTION 1 DISPLAY ITEMS END

// FUNCTION 2 DISPLAY BUTTONS START

function displayMenuButtons() {

  

  const buttonsCategories = Object.keys(menudata);
  buttonsCategories.unshift('all');
  
  const allBtnsCategories = buttonsCategories.map(category => {
    return `<li class="li__filter" type="button" data-name=${category}>${category}</li>`;
  }).join('');
  
  ulButtonsContainer.innerHTML = allBtnsCategories;
  const filterButtons      = ulButtonsContainer.querySelectorAll('.li__filter');
  
  const liItem = document.querySelectorAll('ul li');
  
  liItem.forEach(li => {
    li.onclick = function() {
      
      liItem.forEach(li => {
        li.className = "";
      });
  
      li.className = "active";
      
    };
  });

  // FILTER BUTTONS START
  
  filterButtons.forEach(btn => {

   
    

      btn.addEventListener('click', (e) => {

     

        const category = e.currentTarget.dataset.name;
        const itemsFilterByCategoryArray = menudata[category];
        
        if (category === 'all') {
          displayAllDishes(menudata);

          buttonsReady();

        } else {
          
          const myDish = itemsFilterByCategoryArray.map(dish => {
            
            return `
              <article class='article__dish'>
                <img src="./assets/${dish.image}.jpg" />
                <div class='dish__info'>
                  <header class='header__dish'>
                    <h4 class='title__dish'>${dish.title}</h4>
                    <h4 class='price'>$${dish.price}</h4>
                  </header>
                  <header class='header__Add'>
                    <p>
                      ${dish.description}
                    </p>
                    <button class='btn__To__Cart'>ADD</button>
                  </header>
                </div>
              </article>
            `;
          }).join('');  
              
          sectionCenter.innerHTML = myDish;
            
          buttonsReady();
                    
        };
      });
    });

  // FILTER BUTTONS END  
};

// FUNCTION 2 DISPLAY BUTTONS START



function buttonsReady () {
  const buttonsToAddCart = document.getElementsByClassName('btn__To__Cart');
  // const myRequest        = document.querySelector('.div__order__items');
  
  
  for (let i = 0; i < buttonsToAddCart.length; i++) {
    buttonsToAddCart[i].addEventListener('click', (event) => {
      let product = {
        titleItem : event.target.parentElement.parentElement.children[0].children[0].textContent,
        quantity: 1,
      };
      addItemToLocalStorage(product);

      
    });
  };

 
};

function addItemToLocalStorage(objProduct) {
  let cartItem = JSON.parse(localStorage.getItem('prdIncart'));
  const productArr = [];
  
  if (cartItem === null) {
    productArr.push(objProduct);
    localStorage.setItem('prdIncart', JSON.stringify(productArr));
    console.log(cartItem)
  } else {
    cartItem.forEach(item => {
      if (objProduct.titleItem === item.titleItem) {
        objProduct.quantity = item.quantity += 1;
      } else {
        productArr.push(item);
      }
    });
    productArr.push(objProduct);
  };
  localStorage.setItem('prdIncart', JSON.stringify(productArr));
  window.location.reload();
};

function displayCartItem() {
  let html = '';
  const myRequest        = document.querySelector('.div__order__items');

  let cartItem = JSON.parse(localStorage.getItem('prdIncart'));
  
  cartItem.forEach(item => {
    html += `
    <div class='div__cart_order__list'>
        <h3>${item.titleItem}</h3>
        <span>(${item.quantity})</span>
        <span class='span__trash'>🗑</span>
        </div>
        `;
  });  
  
  
  myRequest.innerHTML = html;
  
};

displayCartItem();

const removeBtn = document.getElementsByClassName('span__trash');

let productsArr = [];

for(let i = 0; i < removeBtn.length; i++) {
  removeBtn[i].addEventListener('click', (e) => {
    let cartItem = JSON.parse(localStorage.getItem('prdIncart'));
    console.log(e.target.parentElement.children[0].textContent)
    cartItem.forEach(item => {
      console.log(item.titleItem);
      if (item.titleItem !== e.target.parentElement.children[0].textContent) {
        productsArr.push(item);
      };
    });
    
    localStorage.setItem('prdIncart', JSON.stringify(productsArr));
    window.location.reload();
  });
};

// console.log(products);

const removeAll = document.getElementsByClassName('button__red');

removeAll[0].addEventListener('click', (event) => {
  let productsArr = [];

  localStorage.setItem('prdIncart', JSON.stringify(productsArr));
  window.location.reload();
});