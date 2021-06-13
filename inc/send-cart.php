<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer/Exception.php';
require './PHPMailer/PHPMailer.php';
require './PHPMailer/SMTP.php';

require './../config.php';

$response["success"] = false;

if (isset($_POST) && !empty($_POST)) {

  $productArr = json_decode($_POST['userProduct']);

  if ( !empty($productArr) ){
    $productList = 'Клиент заказал: <ul>';
    foreach ($productArr as $product) {
      $productList .= '<li>Товар: '.$product->name.' Кол-во: '.$product->count.' SKU: '.$product->productSku. ' Цена: '.$product->mv_price.'</li>';
    }
    $productList .= '</ul>';
  }


  foreach ($_POST as $post_key => $post_val) {
    $$post_key = htmlspecialchars($post_val);
  }
  
  $body = '';

  if ( !empty($userName) ) { $body .= 'Имя: '.$userName.'<br>'; }
  if ( !empty($userTel) ) { $body .= 'Телефон: '.$userTel.'<br>'; }
  if ( !empty($userEmail) ) { $body .= 'Email: '.$userEmail.'<br>'; }
  if ( !empty($userComment) ) { $body .= 'Комментарий к заказу: '.$userComment.'<br>'; }
  if ( !empty($productList) ) { $body .= $productList; }

  if ($_FILES && $_FILES["filename"]["error"] == UPLOAD_ERR_OK){
    $name = "/upload/" . $_FILES["filename"]["name"];
    move_uploaded_file($_FILES["filename"]["tmp_name"], $name);
  }


  $mail = new PHPMailer;
  $mail->CharSet = 'UTF-8';
   
  //От кого
  $mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], '');

  //Кому
  foreach ( $admin_email as $key => $value ) {
    $mail->addAddress($value);
  }

  // Тема письма
  $mail->Subject = "Заявка с формы: ".$url_site.' от '.date("m.d.y H:i");
  $mail->isHTML(true);

  $mail->msgHTML($body);

  $result = $mail->send();

  if($result === true){
    $response["success"] = true;
  }else{
    $themes = 'Проблема с почтой'. $url_site;
    mail("m.molkov@wbooster.ru", $themes, $result);
    $response["success"] = false;
  }
}
echo json_encode($response);
die();