
document.addEventListener("DOMContentLoaded", function(event) {
  'use strict';

  let state = {
    data: []
  }

  let date  = JSON.parse(localStorage.getItem('cart-product'));  
  if (localStorage.getItem('cart-product') != null ){
    date.forEach(e => {
      state.data.push(e);
    });
    //state.data.push(JSON.parse(localStorage.getItem('cart-product')));
  }


  const products = document.querySelectorAll('.product__element');

  const modal = new GraphModal();
  const modalClose = document.querySelector('.modal-content__close');
  const modalBy = document.querySelector('.modal-content__by');

  const cartBtn = document.querySelector('.l-cart');
  const cartCountLabel = document.querySelector('.l-cart__count');

  const cartProductList = document.querySelector('.modal-product-list__cart');
  let cart;

  function init() {
    checkCart();
    count();
  }
  
  function checkCart() {
    if (localStorage.getItem('cart-product') != null ){
      cart = JSON.parse(localStorage.getItem('cart-product'));
    } else {
      cart = null;
    }
  }

  function showMiniCart(){
    if (cart != null ) {
    cartProductList.innerHTML = '';
    //выведим элементы в мини корзине
    let out = '<ul class="cart__list">';

    cart.forEach(element => {
      let totalPrice  = Number(element.mv_price) * Number(element.count);
      out += `<li>
          <div class="cart__item" data-id="${element.productSku}">
              <div class="cart__name">${element.name}</div>
              <div class="cart__price">${element.mv_price}</div>
              <div class="cart__count">
                <button class="btn btn_cart-minus">-</button>
                <input type="text" class="input__cart-count" value="${element.count}">
                <button class="btn btn_cart-plus">+</button>
              </div>
              <div class="cart__total-price">${totalPrice}</div>
              <div class="cart__dell">х</div>
          </div>
        </li>`;
    });

    out += '<ul>';

    cartProductList.innerHTML = out;
    // $('.btn_cart-plus').on('click', plusGoods);
    } else {
      cartProductList.innerHTML = "Корзина пуста";
    }
  }

  function count(){

    if (localStorage.getItem('cart-product') != null ){
      cartCountLabel.innerHTML = cart.length;
    } else {
      cartCountLabel.innerHTML = 0;
    }
    
  }

  products.forEach(product => {
    const btnAddCart = product.querySelector('.product__add-to-cart-button');

    const quantity = product.querySelector('.smart-basket__product-quantity-state'); // Кол-во товара
    const btnAddItem = product.querySelector('.smart-basket__add-item'); // Кнопка плюс 
    const btnRemoveItem = product.querySelector('.smart-basket__remove-item');  // Кнопка минус 

    const productName = btnAddCart.getAttribute("data-sb-product-name");
    const productSku = btnAddCart.getAttribute("data-sb-id-or-vendor-code");
    const productPrice = btnAddCart.getAttribute("data-sb-product-price");
    const productQuantity = btnAddCart.getAttribute("data-sb-product-quantity");
    const productImages = btnAddCart.getAttribute("data-sb-product-img");
    
    btnAddItem.addEventListener('click', () => {
      quantity.value = Number(quantity.value) + 1;
    });

    btnRemoveItem.addEventListener('click', () => {
      quantity.value = Number(quantity.value) - 1;
      if (Number(quantity.value) < 1){
        quantity.value = 1
      }
    });

    btnAddCart.addEventListener('click', () => {

      const obj = {
        name: productName,
        count: 0,
        productSku: productSku,
        mv_price: productPrice,
        mv_images: productImages,
      };

      state.data.push(obj);

      const itemData = state.data.find( (item)=>item.productSku === productSku );
      const newObject = [Object.assign({}, itemData, {count: itemData.count+= Number(quantity.value) })];
      const filteredMas = state.data.filter(item=>{
        return item.productSku !== productSku
      });

      const newMas = [...filteredMas, ...newObject];
      state.data = newMas;

      localStorage.setItem('cart-product', JSON.stringify(state.data));

      modal.open('product-add-cart');
      init();
    })
  });

  let summ = 0;
  function openCartModal(){
    if ( document.querySelectorAll('.cart__item') ) {
      const cartItem = document.querySelectorAll('.cart__item');
      const totalValue = document.querySelector('.modal-total__cart span');
      
      cartItem.forEach( cartItems => {
        const btnAddItem = cartItems.querySelector('.btn_cart-plus'); // Кнопка плюс 
        const btnRemoveItem = cartItems.querySelector('.btn_cart-minus');  // Кнопка минус
        const quantity = cartItems.querySelector('.input__cart-count'); // Кол-во товара

        const remove = cartItems.querySelector('.cart__dell'); // Кнопка удалить 

        const productSku = cartItems.getAttribute("data-id"); //SKU

        const totalPrice = cartItems.querySelector('.cart__total-price'); //Итоговая сумма за товар
        const price = cartItems.querySelector('.cart__price'); //Цена

        btnAddItem.addEventListener('click', () => {
          quantity.value = Number(quantity.value) + 1;
          
          cart.forEach(element => {
            if (element.productSku == productSku){ element.count++;}
            totalPrice.innerHTML = ( Number(quantity.value) * Number(price.textContent) ) ;
          });
          localStorage.setItem('cart-product', JSON.stringify(cart));
          
        });
    
        btnRemoveItem.addEventListener('click', () => {

          quantity.value = Number(quantity.value) - 1;

          cart.forEach(element => {
            if (element.productSku == productSku){ element.count--;}
            totalPrice.innerHTML = Number(quantity.value) * Number(price.textContent);
          });
          
          if (Number(quantity.value) < 1){
            quantity.value = 1
          }

          localStorage.setItem('cart-product', JSON.stringify(cart));

        
        });

        remove.addEventListener('click', () => {

          cart.forEach((element, key) => {
            if (element.productSku == productSku){
              cart.splice(key, 1);
            }
          });
          
          cartItems.style.display = "none";
          console.log(cart);
          localStorage.setItem('cart-product', JSON.stringify(cart));


          
        });

        summ += Number(totalPrice.textContent);

      })
      console.log(summ);
      totalValue.innerHTML = summ;
    }
  };




  modalClose.addEventListener('click', () => {
    modal.close();
  });

  modalBy.addEventListener('click', () => {

    showMiniCart();
    openCartModal();

    modal.close();
    modal.open('cart');
    
  });

  cartBtn.addEventListener('click', () => {
    showMiniCart();
    openCartModal();


    modal.open('cart');
  });

  init();


  const orderForm = document.querySelector('#order');
  const orderBtn = document.querySelector('#send-order');



  orderForm.onsubmit = async (e) => {
    e.preventDefault();
    
    let response = await fetch('./send-cart.php', {
      method: 'POST',
      body: new FormData(orderForm)
    });

    // let result = await response.json();

    // alert(result.message);
  };




});