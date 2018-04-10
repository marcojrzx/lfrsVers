<? 
//error_reporting(E_ALL);
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");

$myvar = new db_mysql;
$myvar->conectarBd();

function generaPass(){
    //Se define una cadena de caractares. Te recomiendo que uses esta.
    $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    //Obtenemos la longitud de la cadena de caracteres
    $longitudCadena=strlen($cadena);
     
    //Se define la variable que va a contener la contraseña
    $pass = "";
    //Se define la longitud de la contraseña, en mi caso 10, pero puedes poner la longitud que quieras
    $longitudPass=7;
     
    //Creamos la contraseña
    for($i=1 ; $i<=$longitudPass ; $i++){
        //Definimos numero aleatorio entre 0 y la longitud de la cadena de caracteres-1
        $pos=rand(0,$longitudCadena-1);
     
        //Vamos formando la contraseña en cada iteraccion del bucle, añadiendo a la cadena $pass la letra correspondiente a la posicion $pos en la cadena de caracteres definida.
        $pass .= substr($cadena,$pos,1);
    }
    return $pass;
}
		
if ($_POST['status']) {
	
	$sql2=" select * from clientes where email='".$_POST[email]."'  limit 1"; 
	$sihay=$myvar->get_arreglo($sql2);

	if(count($sihay)<=0){
		echo "<script type='application/javascript'>alert('CORREO YA EXISTENTE COMO USUARIO');
		window.history.back();</script>";
		
	}else{
		if($sihay[0][activo]!=1 or $sihay[0][id_statusCliente]!=1){ // 
			echo "<script type='application/javascript'>alert('USUARIO BLOQUEADO');
			window.history.back();</script>";
		}else{
			$pas=generaPass();
			
			$sql="update clientes set password='".sha1($pas)."' where id_cliente=".$sihay[0][id_cliente]." limit 1";
			$myvar->execute($sql);
		
			$headers ="MIME-Version: 1.0\r\n"; 
			$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
			$headers .="From: Administracion Lofers.club\r\n" ;
			mail($sihay[0][email],"Recuperacion Lofers",html($sihay[0][id_cliente],$pas),$headers);
		}
		
		
			
		header('Location: '.$urlprincipal.'re/recuperacion');
		exit;
	}
		
	
}//if submit
$html = new html;
$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include "funciones-arriba.php";

?>

<script type="text/javascript">
 /*function validarFormulario(){
          $("#formulario").validate();
  }*/
       
$(document).ready(function(){

    $("#formulario").validate({
        rules: {
            email: { required:true, email: true}
            
        },
        messages: {
            email : "Debe introducir un email válido."
        }
    });
});



</script>

<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


	
<center><br>
<? if($_GET[msg]){
echo "TE LLEGARA UN CORREO ELECTRONICO DE RECUPERACION";
 }else{?> 
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >

 
	<p><label for="correo">Correo (usuario):</label></p>
	<p><input name="email" type="email" id="email"  placeholder="Pon tu Email" autofocus /></p>
 
 	
	<input type="hidden" name="status"  id="status"/>
	<p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
</form>
<? }//if?>
<br><br><br>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";


function html($id,$pas){
		$myvar = new db_mysql;
		$myvar->conectarBd();

			$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$id." limit 1"; 
			$cliente=$myvar->get_arreglo($sql2);

	$nombre=$cliente[0][nombre]." ".$cliente[0][apellidos];
	$email=$cliente[0][email];
	

	$html="
	<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<title>Lofers.club | Lo pierdes, lo buscas, lo encuentras</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/imagenes/' width='300'  alt='lofers.com' title='lofers.com' /></td>
      </tr>
      <tr>
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>RECUPERACION CONTRASEÑA</span></td>
      </tr>
      
      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>Nombre: </span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $nombre ."</strong></span>        
		
		</td>
      </tr>
	  <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>Email: </span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $email ."</strong></span>        
		
		</td>
      </tr>
	  <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>Contraseña: </span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $pas ."</strong></span>        
		
		</td>
      </tr>
	  
</table></body>
</html>	
	";
	return $html;
 } 
?>
