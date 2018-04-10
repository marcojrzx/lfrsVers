<? 
//error_reporting(E_ALL);
session_start();
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");
$urlprincipal="http://lofers.club/"; 
$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select * from categoriasAnuncio where activo=1"; 
		$categorias=$myvar->get_arreglo($sql2);
		
if ($_POST['status']) {
	
	$sql2=" select * from clientes where email='".$_POST[email]."' limit 1"; 
		$sihay=$myvar->get_arreglo($sql2);

	if(count($sihay)>0){
		echo "<script type='application/javascript'>alert('ESTE CORREO YA ESTA EN USO');
		window.history.back();</script>";
		
	}else{
		if($_POST[id_pais]!=2){
			$sql="insert into clientes (nombre,apellidos,email,id_statusCliente,password,
		fechaIngreso,id_pais,id_tipoCliente,estado,municipio) values 
		('".$_POST[nombre]."',
	'".$_POST[apellidos]."','".$_POST[email]."',1,'".sha1($_POST[password])."','".date("Y-m-d H:i:s")."',
	'".$_POST[id_pais]."','".$_POST[id_tipoCliente]."','".$_POST[estado]."','".$_POST[municipio]."')";
			}else{ // es mexico
			$sql="insert into clientes (nombre,apellidos,email,id_statusCliente,password,
		fechaIngreso,id_pais,id_estado,id_municipio,id_tipoCliente) values 
		('".$_POST[nombre]."',
	'".$_POST[apellidos]."','".$_POST[email]."',1,'".sha1($_POST[password])."','".date("Y-m-d H:i:s")."',
	'".$_POST[id_pais]."','".$_POST[id_estado]."','".$_POST[id_municipio]."','".$_POST[id_tipoCliente]."')";
			}
		
		$myvar->execute($sql);
		
		
		$sql2=" select * from clientes where activo=1 and id_statusCliente=1 order by id_cliente desc limit 1"; 
		$c=$myvar->get_arreglo($sql2);
		

		$_SESSION[authLof4] = session_id();
			$_SESSION[ipLof4] = $_SERVER['REMOTE_ADDR'];
			$_SESSION[hostLof4] = $_SERVER['REMOTE_HOST'];
			$_SESSION[userLof4] = $_POST[email];
			$_SESSION[passLof4] = sha1($_POST[password]);
			$_SESSION[time] = time();
			$_SESSION['id_tipoClienteLof4'] = 1;
			$_SESSION['id_clienteLof4'] = $c[0][id_cliente];
			
		
		$headers ="MIME-Version: 1.0\r\n"; 
	$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
	$headers .="From: admin@lofers.club\r\n" ;
	$res=mail($_POST[email],"Bienvenido",html($_SESSION[id_clienteLof4]),$headers);
	
	
		
		header('Location: '.$urlprincipal.'perfil');
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
            nombre: { required: true, minlength: 2},
            apellidos: { required: true, minlength: 2},
            email: { required:true, email: true},
			password: {required: true,minlength: 2},
           password2: {required: true,minlength: 2,equalTo: password },
		    id_estado: { required: true},
            id_municipio: { required: true}
           
            
        },
        messages: {
            nombre: "Debe introducir su nombre.",
            apellidos: "Debe introducir su apellido.",
            email : "Debe introducir un email válido.",
            password : "Debe agregar password",
            password2 : "Deber verificar confirmacion de password",
            id_estado : "Deber seleccionar Estado",
            id_municipio : "Deber seleccionar Municipio"
        }
    });
});


function cargaMunicipios()
{
	
	var indice = document.getElementById('id_estado').selectedIndex;
	var opcion=document.getElementById('id_estado').options[indice].value;
	var valorselect=document.getElementById('id_estado').options[indice].text;
	
	
	  var dataString = "dato="+opcion+"&band=2";
			 $.ajax({
                type: "POST",
               url:"<? echo $urlprincipal?>combo-estados.php",
                data: dataString,
                beforeSend: function () {
                   $("#datosEstado1").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
						
                },
				success: function(data){
                    $("#datosEstado1").html(data);
                   
                }
	 });

}
function cargaEstados()
{
	var indice = document.getElementById('id_pais').selectedIndex;
	var opcion=document.getElementById('id_pais').options[indice].value;
	var valorselect=document.getElementById('id_pais').options[indice].text;
	
	
	  var dataString = "dato="+opcion+"&band=1";
			 $.ajax({
                type: "POST",
               url:"<? echo $urlprincipal?>combo-estados.php",
                data: dataString,
                beforeSend: function () {
                   $("#datosEstado").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
						
                },
				success: function(data){
                    $("#datosEstado").html(data);
                   
                }
	 });

}

</script>

<script language="javascript">
function procesaForm(idanun){
	
	if(document.getElementById('user').value=='' || document.getElementById('pass').value==''){
		var parametros = {
                "inputs" : "no",
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'get',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#respuesta").html(response);
                }
        });
		
	}else{
		
		var parametros = {
                "user" : document.getElementById('user').value,
                "pass" : document.getElementById('pass').value
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'post',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
					//alert(idanun);
                      if(response=='valido'){
							if(idanun!=0){
							eval("parent.location='visor.php?id="+idanun+"'");
							}else{
							eval("parent.location='anuncios.php'");
							}
						}else{
							$("#respuesta").html(response);
						}
					  
					   
                }
        });
	
		
	}//else
}//funcion

