<? 
session_start();
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");

$html = new html;
$urlprincipal="http://lofers.club/"; 
$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);


	$sql="select * from anuncios where id_anuncio='".$_GET[id]."'  and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
	$datos=$myvar->get_arreglo($sql);	
	
	
$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$datos[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);
	
	
	$sql="select id_anuncio from anuncios where id_anuncio!='".$_GET[id]."'  
	and id_cliente=".$_SESSION[id_clienteLof4]." and id_anuncio<'".$_GET[id]."' and activo=1   order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	
	$sql="select id_anuncio from anuncios where  id_anuncio!='".$_GET[id]."' 
	and id_cliente=".$_SESSION[id_clienteLof4]."  and id_anuncio>'".$_GET[id]."' and activo=1  order by id_anuncio asc  limit 1 "; 
	$motrosproducto=$myvar->get_arreglo($sql);



?>
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

	
<div class="container">
  <div id="consulta">

<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	<input type="hidden" id="id_anuncio" name="id_anuncio" value="<? echo $_GET[id]?>" />
          
 
	<section>
    </nav>


	<!-- Contiene los iconos de status -->
    <div class="menuAux2">
  <? 
 // echo $datos[0][id_tipoAnuncio];
  //echo "";
	 if($datos[0][id_tipoAnuncio]==1){// perdid
	 	$sql="select * from similares where  id_anuncio='".$_GET[id]."' and activo=1 limit 1 "; 
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
  <img src="<? echo $urlprincipal?>images/status/naranja.png"  border="0">
            <? /* for($a=0; $a<count($alguien); $a++){
				?> <a href="visor.php?id=<? echo $alguien[$a][id_anuncioSimilar]?>"><? echo $a;?></a> <?
				}*/
			
			 }else{//if
			 ?>
               <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
			<?
             }
			 
	 }else{//encontrado
	 	$sql="select * from quienencuentra where  id_anuncio='".$_GET[id]."' and activo=0  "; // alguien ya lo encontro 
		//echo $sql;
		
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
				<img src="<? echo $urlprincipal?>images/status/rojo.png"  border="0">
			<? }else{//if
			 ?>
               <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
			<?
             }
	 }//else
	 
	?>
	
       
</div>       
      
       
	<? 
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$_GET[id]." order by id_imagenAnuncio ";
	$imagenes=$myvar->get_arreglo($sql2);
	?>
    

