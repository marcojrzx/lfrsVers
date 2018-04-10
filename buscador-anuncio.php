<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 

if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();


$html = new html;
$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/nav.css" rel="stylesheet" type="text/css">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><? echo $tituloGL; ?></title>
<link rel="icon" type="image/png" href="<? echo $_SESSION[url];?>favicon.png">

<!-- SEO EN META -->
<link rel="image_src" href="<? echo $_SESSION[url].$imagenGL; ?>"/>

<meta name="description"			content="<? echo $descripcionGL; ?>">
<meta name="keywords"				content="<? echo $keywordsGL; ?>">
<meta http-equiv="Language"			content= "Spanish">
<meta http-equiv="Distribution"		content= "Global">
<meta http-equiv="Rating"			content= "General">
<meta http-equiv="Robots"			content= "ALL">
<meta http-equiv="Revisit-after"	content= "1 days">
<meta http-equiv="Author"			content= "LOFERS">

<!-- SEO EN OG: -->
<meta property="og:image"		content="<? echo $_SESSION[url].$imagenGL; ?>" />
<meta property="og:title"		content="<? echo $tituloGL; ?>" />
<meta property="og:description"	content="<? echo $descripcionGL; ?>" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    
	<!-- JS PARA EL SLIDER -->
	<script src="<? echo $urlprincipal?>js/vendor/modernizr-2.6.2.min.js"></script> <!-- Modernizr -->
	<script src="<? echo $urlprincipal?>js/jquery.bxslider.min.js"></script>

	<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones_calendar.js"></script>
	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones.js"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/codigo.js"></script>
 

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



	
</script><script type="text/javascript">
 /*function validarFormulario(){
          $("#formulario").validate();
  }*/
       
		
		//////////////////////////////////////////cargar el select dependiente
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



		//////////////////////////////////////////cargar el select dependiente
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
    <td width="324" align="center" valign="middle"><img src="<? echo $urlprincipal?>images/Logo_visor.png" class="img" border="0"></td>
    <td>&nbsp;</td>
    <td width="100" align="center" valign="middle"><a href="#"><img src="<? echo $urlprincipal?>images/engrane.png" class="img" border="0"></a></td>
    <td width="100" align="center" valign="middle"><span class="TexM">P+</span></td>
    <td width="96" align="center" valign="middle"><img src="<? echo $urlprincipal?>images/LF_Rojo.png" class="img" border="0"></td>
  </tr>
</table>
 
<div class="container">
<form action="<? echo $urlprincipal?>todos-anuncios.php" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
          
 
	<section>
                  
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" height="40">
  <tr>
    <td bgcolor="#000">&nbsp;&nbsp;<span class="User">Bienvenid@:</span><span class="User"> 
	<? 
	if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?> &nbsp;&nbsp;/ <a href="<? echo $urlprincipal?>1/cerrar-sesion" class="Pie">Cerrar sesión</a></span></td>
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
<a href="<? echo $urlprincipal?>mi-sitio"><img src="<? echo $urlprincipal?>images/Btn_Anuncios.png" border="0"></a>&nbsp;&nbsp;&nbsp;
    <a href="<? echo $urlprincipal?>nuevo-anuncio"><img src="<? echo $urlprincipal?>images/Btn_Generar.png" border="0"></a>&nbsp;&nbsp;&nbsp;
    <a href="<? echo $urlprincipal?>perfil"><img src="<? echo $urlprincipal?>images/Btn_Perfil.png" border="0"></a>
        <a href="<? echo $urlprincipal?>amigos"><img src="<? echo $urlprincipal?>images/Btn_Amigos.png" border="0"></a>
        <a href="<? echo $urlprincipal?>agregar-amigos"><img src="<? echo $urlprincipal?>images/Btn_Agregar.png" border="0"></a>
       <a id="pull" href="#">MENU</a>    </center>
    
<br>
<input type="hidden" name="buscar"  id="buscar"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('buscar').value = '1';"/></p>

</td>
  </tr>
</table>

   


	</section>
	<aside>
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      
     
	
        <td align="center" valign="middle">&nbsp;</td>
        <td align="center" valign="middle">&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Categoria:</p>
             <p>
               <?
			 $sql2=" select * from categoriasAnuncio where activo=1"; 
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_categoriaAnuncio" id="id_categoriaAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" ><? echo $tipos[$i][dsc_categoriaAnuncio]?></option>
                 <? }?>
               </select>
             </p></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo de Anuncio:</p>
             <p>
               <?
			 $sql2=" select * from tiposAnuncio where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoAnuncio" id="id_tipoAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" ><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </p></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Titulo:</p>
             <p><input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus /></p>
 			</td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Nombre:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus  /></p>
 			</td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p>
             <p><?php $html->print_calendar( "fechaSuceso",date("Y-m-d"));?></p>
 </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <? 
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);
	
			?>
 			<div id="datosEstado"> 
             <p>Estado:</p>
             <p>
                 <select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_estado]?>" ><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
             </p>
			<p>Municipio:</p>
             <p>
             <div id="datosEstado1"> 
               <select name="id_municipio" id="id_municipio"  disabled >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" <? if($tipos[$i][id_municipio]==$datos[0][id_municipio]){?>selected="selected" <? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
               </div>
             </p>
             </div></td>
  </tr>
  
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Lugar Suceso:</p>
             <p><input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus /></p>
           
 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Ubicacion:</p>
             <p><input name="ubicacion" type="text" id="ubicacion"  placeholder="Pon ubicacion" autofocus /></p>

 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo Pago:</p>
             <p>
               <?
			 $sql2=" select * from tiposPago where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoPago" id="id_tipoPago">
                  <option value="0" >Ninguna</option>
                <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoPago]?>" ><? echo $tipos[$i][dsc_tipoPago]?></option>
                 <? }?>
               </select>
             </p>
 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Monto $:</p>
             <p><input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus /></p>

 </td>
  </tr>
  
</table>
</aside>
 
 </form>
</div>
</body>
</html>