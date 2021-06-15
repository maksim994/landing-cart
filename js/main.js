
document.addEventListener("DOMContentLoaded", function(event) {
  'use strict';

  window.dataLayer = window.dataLayer || [];

  let state = {
    data: []
  }

  if (localStorage.getItem('cart-product') != null ){
    let date = JSON.parse(localStorage.getItem('cart-product'));  
    date.forEach(e => {
      state.data.push(e);
    });
  }


  const products = document.querySelectorAll('.product__element');

  const modal = new GraphModal();
  const modalClose = document.querySelector('.c-basket__alert-button_close');
  const basketCloseForm = document.querySelector('.s-basket__close-form');
  const modalBy = document.querySelector('.c-basket__alert-button_by');

  const cartBtn = document.querySelector('.s-basket__min');
  const cartCountLabel = document.querySelector('.s-basket__min-count');

  const cartProductList = document.querySelector('.modal-product-list__cart');
  const basketEmpty = document.querySelector('.s-basket__empty-title');
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
    count();
    if (cart != null ) {
      cartProductList.innerHTML = '';
      let out  = '';
      cart.forEach(element => {
        let totalPrice  = Number(element.mv_price) * Number(element.count);
        out += `
        <div class="s-basket__product-item" data-id="${element.productSku}" data-name="${element.name}">
          <div class="s-basket__product-name">${element.name}</div>
          <div class="s-basket__product-price">${element.mv_price}</div>
          <div class="s-basket__product-quantity">
            <button class="c-basket__remove-item">-</button>
            <input class="c-basket__product-quantity-state" min="1" step="1" pattern="^[0-9]" value="${element.count}">
            <button class="c-basket__add-item">+</button>
          </div>
          <div class="s-basket__product-price-common">${totalPrice}</div>
          <button class="s-basket__product-delete">
            <span class="s-basket__delete-icon">×</span>
          </button>
        </div>`;
      });
      cartProductList.innerHTML = out;
    }
  }

  function count(){
    if (localStorage.getItem('cart-product') != null && cart.length != 0){
      cartCountLabel.innerHTML = cart.length;
      basketEmpty.style.display = "none"; 
    } else {
      cartCountLabel.innerHTML = 0;
      basketEmpty.style.display = "block";
    }
    
  }

  products.forEach(product => {
    const btnAddCart = product.querySelector('.product__add-to-cart-button');

    const quantity = product.querySelector('.c-basket__product-quantity-state'); // Кол-во товара
    const btnAddItem = product.querySelector('.c-basket__add-item'); // Кнопка плюс 
    const btnRemoveItem = product.querySelector('.c-basket__remove-item');  // Кнопка минус 

    const productName = btnAddCart.getAttribute("data-product-name");
    const productSku = btnAddCart.getAttribute("data-id-or-vendor-code");
    const productPrice = btnAddCart.getAttribute("data-product-price");
    const productQuantity = btnAddCart.getAttribute("data-product-quantity");
    const productImages = btnAddCart.getAttribute("data-product-img");
    
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

      //Электронная коммерция
      let priceFormat = productPrice.toLocaleString('ru-RU');
      window.dataLayer.push({ 
        "ecommerce": { 
          "add": { 
            "products": [ { 
              "id": productSku, 
              "name": productName, 
              "price": Number(priceFormat), 
              "quantity": Number(quantity.value)
            } ] 
          } 
        } 
      });
      //END Электронная коммерция

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


  function productPriceCommon(){
    let summ = 0;
    const totalValue = document.querySelector('.s-basket__total-cost');
    const cartItem = document.querySelectorAll('.modal-product-list__cart .s-basket__product-item');
    cartItem.forEach( cartItems => {
      const totalPrice = cartItems.querySelector('.s-basket__product-price-common');
      summ += Number(totalPrice.textContent);
    });
    let sumFormat = summ.toLocaleString('ru-RU');
    totalValue.value = sumFormat;
  }


  function openCartModal(){
    if ( document.querySelectorAll('.modal-product-list__cart .s-basket__product-item') ) {
      const cartItem = document.querySelectorAll('.modal-product-list__cart .s-basket__product-item');

      cartItem.forEach( cartItems => {
        const btnAddItem = cartItems.querySelector('.c-basket__add-item'); // Кнопка плюс 
        const btnRemoveItem = cartItems.querySelector('.c-basket__remove-item');  // Кнопка минус
        const quantity = cartItems.querySelector('.c-basket__product-quantity-state'); // Кол-во товара
        const remove = cartItems.querySelector('.s-basket__product-delete'); // Кнопка удалить 
        const productSku = cartItems.getAttribute("data-id"); //SKU
        const productName = cartItems.getAttribute("data-name"); //SKU
        const totalPrice = cartItems.querySelector('.s-basket__product-price-common'); //Итоговая сумма за товар
        const price = cartItems.querySelector('.s-basket__product-price'); //Цена

        btnAddItem.addEventListener('click', () => {
          quantity.value = Number(quantity.value) + 1;
          
          cart.forEach(element => {
            if (element.productSku == productSku){ element.count++;}
            totalPrice.innerHTML = ( Number(quantity.value) * Number(price.textContent) ) ;
          });
          productPriceCommon();
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
          productPriceCommon();
          localStorage.setItem('cart-product', JSON.stringify(cart));        
        });

        remove.addEventListener('click', () => {
          
          //Электронная коммерция
          window.dataLayer.push({ 
            "ecommerce": { 
              "remove": { 
                "products": [ { 
                  "id": productSku,
                  "name": productName
                } ] 
              } 
            } 
          });
          //END Электронная коммерция
          cart.forEach((element, key) => {
            if (element.productSku == productSku){
              cart.splice(key, 1);
            }
          });

          cartItems.style.display = "none";
          localStorage.setItem('cart-product', JSON.stringify(cart));
          productPriceCommon();
          count();

          let arr = state.data;

          arr.forEach((el, key) => {
            if (el.productSku == productSku){
              arr.splice(key, 1);
            }
          });
        });
      })
      productPriceCommon();
    }
  };

  modalClose.addEventListener('click', () => {
    modal.close();
  });

  basketCloseForm.addEventListener('click', () => {
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

  const basketForm = document.querySelector('#s-basket__form');
  const basketError = document.querySelector('.s-basket__error-title');
  const basketSuccess = document.querySelector('.s-basket__success-title');

  basketForm.onsubmit = async (e) => {
    e.preventDefault();

    let userProduct = basketForm.elements.userProduct;
    userProduct.value = localStorage.getItem('cart-product');
    
    let response = await fetch('./inc/send-cart.php', {
      method: 'POST',
      body: new FormData(basketForm)
    });

    let result = await response.json();

    if( result.success == false ){
      console.error('Упс. Произошла ошибка');
      basketError.style.display = 'block';
    } else {
      const totalValue = document.querySelector('.s-basket__total-cost');
      localStorage.removeItem('cart-product');
      cartProductList.style.display = 'none';
      totalValue.value = 0;
      cartCountLabel.innerHTML = 0;

      basketError.style.display = 'none';
      basketSuccess.style.display = 'block';
    }

  };

});