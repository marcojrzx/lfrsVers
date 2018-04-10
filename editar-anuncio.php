<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}
$urlprincipal="http://lofers.club/"; 
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();


if ($_POST['status']) {
	
		$sql='UPDATE anuncios  set  id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'",id_tipoPago="'.$_POST['id_tipoPago'].'",id_tipoAnuncio="'.$_POST['id_tipoAnuncio'].'",id_municipio="'.$_POST['id_municipio'].'",id_estado="'.$_POST['id_estado'].'",ubicacion="'.$_POST['ubicacion'].'",monto="'.$_POST['monto'].'",caracteristicas="'.$_POST['caracteristicas'].'",titulo="'.$_POST['titulo'].'",nombre="'.$_POST['nombre'].'",lugarSuceso="'.$_POST['lugarSuceso'].'",fechaSuceso="'.$_POST['fechaSuceso'].'" where id_anuncio="'.$_POST[id_anuncio].'" and id_cliente='.$_SESSION[id_clienteLof4];
	$myvar->execute($sql);
	
		
		$idcli=$_POST['id_anuncio'];

		
		
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
										
										
										$sql2=" select * from imagenesAnuncio  order by id_imagenAnuncio desc limit 1"; 
										$cliente=$myvar->get_arreglo($sql2);
						
										
										$nuevaa=$cliente[0][id_imagenAnuncio]+1;
										$nueva=$cliente[0][id_imagenAnuncio]+1;
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
								
								
								$sql2=" select * from videos  order by id_video desc limit 1"; 
								$cliente=$myvar->get_arreglo($sql2);
				
								$nuevaa=$cliente[0][id_video]+1;
								$nueva=$cliente[0][id_video]+1;
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
		
		header("Location: ".$urlprincipal."nuevo/iniciando");

		exit();
}//if submit



	$sql="select * from anuncios where id_anuncio='".$_GET[id]."'  and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
	$datos=$myvar->get_arreglo($sql);
	
$html = new html;

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include "funciones-arriba.php";

?>

<script type="text/javascript">
 /*function validarFormulario(){
          $("#formulario").validate();
  }*/
       
