<?php
include("funciones-bd.php");
include("funciones.php");
$myvar = new db_mysql;
$myvar->conectarBd();
$security = new security;
 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();


if ($_GET['logout']){
	$aut->logout();
	header("Location:index.php");
	exit;
}
elseif($_GET['inputs']=='no'){
echo "Favor de escribir usuario y clave";
exit;
}
elseif ($_POST['user']){
	if ($aut->login($_POST['user'], sha1($_POST['pass']))){
			
			//$sql="CALL tipo_usuario('".$_POST['user']."')"; 
		//	$id=$myvar->get_arreglo($sql);
			
			//if($id[0]['id_tipousuario']==1){
				echo "valido";
				exit;
			//}
	}
	else {
		echo "Error en usuario o clave";
		
		exit;
	}
}

else {
	echo "Error de envio";
	exit;
}
?>