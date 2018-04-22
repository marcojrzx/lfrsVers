<?
session_start();
$temp = $_POST['nombre'];
$temp2 = $_POST['ideA'];
$testigo = $_POST['test'];

$idClient = $_SESSION[id_clienteLof4];



$urlprincipal="http://lofers.club/";
include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();
if($testigo == 1){

$sql= 'insert into Grupo (id_Group , id_Owner, name_Group) values ( "null" ,"'.$idClient.'","'.$temp.'") ';
$myvar->execute($sql);

$sql2=" select * from Grupo where id_Owner=$idClient and name_Group='$temp' ";

$tipos = $myvar->get_arreglo($sql2);
//echo $sql2;
$idNG = $tipos[0][id_Group];   /// ID del nuevo grupo;
for ($i=0; $i < count($temp2); $i++) {

	$sql3='insert into grupo_miembros (id_relacion , id_group, id_cliente) values ( "null" ,"'.$idNG.'","'.$temp2[$i].'") ';
  $myvar->execute($sql3);
}
}
?>
<?

	$sql="select id_Group, name_Group from Grupo where id_Owner=".$_SESSION[id_clienteLof4]." ";

	$tipos=$myvar->get_arreglo($sql);

	?>
<? if($testigo == 2 ){ ?>

		 <? if(count($tipos) == 0) {?>
		   <h3> Aun no tienes grupos </h3>

		     <? } ?>
			<? if(count($tipos) > 0) { ?>
				<tr>
				 <th>Nombre</th>
				 <th>Opciones</th>

			 </tr>

			<? } ?>
		 <? for($i=0; $i<count($tipos); $i++){ ?>

			 <tr id="<? echo $tipos[$i][id_Group] ?>">
			    <td><h4 > <? echo $tipos[$i][name_Group] ?></h4</td>
			    <td><a class="btop cf"><button onclick="polo()" style="background-color: #b1027e;border: none;"> Editar </button></a><a class="btop cf"><button onclick="modalE(<? echo $tipos[$i][id_Group] ?>)" style="background-color: #b1027e;border: none;"> Eliminar </button></a></td>

  		</tr>


<? } ?>
        </ul>

<? } ?>

<? if($testigo == 1 ){ ?>
	<p>Grupos:</p>
			 <p>
					<? for($i=0; $i<count($tipos); $i++){ ?>
						<input type="checkbox" name="check_list[]"
					 id="amigoCompartir<? echo $tipos[$i][id_Owner]?>" value="<? echo $tipos[$i][id_Group] ?>"
					 /> <? echo $tipos[$i][name_Group] ?>
					<? } ?>

				</p>


<? }?>
