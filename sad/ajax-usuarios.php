<?php
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include_once("funciones-bd.php");
include("permisos.php");

$myvar = new db_mysql;
$myvar->conectarBd();

if($_POST['borrar-usuario']){
	$sql="call sp_updateStatusUsuario(".$_POST[id_usuario].",0)";
	$myvar->execute($sql);
	exit();
}
?>
