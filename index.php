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
			<div class="modal-content">

      <div class="s-basket__product-item">
        <div class="s-basket__product-name">Наивменование</div>
        <div class="s-basket__product-price">Цена</div>
        <div class="s-basket__product-quantity smart-basket__product-quantity_header">Кол-во</div>
        <div class="s-basket__product-price-common">Сумма</div>
        <div class="s-basket__product-delete">Удалить</div>
      </div>

      <div class="modal-product-list__cart"></div>

      <div class="s-basket__result-common">
        <div class="s-basket__empty-title">Корзина пуста. Вы не добавили ни одного товара</div>
        <div class="s-basket__success-title" style="display: none;">Заказ принят. Ожидайте звонка</div>
        <div class="s-basket__error-title" style="display: none;">При отправке заказа произошла ошибка, попробуйте позднее</div>
        <div class="s-basket__price-common">
          <span>Общая стоимость: </span> 
          <input name="finalPrice" class="s-basket__total-cost" type="text" value="0">
        </div>
      </div>
      
        <form action="" method="POST" id="s-basket__form">
          <div class="s-basket__user-info">
            <div class="s-basket__input-wrapper">
              <input class="s-basket__user-input" type="text" placeholder="Введите имя" name="userName" required="required">
            </div>

            <div class="s-basket__input-wrapper">
              <input class="s-basket__user-input" type="tel" placeholder="Введите телефон" name="userTel" required="required" maxlength="16">
            </div>

            <div class="s-basket__input-wrapper">
              <input class="s-basket__user-input" type="email" placeholder="Введите e-mail" name="userEmail">
            </div>

            <div class="s-basket__input-wrapper s-basket__textarea-wrapper">
              <textarea class="s-basket__user-input" name="userComment" id="" cols="30" rows="5" placeholder="Комментарий к заказу"></textarea>
            </div>

            <div class="s-basket__input-wrapper s-basket__file-wrapper">
              <input class="s-basket__user-input" name="userFile" type="file" accept="image/jpeg,image/png,image/gif">
            </div>

            <div class="s-basket__agreement-wrapper">
              <input type="checkbox" name="agreement" class="s-basket__input-agreement" id="s-basket__input-agreement" checked="checked" value="Я принимаю условия пользовательского соглашения">
              <label class="s-basket__label-agreement" for="s-basket__input-agreement">Я принимаю условия <a class="smart-basket__link-agreement" href="#" target="_blank" rel="nofollow">пользовательского соглашения</a></label>
            </div>

            <input type="hidden" name="userProduct">
          </div>
          <div class="s-basket__footer">
            <button class="s-basket__close-form">Продолжить покупки</button>
            <button class="s-basket__send-form" form="s-basket__form" type="submit">Сделать заказ</button>
          </div>


        </form>
      </div>
		</div>



  </div>


  <script src="./js/graph-modal.min.js"></script>
  <script src="./js/main.js"></script>
</body>
</html>