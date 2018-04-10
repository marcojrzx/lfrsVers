<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
session_start();
$urlprincipal="http://lofers.club/";
include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();


$sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where
id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION
(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1)";


	$tipos=$myvar->get_arreglo($sql);

	?>
	<? for($i=0; $i<count($tipos); $i++){
		$sql=" select * from clientes where id_cliente=".$tipos[$i][id_cliente];
$c=$myvar->get_arreglo($sql);

		?>
	<li> <label><input type="checkbox" name="" id="amigosGrupo<? echo $tipos[$i][id_cliente]?>" value="Roberto">
  <?
	if($c[0][ocultarNom]==1){// si lo quiere ocultar
echo $c[0][nombre]." ".$c[0][apellidos];
}else{
echo $c[0][nick];
}
	?>
	</label>  </li>
	<? } ?>
