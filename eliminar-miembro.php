<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();

$sql = "delete from grupo_miembros where id_group=".$_POST[idGrupo]." and id_cliente=".$_POST[idCliente]." ";
echo $sql;
$tipos=$myvar->get_arreglo($sql);

?>
true
