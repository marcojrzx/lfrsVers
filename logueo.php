<? 
//error_reporting(E_ALL);
session_start();
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");
$urlprincipal="http://lofers.club/"; 
$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select * from categoriasAnuncio where activo=1"; 
		$categorias=$myvar->get_arreglo($sql2);
		
if ($_POST['status']) {
	
	$sql2=" select * from clientes where email='".$_POST[email]."' limit 1"; 
		$sihay=$myvar->get_arreglo($sql2);

	if(count($sihay)>0){
		echo "<script type='application/javascript'>alert('ESTE CORREO YA ESTA EN USO');
		window.history.back();</script>";
		
	}else{
		if($_POST[id_pais]!=2){
			$sql="insert into clientes (nombre,apellidos,email,id_statusCliente,password,
		fechaIngreso,id_pais,id_tipoCliente,estado,municipio) values 
		('".$_POST[nombre]."',
	'".$_POST[apellidos]."','".$_POST[email]."',1,'".sha1($_POST[password])."','".date("Y-m-d H:i:s")."',
	'".$_POST[id_pais]."','".$_POST[id_tipoCliente]."','".$_POST[estado]."','".$_POST[municipio]."')";
			}else{ // es mexico
			$sql="insert into clientes (nombre,apellidos,email,id_statusCliente,password,
		fechaIngreso,id_pais,id_estado,id_municipio,id_tipoCliente) values 
		('".$_POST[nombre]."',
	'".$_POST[apellidos]."','".$_POST[email]."',1,'".sha1($_POST[password])."','".date("Y-m-d H:i:s")."',
	'".$_POST[id_pais]."','".$_POST[id_estado]."','".$_POST[id_municipio]."','".$_POST[id_tipoCliente]."')";
			}
		
		$myvar->execute($sql);
		
		
		$sql2=" select * from clientes where activo=1 and id_statusCliente=1 order by id_cliente desc limit 1"; 
		$c=$myvar->get_arreglo($sql2);
		

		$_SESSION[authLof4] = session_id();
			$_SESSION[ipLof4] = $_SERVER['REMOTE_ADDR'];
			$_SESSION[hostLof4] = $_SERVER['REMOTE_HOST'];
			$_SESSION[userLof4] = $_POST[email];
			$_SESSION[passLof4] = sha1($_POST[password]);
			$_SESSION[time] = time();
			$_SESSION['id_tipoClienteLof4'] = 1;
			$_SESSION['id_clienteLof4'] = $c[0][id_cliente];
			
		
		$headers ="MIME-Version: 1.0\r\n"; 
	$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
	$headers .="From: admin@lofers.club\r\n" ;
	$res=mail($_POST[email],"Bienvenido",html($_SESSION[id_clienteLof4]),$headers);
	
	
		
		header('Location: '.$urlprincipal.'perfil');
		exit;
	}
		
	
}//if submit
$html = new html;

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";

include "funciones-arriba.php";

?>


<script language="javascript">
function procesaForm(idanun){
	
	if(document.getElementById('user').value=='' || document.getElementById('pass').value==''){
		var parametros = {
                "inputs" : "no",
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'get',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#respuesta").html(response);
                }
        });
		
	}else{
		
		var parametros = {
                "user" : document.getElementById('user').value,
                "pass" : document.getElementById('pass').value
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'post',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
					//alert(idanun);
                      if(response=='valido'){
							if(idanun!=0){
							eval("parent.location='visor.php?id="+idanun+"'");
							}else{
							eval("parent.location='anuncios.php'");
							}
						}else{
							$("#respuesta").html(response);
						}
					  
					   
                }
        });
	
		
	}//else
}//funcion

</script>




<div class="usuarioR">
	<h1>Ya eres usuario Lofers</h1>
	<h3>Inicia sesión</h3>
	
    <div class="formas">
    	<div class="unaopF">
        <p><label for="nombre">Email:</label></p>
        <input name="user" type="text" id="user"  placeholder="Pon tu email" autofocus  value=""/>
    	</div>
        <div class="unaopF">
        <p><label for="nombre">Password:</label></p>
        <input name="pass" type="password" id="pass"  placeholder="Pon tu password" autofocus  onkeyup="if(event.keyCode==13){ 
        procesaForm(<? if($_GET[id]){
			echo $_GET[id];
		}else{
			echo 0;
			}?>); }" />
    	</div>
        <a class="btop gr" href="#" onclick="procesaForm(
		<? if($_GET[id]){
			echo $_GET[id];
		}else{
			echo 0;
			}?>);" >Entrar</a><div id="respuesta"></div>
            
            <a href="<? echo $urlprincipal?>registro" class="btop cf">Registrarme</a>
    </div>
    
</div>



<? include "funciones-abajo.php";


function html($id){
		$myvar = new db_mysql;
		$myvar->conectarBd();

			$sql2=" select * from clientes where activo=1 and id_cliente=".$id." limit 1"; 
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
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>Bienvenido a Lofers</span></td>
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



?>