<div class="colIzqierda">
	
    <div class="cImDe">
    <!-- Contiene la foto del anuncio en grande -->
    <div class="contImP">
    <span id="resultado">
     <? if($imagenes[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" />
            <? }//else?></span>
	</div>  
  
  	<!-- Columna que despliega fotos/videos y edición de fotos/videos -->
    <div class="contEdicion">
    <? 
 if(count($imagenes)>0){
 	for($i=0;$i<=count($imagenes)-1;$i++){
		$Econt=$imagenes[$i][id_imagenAnuncio];
		  $Evar='IMA'; // variable identificador 
		  
		 ?> 
    
    <div class="titAnEd">Título <input name="tituloImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text"   required value="<? echo $imagenes[$i][descripcion]?>" />
      </div>
   
   <? if($i==0){?>
    <div class="titAnEd">
      Principal?<input name="principalImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="checkbox"   
      value="1" <? //if($imagenes[$i][fotoPrincipal]){?> checked="checked"<? //}?>/>
      </div>
      <? }?>
    
    <div class="adjuntar">
      <input type="file" name="imagen<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="imagen<? echo $Evar; ?><?php echo $Econt;?>" value="" >
      </div>
    
    <div class="eliminar">
    
      <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" />
      Eliminar imagen
      <input name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
      Si
      <input  name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
      No
      </div>
    <? }//for
 	}//if?>
    
    <div class="agregar">
      Agregar más imágenes :
      <input type="checkbox" class="textbox"  name="_nuevaimagen1" id="_nuevaimagen1" onclick="if(document.getElementById('formulario')._nuevaimagen1.checked){
			javascript:llamarasincrono('imagen.php?cont=1&total=<? echo count($imagenes)+1; ?>','divImagen');
			}else {removeChildOfDiv('divImagen');}"> 
      </div>
    <div id="divImagen"></div>
    
    <? $sql="select * from videos where id_anuncio='".$datos[0][id_anuncio]."' and activo=1";
			$videos=$myvar->get_arreglo($sql);


 	if(count($videos)>0){
 	for($i=0;$i<=count($videos)-1;$i++){
		$Econt=$videos[$i][id_video];
		  $Evar='VID'; // variable identificador 
		  
		 ?>
    <div class="titAnEd">
      Título 
      <input name="tituloVideo<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text"   required value="<? echo $videos[$i][descripcion]?>" />
      </div>
    
    <div class="adjuntar">
      <input type="file" name="video<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="video<? echo $Evar; ?><?php echo $Econt;?>" value="" >
      </div>
    
    <div class="eliminar">
      <img src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" />
      Eliminar este video
      <input name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
      Si
      <input  name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
      No
      </div>
    
     <? }//for
 }else{//if?>
    <div class="agregar">
      Agregar más videos:
      <input type="checkbox" class="textbox"  name="_nuevovideo1" id="_nuevovideo1" onclick="if(document.getElementById('formulario')._nuevovideo1.checked){
			javascript:llamarasincrono('video.php?cont=1','divVideo');
			}else {removeChildOfDiv('divVideo');}"> 
      </div>   
    <div id="divVideo" ></div>
    <? }?>
    
  </div>
    </div>  
   	
    <!-- Contiene caracteristicas del producto -->
   	<div class="caracteristicas">
    
    <p>Caracteristicas:</p>
	<p><input name="caracteristicas" type="text" id="caracteristicas" style="width: 100%;"  placeholder="Pon caracteristicas" autofocus value="<? echo $datos[0][caracteristicas]?>" /></p>
	
    
    <p>Detalles:</p>
	<p><input name="detalles" type="text" id="detalles" style="width: 100%;"  placeholder="Pon Detalles" autofocus value="<? echo $datos[0][detalles]?>" /></p>
	
    
    <div class="compartir">
    Compartir con:
        <?
			 $sql2=" select * from aquienComparte where activo=1"; 
			 $tipos=$myvar->get_arreglo($sql2);?>
        <select name="id_aquienComparte" id="id_aquienComparte"  onChange="cargaAmigos();">
          <? for($i=0; $i<count($tipos); $i++){?>
          <option value="<? echo $tipos[$i][id_aquienComparte]?>" <? if($tipos[$i][id_aquienComparte]==$datos[0][id_aquienComparte]){?> selected="selected"<? }?> ><? echo $tipos[$i][dsc_aquienComparte]?></option>
          <? }?>
          </select>
     </div>
        
        <div id="divAmigos">
          
          <?  	
			 
			if($datos[0][id_aquienComparte]==3){ 
			
			
			
			 $sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where  
	id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION 
	(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]."
	 and id_statusSolicitud=1)"; 
	 
	$amigos=$myvar->get_arreglo($sql);
	
	
	
	?>
          <p>Amigos:</p>
          <p>
            <? for($i=0; $i<count($amigos); $i++){
					 
					 $sql=" select * from clientes where id_cliente=".$amigos[$i][id_cliente]." and 
					 id_statusCliente=1 and activo=1"; 
					$c=$myvar->get_arreglo($sql);
					
					
					$sql=" select * from compartidoA where id_anuncio=".$datos[0][id_anuncio]." and 
					id_cliente=".$amigos[$i][id_cliente]." limit 1"; 
					$ba=$myvar->get_arreglo($sql);
 ?>
             <input type="checkbox" name="amigoCompartir<? echo $amigos[$i][id_cliente]?>" 
             id="amigoCompartir<? echo $amigos[$i][id_cliente]?>" value="1"  
             <? if(count($ba)>0){?> checked="checked" <? }?>/><? 
				
				if($c[0][ocultarNom]==1){// si lo quiere ocultar
	echo $c[0][nombre]." ".$c[0][apellidos];
	}else{
	echo $c[0][nick];
	}?>
            
            <? }?>
            
            </p>
          <? }//if?>
          </div>

      
      
      
    
  <input type="hidden" name="status"  id="status"/>
      <p id="bot"><input name="submit" type="submit" id="boton" value="Hecho / Publicar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
      
      
        
              </div>

