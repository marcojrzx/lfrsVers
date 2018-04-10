 <?php
 session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include("sad/funciones-bd.php");
$myvar = new db_mysql;
$myvar->conectarBd();

if($_GET['aceptar-peticion']){
	$sql="update quienencuentra set activo=".$_GET['aceptar-peticion']."  where id_quienencuentra=".$_GET['id']." limit 1";
	$myvar->execute($sql);
	
	if($_GET['aceptar-peticion']==1){
	$sql="update anuncios set activo=1 , id_statusAnuncio=2  where id_anuncio=".$_GET['id_anuncio']." limit 1"; // se vuelve inactivo
	$myvar->execute($sql);
	}elseif($_GET['aceptar-peticion']==2){// se rechazo
	}
	

	echo "ASIGNACION CON EXITO";
	exit();
}


if($_GET['reportar-anuncio']){
	$sql="insert into reportesAnuncio(id_cliente,id_anuncio,fecha,activo)
	values(".$_SESSION[id_clienteLof4].",".$_GET['id'].",'".date("Y-m-d H:i:s")."',1)";
	$myvar->execute($sql);
	echo "REPORTE ENVIADO";
	exit();
}


if($_GET['reportar-cliente']){
	$sql="insert into reportesCliente(id_cliente,id_clienteReportado,fecha,activo)
	values(".$_SESSION[id_clienteLof4].",".$_GET['id'].",'".date("Y-m-d H:i:s")."',1)";
	$myvar->execute($sql);
	echo "REPORTE ENVIADO";
	exit();
}


if($_GET['borrar-anuncio']){
	//$sql="update anuncios set activo=0 ,id_statusAnuncio=2 where id_anuncio=".$_GET['id']." limit 1";
	//$myvar->execute($sql);
	
	$anuncios[$i][id_anuncio]=$_GET['id'];
			$sql='delete form imagenesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form videos where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form comentariosAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form compartidoA where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form quienencuentra where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form reportesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form similares where id_anuncio='.$anuncios[$i][id_anuncio].' or  id_anuncioSimilar='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	$sql='delete form anuncios where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);

	
	
	exit();
}

if($_GET['borrar-comentario']){
	$sql="update comentariosAnuncio set activo=0  where id_comentarioAnuncio=".$_GET['id']." limit 1";
	$myvar->execute($sql);
	
	echo "ELIMINADO";
	exit();
}

if($_GET['borrar-solicitud']){
	$sql="delete from clientes_has_clientes where id_clienteCliente=".$_GET['id']." limit 1";
	$myvar->execute($sql);
	
	echo "ELIMINADO";
	exit();
}

if($_GET['aceptar-solicitud']){
	$sql='update clientes_has_clientes set id_statusSolicitud='.$_GET['aceptar-solicitud'].',fechaAceptado="'.date("Y-m-d H:i:s").'" where id_clienteCliente='.$_GET['id'].'  limit 1';
	$myvar->execute($sql);
	
	if($_GET['aceptar-solicitud']==1){
	echo "SOLICITUD ACEPTADA";
	}elseif($_GET['aceptar-solicitud']==2){
	echo "SOLICITUD DENEGADA";
	}
	
	exit();
}

if($_GET['mandar-solicitud']){
	$sql='INSERT INTO `clientes_has_clientes` (id_cliente,id_cliente1,id_statusSolicitud,fechaSolicitud) VALUES 
	( "'.$_SESSION[id_clienteLof4].'", "'.$_GET['id'].'", 3,"'.date("Y-m-d H:i:s").'")';
	$myvar->execute($sql);
	

	$sql2=" select * from clientes where activo=1 and id_cliente=".$_GET['id']." limit 1"; 
	$email=$myvar->get_arreglo($sql2);

	// MANDAR CORREO
	
	$headers ="MIME-Version: 1.0\r\n"; 
	$headers .="Content-type: text/html; charset=iso-8859-1\r\n"; 
	$headers .="From: Administracion Lofers.club\r\n" ;
	$res=mail($email[0][email],"Solicitud de Amistad Lofers",html($_SESSION[id_clienteLof4]),$headers);
	
	echo "SOLICITUD ENVIADA";
	exit();
}


if($_GET['borrar-cuenta']){
	$sql='update cliente set activo=0, id_statusCliente=2
	 where id_cliente='.$_GET[id].' limit 1';
	$myvar->execute($sql);
	
	$sql2=" select * from anuncios where id_cliente=".$_GET['id'].""; 
	$anuncios=$myvar->get_arreglo($sql2);

	for($i=0; $i<count($anuncios); $i++){
	$sql='delete form imagenesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form videos where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form comentariosAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form compartidoA where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form quienencuentra where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form reportesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form similares where id_anuncio='.$anuncios[$i][id_anuncio].' or  id_anuncioSimilar='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	$sql='delete form anuncios where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	}//for
	
		$sql='delete form clientes_has_categoriasAnuncio where id_cliente='.$_GET[id];
		$myvar->execute($sql);
	
		$sql='delete form clientes_has_clientes where id_cliente='.$_GET[id].' or id_cliente1='.$_GET[id];
		$myvar->execute($sql);
	
		$sql='delete form reportesCliente where id_cliente='.$_GET[id];
		$myvar->execute($sql);
	


	exit();
}



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
        <td  ><span style='font-family:sans-serif; font-size:14px; letter-spacing:.03em;'>INVITACION DE AMISTAD</span></td>
      </tr>
      
      <tr>
        <td ><span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'>DE: </span>
		<span style='font-family:sans-serif; font-size:11px; letter-spacing:.03em;'><strong>". $nombre ."</strong></span>        
		
		</td>
      </tr>
	  
</table></body>
</html>	
	";
	return $html;
 } 

?>