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

$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
$cliente=$myvar->get_arreglo($sql2);

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



				$sql='insert into anuncios (id_cliente,id_categoriaAnuncio,id_statusAnuncio,id_tipoPago,id_tipoAnuncio,
				id_aquienComparte,id_municipio,id_estado,id_pais,fechaIngreso,monto,caracteristicas,titulo,nombre,
				lugarSuceso,fechaSuceso,activo,id_tipoCliente,detalles,lugarSucesoLF,pais,estado,municipio) values
				("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_categoriaAnuncio'].'",1,
				"'.$_POST['id_tipoPago'].'","'.$_POST['id_tipoAnuncio'].'","'.$_POST['id_aquienComparte'].'",
				"'.$_POST['id_municipio'].'","'.$_POST['id_estado'].'","'.$_POST['id_pais'].'","'.date("Y-m-d H:i:s").'",
				"'.$_POST['monto'].'","'.$_POST['caracteristicas'].'","'.$_POST['titulo'].'","'.$_POST['nombre'].'",
				"'.$_POST['lugarSuceso'].'","'.$_POST['fechaSuceso'].'",1,"'.$_POST['id_tipoCliente'].'",
				"'.$_POST['detalles'].'","'.$_POST['lugarSucesoLF'].'","'.$_POST['pais'].'","'.$_POST['estado'].'","'.$_POST['municipio'].'")';
				$myvar->execute($sql);

				$sql="select * from anuncios order by id_anuncio desc limit 1";
						$cliente=$myvar->get_arreglo($sql);
						$idcli=$cliente[0]['id_anuncio'];




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

						//echo $sql;
						//echo "<br>";
							$myvar->execute($sql);
					}
				$m++;
				}//while


				////INSERT VIDEOS
				$m=1;

				while($_POST['_nuevovideo'.$m]=='on'){

					if($_FILES['video'.$m]['tmp_name']!=""){
						$nombre_archivo = $_FILES['video'.$m]['tmp_name'];
						$nombre_ext = $_FILES['video'.$m]['name'];
						$extension=explode(".",$nombre_ext);


						$sql2=" select * from videos  order by id_imagenAnuncio desc limit 1";
						$cliente=$myvar->get_arreglo($sql2);

						$nuevaa=$cliente[0][id_video]+1;
						$nueva=$cliente[0][id_video]+1;
						$nueva.=".".$extension[1];

						copy($_FILES['video'.$m]['tmp_name'], "imagenes/videosAnuncio/".$nuevaa.".".$extension[1]);

						$sql='INSERT INTO `videos` (id_anuncio,dsc_video,descripcion,activo) VALUES ( "'.$idcli.'", "'.$nueva.'", "'.$_POST['tituloVideo'.$m].'", 1)';

						//∫∫echo $sql;
						//echo "<br>";
							$myvar->execute($sql);
					}
				$m++;
				}//while


				header("Location: ".$urlprincipal."mi-sitio/nuevo");
				exit();

		}//else comparacion de peso

}//if submit

include "funciones-arriba.php";

$html = new html;

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
	if(opcion==6){

		$.ajax({
						 type: "POST",
						url:"<? echo $urlprincipal?>combo-grupos.php",
	        	 success: function(data){
								 $("#divAmigos").html(data);

						 }
     });

	}


}

</script>


<style type="text/css">
    @media only screen and (max-width: 480px){
        #templateColumns{
            width:100% !important;
        }

        .templateColumnContainer{
            display:block !important;
            width:100% !important;
        }

        .columnImage{
            height:auto !important;
            max-width:480px !important;
            width:100% !important;
        }
    }
</style>
</head>

<body>





<div class="container">
	<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
	<input type="hidden" id="id_anuncio" name="id_anuncio" value="<? echo $_GET[id]?>" />


	<section>
	  </nav>



	<?
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);

	?>
<div class="colIzqierda">

	<div class="cImDe">
	  	<div class="contImP">
	    <span id="resultado"><!--img src="imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" /--></span>
	    </div>

		<div class="contEdicion">
    <div class="agregar">
      Agregar imágenes:
     <input type="checkbox" class="textbox"  name="_nuevaimagen1" id="_nuevaimagen1" onClick="if(document.getElementById('formulario')._nuevaimagen1.checked){
			javascript:llamarasincrono('imagen.php?cont=1&total=1','divImagen');
			}else {removeChildOfDiv('divImagen');}">
      </div>
    <div id="divImagen"></div>

    <div class="agregar">
      Agregar un videos:
      <input type="checkbox" class="textbox"  name="_nuevovideo1" id="_nuevovideo1" onClick="if(document.getElementById('formulario')._nuevovideo1.checked){
			javascript:llamarasincrono('video.php?cont=1','divVideo');
			}else {removeChildOfDiv('divVideo');}">
      </div>
    <div id="divVideo" ></div>

  </div>
	</div>

    <div class="caracteristicas">
		<p>Caracteristicas:</p>
		<p>
        <input name="caracteristicas" type="text" id="caracteristicas" style="width: 100%;" placeholder="Pon caracteristicas" autofocus  /></p>

       <p>Detalles:</p>
		<p>
        <input name="detalles" type="text" id="detalles" style="width: 100%;" placeholder="Pon detalles" autofocus  /></p>

		<div class="compartir">Compartir con:

               <?
			 $sql2=" select * from aquienComparte where activo=1";
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_aquienComparte" id="id_aquienComparte"  onChange="cargaAmigos();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_aquienComparte]?>"  ><? echo $tipos[$i][dsc_aquienComparte]?></option>
                 <? }?>
               </select>
	</div>

    <div id="divAmigos">
             </div>




