<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
//session_start();
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();


	$sql="update Grupo set name_Group='".$_POST[nombre]."' where id_Group=".$_POST[idGrupoE]." ";

	$tipos=$myvar->get_arreglo($sql);
  $temp2 = $_POST[arreglo];
	for($i=0;$i<count($_POST[arreglo]); $i++){
		$sql3='insert into grupo_miembros (id_relacion , id_group, id_cliente) values ( "null" ,"'.$_POST[idGrupoE].'","'.$temp2[$i].'") ';
	  $myvar->execute($sql3);
	}



 ?>
