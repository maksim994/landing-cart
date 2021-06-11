<?php 
include 'config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./modal/graph-modal.min.css">
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <header>
    <div class="l-cart">
      <div class="l-cart__icon">
        <svg width="20" height="20" fill="#FFF">
					<use xlink:href="./sprite.svg#cart"></use>
				</svg>
      </div>
      <div class="l-cart__count">0</div>
    </div>
  </header>

  <div class="product">
  <?php foreach($products as $product): ?>

    <div class="product__element">
      
      <?php echo $product['name'];?>

      <p>Цена: <?php echo $product['price'];?></p>

      <div class="product__quantity">
        <div class="smart-basket__quantity-item">
          <button class="smart-basket__remove-item">-</button>
          <input class="smart-basket__product-quantity-state" min="1" step="1" pattern="^[0-9]" value="1">
          <button class="smart-basket__add-item">+</button>
        </div>
      </div>

      <button class="product__add-to-cart-button" 
        data-sb-id-or-vendor-code="<?php echo $product['code'];?>" 
        data-sb-product-name="<?php echo $product['name'];?>" 
        data-sb-product-price="<?php echo $product['price'];?>"  
        data-sb-product-quantity="1" 
        data-sb-product-img="<?php $product['images']?>"
      >
        В корзину
      </button>
    </div>

  <?php endforeach; ?>
  </div>


  <div class="modal">

		<div class="modal__container" role="dialog" aria-modal="true" data-graph-target="product-add-cart">
			<div class="modal-content">
        <p>Товар добавлен в корзину</p>
        <div class="modal-content__footer">
          <button class="modal-content__btn modal-content__close">Продолжить покупки</button>
          <button class="modal-content__btn modal-content__by">В корзину</button>
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

          <button type="submite" id="send-order">Оформить заказ</button>
        </form>
      </div>
		</div>



  </div>


  <script src="./modal/graph-modal.min.js"></script>
  <script src="./main.js"></script>
</body>
</html>