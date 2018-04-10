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

if ($_POST['statusComentario']) {
	
		$sql='insert into comentariosAnuncio (id_cliente,id_anuncio,fecha,comentario,activo) values 
		("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d H:i:s").'","'.$_POST['comentario'].'",1)'; 
	$myvar->execute($sql);
	
	header("Location: ".$urlprincipal.$_POST['id_anuncio']."/modificar-anuncio");

		exit();

}

if ($_POST['status']) {
	$band=0;
		if($_POST['_nuevovideo1']=='on'){ 
		
				$nombre=$_FILES['video1']['name'];
				$partes_img=explode(".",$nombre);
				$extension=end($partes_img);
				$validas = array ("mp4","mp3");
		
		
		
				if(!in_array ($extension, $validas)){
					$band=1;
		
					$html2="<script type=\"text/javascript\">"
						."alert('Su archivo de video debe ser de formato mp3 o mp4');"
						."eval(location='alta-anuncio.php');"	
						. "</script>";//cerrar bien
		
						echo $html2;
						exit;
				}elseif (!($tamano_archivo < 10000000) ) {
					$band=1;
		
						$html2="<script type=\"text/javascript\">"
						."alert('Su archivo debe ser menor de 10 Mb');"
						."eval(location='alta-anuncio.php');"
						. "</script>";//cerrar bien
					
						echo $html2;
						exit;
		
				}
		}//if
		
		if($band==0){
				$sql='UPDATE anuncios  set  id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'",
				id_tipoPago="'.$_POST['id_tipoPago'].'",id_tipoCliente="'.$_POST['id_tipoCliente'].'",id_tipoAnuncio="'.$_POST['id_tipoAnuncio'].'",
				id_municipio="'.$_POST['id_municipio'].'",id_estado="'.$_POST['id_estado'].'",
				monto="'.$_POST['monto'].'",caracteristicas="'.$_POST['caracteristicas'].'",detalles="'.$_POST['detalles'].'",
				titulo="'.$_POST['titulo'].'",nombre="'.$_POST['nombre'].'",
				lugarSuceso="'.$_POST['lugarSuceso'].'",lugarSucesoLF="'.$_POST['lugarSucesoLF'].'",fechaSuceso="'.$_POST['fechaSuceso'].'",id_aquienComparte="'.$_POST['id_aquienComparte'].'" 
				where id_anuncio="'.$_POST[id_anuncio].'" and id_cliente='.$_SESSION[id_clienteLof4];
				
				$myvar->execute($sql);
			
				$idcli=$_POST['id_anuncio'];
				
				$sql='delete from compartidoA where id_anuncio="'.$idcli.'"'; 
				$myvar->execute($sql);
				
				if($_POST['id_aquienComparte']==3){// comparte a un amigo en especifico
				
						$sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where  
							id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION 
							(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and 
							id_statusSolicitud=1)"; 
							$tipos=$myvar->get_arreglo($sql);
		
							for($i=0; $i<count($tipos); $i++){
								if($_POST['amigoCompartir'.$tipos[$i][id_cliente]]==1){
									$sql='insert into compartidoA (id_anuncio,id_cliente) values ("'.$idcli.'","'.$tipos[$i][id_cliente].'")'; 
									$myvar->execute($sql);
									
									
									$sql="select * from clientes where id_cliente=".$tipos[$i][id_cliente]." limit 1";
									$ccom=$myvar->get_arreglo($sql);
				
									$headers ="MIME-Version: 1.0\r\n"; 
									$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
									$headers .="From: admin@lofers.club\r\n" ;
									mail($ccom[0][email],"Te han compartido un anuncio desde Lofers.club",htmlMail($idcli),$headers);
									
									
								}//if
							}//for
							
							
							
				}
				
				
			////// S I M I L A R E S 
				
			$articulos = array('EL','UN','LOS','LA','UNA','LAS',
		   'UNOS', 'UNOS', 'ESTE','ESTOS', 'ESOS', 'AQUEL', 'AQUELLOS',
			'ESTA', 'ESTAS', 'ESAS', 'AQUELLA', 
		   'AQUELLAS', 'ÉSTE', 'ÉSTOS', 'ÉSOS', 'AQUÉL', 'AQUÉLLOS', 'ÉSTA', 'ÉSTAS',
		    'ÉSAS', 'AQUÉLLA', 'AQUÉLLAS');
			$preposiciones = array('Y','A','ANTE', 'BAJO', 'CABE','CON', 'DESDE', 'DE','EN','CONTRA', 
			'ENTRE', 'HACIA', 
			'HASTA', 'PARA', 'POR','SEGÚN','SIN', 'SEGUN', 'SO','SOBRE', 'TRAS');

 	/////////BUSCAR///////////
		if($_POST['id_tipoAnuncio']==1){ //perdi
			if($_POST['id_pais']!=2){
				$sql='SELECT  * FROM anuncios where 
				id_pais=1 and estado like "%'.$_POST['estado'].'%" and 
			 	id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'" 
				and id_anuncio!= '.$idcli.' and id_tipoAnuncio!=1 and id_cliente!='.$_SESSION[id_clienteLof4]." and activo=1";
			  	$similares=$myvar->get_arreglo($sql);
			}else{
				$sql='SELECT  * FROM anuncios where 
				id_pais=2 and id_estado="'.$_POST['id_estado'].'" and 
			 	id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'" 
				and id_anuncio!= '.$idcli.' and id_tipoAnuncio!=1 and id_cliente!='.$_SESSION[id_clienteLof4]." and activo=1";
			  	$similares=$myvar->get_arreglo($sql);
			}
		}else{
			$sql='SELECT  * FROM anuncios where  id_pais="'.$_POST['id_pais'].'" and id_estado="'.$_POST['id_estado'].'" 
			and id_categoriaAnuncio="'.$_POST['id_categoriaAnuncio'].'" 
			and id_anuncio!= '.$idcli.' and id_tipoAnuncio=1 and id_cliente!='.$_SESSION[id_clienteLof4]." and activo=1";
			$similares=$myvar->get_arreglo($sql);
		}
							
					if(count($similares)>0){
						
						$headers ="MIME-Version: 1.0\r\n"; 
								$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
								$headers .="From: admin@lofers.club\r\n" ;
								
								
						for($i=0; $i<count($similares); $i++){
							
							
								$sql='SELECT  *
								FROM similares where  (id_anuncio="'.$idcli.'" 
							   and  id_anuncioSimilar="'.$similares[$i]['id_anuncio'].'") or (id_anuncioSimilar="'.$idcli.'" 
							   and  id_anuncio="'.$similares[$i]['id_anuncio'].'")';
							  $yaesta=$myvar->get_arreglo($sql);
												   
							   if(count($yaesta)<=0){ // todavia no existe
							
									# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($similares[$i][caracteristicas]));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars=array_diff($diff,$preposiciones);
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($_POST['caracteristicas']));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars1=array_diff($diff,$preposiciones);
								
								$band1=0;
								for($cont=0; $cont<count($cadena); $cont++){
									if (in_array($cars1[$cont], $cars)) {
										$band1++;
									}
								}//for
								
								// T I T U L O 
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($similares[$i][titulo]));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars=array_diff($diff,$preposiciones);
								
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($_POST['titulo']));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars1=array_diff($diff,$preposiciones);
								$band2=0;
								for($cont=0; $cont<count($cadena); $cont++){
									if (in_array($cars1[$cont], $cars)) {
										$band2++;
									}
									
								}//for
								// N O M B R E 
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($similares[$i][nombre]));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars=array_diff($diff,$preposiciones);
								
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($_POST['nombre']));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars1=array_diff($diff,$preposiciones);
								
								$band3=0;
								for($cont=0; $cont<count($cadena); $cont++){
									if (in_array($cars1[$cont], $cars)) {
										$band3++;
									}
								}//for
								
									// D E T A L L E S
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($similares[$i][detalles]));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars=array_diff($diff,$preposiciones);
								
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($_POST['detalles']));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars1=array_diff($diff,$preposiciones);
								
								$band4=0;
								for($cont=0; $cont<count($cadena); $cont++){
									
									if (in_array($cars1[$cont], $cars)) {
										
										$band4++;
									}
								}//for
								
								
								// L U G A R   S U C E S O 
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($similares[$i][lugarSuceso]));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars=array_diff($diff,$preposiciones);
								
								# Creamos el array de la variable recibida
								$cadena=explode(" ",strtoupper($_POST['lugarSuceso']));
								# Eliminamos los valores repetidos entre los dos arrays
								$diff=array_diff($cadena,$articulos);
								$cars1=array_diff($diff,$preposiciones);
								
								$band5=0;
								
								for($cont=0; $cont<count($cadena); $cont++){
									
									if (in_array($cars1[$cont], $cars)) {
										
										$band5++;
									}
								}//for
								
							
						if(($band1>2 or $band4>2)  or  ($band3>2 and  $band5>1 and $band2>2)){	
											
							if($_POST['id_tipoAnuncio']==1){ //perdi
												$sql='insert into similares (id_anuncio,id_anuncioSimilar,activo) values 
													("'.$idcli.'","'.$similares[$i]['id_anuncio'].'",1)'; 
													$myvar->execute($sql);
														
														$sql="select * from clientes where id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
														$ccom=$myvar->get_arreglo($sql);
														
														
														$sql="select * from anuncios where id_anuncio=".$similares[$i]['id_anuncio']." and activo=1 limit 1";
														$anc=$myvar->get_arreglo($sql);
										
														$sql="select * from clientes where id_cliente=".$anc[0][id_cliente]." limit 1";
														$ccom1=$myvar->get_arreglo($sql);
										
														//ME MANDA UN CORREO QUE EXISTE UNA COINCIDENCIA DE LO Q PERDI
														// lo estoy encontrando
														mail($ccom[0][email],"Existe una Coincidencia",htmlCoincidencia($idcli,$similares[$i]['id_anuncio']),$headers);
														// el lo tenia
														mail($ccom1[0][email],"Existe una Coincidencia",htmlCoincidencia($similares[$i]['id_anuncio'],$idcli),$headers);
														
							
							}else{//encontre o vi
							// se le manda el correo al cliente del anuncio similar
													$sql='insert into similares (id_anuncio,id_anuncioSimilar,activo) values 
													("'.$similares[$i]['id_anuncio'].'","'.$idcli.'",1)'; 
													$myvar->execute($sql);
													
														
														$sql="select * from clientes where id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
														$ccom1=$myvar->get_arreglo($sql);
														
														
														$sql="select * from anuncios where id_anuncio=".$similares[$i]['id_anuncio']." and activo=1 limit 1";
														$anc=$myvar->get_arreglo($sql);
										
														$sql="select * from clientes where id_cliente=".$anc[0][id_cliente]." limit 1";
														$ccom=$myvar->get_arreglo($sql);
										
														//ME MANDA UN CORREO QUE EXISTE UNA COINCIDENCIA DE LO Q PERDI
														// lo estoy encontrando
														mail($ccom[0][email],"Existe una Coincidencia",htmlCoincidencia($idcli,$similares[$i]['id_anuncio']),$headers);
														// el lo tenia
														mail($ccom1[0][email],"Existe una Coincidencia",htmlCoincidencia($similares[$i]['id_anuncio'],$idcli),$headers);
														
														
												}//else
													
										}//if
							   }//if
							
							
						}//for
			
					}
					
					
					// F I N   S I M I L A R E S  
				
				
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
												
												
												
												$nuevaa=$imagenes[$i][id_imagenAnuncio];
												$nueva=$imagenes[$i][id_imagenAnuncio];
												$nueva.=".".$extension[1];
												
												copy($_FILES['imagen'.$Evar.$Econt]['tmp_name'], "imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1]);
												$imagen_ruta="imagenes/imagenesAnuncio/".$nuevaa."-temp.".$extension[1];			
												$datosIma = getimagesize($imagen_ruta);
												$ancho=$datosIma[0];
												$alto=$datosIma[1];
												
												$anchodeseado=500;
												if($ancho<$anchodeseado){
													$anchodeseado=$datosIma[0];
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
						$datosIma = getimagesize($imagen_ruta);
						$ancho=$datosIma[0];
						$alto=$datosIma[1];
						
						$anchodeseado=500;
						if($ancho<$anchodeseado){
							$anchodeseado=$datosIma[0];
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
										
										$nombre=$_FILES['video'.$Evar.$Econt]['name'];
										$partes_img=explode(".",$nombre);
										$extension=end($partes_img);
										$validas = array ("jpg", "gif", "bmp", "png", "jpeg", "JPG", "GIF", "BMP", "PNG", "JPEG");
								
								
								
										if(!in_array ($extension, $validas)){
											
											$html2="<script type=\"text/javascript\">"
												."alert('Su archivo debe ser de formato jpg,gif,bmp,png');"
												."eval(location='admin-sucursal.php?id_sucursal=".$_POST['id_sucursal']."');"	
												. "</script>";//cerrar bien
								
												echo $html2;
												exit;
										}elseif (!($tamano_archivo < 2000000) ) {
											
												$html2="<script type=\"text/javascript\">"
												."alert('Su archivo debe ser menor de 2 Mb');"
												."eval(location='admin-sucursal.php?id_sucursal=".$_POST['id_sucursal']."');"
												. "</script>";//cerrar bien
											
												echo $html2;
												exit;
								
										} else{	
										
										
												
												$nombre_archivo = $_FILES['video'.$Evar.$Econt]['tmp_name'];
												$nombre_ext = $_FILES['video'.$Evar.$Econt]['name'];
												$extension=explode(".",$nombre_ext); 
												
												
												$nuevaa=$videos[$i][id_video];
												$nueva=$videos[$i][id_video];
												$nueva.=".".$extension[1];
												
												copy($_FILES['video'.$Evar.$Econt]['tmp_name'], "imagenes/videosAnuncio/".$nuevaa.".".$extension[1]);
												
												$sql='update  `videos` set dsc_video="'.$nueva.'" where id_video='.$videos[$i][id_video];
												$myvar->execute($sql);
										}//Else
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
				
				header("Location: ".$urlprincipal."mi-sitio/nuevo");
		
				exit();
		}//if band
}//if submit
$html = new html;

$myvar = new db_mysql;
$myvar->conectarBd();

$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);


	$sql="select * from anuncios where id_anuncio='".$_GET[id]."' and activo=1 and (id_statusAnuncio=1 or id_statusAnuncio=2)  and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
	$datos=$myvar->get_arreglo($sql);	
	
	$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$datos[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);
	$_GET[id]=$datos[0][id_anuncio];
	
	$sql="select id_anuncio from anuncios where id_anuncio!='".$_GET[id]."' and id_anuncio<'".$_GET[id]."' and activo=1  and id_statusAnuncio=1 and id_cliente=".$_SESSION[id_clienteLof4]."  order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	
	$sql="select id_anuncio from anuncios where  id_anuncio!='".$_GET[id]."'   and id_anuncio>'".$_GET[id]."' and activo=1 and id_statusAnuncio=1 and id_cliente=".$_SESSION[id_clienteLof4]."   order by id_anuncio asc  limit 1 "; 
	$motrosproducto=$myvar->get_arreglo($sql);





