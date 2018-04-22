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
if ($_POST['status']) {

		$sql='insert into anuncios (id_cliente,id_categoriaAnuncio,id_statusAnuncio,id_tipoPago,id_tipoAnuncio,id_aquienComparte,id_municipio,id_estado,id_pais,fechaIngreso,ubicacion,monto,caracteristicas,titulo,nombre,lugarSuceso,fechaSuceso,activo) values ("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_categoriaAnuncio'].'",1,"'.$_POST['id_tipoPago'].'","'.$_POST['id_tipoAnuncio'].'","'.$_POST['id_aquienComparte'].'","'.$_POST['id_municipio'].'","'.$_POST['id_estado'].'",2,"'.date("Y-m-d H:i:s").'","'.$_POST['ubicacion'].'","'.$_POST['monto'].'","'.$_POST['caracteristicas'].'","'.$_POST['titulo'].'","'.$_POST['nombre'].'","'.$_POST['lugarSuceso'].'","'.$_POST['fechaSuceso'].'",1)';
	$myvar->execute($sql);

		$sql="select * from anuncios order by id_anuncio desc limit 1";
				$cliente=$myvar->get_arreglo($sql);
				$idcli=$cliente[0]['id_anuncio'];

			if($_POST['id_aquienComparte']==3){// comparte a un amigo en especifico

				$sql='insert into compartidoA (id_anuncio,id_cliente) values ("'.$idcli.'","'.$_POST['amigoCompartir'].'")';
				$myvar->execute($sql);

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

				echo $sql;
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

				copy($_FILES['video'.$m]['tmp_name'], "imagenes/videosAnuncio/".$nuevaa.$extension[1]);

				$sql='INSERT INTO `videos` (id_anuncio,dsc_video,descripcion,activo) VALUES ( "'.$idcli.'", "'.$nueva.'", "'.$_POST['tituloVideo'.$m].'", 1)';

				//∫∫echo $sql;
				//echo "<br>";
					$myvar->execute($sql);
			}
		$m++;
		}//while

		header("Location: ".$urlprincipal."nuevo/iniciando");
		exit();
}//if submit
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

<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>
<center><br>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >




            <p>Categoria:</p>
             <p>
               <?
			 $sql2=" select * from categoriasAnuncio where activo=1";
			 $tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_categoriaAnuncio" id="id_categoriaAnuncio">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_categoriaAnuncio]?>" ><? echo $tipos[$i][dsc_categoriaAnuncio]?></option>
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
                 <option value="<? echo $tipos[$i][id_tipoAnuncio]?>" ><? echo $tipos[$i][dsc_tipoAnuncio]?></option>
                 <? }?>
               </select>
             </p>


            <p>Titulo:</p>
             <p><input name="titulo" type="text" id="titulo"  placeholder="Pon titulo" autofocus /></p>
 			<p>Nombre:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon nombre" autofocus /></p>
 			<p>Caracteristicas:</p>
             <p><input name="caracteristicas" type="text" id="caracteristicas"  placeholder="Pon caracteristicas" autofocus /></p>
 			<p>Fecha Suceso:</p>
             <p><?php $html->print_calendar( "fechaSuceso",date("Y-m-d"));?></p>


            <?
			$sql="select * from estados where id_pais='2' order by nombre ";
			$tipos=$myvar->get_arreglo($sql);

			?>
 			<div id="datosEstado">
             <p>Estado:</p>
             <p>
                 <select name="id_estado" id="id_estado" onChange="cargaMunicipios();">
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_estado]?>" ><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
             </p>
			<p>Municipio:</p>
             <p>
             <div id="datosEstado1">   <?
			 $sql2=" select * from municipios where activo=1 and id_estado=1";
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_municipio" id="id_municipio" >
                 <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_municipio]?>" ><? echo $tipos[$i][nombre]?></option>
                 <? }?>
               </select>
               </div>
             </p>
             </div>

              <p>Lugar Suceso:</p>
             <p><input name="lugarSuceso" type="text" id="lugarSuceso"  placeholder="Pon lugar" autofocus /></p>
              <p>Ubicacion:</p>
             <p><input name="ubicacion" type="text" id="ubicacion"  placeholder="Pon ubicacion" autofocus /></p>

			<p>Tipo Pago:</p>
             <p>
               <?
			 $sql2=" select * from tiposPago where activo=1";
				$tipos=$myvar->get_arreglo($sql2);?>
               <select name="id_tipoPago" id="id_tipoPago">
                  <option value="0" >Ninguna</option>
                <? for($i=0; $i<count($tipos); $i++){?>
                 <option value="<? echo $tipos[$i][id_tipoPago]?>" ><? echo $tipos[$i][dsc_tipoPago]?></option>
                 <? }?>
               </select>
             </p>

              <p>Monto $:</p>
             <p><input name="monto" type="text" id="monto"  placeholder="Pon monto" autofocus /></p>


                  <p>Imagenes :</p>
             <p><input type="checkbox" class="textbox"  name="_nuevaimagen1" id="_nuevaimagen1" onclick="if(document.getElementById('formulario')._nuevaimagen1.checked){
			javascript:llamarasincrono('imagen.php?cont=1','divImagen');
			}else {removeChildOfDiv('divImagen');}">

            <div id="divImagen" ></div>



            </p>

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
                 <option value="<? echo $tipos[$i][id_aquienComparte]?>" ><? echo $tipos[$i][dsc_aquienComparte]?></option>
                 <? }?>
               </select>
               <div id="divAmigos"></div>
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