</script>
<center>
  <? if($_GET[msg]){
echo "BINVENIDO, INICIE SESION";
 }else{?> 
  
  <!--h1>Si no eres usuario Lofers, registrate ahora</h1-->
<h3>Favor de completar los siguientes datos</h3>
<div class="formas">
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	<div class="unaColForma">
    <div class="unaopF">
        <p><label for="nombre">Nombre:</label></p>
        <input name="nombre" type="text" id="nombre"  placeholder="Pon tu nombre" autofocus  value=""/>
    </div>
 
 	<div class="unaopF">
        <p><label for="apellidos">Apellidos:</label></p>
        <input name="apellidos" type="text" id="apellidos" placeholder="Pon tus apellidos" autofocus  value=""/>
    </div>
 
 	
 	<div class="unaopF">
        <p><label for="pass">Password:</label></p>
        <input name="password" type="password" id="password"  placeholder="Pon tu Password" autofocus  />
    </div>

	<div class="unaopF">
        <p><label for="repass">Confirmar Password:</label></p>
        <input name="password2" type="password" id="password2"  placeholder="confirma Password" autofocus  />
    </div><div class="unaopF">
        <p><label for="correo">Email (Este será tu nombre de acceso):</label></p>
        <input name="email" type="email" id="email"  placeholder="Pon tu Email" autofocus />
    </div>
 
    </div>
    <div class="unaColForma">
    
    <? $sql="select * from paises where activo=1 ";
			$tipos=$myvar->get_arreglo($sql);
			?>
     <div class="unaopF">
     <p>Pais:</p>
     <select name="id_pais" id="id_pais" onChange="cargaEstados();">
		<? for($i=0; $i<count($tipos); $i++){?>
		<option value="<? echo $tipos[$i][id_pais]?>" <? if($tipos[$i][id_pais]==2){?>selected="selected"
			<? }?>><? echo utf8_encode($tipos[$i][dsc_pais])?></option>
			<? }?>
		</select>
     </div>
     
       
	<div id="datosEstado"> 
	<div class="unaopF">
    <p>Estado:</p>
            <? 
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);
			?>
                 <select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_estado]?>"  <? if($tipos[$i][id_estado]==1){?>selected="selected"
                  <? }?>><? echo utf8_encode($tipos[$i][nombre])?></option>
                 <? }?>
               </select>
      </div>         
               
	<div class="unaopF">
    <p>Municipio:</p>
             <div id="datosEstado1">   <?
			 $a=" and id_estado=1";
			 
			 $sql2=" select * from municipios where activo=1 ".$a; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" ><? echo utf8_encode($tipos[$i][nombre])?></option>
                 <? }?>
               </select>
               </div>
             
             </div>
             </div>
             
			
    <div class="unaopF">
        <p>Tipo Cliente:</p>
		<?
			$sql2=" select * from tiposCliente where activo=1"; 
			$tipos=$myvar->get_arreglo($sql2);?>
                
			<select name="id_tipoCliente" id="id_tipoCliente">
				<? for($i=0; $i<count($tipos); $i++){?>
			<option value="<? echo $tipos[$i][id_tipoCliente]?>" ><? echo $tipos[$i][dsc_tipoCliente]?></option>
                    <? }?>
                </select>
         </div>
                   
	<input type="hidden" name="status"  id="status"/>
    
    
    
    <!--input name="check" type="checkbox" id="check" value="checkbox" onclick="activarcasilla(this)"--> 
    
	<p id="bot">
     Al dar click en Registrar aceptas haber leído y estar de acuerdo con nuestras 
     Condiciones de Uso y nuestra Política de Privacidad.<br />
   
    <input name="submit" type="submit" id="boton" value="Registrar" class="boton"  
    onclick="document.getElementById('status').value = '1';"/></p>
    
    <? // style="visibility:hidden;"?>
    
    
    </div>
</form>
</div>
<? }//if?>
<br><br><br>
</center> 

<script>
function activarcasilla(check){
if(document.formulario.check.checked==true){
document.formulario.submit.style.visibility="visible";
}else{
document.formulario.submit.style.visibility="hidden";
}
} 
</script>
<? include "funciones-abajo.php";


function html($id){
		$myvar = new db_mysql;
		$myvar->conectarBd();

			$sql2=" select * from clientes where activo=1 and id_cliente=".$id." limit 1"; 
			$cliente=$myvar->get_arreglo($sql2);

	if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	$nombre=$cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	$nombre=$cliente[0][nick];
	}

	$html="
	<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<title>Lofers.club | Lo pierdes, lo buscas, lo encuentras</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/images/Logo3.png' alt='lofers.club' title='lofers.club' /></td>
      </tr>
      <tr>
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>Bienvenido a Lofers</span></td>
      </tr>
      
      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'></span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $nombre ."</strong></span>        
		
		</td>
      </tr>
	  
</table></body>
</html>	
	";
	return $html;
 } 



?>
