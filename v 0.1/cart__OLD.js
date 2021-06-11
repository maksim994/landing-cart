let cart = {};
let defaultData = [];

$(document).ready( function () {
    checkCart();
    showMiniCart();
    count();

    $('button.add-to-cart').on('click', addToCart);

    $('.cart').on('click', function(){
      $('.mini-cart__wrapper').show();
    })

    $('.mini-cart__close').on('click', function(){
      $('.mini-cart__wrapper').hide();
    })


});

let state = {
  data: []
}
function addToCart(){
    //добавление товара в корзину
    let art = $(this).attr('data-art').trim();
    let product_name = $(this).attr('data-name').trim();

    const obj = {
      name: product_name,
      count: 0,
      art: art,
    };

    state.data.push(obj);
    const itemData = state.data.find((item)=>item.art === art);
    const newObject = [Object.assign({}, itemData, {count: itemData.count+=1})];
    const filteredMas = state.data.filter(item=>{
        return item.art !== art
    });
    const newMas = [...filteredMas, ...newObject];
    state.data = newMas;

    //$.fancybox.open('<div class="message">Товар ' + product_name +'успешно добавлен в корзину</div>');
    localStorage.setItem('cart-product', JSON.stringify(state.data));
    showMiniCart();
}

function checkCart() {
    if (localStorage.getItem('cart-product') != null ){
        cart = JSON.parse(localStorage.getItem('cart-product'));
        console.log(cart);
    }
}

function showMiniCart(){
    //выведим элементы в мини корзине
    let out = '<ul class="cart__list">';

    cart.forEach(element => {
        out += `<li>
                    <div class="cart__item">
                        <div class="cart__name">${element.name}</div>
                        <div class="cart__count">
                            <button class="btn btn_cart-minus" data-art="${element.art}">-</button>
                            <input type="text" class="input__cart-count" value="${element.count}">
                            <button class="btn btn_cart-plus" data-art="${element.art}">+</button>
                        </div>
                        <div class="cart__dell"><i class="fas fa-times"></i></div>
                    </div>
                </li>`;
    });

    out += '<ul>';

    $('#mini-cart').html(out);
    $('.btn_cart-plus').on('click', plusGoods);
}

function plusGoods(){
    let art = $(this).attr('data-art');
    
    cart.forEach(element => {
        if (element.art == art){
            element.count++;
        }
    });
    localStorage.setItem('cart-product', JSON.stringify(cart));
    showMiniCart();
}

function count(){
  return $('.cart span').html(cart.length);
}


$(document).ready(function () {
    $(function () {
        var btn = $('.c-form__btn'); // Обьявляем все кнопки по классу
        var product = $('input[name="product"]'); // Обьявляем скрытое поле description в форме

        btn.on('click', function(){ // Функция по клику на кнопку
            var productCart = localStorage.getItem('cart-product');
            if(productCart){ // Если у нас есть продуктовое описание, то добавляем в скрытое поле формы это значение
                product.val(productCart);
            }
        });
    })

    async function sendForm(url, form){
		let newForm = new FormData(form);
		let obj = {};
		newForm.forEach((item, index)=>{
			obj[index] = item;
		});
		return await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
    }
    
    $.each($(".form-validate"), function () {
        $(this).validate({
            messages: {
                name: "Введите имя",
                phone: "Введите телефон",
                email: "Введите ваш Email",
            },
            submitHandler: function (form) {
                sendForm('/send.php', form).then(function (response) {
                    //$('.c-modal.--success').fadeIn().delay(2000).fadeOut();
                }).catch(function (error) {
                    //$('.c-modal.--error').fadeIn().delay(2000).fadeOut();
                });
            }
        });
    });
});