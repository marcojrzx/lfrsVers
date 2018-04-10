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


if($_POST['id_anuncio'])
$_GET[id]=$_POST['id_anuncio'];

if ($_POST['status']) {
	
	if($_POST['comentario']!=''){
	$sql='insert into comentariosAnuncio (id_cliente,id_anuncio,fecha,comentario,activo) 
	values ("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d H:i:s").'",
	"'.$_POST['comentario'].'",1)'; 
	$myvar->execute($sql);
	}
	
	header('Location: '.$urlprincipal.$_POST['id_anuncio'].'/anuncio');
	
	exit;
	
}


if ($_POST['botonesmio']) {
	
	if($_POST['comentarioEsmio']!=''){
	
	$sql='insert into quienencuentra (id_cliente,id_anuncio,fecha,comentario,activo) values 
	("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d").'","'.$_POST['comentarioEsmio'].'",0)'; 
	$myvar->execute($sql);
	}
	header('Location: '.$urlprincipal.$_POST['id_anuncio'].'/anuncio/InformacionEnviada');
		
		exit;
	
}


include "arrayAnuncios.php";

$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$_GET[id]."
	and ".$caaa." and id_cliente!=".$_SESSION[id_clienteLof4]."  limit 1"; 
$anuncio=$myvar->get_arreglo($sql);
	//////////// V E R I F I C A R //////////////////
	  /* $ban=0;
	   $ban=1;
	   if($anuncio[0][id_aquienComparte]==0){ // si es poblico general
	   }elseif($anuncio[0][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncio[0][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from clientes_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncio[0]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente1=".$anuncio[0]['id_cliente']." and id_cliente=".$_SESSION[id_clienteLof4].")) limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

	   			if(count($siesamigo)>0)
				$ban=1;
				
	   }elseif($anuncio[0][id_aquienComparte]==3){ // un amigo
	   			$sql=" select id_compartidoA from compartidoA where id_anuncio=".$anuncio[0][id_anuncio]."
				and id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

				  if(count($siesamigo)>0)
							$ban=1;
							
	   }elseif($anuncio[0][id_aquienComparte]==4){ // amigos Estado
	   			$sql=" select id_estado from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_estado]==$anuncio[0][id_estado])
				 $ban=1;
				 
	   }elseif($anuncio[0][id_aquienComparte]==5){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncio[0][id_municipio])
				 $ban=1;
	   }*/
	 	//////////// V E R I F I C A R //////////////////
  
		   




$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$anuncio[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);


$sql=" select * from clientes where activo=1  and id_cliente=".$anuncio[0][id_cliente]." limit 1"; 
	$cliente=$myvar->get_arreglo($sql);


$clave = array_search($anuncio[0][id_anuncio], $_SESSION[id_clienteLof4ANUNCIOS]);

if(($clave-1)>=0){ // todavia hay uno
	$otrosproducto[0][id_anuncio]=$_SESSION[id_clienteLof4ANUNCIOS][$clave-1];
}
if(($clave+1)<count($_SESSION[id_clienteLof4ANUNCIOS])){ // todavia hay uno
	$motrosproducto[0][id_anuncio]=$_SESSION[id_clienteLof4ANUNCIOS][$clave+1];
}



/*$sql="select id_anuncio from anuncios where id_anuncio!='".$anuncio[0][id_anuncio]."' and id_activoAnuncio=1 
 and id_cliente!=".$_SESSION[id_clienteLof4]." and id_anuncio<'".$anuncio[0][id_anuncio]."' and activo=1   order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	

	$sql="select id_anuncio from anuncios where  id_anuncio!='".$anuncio[0][id_anuncio]."' and id_activoAnuncio=1   and id_cliente!=".$_SESSION[id_clienteLof4]."  
	and id_anuncio>'".$anuncio[0][id_anuncio]."' and activo=1  order by id_anuncio asc  limit 1 "; 
	$motrosproducto=$myvar->get_arreglo($sql);*/
	
	
	$sql="SELECT *
 FROM reportesAnuncio 
 WHERE id_cliente =".$_SESSION[id_clienteLof4]."
 AND id_anuncio=".$anuncio[0][id_anuncio]." and activo=1";
$c=$myvar->get_arreglo($sql); // te mandaron la info




$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente1=$myvar->get_arreglo($sql2);

$tituloGL="Lofers";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Es una red digital que propone la comunicación entre aquellas personas 
que han perdido algún Animal o Cosa (LOF) y otras que han encontrado LOF's, esperando que haya coincidencias
 para reencontrar esos Animales y/o Cosas perdidas con sus dueños.";
$keywordsGL="red digital, comunicación entre personas, perdido, encontrado, dueños";

?>
<link href="<? echo $urlprincipal?>css/menu.css" rel="stylesheet" type="text/css">
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79391110-1', 'auto');
  ga('send', 'pageview');

