<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
//session_start();
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();


	$sql="select id_Group, name_Group from Grupo where id_Owner=".$_SESSION[id_clienteLof4]." ";

	$tipos=$myvar->get_arreglo($sql);

	?>
	<p>Grupos:</p>
 			 <p>
				  <? for($i=0; $i<count($tipos); $i++){ ?>
						<input type="checkbox" name="check_list[]"
	 				 id="amigoCompartir<? echo $tipos[$i][id_Owner]?>" value="<? echo $tipos[$i][id_Group] ?>"
	 				 /> <? echo $tipos[$i][name_Group] ?>
					<? } ?>

				</p>