</div>
   


	</section>
	<aside>
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle">
    
    
        <div class="navArrows">
            <div>
            <?php if(count($otrosproducto)>0){ ?>
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
    <td align="center" valign="middle" class="TexVisor"> <p>Categoria:</p>
           
               <?
			 $sql2=" select * from categoriasAnuncio where activo=1"; 
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_categoriaAnuncio" id="id_categoriaAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" 
				 <? if($tipos[$i][id_categoriaAnuncio]==$datos[0][id_categoriaAnuncio]){?>selected="selected" <? }?>>
				 <? echo utf8_encode($tipos[$i][dsc_categoriaAnuncio])?></option>
                 <? }?>
               </select>
             </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo de Anuncio:</p>
            
               <?
			 $sql2=" select * from tiposAnuncio where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoAnuncio" id="id_tipoAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" <? if($tipos[$i][id_tipoAnuncio]==$datos[0][id_tipoAnuncio]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Titulo:</p>
             <input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus value="<? echo $datos[0][titulo]?>" />
 			</td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Nombre:</p>
            <input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus value="<? echo $datos[0][nombre]?>" />
 			</td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p>
            <?php $html->print_calendar( "fechaSuceso",$datos[0][fechaSuceso]);?>
 </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <? 
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);
	
			?>
 			<div id="datosEstado"> 
             <p>Estado:</p>
             
                 <select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_estado]?>" <? if($tipos[$i][id_estado]==$datos[0][id_estado]){?>selected="selected" <? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
             
			<p>Municipio:</p>
             
             <div id="datosEstado1">   <?
			 $sql2=" select * from municipios where activo=1  and id_estado=".$datos[0][id_estado]; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" <? if($tipos[$i][id_municipio]==$datos[0][id_municipio]){?>selected="selected" <? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
               </div>
             
             </div></td>
  </tr>
  
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Lugar Suceso:</p>
            <input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus value="<? echo $datos[0][lugarSuceso]?>"/>
           
 </td>
  </tr>
 
  
   
 
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Recompensa $:</p>
            <input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus  value="<? echo $datos[0][monto]?>"/>

 </td>
  </tr>
  
</table>
</aside>
 
 </form>
 
  <div class="comentarios">
  <h3>Comentarios</h3>
         <?
	        
     $sql2=" select * from comentariosAnuncio where activo=1 and id_anuncio=".$_GET[id]." 
	 order by id_comentarioAnuncio desc ";
	 $comentarios=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($comentarios); $i++){
	   ?>
	  <div class="uncom">
        <p>
        ¿Quién comenta?: <strong>
        <? 
	    $sql2=" select * from clientes where id_cliente=".$comentarios[$i][id_cliente]." limit 1 ";
		$cli=$myvar->get_arreglo($sql2);
	
	   if($cli[0][ocultarNom]==1){// si lo quiere ocultar
		echo $cli[0][nombre]." ".$cli[0][apellidos];
		}else{
		echo $cli[0][nick];
		}?>
        </strong>        </p>
        <p>Fecha: <strong>
        <? 
		$date = date_create($comentarios[$i][fecha]);

		echo date_format($date, 'Y-m-d');?>
        </strong>        </p>
        <p>Comentario: <strong><? echo $comentarios[$i][comentario]?></strong></p>
        <div id="dialog3<? echo $comentarios[$i][id_comentarioAnuncio];?>" class="dialogo"> 
<a href="<? echo $comentarios[$i][id_comentarioAnuncio];?>"  class="btop cf eliminarServicio">Eliminar comentario</a>
</div>
	</div>
        
       
 <? }//for?>
            
</div>
            
            

          
    <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar Comentario:</p>
             <p><input name="comentario" type="text" id="comentario"  placeholder="comentario" autofocus required /></p>
 			 <input type="hidden" name="statusComentario"  id="statusComentario"/> 
             <input type="hidden" name="id_anuncio"  id="id_anuncio" value="<? echo $_GET[id]?>"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Enviar comentario" class="boton"  onclick="document.getElementById('statusComentario').value = '1';"/></p>
		</form>  
        
        
        <div class="comUser">
	  <? 
	
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
      <a href="<? echo $alguien[$a][id_quienencuentra];?>"  class="btop cf aceptarEncontrado">Aceptar</a>
      <div id="dialog2<? echo $alguien[$a][id_quienencuentra];?>" class="dialogo"></div>
      
	<?
		}
	?>
    </div>
 </div>
</div>
<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>
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
		



//////ELIMINAR SERVICIOS
		     var href3;
 
        $('.eliminarServicio').click(function(e) {
			alert("ok");
          e.preventDefault();
          href3 = $(this).attr('href');
          $('#dialog3'+href3).fadeIn(200, function() {
            $(this).html('¿Realmente desea eliminar este registro?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso3' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo3' value='Cancelar'>");
          });
			
        $('#dialog3'+href3).on("click", "#ejecutar_proceso3", function(event) {
    ejecutar3(href3);
});
        $('#dialog3'+href3).on("click", "#cerrar_dialogo3", function(event) {
    cerrar3(href3);
});
 });
		
		
        function cerrar3(href3) {
          $('#dialog3'+href3).fadeOut();
        }
 
        function ejecutar3(href3) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?borrar-comentario=1&id="+href3, 
            success: function(data) {
				 $('#dialog3'+href3).html(data);
            }
          });
          $(".unica3"+href3).remove();
        }
		
</script>