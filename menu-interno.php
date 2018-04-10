<? 
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 
	 $idcli=$_SESSION[id_clienteLof4];
	
if ($_POST['statusFoto']) {
if($_POST[eliminarFoto]==1){ // no quiere foto
			$sql9="update clientes set foto='' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}
		
	
	if($_FILES['foto']['tmp_name']!=""){
			$nombre_archivo = $_FILES['foto']['tmp_name'];
				$mythumb = new thumb(); 
				$mythumb->loadImage($nombre_archivo); 
				$tipo='width';
				$nombre_ext = $_FILES['foto']['name'];
				$extension=explode(".",$nombre_ext); 
				$nueva=$idcli;
				$nueva.=".".$extension[1];
				
				copy($_FILES['foto']['tmp_name'], "imagenes/clientes/".$idcli."-temp.".$extension[1]);
				$imagen_ruta="imagenes/clientes/".$idcli."-temp.".$extension[1];			
				$datos = getimagesize($imagen_ruta);
				$ancho=$datos[0];
				$alto=$datos[1];
				
				$anchodeseado=300;
				if($ancho<$anchodeseado){
					$anchodeseado=$datos[0];
				}	
			
				unlink("imagenes/clientes/".$idcli."-temp.".$extension[1]);
		 		$mythumb->resize($anchodeseado, $tipo,$nombre_archivo); 
				 $mythumb->save('imagenes/clientes/'.$nueva, $quality = 200);
			
			
			$sql9="update clientes set foto='".$nueva."' where id_cliente=".$idcli;
		  	$myvar->execute($sql9);

	}//imagen
	
}
if ($_POST['statusHeader']) {
	if($_POST[eliminarFotoHeader]==1){ // no quiere foto
			$sql9="update clientes set fotoHeader='' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}	 	
	if($_FILES['fotoHeader']['tmp_name']!=""){
			$nombre_archivo = $_FILES['fotoHeader']['tmp_name'];
				$mythumb = new thumb(); 
				$mythumb->loadImage($nombre_archivo); 
				$tipo='width';
				$nombre_ext = $_FILES['fotoHeader']['name'];
				$extension=explode(".",$nombre_ext); 
				$nueva=$idcli;
				$nueva.=".".$extension[1];
				
				copy($_FILES['fotoHeader']['tmp_name'], "imagenes/clientesHeader/".$idcli."-temp.".$extension[1]);
				$imagen_ruta="imagenes/clientesHeader/".$idcli."-temp.".$extension[1];			
				$datos = getimagesize($imagen_ruta);
				$ancho=$datos[0];
				$alto=$datos[1];
				
				$anchodeseado=800;
				if($ancho<$anchodeseado){
					$anchodeseado=$datos[0];
				}	
			
				unlink("imagenes/clientesHeader/".$idcli."-temp.".$extension[1]);
		 		$mythumb->resize($anchodeseado, $tipo,$nombre_archivo); 
				 $mythumb->save('imagenes/clientesHeader/'.$nueva, $quality = 200);
			
			
			$sql9="update clientes set fotoHeader='".$nueva."' where id_cliente=".$idcli;
			
			$myvar->execute($sql9);

	}//imagen
}
$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);

$sql=" select * from clientes_has_clientes where id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=3 "; 
$solicitudes=$myvar->get_arreglo($sql);


?>
      

  <? /*  <form style="margin: 0px;" action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formularioHeader" 
   id="formularioHeader" >*/?>
   
   <div class="fotoHeader" style="background-image:url(
   <? if($cliente[0][fotoHeader]!=''){?>
   <? echo $urlprincipal?>imagenes/clientesHeader/<? echo $cliente[0][fotoHeader]?>
   <? } ?>
   );">
   
    <? if($cliente[0][fotoHeader]!=''){?>
    <div class="slogan">
	<? echo $cliente[0][slogan];?>
    </div>
    
    
    
   <? /** <input name="fotoHeader" type="file" id="fotoHeader" />
     <input type="checkbox" name="eliminarFotoHeader" id="eliminarFotoHeader" value="1" />*/?>
	 <? }else{?>
   <? /* <input name="fotoHeader" type="file" id="fotoHeader" />*/?>
	<? }?>
    <? /* <input type="hidden" name="statusHeader"  id="statusHeader"/>
	<p id="bot"><input name="submit" type="submit" id="boton" value="Editar" class="boton" 
     onclick="document.getElementById('statusHeader').value = '1';"/></p>*/?>
	</div>     
	
   <? /* </form>*/?>

	
    <div id="menResponsive">
    <label for="show-menu" class="show-menu">MIS ANUNCIOS<img src="<? echo $urlprincipal?>imagenes/arrow-down.png" style="width: 15px;
    height: auto;
    opacity: .7;
    vertical-align: text-bottom;
    margin: 0px 0px 0px 4px;" /></label>
	<input type="checkbox" id="show-menu" role="button">
		<ul id="menu">
		<li><a href="<? echo $urlprincipal?>1/mi-sitio"><span>L1</span> Mis Perdidas</a></li>
			<li><a href="<? echo $urlprincipal?>2/mi-sitio"><span>L2</span> Mis Hallazgos (Empresa)</a></li>
			<li><a href="<? echo $urlprincipal?>3/mi-sitio"><span>L3</span> Mis Hallazgos (Persona)</a></li>
			<li><a href="<? echo $urlprincipal?>4/mi-sitio"><span>L4</span> Mis Avistamientos</a></li>
			<li><a href="<? echo $urlprincipal?>muro-de-anuncios">Muro de anuncios</a></li>
		</ul>
    </div>
       
	
                
       
