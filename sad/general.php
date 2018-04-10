<?
date_default_timezone_set("Mexico/General");
include("permisos.php");
include_once("funciones-bd.php");
include_once("funciones.php");

function arriba(){

$script = $_SERVER['PHP_SELF'];
$path_info = pathinfo($script);

$dato=explode("/",$_SERVER["SCRIPT_NAME"]);
$pagina=end($dato);
 	
$myvar = new db_mysql;
$myvar->conectarBd();

	$sql="select * from clientes order by id_cliente='".$_SESSION[id_cliente]."' desc limit 1";
	$cliente=$myvar->get_arreglo($sql);

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="format-detection" content="telephone=no">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>LOFERS - Sistema de Administración Dinámica</title>
    <!--meta name="viewport" content="width=device-width,initial-scale=1"-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/acordeon.css">
    <script src="js/responsive-nav.js"></script>
  <script type="text/javascript" language="javascript" src="scriptaculous/lib/prototype.js"></script>
<script type="text/javascript" language="javascript" src="scriptaculous/src/scriptaculous.js"></script>
<link href="windows_js/themes/default.css" rel="stylesheet" type="text/css"/>	
<link href="windows_js/themes/alphacube.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="windows_js/javascripts/window.js"> </script>
<script type="text/javascript" src="windows_js/javascripts/window_effects.js"> </script>
<script type="text/javascript" src="windows_js/javascripts/debug.js"> </script>
  <script language="JavaScript" src="js/codigo.js"></script>
  <script language="JavaScript" src="js/funciones_calendar.js"></script>
<script language="JavaScript" src="js/funciones.js"></script>
  
  
 

</head>
  <body>
<? 

$dato=explode("/",$_SERVER["SCRIPT_NAME"]);
	$pagina=end($dato);
	
	?>
    <div role="navigation" id="foo" class="nav-collapse">
      <ul>
      	<img src="images/logo-lofers.png" class="logoracsohome"/>
         <? if((permisos(3,0)==1)||(permisos(3,1)==1)||(permisos(3,2)==1)||(permisos(3,3)==1)
		){?><li <? if($pagina=="clientes.php"){  ?>class="active"<? }?>><a href="clientes.php">Clientes</a></li>
         <? }?>
          <? if((permisos(4,0)==1)||(permisos(4,1)==1)||(permisos(4,2)==1)||(permisos(4,3)==1)
		){?><li <? if($pagina=="anuncios.php"){  ?>class="active"<? }?>><a href="anuncios.php">Anuncios</a></li>
         <? }?>
          <? if((permisos(5,0)==1)||(permisos(5,1)==1)||(permisos(5,2)==1)||(permisos(5,3)==1)
		){?><li <? if($pagina=="reporteClientes.php"){  ?>class="active"<? }?>><a href="reporteClientes.php">Clientes Reportados</a></li>
         <? }?>
          <? if((permisos(6,0)==1)||(permisos(6,1)==1)||(permisos(6,2)==1)||(permisos(6,3)==1)
		){?><li <? if($pagina=="reporteAnuncios.php"){  ?>class="active"<? }?>><a href="reporteAnuncios.php">Anuncios Reportados</a></li>
         <? }?>
         <? if((permisos(1,0)==1)||(permisos(1,1)==1)||(permisos(1,2)==1)||(permisos(1,3)==1)||
		(permisos(2,0)==1)||(permisos(2,1)==1)||(permisos(2,2)==1)||(permisos(2,3)==1)
		){?><li <? if($pagina=="roles.php"){  ?>class="active"<? }?>><a href="roles.php">Roles y usuarios</a></li>
         <? }?>
        <li class="cerrar"><a href="autentificacion.php?logout=1">Cerrar sesión</a></li>
        <li class="dt-login">Usuario: <? echo $cliente[0][nombre]." ".$cliente[0][apaterno]?><br>
        2016. LOFERS</li>
       
      </ul>
    </div>

    <div role="main" class="main">
      <a href="#nav" class="nav-toggle">Menu</a>
      
	<div class="contenido">
		<!-- AQUI EMPIEZA LAS INTERNAS -->
	<? }
function abajo(){	
?>
    <!-- AQUI TERMINAN LAS INTERNAS -->
    </div>
    
    </div>

    
  </body>
	<script>
	var navigation = responsiveNav("foo", {customToggle: ".nav-toggle"});
    </script>
</html>
<? }?>