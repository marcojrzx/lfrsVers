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



include "funciones-arriba.php";


if($_POST['id_anuncio'])
$_GET[id]=$_POST['id_anuncio'];

if ($_POST['status']) {
	
	$sql='insert into comentariosAnuncio (id_cliente,id_anuncio,fecha,comentario,activo) values ("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d H:i:s").'","'.$_POST['comentario'].'",1)'; 
	$myvar->execute($sql);
}

$sql=" select * from anuncios where activo=1  and id_anuncio=".$_GET[id]." limit 1"; 
	$anuncio=$myvar->get_arreglo($sql);
	?>


<link href="http://vjs.zencdn.net/6.1.0/video-js.css" rel="stylesheet">
<script src="http://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js"></script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<center><br>
<?
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($imagenes); $i++){
	   ?><img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" />
      <? }//for
      
      $sql2=" select * from videos where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($imagenes); $i++){
	   ?>
       
       <video id="my-video" class="video-js" controls preload="auto" width="640" height="264"
  poster="MY_VIDEO_POSTER.jpg" data-setup="{}">
    <source src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $imagenes[$i][dsc_video]?>" type='video/mp4'>
   
  </video>
       
       <!--img src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $imagenes[$i][dsc_video]?>" /-->
      <? }//for?>
      
      <p>Categoria:
                <?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_categoriaAnuncio];
			 ?>
             </p>
			<p>Tipo de Anuncio:
                <strong>
                <?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncio[0][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?>
             </strong>             </p>
            
           <p>Titulo: <strong><? echo $anuncio[0][titulo]?></strong></p>
 			<p>Nombre: <strong><? echo $anuncio[0][nombre]?></strong></p>
 			<p>Caracteristicas: <strong><? echo $anuncio[0][caracteristicas]?></strong></p>
 			<p>Fecha de ingreso: <strong><? echo date("Y-m-d",$anuncio[0][fechaIngreso]);?></strong></p>
            
        <p>
        <h3>Comentarios</h3>
          <?
	        
     $sql2=" select * from comentariosAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by id_comentarioAnuncio desc ";
	 $comentarios=$myvar->get_arreglo($sql2);
	  
	  for($i=0; $i<count($comentarios); $i++){
	   ?>
        
        
        <div class="unComent">
         ¿Quién comenta?: 
           <strong>
           <? 
		$sql2=" select * from clientes where id_cliente=".$comentarios[$i][id_cliente]." limit 1 ";
			$cli=$myvar->get_arreglo($sql2);
	
	   echo $cli[0][nombre]." ".$cli[0][apellidos];?>
           </strong>
        
        <p>Fecha: <strong><? echo $comentarios[$i][fecha]?></strong></p>
        <p>Comentario: <strong><? echo $comentarios[$i][comentario]?></strong></p>
       </div>
            
             
            
        <? }//for?>

          
          <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar Comentario:</p>
             <p><input style="width:80%;" name="comentario" type="text" id="comentario"  placeholder="comentario" autofocus /></p>
 			 <input type="hidden" name="status"  id="status"/> <input type="hidden" name="id_anuncio"  id="id_anuncio" value="<? echo $_GET[id]?>"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
		</form>   
<br><br><br>

</div>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
<script src="http://vjs.zencdn.net/6.1.0/video.js"></script>

 