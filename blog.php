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

if ($_POST['status']) {
	
		$sql="insert into blog (id_cliente,comentario,activo,fecha) values 
		(".$_SESSION[id_clienteLof4].",
	'".$_POST[comentario]."',1,'".date("Y-m-d H:i:s")."')";
		$myvar->execute($sql);
	
	$sql2=" select * from blog order by id_comentario desc limit 1"; 
		$categorias=$myvar->get_arreglo($sql2);

	 $idcli=$categorias[0][id_comentario];
	if($_FILES['foto']['tmp_name']!=""){
			$nombre_archivo = $_FILES['foto']['tmp_name'];
				$mythumb = new thumb(); 
				$mythumb->loadImage($nombre_archivo); 
				$tipo='width';
				$nombre_ext = $_FILES['foto']['name'];
				$extension=explode(".",$nombre_ext); 
				$nueva=$idcli;
				$nueva.=".".$extension[1];
				
				copy($_FILES['foto']['tmp_name'], "imagenes/blog/".$idcli."-temp.".$extension[1]);
				$imagen_ruta="imagenes/blog/".$idcli."-temp.".$extension[1];			
				$datos = getimagesize($imagen_ruta);
				$ancho=$datos[0];
				$alto=$datos[1];
				
				$anchodeseado=300;
				if($ancho<$anchodeseado){
					$anchodeseado=$datos[0];
				}	
			
				unlink("imagenes/blog/".$idcli."-temp.".$extension[1]);
		 		$mythumb->resize($anchodeseado, $tipo,$nombre_archivo); 
				 $mythumb->save('imagenes/blog/'.$nueva, $quality = 200);
			
			
			$sql9="update blog set imagen='".$nueva."' where id_comentario=".$idcli;
		  	$myvar->execute($sql9);

	}//imagen
}//if submit

$sql2=" select * from blog where activo=1  order by id_comentario desc"; 
		$comentarios=$myvar->get_arreglo($sql2);
?>							
<script>
$(document).ready(function(){

    $("#formulario").validate({
        rules: {
            comentario: { required: true, minlength: 2}
            
        },
        messages: {
            comentario: "Debe introducir su comentario."
        }
    });
});
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<center><br>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	
    <div class="txInD">
    <p>En este espacio traeremos para ti las novedades que Lofers! tiene en sus esfuerzos de hacer de esta página la mejor herramienta de ayuda en los casos de pérdidas.</p>
    <p>También podrás apreciar aquí algunos de los casos donde tu búsqueda, la Red Lofers! y el altruismo de alguien más, en conjunto, tuvieron éxito. Siempre serán bienvenidas las palabras de nuestros usuarios que se han reencontrado con sus LOF’s.</p>
    <p>Cualquier comentario ofensivo será borrado de nuestra página como lo puedes apreciar en <a href="<? echo $urlprincipal?>condiciones" style="color: #b1027e;font-weight: bold;font-size: 14px;">Condiciones del Servicio</a></p>
</div>

	<p>
	  <label for="nombre">Comentario:</label></p>
	<p><input name="comentario" type="text" id="comentario"  placeholder="Pon tu comentario" autofocus  value=""/></p>
  <p>Foto:</p>
   <input name="foto" type="file" id="foto" />
		
 	               
	<input type="hidden" name="status"  id="status"/>
	<p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
</form></center> 

<? for($i=0; $i<count($comentarios); $i++){
	
	$sql2=" select * from clientes where activo=1 and id_cliente=".$comentarios[$i][id_cliente]." limit 1"; 
	$cliente=$myvar->get_arreglo($sql2);

?><div class="uncom">
  Cliente: <strong>
  <? 
	if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?>
  </strong>
        </p>
        <p>Fecha: <strong><? echo obtenerfecha(date("Y-m-d", strtotime($comentarios[$i][fecha])));?></strong>
        </p>
        <p>Comentario: <? echo $comentarios[$i][comentario]?></strong>
          
        </p>
    </div>
            <? }?>

</div>

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
