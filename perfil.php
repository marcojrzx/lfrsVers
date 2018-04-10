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


$sql2=" select * from categoriasAnuncio where activo=1"; 
		$categorias=$myvar->get_arreglo($sql2);
		
if ($_POST['status']) {
	
	
	$sql="update clientes set nombre='".$_POST[nombre]. "',apellidos='".$_POST[apellidos]. "', telefono='".$_POST[telefono]. "', 
	ocultarTel='".$_POST[ocultarTel]. "',ocultarNom='".$_POST[ocultarNom]. "',sexo='".$_POST[sexo]. "',fechaNac='".$_POST[fechaNacimiento]. "'
	,nick='".$_POST[nick]. "',slogan='".$_POST[slogan]. "',url='".$_POST[url]. "',
	id_ocupacion='".$_POST[id_ocupacion]. "', id_tipoCliente='".$_POST[id_tipoCliente]. "' where id_cliente=".$_SESSION[id_clienteLof4];
	
	$myvar->execute($sql);
	
	if($_POST[id_pais]!=2){//no es mexico
			$sql="update clientes set id_pais=".$_POST[id_pais].", estado='".$_POST[estado]. "', 
			municipio='".$_POST[municipio]. "'   where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql);
	}else{
			$sql="update clientes set id_pais=2, id_estado='".$_POST[id_estado]. "', 
			id_municipio='".$_POST[id_municipio]. "'   where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql);
	}

		
		if($_POST[password]!=''){// cambiara password
			$sql9="update clientes set password='".sha1($_POST[password])."' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}
		
		if($_POST[eliminarFoto]==1){ // no quiere foto
			$sql9="update clientes set foto='' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}
		
		if($_POST[eliminarFotoHeader]==1){ // no quiere foto
			$sql9="update clientes set fotoHeader='' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}
		
		
			
			//CATEGORIAS DE INTERS
			$sql9="DELETE FROM clientes_has_categoriasAnuncio where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
			
			
			for($i=0; $i<count($categorias); $i++){
						 
					if($_POST[id_categoriaAnuncio.$categorias[$i][id_categoriaAnuncio]]==1){
						$sql9="insert into clientes_has_categoriasAnuncio (id_cliente,id_categoriaAnuncio) values (".$_SESSION[id_clienteLof4].",".$categorias[$i][id_categoriaAnuncio].") ";
						$myvar->execute($sql9);
			
					}//if
			}//for
					
						 
                	
		 ///////////////IMAGEN
		 
		 $idcli=$_SESSION[id_clienteLof4];
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
	
		header("Location: ".$urlprincipal."mi-sitio/nuevo");

		exit();
}//if submit

$html = new html;

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include "funciones-arriba.php";

$sql2=" select * from clientes where activo=1 and id_statusCliente=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);

$sql=" select * from clientes_has_clientes where id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=3 "; 
$solicitudes=$myvar->get_arreglo($sql);


?>
<script src="js/jquery.validate.js" type="text/javascript"></script>
<script type="text/javascript">
$().ready(function(){

    $("#formularioPerfil").validate({
        rules: {
            nombre: { required: true, minlength: 2},
            apellidos: { required: true, minlength: 2},
            email: { required:true, email: true},
			telefono: { required:true, minlength: 2, maxlength: 15}
			//,
			///nick: { required: true, minlength: 2}
            
        },
        messages: {
            nombre: "Debe introducir su nombre.",
            apellidos: "Debe introducir su apellido.",
            email : "Debe introducir un email válido.",
            telefono : "El número de teléfono introducido no es correcto."//,
            //nick : "Debe introducir Nick"
        },
       
	   submitHandler: function() {
           var datosSend = $("#formularioPerfil").serialize();
					if ($("#fechaNacimiento").val()) {
						$.ajax({
								type: 'POST',
								url: ("validarFecha.php"),
								dataType : 'html',
								async: true,
								data: {
									fechaNacimiento: $("#fechaNacimiento").val()
								},
							success: function (data) {
								if(data == "1"){ 
									formularioPerfil.submit();
								}else{
									document.getElementById("errorFecha").innerHTML = "Debe ser mayor de 13 años";
								}
							},
							error: function (XMLHttpRequest, textStatus, errorThrown) {
								console.log("Error");
							}
						});
					} else {
						document.getElementById("errorFecha").innerHTML = "Marque codigo de seguridad";
						console.log("Falta informacion captcha!");
					}
					
					return false;

		   
		   // formularioPerfil.submit();
        }
    });
});

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
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<div class="formas">

	 	<div class="menuAux3">
          <a href="<? echo $urlprincipal?>amigos" class="btop cf"> Mis amigos / Lofriends</a>
          <a href="<? echo $urlprincipal?>agregar-amigos" class="btop cf">Buscar amigos</a>
          <a href="<? echo $urlprincipal?>solicitudes-pendientes" class="btop cf">Solicitudes pendientes 
          <div class="notF"><? echo count($solicitudes); ?></div></a>
        </div>
   
   
<div class="leyendasA">
	<h2>* Campos obligatorios</h2>
</div>     
 <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formularioPerfil" id="formularioPerfil" >


	<div class="unaColForma">
        
        <div class="unaopF">
        <p>Email (Este será tu nombre de acceso) *:</p>
        <input name="email" type="email" id="email"  placeholder="Pon tu Email" autofocus  value="<? echo $cliente[0][email]?>" disabled="disabled"/>
       ESTOS DATOS SERÁN EXHIBIDOS PARA QUE OTROS USUARIOS TE CONTACTE
        </div>
        
        <div class="unaopF">
        <p>Editar Password:</p>
		<input name="password" type="password" id="password"  placeholder="Tu nuevo password" autofocus  /> Dejar en blanco si no desea modificarlo
 		</div>
        
        </div>
        <div class="unaColForma">
                
        <div class="unaopF">
		<p>Nombre*:</p>
		<input name="nombre" type="text" id="nombre" maxlength="12"  placeholder="Pon tu nombre" autofocus  value="<? echo $cliente[0][nombre]?>"/>
		</div>
 
 		<div class="unaopF">
        <p>Apellidos*:</p>
        <input name="apellidos" type="text" id="apellidos" maxlength="12" placeholder="Pon tus apellidos" autofocus  value="<? echo $cliente[0][apellidos]?>"/>
        </div>
 
 		<div class="unaopF">
        <p>Nick:</p>
        <input name="nick" type="text" id="nick"  placeholder="Pon tu nick" autofocus  value="<? echo $cliente[0][nick]?>"/>
        </div>
        
        <div class="unaopF">
        <p>Ocultar mi nombre y mostrar solo mi Nick:</p>
		<input  type="radio"  id="ocultarNom" name="ocultarNom" value="0" <? if($cliente[0][ocultarNom]==0){?>checked="checked"<? }?>/> No
        <input  type="radio"  id="ocultarNom" name="ocultarNom" value="1" <? if($cliente[0][ocultarNom]==1){?>checked="checked"<? }?>/> Si
        </div>
        
        <div class="unaopF">
        <p>Teléfono:</p>
		<input name="telefono" type="text" id="telefono"  placeholder="Pon tu telefono" autofocus value="<? echo $cliente[0][telefono]?>"/>
        </div>
 
 		<div class="unaopF">
        <p>Ocultar mi teléfono:</p>
		<input  type="radio"  id="ocultarTel" name="ocultarTel" value="1" <? if($cliente[0][ocultarTel]==1){?>checked="checked"<? }?>/> Si
		<input  type="radio"  id="ocultarTel" name="ocultarTel" value="0" <? if($cliente[0][ocultarTel]==0){?>checked="checked"<? }?>/> No
		</div>
         
 		
	
   
    	<div class="unaopF">
        <p>Fecha Nacimiento:</p>
        <?php $html->print_calendar( "fechaNacimiento", $cliente[0][fechaNac] );?><div id="errorFecha"></div>
 		</div>
        
 
 		<div class="unaopF">
        <p>Sexo:</p>
        <input  type="radio"  id="sexo" name="sexo" value="1" <? if($cliente[0][sexo]==1){?>checked="checked"<? }?>/> Mujer
		<input  type="radio"  id="sexo" name="sexo" value="0" <? if($cliente[0][sexo]==0){?>checked="checked"<? }?>/> Hombre
 		</div>
 
 		
        
 		
 
		
             
	</div>
	
    
    <a name="fotoPerfil"></a>
    <div class="unaColForma">
    
    	<div class="unaopF">
        <p>Foto de Perfil:</p>
        <input name="foto" type="file" id="foto" />
		<br />
		<? if($cliente[0][foto]!=''){?>
        <img src="<? echo $urlprincipal?>imagenes/clientes/<? echo $cliente[0][foto]?>" />
        <input type="checkbox" name="eliminarFoto" id="eliminarFoto" value="1" />
        Eliminar mi foto de perfil<? }//if ?>
        </div>
 
 <div class="unaopF">
        <p>Foto de cabecera:</p>
        <input name="fotoHeader" type="file" id="fotoHeader" />
		<br />
		<? if($cliente[0][fotoHeader]!=''){?>
        <img src="<? echo $urlprincipal?>imagenes/clientesHeader/<? echo $cliente[0][fotoHeader]?>" />
        <input type="checkbox" name="eliminarFotoHeader" id="eliminarFotoHeader" value="1" />
        Eliminar mi foto de cabecera<? }//if ?>
        
        </div>
 <div class="unaopF">
        <p>Slogan (Acompañará tu foto de cabecera):</p>
        <input name="slogan" type="text" id="slogan"  placeholder="Pon tu slogan" autofocus  value="<? echo $cliente[0][slogan]?>"/>
        </div>
  <div class="unaopF">
        <p>URL (Ver detalles en Ayuda):</p>
       <input name="url" type="text" id="url" width="50px"  placeholder="Pon tu url" autofocus  value="<? echo $cliente[0][url]?>"/>
        ejemplo como quedara: <br />
        http://lofers.club/<? echo $_SESSION[id_clienteLof4]?>/muro-de-anuncios/[tuURL]
        </div>
 
		<div class="unaopF">
        <p>Tipo de cliente:</p>
        <?
			$sql2=" select * from tiposCliente where activo=1"; 
			$tipos=$myvar->get_arreglo($sql2);?>
				<select name="id_tipoCliente" id="id_tipoCliente">
			<? for($i=0; $i<count($tipos); $i++){?>
				<option value="<? echo $tipos[$i][id_tipoCliente]?>" <? if($tipos[$i][id_tipoCliente]==$cliente[0][id_tipoCliente]){?>selected="selected"<? }?>><? echo $tipos[$i][dsc_tipoCliente]?></option>
			<? }?>
				</select>
		</div>
 
 		<div class="unaopF">
        <p>Ocupación:</p>
		<?
			$sql2=" select * from ocupaciones where activo=1"; 
			$tipos=$myvar->get_arreglo($sql2);?>
			<select name="id_ocupacion" id="id_ocupacion">
				<? for($i=0; $i<count($tipos); $i++){?>
				<option value="<? echo $tipos[$i][id_ocupacion]?>" <? if($tipos[$i][id_ocupacion]==$cliente[0][id_ocupacion]){?>selected="selected"<? }?>><? echo $tipos[$i][dsc_ocupacion]?></option>
				<? }?>
			</select>
		</div>
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
	
    </div>                
	
    <div class="unaColForma">
    
    		<div class="unaopF" style="width:100%;">
            <p>Mis categorías de interés:</p>
            <?
			for($i=0; $i<count($categorias); $i++){
				$sql2=" select * from clientes_has_categoriasAnuncio where id_cliente=".$_SESSION[id_clienteLof4]." and id_categoriaAnuncio=".$categorias[$i][id_categoriaAnuncio]." limit 1"; 
				$a=$myvar->get_arreglo($sql2);
				?>
               	<input type="checkbox" value="1" name="id_categoriaAnuncio<? echo $categorias[$i][id_categoriaAnuncio]?>" id="id_categoriaAnuncio<? echo $categorias[$i][id_categoriaAnuncio]?>" 
				<? if(count($a)>0){?> checked="checked" <? }?>
                /><? echo utf8_encode($categorias[$i][dsc_categoriaAnuncio])?>
                <? }?>
			</div>
 
 	</div>
                    
  <input type="hidden" name="status"  id="status"/>
 <p id="bot">

 <input name="guardar" type="submit" id="guardar" value="Guardar cambios" class="boton"  
 onclick="document.getElementById('status').value = '1';"/></p>
</form>

 <a href="<? echo $urlprincipal?>cerrar-cuenta" class="btop rd">Borrar Cuenta</a>  
 
</div>

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