$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";

include "funciones-arriba.php";

?>
<script type="text/javascript">
       
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
function cambiarPagina(id){
	        var parametros = {
	                "paginas-desp-bus" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#consulta').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-modificar-anuncio.php',
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



<div class="container">
  <div id="consulta">
<? if(count($datos)>0){ ?>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	<input type="hidden" id="id_anuncio" name="id_anuncio" value="<? echo $_GET[id]?>" />
          
 
	<section>
   

	<!-- Contiene los iconos de status -->
    <div class="menuAux2">
  <? 
	 if($datos[0][id_tipoAnuncio]==1){// perdid
	 	$sql="select * from similares where  id_anuncio='".$_GET[id]."' and activo=1 "; 
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
 				 <img src="<? echo $urlprincipal?>images/status/naranja.png"  border="0">
            <?  for($a=0; $a<count($alguien); $a++){
				$sql="select * from anuncios where  id_anuncio='".$alguien[$a][id_anuncioSimilar]."' and activo=1 limit 1 "; 
				$anu=$myvar->get_arreglo($sql);
		
				?> 
                
                <a href="<? echo $urlprincipal?><? echo $alguien[$a][id_anuncioSimilar]?>anuncio"><? echo $anu[0][titulo];?></a> 
				<br>
				
				<?
				}
			
			 }else{//if
				 if($datos[0][id_statusAnuncio]==2){  ?>
				 <img src="<? echo $urlprincipal?>images/status/blanco.png"  border="0">
				<?  }else{
				 ?>
				   <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
				<?
				 }//else
             }
			 
	 }else{//encontrado
	 	$sql="select * from quienencuentra where  id_anuncio='".$_GET[id]."' and activo=0  "; // alguien ya lo encontro 
		//echo $sql;
		
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
				<img src="<? echo $urlprincipal?>images/status/rojo.png"  border="0">
			<? }else{//if
			 
				 if($datos[0][id_statusAnuncio]==2){ ?>
				 <img src="<? echo $urlprincipal?>images/status/blanco.png"  border="0">
				<?
				 }else{
				 ?>
				   <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
				<?
				 }//else
             }//else
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
    
    <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" /></span>
	</div>  
  
  	<!-- Columna que despliega fotos/videos y edición de fotos/videos -->
    <div class="contEdicion">
    <? 
 if(count($imagenes)>0){
 	for($i=0;$i<=count($imagenes)-1;$i++){
		$Econt=$imagenes[$i][id_imagenAnuncio];
		  $Evar='IMA'; // variable identificador 
		  
		 ?> 
    
    <!--div class="titAnEd">Título <input name="tituloImagen<? echo $Evar; ?><?php echo $Econt;?>" title="*"  type="text"   required value="<? echo $imagenes[$i][descripcion]?>" />
      </div-->
   
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
      <img src="imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" />
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
    
    
        <!--div class="navArrows">
            <div>
            <?php if(count($otrosproducto)>0){ ?>
            <a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $otrosproducto[0][id_anuncio]; ?>);"> <img src="images/FlechaV_Izq.png" class="img" border="0"></a>
        <?php } ?>
            </div>
            <div>
        <?php if(count($motrosproducto)>0){ ?>
        <a class="bt-3" href='javascript:void(0);'  onclick="cambiarPagina(<?php echo $motrosproducto[0][id_anuncio]; ?>);"><img src="images/FlechaV_Der.png" class="img" border="0"></a>
        <?php } ?>
            </div>
        </div-->
    
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
    <td align="center" valign="middle" class="TexVisor"><p>Nombre del LOF:</p>
            <input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus value="<? echo $datos[0][nombre]?>" />
 			</td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p>
            <?php $html->print_calendar( "fechaSuceso",$datos[0][fechaSuceso]);?>
 </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> 
    
     <? $sql="select * from paises where activo=1 ";
			$tipos=$myvar->get_arreglo($sql);
			?>
        <p>Pais:</p>
     <select name="id_pais" id="id_pais" onChange="cargaEstados();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_pais]?>" <? if($tipos[$i][id_pais]==$datos[0][id_pais]){?>selected="selected"
                  <? }?>><? echo utf8_encode($tipos[$i][dsc_pais])?></option>
                 <? }?>
               </select></p>     
			
			 <div id="datosEstado"> 
			<? if($datos[0][id_pais]==2){ // es mexico?>
			<? 
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);
	
			?>
 			<div class="unaopF">
            <div id="datosEstado"> 
             <p>Estado:</p>
			<select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
			<? for($i=0; $i<count($tipos); $i++){?>
			<option value="<? echo $tipos[$i][id_estado]?>" <? if($datos[0][id_estado]==$tipos[$i][id_estado]){?>selected="selected"<? }?> ><? echo utf8_encode($tipos[$i][nombre])?></option>
			<? }?>
			</select>
            </div>
            </div>
            
			<div class="unaopF">
            <p>Municipio:</p>
			<div id="datosEstado1">   <?
			 if($datos[0][id_estado]!=0)
			 $a=" and id_estado=".$datos[0][id_estado];
			 
			 $sql2=" select * from municipios where activo=1 ".$a; 
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" <? if($datos[0][id_municipio]==$tipos[$i][id_municipio]){?>selected="selected"<? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
			</div>
			</div>   
            <? }else{?>
            Estado<input name="estado" type="text" id="estado"  placeholder="Pon tu estado"
             autofocus value="<? echo $datos[0][estado]?>"/>
      		 Municipio<input name="municipio" type="text" id="municipio"  placeholder="Pon tu municipio" 
             autofocus value="<? echo $datos[0][municipio]?>"/>
      
			<? }?>
            
            </div></td>
  </tr>
  
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Lugar Suceso:</p>
            <input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus value="<? echo $datos[0][lugarSuceso]?>"/>
           
 </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Empresa LF Suceso</p>
            <? 
			$sql="select * from clientes where activo=1 and id_statusCliente=1 and id_tipoCliente=2 order by nombre ";
			$clientesEmpresa=$myvar->get_arreglo($sql);
	?> <p><select name="lugarSucesoLF" id="lugarSucesoLF">
             <option value="0" selected>Ninguno</option>
              <? for($i=0; $i<count($clientesEmpresa); $i++){?>
                 <option value="<? echo $clientesEmpresa[$i][id_cliente]?>"  <? if($clientesEmpresa[$i][id_cliente]==$datos[0][lugarSucesoLF]){?>selected="selected" <? }?>><? echo $clientesEmpresa[$i][nombre]?></option>
                 <? }?>
             </select></p>
           
 </td>
  </tr>
  
   
 
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Recompensa $:</p>
            <input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus  value="<? echo $datos[0][monto]?>"/>

 </td>
  </tr>
  
   <tr>
    <td align="center" valign="middle" class="TexVisor"><?php include("traductor.php"); ?>

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
 		$sql="select * from quienencuentra where  id_anuncio='".$_GET[id]."' and activo=0  "; // alguien ya lo encontro 
		$alguien=$myvar->get_arreglo($sql);
		
		
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
		
		echo date("Y-m-d", strtotime($alguien[$a][fecha]));
		
		echo "<br>";
		echo "<br>";
		
		?> 
      <a href="<? echo $alguien[$a][id_quienencuentra];?>_<? echo $_GET[id];?>"  class="btop cf aceptarEncontrado">Aceptar</a>
      <div id="dialog2<? echo $alguien[$a][id_quienencuentra];?>_<? echo $_GET[id];?>" class="dialogo"></div>
      
	<?
		}
	?>
    </div>
   <? }else{// if count anuncio 
   echo "NO HAY INFORMACION";
   }?>
 </div>
