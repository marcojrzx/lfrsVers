<?php
/* Aca llegan los datos del primer envío por Ajax para ser procesados*/ 

if(isset($_POST['fechaNacimiento'])){
$fechaNacimiento=$_POST['fechaNacimiento'];
}


$fecha = date('Y-m-d');
$nuevafecha = strtotime ( '-13 year' , strtotime ( $fecha ) ) ;
$nuevafecha = date ( 'Y-m-d' , $nuevafecha );

$val1 = $fechaNacimiento;
$val2 = $nuevafecha;

$datetime1 = new DateTime($val1);
$datetime2 = new DateTime($val2);

if($datetime1 <= $datetime2)
  echo '1';
else
  echo '0';
?>