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

<ul style="list-style: none;">
 <? if(count($tipos) == 0) {?>
   <h3> Aun no administras grupos </h3>

     <? } ?>

 <? for($i=0; $i<count($tipos); $i++){ ?>
<h4><strong>Grupos que administras:</strong></h4>
<li id="<? echo $tipos[$i][id_Group] ?>">
<span>
<h4 style="margin-bottom: -3px;"> <? echo $tipos[$i][name_Group] ?> </h4>
<a class="btop cf"><button onclick="editG(<? echo $tipos[$i][id_Group] ?>)" style="background-color: #b1027e;border: none;"> Editar </button></a><a class="btop cf"><button onclick="modalE(<? echo $tipos[$i][id_Group] ?>)" style="background-color: #b1027e;border: none;"> Eliminar </button></a>
</span>
</li>

<? } ?>
<?
$sql3="select id_group from grupo_miembros where id_cliente=".$_SESSION[id_clienteLof4]." ";
$tipos3=$myvar->get_arreglo($sql3);

if(count($tipos3) != 0){
?>
<h4><strong>Grupos a los que perteneces:</strong></h4>

<? }
for($i=0; $i<count($tipos3); $i++){
  $tipos3[$i][id_group];
	$sql4="select name_Group from Grupo where id_Group=".$tipos3[$i][id_group]." ";
	$tipos4=$myvar->get_arreglo($sql4);
?>
<h4 style="margin-bottom: -3px;"> <? echo $tipos4[0][name_Group] ?> </h4>

<? } ?>





</ul>
