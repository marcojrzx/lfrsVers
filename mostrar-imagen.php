<? 
session_start();
$urlprincipal="http://lofers.club/"; 
include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();


if($_POST[tipo]==1){ // es imagen
$sql2=" select * from imagenesAnuncio where activo=1 and id_imagenAnuncio=".$_POST[id]." ";
$imagenes=$myvar->get_arreglo($sql2);
	

?><img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" class="img" border="0">
<? }else{ // es video

$sql2=" select * from videos where activo=1 and id_video=".$_POST[id]." ";
$videos=$myvar->get_arreglo($sql2);


?><video type="video/mp4" width="100%" src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[0][dsc_video]?>" controls></video>  
<? }?>
