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


if ($_POST['status']) {
	
		$sql='UPDATE anuncios  set  id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'",
		id_tipoPago="'.$_POST['id_tipoPago'].'",id_tipoAnuncio="'.$_POST['id_tipoAnuncio'].'",
		id_municipio="'.$_POST['id_municipio'].'",id_estado="'.$_POST['id_estado'].'",
		ubicacion="'.$_POST['ubicacion'].'",monto="'.$_POST['monto'].'",caracteristicas="'.$_POST['caracteristicas'].'",
		titulo="'.$_POST['titulo'].'",nombre="'.$_POST['nombre'].'",
		lugarSuceso="'.$_POST['lugarSuceso'].'",fechaSuceso="'.$_POST['fechaSuceso'].'",id_aquienComparte="'.$_POST['id_aquienComparte'].'" 
		where id_anuncio="'.$_POST[id_anuncio].'" and id_cliente='.$_SESSION[id_clienteLof4];
		$myvar->execute($sql);
	
		
		$idcli=$_POST['id_anuncio'];

		
		$sql='delete from compartidoA where id_anuncio="'.$idcli.'"'; 
		$myvar->execute($sql);
		
		if($_POST['id_aquienComparte']==3){// comparte a un amigo en especifico
		
				$sql='insert into compartidoA (id_anuncio,id_cliente) values ("'.$idcli.'","'.$_POST['amigoCompartir'].'")'; 
				$myvar->execute($sql);
		}
		
	///////////// D A T O S   I M A G E N E S /////////////////////
	$sql="select * from imagenesAnuncio where id_anuncio='".$idcli."' and activo=1 ";
	$imagenes=$myvar->get_arreglo($sql);
	   
	
		////// UPDATE IMAGENES
		for($i=0; $i<count($imagenes); $i++){
				$Econt=$imagenes[$i][id_imagenAnuncio];
		  		$Evar='IMA'; // variable identificador 
		
				
				if($_POST[Ieliminar.$Evar.$Econt]==1){ // se eliminara
						
							$sql="delete from `imagenesAnuncio`  where id_imagenAnuncio=".$imagenes[$i][id_imagenAnuncio]." limit 1";
							$myvar->execute($sql);
						
				}else{		
					if(!$_POST['principalmagen'.$Evar.$Econt])
						$_POST['principalmagen'.$Evar.$Econt]=0;
										
							$sql='update `imagenesAnuncio` set  
							`descripcion`="'.$_POST['tituloImagen'.$Evar.$Econt].'", 
							`fotoPrincipal`="'.$_POST['principalmagen'.$Evar.$Econt].'"
							  where id_imagenAnuncio='.$imagenes[$i][id_imagenAnuncio].' limit 1';
							$myvar->execute($sql);
								
								
								if($_FILES['imagen'.$Evar.$Econt]['tmp_name']!=""){
									$nombre_archivo = $_FILES['imagen'.$Evar.$Econt]['tmp_name'];
										$mythumb = new thumb(); 
										$mythumb->loadImage($nombre_archivo); 
										$tipo='width';
										$nombre_ext = $_FILES['imagen'.$Evar.$Econt]['name'];
										$extension=explode(".",$nombre_ext); 
										
										
										
										$nuevaa=$imagenes[$i][id_imagenAnuncio];
										$nueva=$imagenes[$i][id_imagenAnuncio];
										$nueva.=".".$extension[1];
										
										copy($_FILES['imagen'.$Evar.$Econt]['tmp_name'], "imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1]);
										$imagen_ruta="imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1];			
										$datos = getimagesize($imagen_ruta);
										$ancho=$datos[0];
										$alto=$datos[1];
										
										$anchodeseado=500;
										if($ancho<$anchodeseado){
											$anchodeseado=$datos[0];
										}	
									
										unlink("imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1]);
										$mythumb->resize($anchodeseado, $tipo,$nombre_archivo); 
										 $mythumb->save('imagenes/imagenesAnuncio/'.$nueva, $quality = 200);
									
									if(!$_POST['principalImagen'.$m])
										$_POST['principalImagen'.$m]=0;
									
										$sql='update `imagenesAnuncio` set  imagen="'.$nueva.'" where id_imagenAnuncio='.$imagenes[$i][id_imagenAnuncio];
										$myvar->execute($sql);
									}
								
				}//else
		}//for
		
		////INSERT IMAGENES
		$m=1;
		
		while($_POST['_nuevaimagen'.$m]=='on'){ 
			
		if($_FILES['imagen'.$m]['tmp_name']!=""){
				$nombre_archivo = $_FILES['imagen'.$m]['tmp_name'];
				$mythumb = new thumb(); 
				$mythumb->loadImage($nombre_archivo); 
				$tipo='width';
				$nombre_ext = $_FILES['imagen'.$m]['name'];
				$extension=explode(".",$nombre_ext); 
				
				
				$sql2=" select * from imagenesAnuncio  order by id_imagenAnuncio desc limit 1"; 
				$cliente=$myvar->get_arreglo($sql2);

				
				$nuevaa=$cliente[0][id_imagenAnuncio]+1;
				$nueva=$cliente[0][id_imagenAnuncio]+1;
				$nueva.=".".$extension[1];
				
				copy($_FILES['imagen'.$m]['tmp_name'], "imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1]);
				$imagen_ruta="imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1];			
				$datos = getimagesize($imagen_ruta);
				$ancho=$datos[0];
				$alto=$datos[1];
				
				$anchodeseado=500;
				if($ancho<$anchodeseado){
					$anchodeseado=$datos[0];
				}	
			
				unlink("imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1]);
		 		$mythumb->resize($anchodeseado, $tipo,$nombre_archivo); 
				 $mythumb->save('imagenes/imagenesAnuncio/'.$nueva, $quality = 200);
			
			if(!$_POST['principalImagen'.$m])
			$_POST['principalImagen'.$m]=0;
			
				$sql='INSERT INTO `imagenesAnuncio` ( id_anuncio,imagen,descripcion,fotoPrincipal,activo) VALUES ( "'.$idcli.'", "'.$nueva.'","'.$_POST['tituloImagen'.$m].'", "'.$_POST['principalImagen'.$m].'",1)';
				$myvar->execute($sql);
			}
		$m++;
		}//while
		
		
		
		
		///////////// D A T O S   V I D E O S /////////////////////
	$sql="select * from videos where id_anuncio='".$idcli."' and activo=1 ";
	$videos=$myvar->get_arreglo($sql);
	   
	
		////// UPDATE IMAGENES
		for($i=0; $i<count($videos); $i++){
				$Econt=$videos[$i][id_video];
		  		$Evar='VID'; // variable identificador 
		
				
				if($_POST[Veliminar.$Evar.$Econt]==1){ // se eliminara
						
							$sql="delete from `videos`  where id_video=".$videos[$i][id_video]." limit 1";

							$myvar->execute($sql);
						
				}else{		
										
							$sql='update `videos` set  
							`descripcion`="'.$_POST['tituloVideo'.$Evar.$Econt].'"
							  where id_video='.$videos[$i][id_video].' limit 1';
							$myvar->execute($sql);
							
							
							if($_FILES['video'.$Evar.$Econt]['tmp_name']!=""){
								$nombre_archivo = $_FILES['video'.$Evar.$Econt]['tmp_name'];
								$nombre_ext = $_FILES['video'.$Evar.$Econt]['name'];
								$extension=explode(".",$nombre_ext); 
								
								
								$nuevaa=$videos[$i][id_video];
								$nueva=$videos[$i][id_video];
								$nueva.=".".$extension[1];
								
								copy($_FILES['video'.$Evar.$Econt]['tmp_name'], "imagenes/videosAnuncio/".$nuevaa.".".$extension[1]);
								
								$sql='update  `videos` set dsc_video="'.$nueva.'" where id_video='.$videos[$i][id_video];
								$myvar->execute($sql);
							}//Else
											
											
											
			}//else
		}//for
					
		////INSERT VIDEOS
		$m=1;
		
		while($_POST['_nuevovideo'.$m]=='on'){ 
			
			if($_FILES['video'.$m]['tmp_name']!=""){
				$nombre_archivo = $_FILES['video'.$m]['tmp_name'];
				$nombre_ext = $_FILES['video'.$m]['name'];
				$extension=explode(".",$nombre_ext); 
				
				
				$sql2=" select * from videos  order by id_video desc limit 1"; 
				$cliente=$myvar->get_arreglo($sql2);

				$nuevaa=$cliente[0][id_video]+1;
				$nueva=$cliente[0][id_video]+1;
				$nueva.=".".$extension[1];
				
				copy($_FILES['video'.$m]['tmp_name'], "imagenes/videosAnuncio/".$nuevaa.".".$extension[1]);
				
				$sql='INSERT INTO `videos` (id_anuncio,dsc_video,descripcion,activo) VALUES ( "'.$idcli.'", "'.$nueva.'", "'.$_POST['tituloVideo'.$m].'", 1)';
						
				
					$myvar->execute($sql);
			}
		$m++;
		}//while
		
		header("Location: ".$urlprincipal."mi-sitio/nuevo");

		exit();
}//if submit
$html = new html;

$myvar = new db_mysql;
$myvar->conectarBd();

$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);


	$sql="select * from anuncios where id_anuncio='".$_GET[id]."'  and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
	$datos=$myvar->get_arreglo($sql);	
	
$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$datos[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);
	
	
	$sql="select id_anuncio from anuncios where id_anuncio!='".$_GET[id]."' and id_anuncio<'".$_GET[id]."' and activo=1   order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	
	$sql="select id_anuncio from anuncios where  id_anuncio!='".$_GET[id]."'   and id_anuncio>'".$_GET[id]."' and activo=1  order by id_anuncio asc  limit 1 "; 
	$motrosproducto=$myvar->get_arreglo($sql);



?>
<!DOCTYPE html>
<html lang="es">
<head>
<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>:: LOFERS ::</title>
<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/nav.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/estiloswdd.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/jquery.bxslider.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/nav.css" rel="stylesheet" type="text/css">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    
	<!-- JS PARA EL SLIDER -->
	<script src="<? echo $urlprincipal?>js/vendor/modernizr-2.6.2.min.js"></script> <!-- Modernizr -->
	<script src="<? echo $urlprincipal?>js/jquery.bxslider.min.js"></script>

	<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones_calendar.js"></script>
	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones.js"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/codigo.js"></script>
<script type="text/javascript">
       
$(document).ready(function(){

    $("#formulario").validate({
        rules: {
            id_categoriaAnuncio: { required: true},
            id_tipoAnuncio: { required: true},
            titulo: { required:true, minlength: 2},
			nombre: { required:true, minlength: 2},
			caracteristicas: { required:true, minlength: 2}
            
        },
        messages: {
            id_categoriaAnuncio: "Debe seleccionar categoria",
            id_tipoAnuncio: "Debe seleccionar tipo Anuncio",
            titulo : "Debe introducir titulo",
            nombre : "Debe introducir nombre",
            caracteristicas : "Debe introducir caracteristicas"
        }
    });
});

		
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
	//////////////////////////////////////////cargar el select dependiente
function cargaAmigos()
{
	
	var indice = document.getElementById('id_aquienComparte').selectedIndex;
	var opcion=document.getElementById('id_aquienComparte').options[indice].value;
	var valorselect=document.getElementById('id_aquienComparte').options[indice].text;
	
	
	  if(opcion==3){//es una amigo
		  var dataString = "dato="+opcion;
			 $.ajax({
                type: "POST",
               url:"<? echo $urlprincipal?>combo-amigos.php",
                data: dataString,
                beforeSend: function () {
                   $("#divAmigos").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
						
                },
				success: function(data){
                    $("#divAmigos").html(data);
                   
                }
	 });
	  }

}
function cambiarPagina(id){
	        var parametros = {
	                "paginas-desp-bus" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#consulta').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-modificar-anuncio.php',
	                type:  'get',
	                beforeSend: function () {
	                        $contenidoAjax.html();
	                },
	                success:  function (response) {
	                        $contenidoAjax.html(response);
	                }
	        });
	}
	

//////ELIMINAR SERVICIOS
		     var href2;
 
        $('.aceptarEncontrado').click(function(e) {
          e.preventDefault();
          href2 = $(this).attr('href');
          $('#dialog2'+href2).fadeIn(200, function() {
            $(this).html('¿Realmente desea ACEPTAR esta peticion?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso2' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Cancelar'>");
          });
			
        $('#dialog2'+href2).on("click", "#ejecutar_proceso2", function(event) {
    ejecutar2(href2);
});
        $('#dialog2'+href2).on("click", "#cerrar_dialogo2", function(event) {
    cerrar2(href2);
});
 });
		
		
        function cerrar2(href2) {
          $('#dialog2'+href2).fadeOut();
        }
 
        function ejecutar2(href2) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?aceptar-peticion=1&id="+href2, 
            success: function(data) {
				  location.href = "modificiar-anuncio.php?id="+href2
              //$('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
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
    <td><center>          
<nav id="menu">
        <a href="#" class="nav-mobile" id="nav-mobile"></a>
        <ul>
            <li><a href="<? echo $urlprincipal?>1/mi-sitio">Mis Perdidas L1</a></li>
            <li><a href="<? echo $urlprincipal?>2/mi-sitio">Mis Hallazgos (Lugar) L2</a></li>
            <li><a href="<? echo $urlprincipal?>1/mi-sitio">Mis Hallazgos (Persona) L3</a></li>
            <li><a href="<? echo $urlprincipal?>2/mi-sitio">Mis Avistamientos L4</a></li>
              <li><a href="<? echo $urlprincipal?>muro-de-anuncios">Todos</a></li>
          </ul>
</nav></center></td>
    <td width="100" align="center" valign="middle">&nbsp;</td>
    <td width="100" align="center" valign="middle">&nbsp;</td>
    <td width="96" align="center" valign="middle">
    
   
    
    </td>
  </tr>
</table>
 
<div class="container">
<div id="consulta">

<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	<input type="hidden" id="id_anuncio" name="id_anuncio" value="<? echo $_GET[id]?>" />
          
 
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
     <? 
	 if($datos[0][id_tipoAnuncio]==1){// perdid
	 	$sql="select * from similares where  id_anuncio='".$_GET[id]."' and activo=1 limit 1 "; 
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
				<img src="<? echo $urlprincipal?>images/LF_Rojo.png" class="img" border="0">
				similares
            <? /* for($a=0; $a<count($alguien); $a++){
				?> <a href="visor.php?id=<? echo $alguien[$a][id_anuncioSimilar]?>"><? echo $a;?></a> <?
				}*/
			
			 }//if
	 }else{//encontrado
	 	$sql="select * from quienencuentra where  id_anuncio='".$_GET[id]."'  "; 
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
				<img src="<? echo $urlprincipal?>images/LF_Rojo.png" class="img" border="0">
				hay alguien q lo anda buscando
			<? }//if
	 }//else
	 
	 
	?>
<a href="<? echo $urlprincipal?>mi-sitio"><img src="<? echo $urlprincipal?>images/Btn_Anuncios.png" border="0"></a>&nbsp;&nbsp;&nbsp;
    <a href="<? echo $urlprincipal?>nuevo-anuncio"><img src="<? echo $urlprincipal?>images/Btn_Generar.png" border="0"></a>&nbsp;&nbsp;&nbsp;
     <a href="<? echo $urlprincipal?>perfil"><img src="<? echo $urlprincipal?>images/Btn_Perfil.png" border="0"></a>
        <a href="<? echo $urlprincipal?>amigos"><img src="<? echo $urlprincipal?>images/Btn_Amigos.png" border="0"></a>
     <a href="<? echo $urlprincipal?>agregar-amigos"><img src="<? echo $urlprincipal?>images/Btn_Agregar.png" border="0"></a>
        <a id="pull" href="#">MENU</a>    </center>
    
<br>

</td>
  </tr>
</table>
<? 
$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$_GET[id]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	
	?>
<table width="100%" border="2" class="visor" cellspacing="0" cellpadding="0">
  <tr>
<td width="82%"><span id="resultado">
<? if($imagenes[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" />
            <? }//else?></span></td>
<td width="18%"><table width="100%" border="1" class="visor" cellspacing="0" cellpadding="0">
   <? 
 if(count($imagenes)>0){
 	for($i=0;$i<=count($imagenes)-1;$i++){
		$Econt=$imagenes[$i][id_imagenAnuncio];
		  $Evar='IMA'; // variable identificador 
		  
		 ?> 
       <tr>
    <td width="106" align="center" valign="middle"><span class="TexM">
      Titulo<input name="tituloImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text" class="texto23" size="40" required="required" value="<? echo $imagenes[$i][descripcion]?>" />
    Principal?<input name="principalImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="checkbox" class="texto23" size="40" value="1" <? if($imagenes[$i][fotoPrincipal]){?> checked="checked"<? }?>/>
						          
    <input type="file" name="imagen<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="imagen<? echo $Evar; ?><?php echo $Econt;?>" value="" >
    <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" />
                                        
        Eliminar Imagen
        <input name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
		Si
		<input  name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
		No</td>
  </tr>
      <? }//for
 }//if?>
 <tr>
    <td width="106" align="center" valign="middle"><p>Imagenes :</p>
             <p><input type="checkbox" class="textbox"  name="_nuevaimagen1" id="_nuevaimagen1" onclick="if(document.getElementById('formulario')._nuevaimagen1.checked){
			javascript:llamarasincrono('imagen.php?cont=1','divImagen');
			}else {removeChildOfDiv('divImagen');}"> 
            
            <div id="divImagen" ></div></td>
  </tr>
  
  
      <? $sql="select * from videos where id_anuncio='".$datos[0][id_anuncio]."' and activo=1";
			$videos=$myvar->get_arreglo($sql);


 if(count($videos)>0){
 	for($i=0;$i<=count($videos)-1;$i++){
		$Econt=$videos[$i][id_video];
		  $Evar='VID'; // variable identificador 
		  
		 ?>
       <tr>
    <td width="106" align="center" valign="middle">
      Titulo     <input name="tituloVideo<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text" class="texto23" size="40" required="required" value="<? echo $videos[$i][descripcion]?>" />
    <input type="file" name="video<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="video<? echo $Evar; ?><?php echo $Econt;?>" value="" ><img src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" />
                                                                         
        Eliminar Video
        <input name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
		Si
		<input  name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
		No</td>
  </tr>
      <? }//for
 }//if?>
      
      
      
       <tr>
    <td width="106" align="center" valign="middle"> <p>Videos :</p>
             <p><input type="checkbox" class="textbox"  name="_nuevovideo1" id="_nuevovideo1" onclick="if(document.getElementById('formulario')._nuevovideo1.checked){
			javascript:llamarasincrono('video.php?cont=1','divVideo');
			}else {removeChildOfDiv('divVideo');}"> 
            
            <div id="divVideo" ></div></p></td>
  </tr>
      
</table></td>
</tr>
 
  <tr>
    <td height="160" colspan="2" rowspan="6" align="left" valign="top"><br><span class="Pie"><p>Caracteristicas:</p>
             <p><input name="caracteristicas" type="text" id="caracteristicas"  placeholder="Pon caracteristicas" autofocus value="<? echo $datos[0][caracteristicas]?>" /></p>
             <p>&nbsp;</p>
 			
                <p>Con quien Comparte:</p>
             <p>
               <?
			 $sql2=" select * from aquienComparte where activo=1"; 
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_aquienComparte" id="id_aquienComparte"  onChange="cargaAmigos();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_aquienComparte]?>" <? if($tipos[$i][id_aquienComparte]==$datos[0][id_aquienComparte]){?> selected="selected"<? }?> ><? echo $tipos[$i][dsc_aquienComparte]?></option>
                 <? }?>
               </select>
               <div id="divAmigos">
               
             <?  	
			 
			if($datos[0][id_aquienComparte]==3){ 
			 $sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where  
	id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION 
	(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]."
	 and id_statusSolicitud=1)"; 
	 
	$amigos=$myvar->get_arreglo($sql);
	
	$sql=" select * from compartidoA where id_anuncio=".$datos[0][id_anuncio]." limit 1"; 
	$ba=$myvar->get_arreglo($sql);

	
	?>
       <p>Amigos:</p>
             <p>
                 <? for($i=0; $i<count($amigos); $i++){
					 
					 $sql=" select * from clientes where id_cliente=".$amigos[$i][id_cliente]." and id_statusCliente=1 and activo=1"; 
					
					$c=$myvar->get_arreglo($sql);
					 ?>
                 <input type="radio" name="amigoCompartir" id="amigoCompartir" value="<? echo $tipos[$i][id_cliente]?>" 
                 
                <? if($tipos[$i][id_cliente]==$ba[0][id_cliente]){?> checked="checked" <? }?>/>
				<? 
				if($c[0][ocultarNom]==1){// si lo quiere ocultar
	echo $c[0][nombre]." ".$c[0][apellidos];
	}else{
	echo $c[0][nick];
	}?>
				 
				 <? }?>
               
             </p>
             <? }//if?>
               </div>
             </p>
                  
            
            </span>
            
            

