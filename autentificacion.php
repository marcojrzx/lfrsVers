<?php
include("sad/funciones-bd.php");
include("sad/funciones.php");
$urlprincipal="http://lofers.club/"; $myvar = new db_mysql;
$myvar->conectarBd();
$security = new security;
 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if ($_GET['logout']){
	$aut->logout();
	header("Location:".$urlprincipal."cerrando");
	exit;
}elseif($_GET['inputs']=='no'){
	echo "Favor de escribir usuario y clave";
	exit;
}elseif ($_POST['user']){
	
	if ($aut->login($_POST['user'], sha1($_POST['pass']))){
				echo "valido";
				exit;
			
	}else {
		echo "Error en usuario o clave1";
		exit;
	}
}else {
	echo "Error de envio2";
	exit;
}
?>