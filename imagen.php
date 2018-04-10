<? 
include("funciones.php");
$urlprincipal="http://lofers.club/"; 
include_once("sad/funciones-bd.php");

$myvar = new db_mysql;
$myvar->conectarBd();

$cont=$_GET['cont'];
$tipoAnuncio=$_GET['tipoAnuncio'];
$total=$_GET['total'];
?>


 	<!--div class="titAnEd">
 	Título *
	<input name="tituloImagen<?php echo $cont;?>" title="*"  type="text"   required="required" />
    </div-->
    <? if($total==1){?>
    <div class="titAnEd">
    Foto principal de mi anuncio*
	  <input name="principalImagen<?php echo $cont;?>" title="*"  type="checkbox"   value="1" checked="checked" readonly="readonly" />
    </div>
    <? }?>
    
	<div class="titAnEd">
    Archivo *
    <input type="file" name="imagen<?php echo $cont;?>" title="*" id="imagen<?php echo $cont;?>" value="" >			
    </div>
                                     
	<div class="titAnEd">
    Agregar una nueva imagen
	<?php 
		$cont=$_GET['cont']+1;
		
		$total=$total+1;
	
	
	if($total>=5){
	}else{
	?>
    <input type="checkbox" class="textbox"  name="_nuevaimagen<?php echo $cont;?>" id="_nuevaimagen<?php echo $cont;?>" onclick="if(document.getElementById('formulario')._nuevaimagen<?php echo $cont;?>.checked){
			javascript:llamarasincrono('imagen.php?cont=<?php echo $cont;?>&total=<?php echo $total;?>','divImagen<?php echo $cont;?>');
			}else {removeChildOfDiv('divImagen<?php echo $cont;?>');}"  />
    <? }// ?>
	
    
    </div>
            <div id="divImagen<?php echo $cont;?>" ></div>
            