</script>
<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/nav.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/estiloswdd.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/jquery.bxslider.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/nav.css" rel="stylesheet" type="text/css">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><? echo $tituloGL; ?></title>
<link rel="icon" type="image/png" href="<? echo $urlprincipal?>favicon.png">

<!-- SEO EN META -->
<link rel="image_src" href="<? echo $urlprincipal?><? echo $imagenGL; ?>"/>

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


function verImagen(id,t){
        var parametros = {
                "id" : id,
				"tipo" : t
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>mostrar-imagen.php',
                type:  'post',
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
        });
}



function cambiarPagina(id){
	        var parametros = {
	                "paginas-desp-bus" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#consulta').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-visor.php',
	                type:  'get',
	                beforeSend: function () {
	                        $contenidoAjax.html();
	                },
	                success:  function (response) {
	                        $contenidoAjax.html(response);
	                }
	        });
	}
	


function esmio(id){
	        var parametros = {
	                "esmio" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#esmio').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-esmio.php',
	                type:  'get',
	                beforeSend: function () {
	                        $contenidoAjax.html();
	                },
	                success:  function (response) {
						
	                        $contenidoAjax.html(response);
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
 
<body>
<div id="cabVisor">
	<div class="contCabVisor">
    	<div class="cV logoLofers"><a href="<? echo $urlprincipal?>mi-sitio"><img src="<? echo $urlprincipal?>images/Logo_visor.png" class="img" border="0"></a></div>
        <div class="cV userVisor">
        <div class="menuAux1">
        <div class="ftPerfil">
			<? if($cliente1[0][foto]!=''){?>
            <img  src="<? echo $urlprincipal?>imagenes/clientes/<? echo $cliente1[0][foto]?>" />
            <? }else{?>
            <? }?>
        </div>
    	<div>
      
    		<div class="menu2">
            	<ul class="nav">
                <li>
                <a href="">
				<? 
				if($cliente1[0][ocultarNom]==1){// si lo quiere ocultar
				echo $cliente1[0][nombre]." ".$cliente1[0][apellidos];
				}else{
				echo $cliente1[0][nick];
				}
				?>
                </a>
               
				
                	<ul>
						<li><a href="<? echo $urlprincipal?>perfil">Mi perfil</a></li>
						<li><a href="<? echo $urlprincipal?>blog">Blog</a></li>
                        <li><a href="<? echo $urlprincipal?>muro-de-anuncios">Muro de anuncios</a></li>
						<li><a href="<? echo $urlprincipal?>mi-sitio">Todos mis anuncios</a></li>
						<li><a href="<? echo $urlprincipal?>mis-denuncias">Mis denuncias</a></li>
                   		<li><a href="<? echo $urlprincipal?>ayuda">Ayuda</a></li>
                        <li><a href="<? echo $urlprincipal?>1/cerrar-sesion" style="color:red;">Cerrar sesión</a></li>
                    </ul>
				</li>
				</ul>
            </div>
      		</div>
            </div>
        </div>
        <div class="cV anunciosVisor"></div>
    </div>
</div>
 <? if($_GET[msg]){?>
 <script>alert(<? echo $_GET[msg]?>)</script>
 <? }?>
 <? //if($ban==1){?>
<div class="container">

<div id="consulta">

 
	<section>
	  </nav>


		<a  href='javascript:void(0);' onclick="esmio(<?php echo $anuncio[0][id_anuncio]; ?>);" class="btop cf">Este LOF es mio</a>
		<? if(count($c)<=0){?>
                <div id="dialog4<? echo $anuncio[0][id_anuncio];?>" class="dialogo">
                <a href="<? echo $anuncio[0][id_anuncio];?>"  class="btop cf reportarAnuncio">DENUNCIAR ANUNCIO</a></div>
            	<? }else{?>
                	<div class="error">DENUNCIAR REPORTADO</div>
				<? }?>         
    

<div id="esmio">

</div>


	<? 
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	
	
	$sql2=" select * from videos where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$videos=$myvar->get_arreglo($sql2);
	
	?>

<div class="cImDe">
    <div class="contImP">
    <span id="resultado">
    <? if(count($imagenes)>0){?>
    <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" class="img" border="0">
    <? }elseif(count($videos)>0){?>
    <video  width="100%" src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[0][dsc_video]?>" controls></video>
    <? }?>

    
    
    </span>
    </div>
	<?
	for($i=0; $i<count($imagenes); $i++){
	?>
    
    <div class="contEdicion">
    <span class="TexM"><img onclick="verImagen(<? echo $imagenes[$i][id_imagenAnuncio]?>,1);"
     src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" class="imaPqA" border="0"></span>
    </div>
	<? }//for?>
    
    
    	<?
	for($i=0; $i<count($videos); $i++){
	?>
    
    <div class="contEdicion">
    <span class="TexM"><video onClick="verImagen(<? echo $videos[$i][id_video]?>,2);"
      width="50%" src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" >
</video></span>
    </div>
	<? }//for?>
	
</div>
	<div class="caracteristicas">
    <span class="Pie"><? echo $anuncio[0][caracteristicas]?></span>
	</div>
    <?
	        
     $sql2=" select * from comentariosAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by id_comentarioAnuncio desc ";
	 $comentarios=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($comentarios); $i++){
	   ?>
	<div class="comentarios">
	<h3>Comentarios</h3>
  
  <div class="uncom">
  ¿Quién comenta?: <strong>
  <? 
	    $sql2=" select * from clientes where id_cliente=".$comentarios[$i][id_cliente]." limit 1 ";
	$cli=$myvar->get_arreglo($sql2);
	
	if($cli[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cli[0][nombre]." ".$cli[0][apellidos];
	}else{
	echo $cli[0][nick];
	}?>
  </strong>
        </p>
        <p>FECHA: <strong><? echo $comentarios[$i][fecha]?></strong>
        </p>
        <p>COMENTARIO: <strong><? echo $comentarios[$i][comentario]?></strong>
          
        </p>
    </div>   
            
	<? }//for?>
</div>
          
          <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar un comentario:</p>
             <p><input name="comentario" type="text" id="comentario"  placeholder="comentario" autofocus /></p>
 			 <input type="hidden" name="status"  id="status"/> <input type="hidden" name="id_anuncio" 
              id="id_anuncio" value="<? echo $anuncio[0][id_anuncio]?>"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Enviar comentario" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
		</form> 



	</section>
	<aside>
    
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle">
    
	 <div class="navArrows">
            <div><?php if(count($otrosproducto)>0){ ?>
	<a class="bt-3" href="<? echo $urlprincipal?><?php echo $otrosproducto[0][id_anuncio]?>/anuncio"> <img src="<? echo $urlprincipal?>images/FlechaV_Izq.png" class="img" border="0"></a>
	<?php } ?>
	</div>
    <div>
	
	<?php if(count($motrosproducto)>0){ ?>
	<a class="bt-3" href="<? echo $urlprincipal?><?php echo $motrosproducto[0][id_anuncio]; ?>/anuncio"><img src="<? echo $urlprincipal?>images/FlechaV_Der.png" class="img" border="0"></a>
	<?php } ?>
    </div>
    </div>
    
    
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_categoriaAnuncio];
			 ?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncio[0][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $anuncio[0][titulo]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? echo $anuncio[0][nombre]?></td>
  </tr><tr>
    <td align="center" valign="middle" class="TexVisor"><? echo obtenerfecha($anuncio[0][fechaSuceso]);?>
           </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? 
			$sql="select * from estados where id_estado='".$anuncio[0][id_estado]."' limit 1";
			$tipos=$myvar->get_arreglo($sql);
			
			echo $tipos[0][nombre]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? 
			$sql="select * from municipios where id_municipio='".$anuncio[0][id_municipio]."' limit 1";
			$tipos=$myvar->get_arreglo($sql);
			
			echo $tipos[0][nombre]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? echo $anuncio[0][lugarSuceso]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? echo $anuncio[0][lugarSucesoLF]?></td>
  </tr>
  
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? echo $aquienComparte[0][dsc_aquienComparte]?></td>
  </tr>
 <? if($anuncio[0][monto]>0){?>
 <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? echo "$ ".$anuncio[0][monto]?></td>
  </tr>
  <? }?>
 
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? 
	if($cliente[0][ocultarTel]==1){ // si ocutar
	echo $cliente[0][email];
	}else{
	echo $cliente[0][telefono];
	}?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><?php include("traductor.php"); ?></td>
  </tr>
  
</table>
</aside>
 
 
	
    </div>
</div>
<? /*}else{
	echo "NO HAY INFORMACION";
}*/?>
</body>
</html>
<script>//////REPORTAR CLIENTE
		     var href4;
 
        $('.reportarAnuncio').click(function(e) {
          e.preventDefault();
          href4 = $(this).attr('href');
          $('#dialog4'+href4).fadeIn(200, function() {
            $(this).html('¿Realmente desea denunciar este anuncio?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso4' value='Si'>");
            $(this).append("<input type='button' id='cerrar_dialogo4' value='Cancelar'>");
          });
			
        $('#dialog4'+href4).on("click", "#ejecutar_proceso4", function(event) {
    ejecutar4(href4);
});
        $('#dialog4'+href4).on("click", "#cerrar_dialogo4", function(event) {
    cerrar4(href4);
});
 });
		
	 function cerrar4(href4) {
				$('#dialog4'+href4).html('<a href="'+href4+'"   class="reportarAnuncio">Denunciar Anuncio</a>');
        }
 
        function ejecutar4(href4) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?reportar-anuncio=1&id="+href4,
            success: function(data) {
				 $('#dialog4'+href4).html(data);
            }
          });
          $(".unica4"+href4).remove();
        }
		
	// ACEPTAR SOLICITUD
</script>