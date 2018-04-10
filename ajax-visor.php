<? 
session_start();
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");

$urlprincipal="http://lofers.club/"; 
$myvar = new db_mysql;
$myvar->conectarBd();

if($_GET['paginas-desp-bus']){

$sql=" select * from anuncios where activo=1  and id_anuncio=".$_GET[id]." limit 1"; 

	$anuncio=$myvar->get_arreglo($sql);


$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$anuncio[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);


$sql=" select * from clientes where activo=1  and id_cliente=".$anuncio[0][id_cliente]." limit 1"; 
	$cliente=$myvar->get_arreglo($sql);


$sql="select id_anuncio from anuncios where id_anuncio!='".$_GET[id]."' and id_anuncio<'".$_GET[id]."' and activo=1   order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	
	$sql="select id_anuncio from anuncios where  id_anuncio!='".$_GET[id]."'   and id_anuncio>'".$_GET[id]."' and activo=1  order by id_anuncio asc  limit 1 "; 
$motrosproducto=$myvar->get_arreglo($sql);

	$sql="SELECT *
 FROM reportesAnuncio 
 WHERE id_cliente =".$_SESSION[id_clienteLof4]."
 AND id_anuncio=".$_GET[id]." and activo=1";
$c=$myvar->get_arreglo($sql); // te mandaron la info
?>
 
<section>
</nav>
	
    
  <div class="container">

<div id="consulta">

 
	<section>
	  </nav>


		<a  href='javascript:void(0);' onclick="esmio(<?php echo $_GET[id]; ?>);" class="btop cf">Este LOF es mio</a>
		<? if(count($c)<=0){?>
                <div id="dialog4<? echo $_GET[id];?>" class="dialogo">
                <a href="<? echo $_GET[id];?>"  class="btop cf reportarAnuncio">DENUNCIAR ANUNCIO</a></div>
            	<? }else{?>
                	<div class="error">ANUNCIO DENUNCIADO</div>
				<? }?>         
    

<div id="esmio">

</div>


	<? 
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	
	?>

<div class="cImDe">
    <div class="contImP">
    <span id="resultado">
    
    <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" class="img" border="0"></span>
    </div>
	<?
	for($i=0; $i<count($imagenes); $i++){
	?>
    
    <div class="contEdicion">
    <span class="TexM"><img onclick="verImagen(<? echo $imagenes[$i][id_imagenAnuncio]?>);" src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" class="imaPqA" border="0"></span>
    
	<? }//for?>
	</div>
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
          
          <form action="<? echo $urlprincipal?>visor.php" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar un comentario:</p>
             <p><input name="comentario" type="text" id="comentario"  placeholder="comentario" autofocus /></p>
 			 <input type="hidden" name="status"  id="status"/> <input type="hidden" name="id_anuncio"  id="id_anuncio" value="<? echo $_GET[id]?>"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Enviar comentario" class="boton" 
  onclick="document.getElementById('status').value = '1';"/></p>
		</form> 



	</section>
	<aside>
    
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle">
    
	 <div class="navArrows">
            <div><?php if(count($otrosproducto)>0){ ?>
	<a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $otrosproducto[0][id_anuncio]; ?>);"> <img src="<? echo $urlprincipal?>images/FlechaV_Izq.png" class="img" border="0"></a>
	<?php } ?>
	</div>
    <div>
	
	<?php if(count($motrosproducto)>0){ ?>
	<a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $motrosproducto[0][id_anuncio]; ?>);"><img src="<? echo $urlprincipal?>images/FlechaV_Der.png" class="img" border="0"></a>
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
 <tr>
    <td align="center" valign="middle" class="TexVisor">
            <? echo "$ ".$anuncio[0][monto]?></td>
  </tr>
 
  <tr>
    <td align="center" valign="middle" class="TexVisor"><? 
	if($cliente[0][ocultarTel]==1){ // si ocutar
	echo $cliente[0][email];
	}else{
	echo $cliente[0][telefono];
	}?></td>
  </tr>
</table>
</aside>
 
 
	
    </div>
</div>  
    
    
<? }?><script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
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


function verImagen(id){
        var parametros = {
                "id_imagenAnuncio" : id
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
	
//////REPORTAR CLIENTE
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

 
