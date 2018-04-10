<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;


if($_POST['id_anuncio'])
$_GET[id]=$_POST['id_anuncio'];

if ($_POST['status']) {
	
	$sql='insert into comentariosAnuncio (id_cliente,id_anuncio,fecha,comentario,activo) values ("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d H:i:s").'","'.$_POST['comentario'].'",1)'; 
	$myvar->execute($sql);
}

$sql=" select * from anuncios where activo=1  and id_anuncio=".$_GET[id]." limit 1"; 
	$anuncio=$myvar->get_arreglo($sql);


$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$anuncio[0][id_aquiencomparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);


$sql=" select * from cliente where activo=1  and id_cliente=".$anuncio[0][id_cliente]." limit 1"; 
	$cliente=$myvar->get_arreglo($sql);

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>:: LOFERS ::</title>

<link href="css/Estilos.css" rel="stylesheet" type="text/css">
<link href="css/nav.css" rel="stylesheet" type="text/css">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>
$(function() {
    var pull = $('#pull');
    menu = $('nav ul');
    menuHeight = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
});

$(window).resize(function(){
    var w = $(window).width();
    if(w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});
</script>

<style type="text/css">
    @media only screen and (max-width: 480px){
        #templateColumns{
            width:100% !important;
        }

        .templateColumnContainer{
            display:block !important;
            width:100% !important;
        }

        .columnImage{
            height:auto !important;
            max-width:480px !important;
            width:100% !important;
        }
    }
</style>
</head>
 
<body background="images/Background.jpg" topmargin="0" bottommargin="0" leftmargin="0" rightmargin="0" marginwidth="0" marginheight="0">
<table width="100%" border="1" class="visor" cellspacing="0" cellpadding="0">
  <tr>
    <td width="324" align="center" valign="middle"><img src="images/Logo_visor.png" class="img" border="0"></td>
    <td>&nbsp;</td>
    <td width="100" align="center" valign="middle"><a href="#"><img src="images/engrane.png" class="img" border="0"></a></td>
    <td width="100" align="center" valign="middle"><span class="TexM">P+</span></td>
    <td width="96" align="center" valign="middle"><img src="images/LF_Rojo.png" class="img" border="0"></td>
  </tr>
</table>
 
<div class="container">
 
	<section>
                  
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" height="40">
  <tr>
    <td bgcolor="#000">&nbsp;&nbsp;<span class="User">Bienvenid@:</span><span class="User"> Nombre de Usuario &nbsp;&nbsp;/ <a href="#" class="Pie">Cerrar sesión</a></span></td>
  </tr>
  <tr>
  <td height="3"></td>
  </tr>
</table>
                 

    </nav>
<br>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>
    <center>
    <a href="anuncios.html"><img src="images/Btn_Anuncios.png" border="0"></a>&nbsp;&nbsp;&nbsp;<a href="#"><img src="images/Btn_Generar.png" border="0"></a>&nbsp;&nbsp;&nbsp;<a href="#"><img src="images/Btn_Eliminar.png" border="0"></a>
    </center>
    
<br>

</td>
  </tr>
</table>

<table width="100%" border="2" class="visor" cellspacing="0" cellpadding="0">
  <tr>
<td><img src="imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" class="img" border="0"></td>
<td><table width="100%" border="1" class="visor" cellspacing="0" cellpadding="0">
   <?
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($imagenes); $i++){
	   ?>
       <tr>
    <td width="106" align="center" valign="middle"><span class="TexM"><img src="imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" class="img" border="0"></span></td>
  </tr>
      <? }//for?>
</table></td>
</tr>
 
  <tr>
    <td height="160" colspan="2" rowspan="6" align="left" valign="top"><br><span class="Pie"><? echo $anuncio[0][caracterisicas]?></span></td>
    </tr>
</table>




	</section>
	<aside>
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" valign="middle"><img src="images/FlechaV_Izq.png" class="img" border="0"></td>
        <td align="center" valign="middle"><img src="images/FlechaV_Der.png" class="img" border="0"></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $anuncio[0][titulo]?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $anuncio[0][fechaSuceso];?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo date("Y-m-d",$anuncio[0][fechaIngreso]);?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor">Disponible hasta / </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor">Condición para regresarlo</td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $aquienComparte[0][dsc_aquienComparte]?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $cliente[0][telefono]?></td>
  </tr>
</table>
</aside>
 
 
	
</div>
</body>
</html>