$(document).ready(function(){

    $("#formulario").validate({
        rules: {
            id_categoriaAnuncio: { required: true},
            id_tipoAnuncio: { required: true},
            titulo: { required:true, minlength: 2},
			caracteristicas: { required:true, minlength: 2}
            
        },
        messages: {
            id_categoriaAnuncio: "Debe seleccionar categoria",
            id_tipoAnuncio: "Debe seleccionar tipo Anuncio",
            titulo : "Debe introducir titulo",
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

</script>

<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<center><br>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >

            		<input type="hidden" id="id_anuncio" name="id_anuncio" value="<? echo $_GET[id]?>" />
            <p>Categoria:</p>
             <p>
               <?
			 $sql2=" select * from categoriasAnuncio where activo=1"; 
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_categoriaAnuncio" id="id_categoriaAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" <? if($tipos[$i][id_categoriaAnuncio]==$datos[0][id_categoriaAnuncio]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_categoriaAnuncio]?></option>
                 <? }?>
               </select>
             </p>
			<p>Tipo de Anuncio:</p>
             <p>
               <?
			 $sql2=" select * from tiposAnuncio where activo=1"; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoAnuncio" id="id_tipoAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" <? if($tipos[$i][id_tipoAnuncio]==$datos[0][id_tipoAnuncio]){?>selected="selected" <? }?>><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </p>
            
            
            <p>Titulo:</p>
             <p><input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus value="<? echo $datos[0][titulo]?>" /></p>
 			<p>Nombre:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus value="<? echo $datos[0][nombre]?>" /></p>
 			<p>Caracteristicas:</p>
             <p><input name="caracteristicas" type="text" id="caracteristicas"  placeholder="Pon caracteristicas" autofocus value="<? echo $datos[0][caracteristicas]?>" /></p>
 			<p>Fecha Suceso:</p>
             <p><?php $html->print_calendar( "fechaSuceso",$datos[0][fechaSuceso]);?></p>
 
            
            <? 
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
             </div>
             
              <p>Lugar Suceso:</p>
             <p><input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus value="<? echo $datos[0][lugarSuceso]?>"/></p>
              <p>Ubicacion:</p>
             <p><input name="ubicacion" type="text" id="ubicacion"  placeholder="Pon ubicacion" autofocus value="<? echo $datos[0][ubicacion]?>"/></p>

			<p>Tipo Pago:</p>
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

              <p>Monto $:</p>
             <p><input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus  value="<? echo $datos[0][monto]?>"/></p>

             
                 
                 
       	<h2>Imagenes:</h2>
         <? $sql="select * from imagenesAnuncio where id_anuncio='".$datos[0][id_anuncio]."' and activo=1";
			$imagenes=$myvar->get_arreglo($sql);


 if(count($imagenes)>0){
 	for($i=0;$i<=count($imagenes)-1;$i++){
		$Econt=$imagenes[$i][id_imagenAnuncio];
		  $Evar='IMA'; // variable identificador 
		  
		 ?>
        
        <h3>Imagen: <? echo $i+1?></h3>
       
      <table width="550" border="0" cellpadding="2" cellspacing="0">
  
  <tr>
    <td align="left" class="subtexto15"> Titulo *</td>
    <td align="left"><div align="left">
      <input name="tituloImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text" class="texto23" size="40" required="required" value="<? echo $imagenes[$i][descripcion]?>" />
    </div></td>
  </tr>
							    <tr>
							      <td width="119" align="left" class="subtexto15">
						          Principal *</td>
							      <td width="423" align="left"><div align="left">
							        <input name="principalImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="checkbox" class="texto23" size="40" value="1" <? if($imagenes[$i][fotoPrincipal]){?> checked="checked"<? }?>/>
						          </div></td>
</tr>
							  
							   <tr>
                                <td align="left" class="subtexto15">
                                 Archivo *</td>
                                <td align="left">
                                     <input type="file" name="imagen<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="imagen<? echo $Evar; ?><?php echo $Econt;?>" value="" >
                                     <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" />
                                     </td>
                              </tr>
						 	
 							
							   </table>     	
          
        Eliminar Imagen
        <input name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
		Si
		<input  name="Ieliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
		No
        
     <? }//for ?>
        
<? }//if?>

                 
                  <p>Imagenes :</p>
             <p><input type="checkbox" class="textbox"  name="_nuevaimagen1" id="_nuevaimagen1" onclick="if(document.getElementById('formulario')._nuevaimagen1.checked){
			javascript:llamarasincrono('imagen.php?cont=1','divImagen');
			}else {removeChildOfDiv('divImagen');}"> 
            
            <div id="divImagen" ></div>
             </p>
         
              
              
              	<h2>Videos:</h2>
         <? $sql="select * from videos where id_anuncio='".$datos[0][id_anuncio]."' and activo=1";
			$videos=$myvar->get_arreglo($sql);


 if(count($videos)>0){
 	for($i=0;$i<=count($videos)-1;$i++){
		$Econt=$videos[$i][id_video];
		  $Evar='VID'; // variable identificador 
		  
		 ?>
        
        <h3>Video: <? echo $i+1?></h3>
       
      <table width="550" border="0" cellpadding="2" cellspacing="0">
  
  <tr>
    <td align="left" class="subtexto15"> Titulo *</td>
    <td align="left"><div align="left">
      <input name="tituloVideo<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text" class="texto23" size="40" required="required" value="<? echo $videos[$i][descripcion]?>" />
    </div></td>
  </tr>
							    
							   <tr>
                                <td align="left" class="subtexto15">
                                 Archivo *</td>
                                <td align="left">
                                     <input type="file" name="video<? echo $Evar; ?><?php echo $Econt;?>" title="*" id="video<? echo $Evar; ?><?php echo $Econt;?>" value="" ><img src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" />
                                     </td>
                              </tr>
						 	
 							
							   </table>     	
          
        Eliminar Video
        <input name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="1" />
		Si
		<input  name="Veliminar<? echo $Evar; ?><?php echo $Econt;?>" type="radio" value="0"  checked="checked"/>
		No
        
     <? }//for ?>
        
<? }//if?>

              
                  <p>Videos :</p>
             <p><input type="checkbox" class="textbox"  name="_nuevovideo1" id="_nuevovideo1" onclick="if(document.getElementById('formulario')._nuevovideo1.checked){
			javascript:llamarasincrono('video.php?cont=1','divVideo');
			}else {removeChildOfDiv('divVideo');}"> 
            
            <div id="divVideo" ></div></p>
  
  
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
               
             <?  	$sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where  
	id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION 
	(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1)"; 
	$amigos=$myvar->get_arreglo($sql);
	
	$sql=" select * from compartidoA where id_anuncio=".$datos[0][id_anuncio]." limit 1"; 
	$ba=$myvar->get_arreglo($sql);

	
	?>
       <p>Amigos:</p>
             <p>
                 <? for($i=0; $i<count($amigos); $i++){
					 
					 $sql=" select * from clientes where id_cliente=".$amigos[$i][id_cliente]; 
					$c=$myvar->get_arreglo($sql);
					 ?>
                 <input type="radio" name="amigoCompartir" id="amigoCompartir" value="<? echo $tipos[$i][id_cliente]?>" 
                 
                <? if($tipos[$i][id_cliente]==$ba[0][id_cliente]){?> checked="checked" <? }?>/><? echo $c[0][nombre]." ".$c[0][apellidos]?>
				 
				 <? }?>
               
             </p>
			
               
               </div>
             </p>
                   
             
                   
  <input type="hidden" name="status"  id="status"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
</form>
<br><br><br>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
<script type="text/javascript">
 /*function validarFormulario(){
          $("#formulario").validate();
  }*/
       
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

</script>
