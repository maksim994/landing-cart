<?php 
include 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Корзина для лендинга</title>
  <link rel="stylesheet" href="./css/graph-modal.min.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>


  <header>
    <div class="wrapper">
      <div class="header__wrapper">
        <div class="logo">Корзина для лендинга</div>

        <button class="s-basket__min">
          <svg width="20" height="20" fill="#FFF">
            <use xlink:href="./images/sprite.svg#cart"></use>
          </svg>
          <span class="s-basket__min-count">0</span>
        </button>
      </div>
  </header>
  <div class="wrapper">
    <div class="product">
    <?php foreach($products as $product): ?>
      <div class="product__element">
        <div class="product__images">
          <img src="<?php echo $product['images']?>" alt="<?php echo $product['name'];?>" class="product__img">
        </div>
        <div class="product__name">
          <?php echo $product['name'];?>
        </div>
        <div class="product__price">
          <?php echo $product['price'];?> руб.
        </div>

        <div class="product__btn">

          <div class="product__quantity">
            <button class="c-basket__remove-item">-</button>
            <input class="c-basket__product-quantity-state" min="1" step="1" pattern="^[0-9]" value="1">
            <button class="c-basket__add-item">+</button>
          </div>

          <button class="product__add-to-cart-button" 
            data-id-or-vendor-code="<?php echo $product['code'];?>" 
            data-product-name="<?php echo $product['name'];?>" 
            data-product-price="<?php echo $product['price'];?>"  
            data-product-quantity="1" 
            data-product-img="<?php $product['images']?>"
          >
            <svg width="20" height="20" fill="#FFF">
              <use xlink:href="./images/sprite.svg#cart"></use>
            </svg>
            В корзину
          </button>
        </div>
      </div>

    <?php endforeach; ?>
    </div>
  </div>


  <div class="modal">

		<div class="modal__container" role="dialog" aria-modal="true" data-graph-target="product-add-cart">
			<div class="modal-content">
        <div class="c-basket__alert">
          <div class="c-basket__alert-icon">
            <svg width="100" height="100">
              <use xlink:href="./images/sprite.svg#succes"></use>
            </svg>
          </div>
          <div class="c-basket__alert-text">Товар добавлен в корзину</div>
          <div class="c-basket__alert-footer">
            <button class="c-basket__alert-button c-basket__alert-button_close">Продолжить покупки</button>
            <button class="c-basket__alert-button c-basket__alert-button_by">В корзину</button>
          </div>
        </div>
      </div>
		</div>

    <div class="modal__container" role="dialog" aria-modal="true" data-graph-target="cart">
			<button class="btn-reset modal__close" aria-label="Закрыть модальное окно"></button>
			<div class="modal-content">

        <div class="modal-product-list__cart"></div>
        <div class="modal-total__cart">Итого: <span></span> </div>


        
        <form action="" method="post" id="order">
          <label for="name">
            <div class="input__label">Имя</div>
            <input name="name" id="name" type="text">
          </label>
          <label for="email">
            <div class="input__label">Email</div>
            <input name="email" id="email" type="email">
          </label>
          <label for="phone">
            <div class="input__label">Телефон</div>
            <input name="phone" id="phone" type="tel">
          </label>
          <label for="files">
            <div class="input__label">Прикрепите документ</div>
            <input name="files" id="files" type="file" accept="image/jpeg,image/png,image/gif">
          </label>
          <label for="comment">
            <div class="input__label">Комментарий</div>
            <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
          </label>
          <input name="product" id="product" type="text">

          <div class="smartlid__checkbox-wrapper"><input class="smartlid__checkbox smartlid__checkbox_agreement" type="checkbox" name="agreement" id="smartlid__checkbox_agreement" value="Принимаю"><label for="smartlid__checkbox_agreement" class="smartlid__label smartlid__label_agreement"><a class="agreement-link" href="#" target="_blank">Я <span class="toggle--on">принимаю</span><span class="toggle--off">не принимаю</span> условия пользовательского соглашения</a></label></div>

          <button type="submite" id="send-order">Оформить заказ</button>
        </form>
      </div>
		</div>



  </div>


  <script src="./js/graph-modal.min.js"></script>
  <script src="./js/main.js"></script>
</body>
</html>