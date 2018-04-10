<? 
include("funciones.php");
$urlprincipal="http://lofers.club/"; 
include_once("sad/funciones-bd.php");

$myvar = new db_mysql;
$myvar->conectarBd();

$cont=$_GET['cont'];?>


	<div class="titAnEd">
    Título *
	<input name="tituloVideo<?php echo $cont;?>" title="*"  type="text" class="texto23" size="40" required="required" />
    </div>

	<div class="titAnEd">
    Archivo *
	<input type="file" name="video<?php echo $cont;?>" title="*" id="video<<?php echo $cont;?>" value="" >    
	</div>
    
    <!--div class="titAnEd">Agregar un nuevo video
	<?php 
		$cont=$_GET['cont']+1;
	?>
	<input type="checkbox" class="textbox"  name="_nuevavideo<?php echo $cont;?>" id="_nuevavideo<?php echo $cont;?>" onclick="if(document.getElementById('formulario')._nuevavideo<?php echo $cont;?>.checked){
			javascript:llamarasincrono('video.php?cont=<?php echo $cont;?>','divVideo<?php echo $cont;?>');
			}else {removeChildOfDiv('divVideo<?php echo $cont;?>');}"  />
	</div>
    
    <div id="divVideo<?php echo $cont;?>" ></div-->
            