</td>
    <td height="160" colspan="2" rowspan="6" align="left" valign="top"><? 
	
 //	 ALGUIEN LO ENCONTRO
 		for($a=0; $a<count($alguien); $a++){
		
		$sql="select * from clientes where id_cliente='".$alguien[$a][id_cliente]."' and activo=1 and id_statusCliente=1"; 
		$cl=$myvar->get_arreglo($sql);
		
		if($cl[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cl[0][nombre]." ".$cl[0][apellidos];
	}else{
	echo $cl[0][nick];
	}
		echo "<br>";
		echo $alguien[$a][comentario];
		echo "<br>";
		echo date("Y-m-d", $alguien[$a][fecha]);
		echo "<br>";
		echo "<br>";
		
		?> 
			<a href="<? echo $alguien[$a][id_quienencuentra];?>"  class="aceptarEncontrado">ACEPTAR</a><div id="dialog2<? echo $alguien[$a][id_quienencuentra];?>" class="dialogo"></div>
          
		<?
		
		
		}
		

	?>
</td>
    <td height="160" colspan="2" rowspan="6" align="left" valign="top"><input type="hidden" name="status"  id="status"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>


</td>
    </tr>
</table>
   


	</section>
	<aside>
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      
     
	
        <td align="center" valign="middle"> <?php if(count($otrosproducto)>0){ ?>
	<a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $otrosproducto[0][id_anuncio]; ?>);"> <img src="<? echo $urlprincipal?>images/FlechaV_Izq.png" class="img" border="0"></a>
	<?php } ?></td>
        <td align="center" valign="middle"><?php if(count($motrosproducto)>0){ ?>
	<a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $motrosproducto[0][id_anuncio]; ?>);"><img src="<? echo $urlprincipal?>images/FlechaV_Der.png" class="img" border="0"></a>
	<?php } ?></td>
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
                 <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" <? if($tipos[$i][id_categoriaAnuncio]==$datos[0][id_categoriaAnuncio]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_categoriaAnuncio]?></option>
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
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" <? if($tipos[$i][id_tipoAnuncio]==$datos[0][id_tipoAnuncio]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </p></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Titulo:</p>
             <p><input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus value="<? echo $datos[0][titulo]?>" /></p>
 			</td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Nombre:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus value="<? echo $datos[0][nombre]?>" /></p>
 			</td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p>
             <p><?php $html->print_calendar( "fechaSuceso",$datos[0][fechaSuceso]);?></p>
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
                 <option value="<? echo $tipos[$i][id_estado]?>" <? if($tipos[$i][id_estado]==$datos[0][id_estado]){?>selected="selected" <? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
             </p>
			<p>Municipio:</p>
             <p>
             <div id="datosEstado1">   <?
			 $sql2=" select * from municipios where activo=1  and id_estado=".$datos[0][id_estado]; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
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
             <p><input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus value="<? echo $datos[0][lugarSuceso]?>"/></p>
           
 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Ubicacion:</p>
             <p><input name="ubicacion" type="text" id="ubicacion"  placeholder="Pon ubicacion" autofocus value="<? echo $datos[0][ubicacion]?>"/></p>

 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo Pago:</p>
             <p>
               <?
			 $sql2=" select * from tiposPago where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoPago" id="id_tipoPago">
                  <option value="0" <? if(0==$datos[0][id_municipio]){?>selected="selected" <? }?>>Ninguna</option>
                <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoPago]?>" <? if($tipos[$i][id_tipoPago]==$datos[0][id_tipoPago]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_tipoPago]?></option>
                 <? }?>
               </select>
             </p>
 </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Monto $:</p>
             <p><input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus  value="<? echo $datos[0][monto]?>"/></p>

 </td>
  </tr>
  
</table>
</aside>
 
 </form>
 </div>
</div>
</body>
</html>