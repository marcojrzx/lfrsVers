<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
//session_start();
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();
$idGRE = $_POST['idGrupo'];
echo $idGRE;

	$sql="select id_Group from Grupo where id_Owner=".$_SESSION[id_clienteLof4]." and id_Group= '$idGRE'";

	$tipos=$myvar->get_arreglo($sql);
	//echo $tipos;
        $ident = $tipos[0][id_Group];

        $sql2 = "delete from Grupo where id_Group = '$ident' and id_Owner=".$_SESSION[id_clienteLof4]." ";
	      //echo $sql2;
        $myvar->execute($sql2);
        //echo $myvar;
			  $sql3 = "delete from grupo_miembros where id_group = '$ident' ";
				$myvar->execute($sql3);
				$sql4 = "select id_pub from grupo_publicacion where id_grupo = '$ident' ";
				$tipos4 = $myvar->get_arreglo($sql4);
				echo "cuenta";
				echo count($tipos4);
				for($i=0;$i<count($tipos4);$i++){
          //echo $tipos4[$i][id_pub];
					$sql5 = "delete from anuncios where id_anuncio = ".$tipos4[$i][id_pub]." ";
					$myvar->execute($sql5);
				}
				$sql6 = "delete from grupo_publicacion where id_grupo = '$ident' ";
				$myvar->execute($sql6);

	?>