</div>

</div>
	</section>
	<aside>

<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Categoria:</p>
      <p>
        <?
			 $sql2=" select * from categoriasAnuncio where activo=1";
			 $tipos=$myvar->get_arreglo($sql2);?>
        <select name="id_categoriaAnuncio" id="id_categoriaAnuncio">
          <? for($i=0; $i<count($tipos); $i++){?>
          <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" ><? echo utf8_encode($tipos[$i][dsc_categoriaAnuncio])?></option>
          <? }?>
          </select>
        </p></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo de Anuncio:</p>
             <p>
               <?
			 $sql2=" select * from tiposAnuncio where activo=1";
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoAnuncio" id="id_tipoAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" ><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </p></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Titulo:</p>
             <p><input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus /></p>
 			</td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Nombre del LOF:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus  /></p>
 			</td>
  </tr>

  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p>
             <p><?php $html->print_calendar( "fechaSuceso",date("Y-m-d"));?></p>
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
                 <option value="<? echo $tipos[$i][id_pais]?>" <? if($tipos[$i][id_pais]==$cliente[0][id_pais]){?>selected="selected"
                  <? }?>><? echo utf8_encode($tipos[$i][dsc_pais])?></option>
                 <? }?>
               </select></p>

			 <div id="datosEstado">
			<? if($cliente[0][id_pais]==2){ // es mexico?>
			<?
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);

			?>
 			<div class="unaopF">
            <div id="datosEstado">
             <p>Estado:</p>
			<select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
			<? for($i=0; $i<count($tipos); $i++){?>
			<option value="<? echo $tipos[$i][id_estado]?>" <? if($cliente[0][id_estado]==$tipos[$i][id_estado]){?>selected="selected"<? }?> ><? echo utf8_encode($tipos[$i][nombre])?></option>
			<? }?>
			</select>
            </div>
            </div>

			<div class="unaopF">
            <p>Municipio:</p>
			<div id="datosEstado1">   <?
			 if($cliente[0][id_estado]!=0)
			 $a=" and id_estado=".$cliente[0][id_estado];

			 $sql2=" select * from municipios where activo=1 ".$a;
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" <? if($cliente[0][id_municipio]==$tipos[$i][id_municipio]){?>selected="selected"<? }?>><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
			</div>
			</div>
            <? }else{?>
            Estado<input name="estado" type="text" id="estado"  placeholder="Pon tu estado"
             autofocus value="<? echo $cliente[0][estado]?>"/>
      		 Municipio<input name="municipio" type="text" id="municipio"  placeholder="Pon tu municipio"
             autofocus value="<? echo $cliente[0][municipio]?>"/>

			<? }?>

            </div>
 			</td>
  </tr>

   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Lugar Suceso:</p>
             <p><input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus /></p>

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
                 <option value="<? echo $clientesEmpresa[$i][id_cliente]?>" ><? echo $clientesEmpresa[$i][nombre]?></option>
                 <? }?>
             </select></p>

 </td>
  </tr>

   <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Recompensa $:</p>
             <p><input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus /></p>

 </td>



  </tr>

<tr><td><input type="hidden" name="status"  id="status"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Hecho/Publicar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
</td></tr>


</table>
</aside>

 </form>
</div>
</body>
</html>
<?
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
<title>Untitled Document</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/images/logo3.png' alt='lofers.club' title='lofers.club' /></td>
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
<title>Untitled Document</title>
</head>
<body><table width='100%' border='0' cellpadding='8' cellspacing='0'>
      <tr>
        <td  ><img src='http://www.lofers.club/images/logo3.png' alt='lofers.club' title='lofers.club' /></td>
      </tr>
      <tr>
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>Coincidencia</span></td>
      </tr>

      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>De tu anuncio</span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $anuncio[0][titulo] ."</strong></span>

		</td>
      </tr>

	   <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>Existe similitud con:</span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $anuncio2[0][titulo] ."</strong></span>

		</td>
      </tr>

</table></body>
</html>
	";
	return $html;
 }



?><script src="<? echo $urlprincipal?>js/animaciones.js"></script>