</div>
</body>
</html>
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
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Rechazar'>");
          });
			
        $('#dialog2'+href2).on("click", "#ejecutar_proceso2", function(event) {
    ejecutar2(href2);
});
        $('#dialog2'+href2).on("click", "#cerrar_dialogo2", function(event) {
    cerrar2(href2);
});
 });
		
		
        function cerrar2(href2) {
          var res = href2.split("_");
			
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?aceptar-peticion=2&id="+res[0]+"&id_anuncio="+res[1], 
            success: function(data) {
				  
				  location.href = "anuncios.php"
              //$('#dialog2'+href2).html(data);
            }
          });
        
		  
		  
		  $('#dialog2'+href2).fadeOut();
        }
 
        function ejecutar2(href2) {
			var res = href2.split("_");
			
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?aceptar-peticion=1&id="+res[0]+"&id_anuncio="+res[1], 
            success: function(data) {
				  
				  location.href = "anuncios.php"
              //$('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		


//////ELIMINAR SERVICIOS
		     var href3;
 
        $('.eliminarServicio').click(function(e) {
			
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
		
</script><? 
function htmlMail($anuncio){
		$myvar = new db_mysql;
		$myvar->conectarBd();

			$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1 and id_anuncio=".$anuncio." limit 1"; 
			$anuncio=$myvar->get_arreglo($sql2);


			$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
			$cliente=$myvar->get_arreglo($sql2);

	if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	$nombre=$cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	$nombre=$cliente[0][nick];
	}

	$html="
	<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<title>Lofers.club | Lo pierdes, lo buscas, lo encuentras</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/images/Logo3.png' alt='lofers.club' title='lofers.club' /></td>
      </tr>
      <tr>
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>Se te ha compartido un anuncio </span></td>
      </tr>
      
      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'></span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $anuncio[0][titulo] ."</strong></span>        
		
		</td>
      </tr>
	  
	   <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'></span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $nombre ."</strong></span>        
		
		</td>
      </tr>
	  
	  
</table></body>
</html>	
	";
	return $html;
 } 

function htmlCoincidencia($id,$idSimilar){
		$myvar = new db_mysql;
		$myvar->conectarBd();

			$sql2=" select * from anuncios where id_anuncio=".$id." limit 1"; 
			$anuncio=$myvar->get_arreglo($sql2);
$sql2=" select * from anuncios where id_anuncio=".$idSimilar." limit 1"; 
			$anuncio2=$myvar->get_arreglo($sql2);

	
	$html="
	<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
<title>Lofers.club | Lo pierdes, lo buscas, lo encuentras</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/images/Logo3.png' alt='lofers.club' title='lofers.club' /></td>
      </tr>
      <tr>
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>Coincidencia</span></td>
      </tr>
      
      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>De tu anuncio</span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $anuncio2[0][titulo] ."</strong></span>        
		
		</td>
      </tr>
	  
	   <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>Existe similitud con:</span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $anuncio[0][titulo] ."</strong></span>        
		
		</td>
      </tr>
	  
</table></body>
</html>	
	";
	return $html;
 } 




?><script src="<? echo $urlprincipal?>js/animaciones.js"></script>
