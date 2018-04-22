<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");

$myvar = new db_mysql;
$myvar->conectarBd();


	$sql=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where
	id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION
	(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1)";

	$tipos=$myvar->get_arreglo($sql);


	?>
       <p>Amigos:</p>

                 <? for($i=0; $i<count($tipos); $i++){

					 $sql=" select * from clientes where id_cliente=".$tipos[$i][id_cliente];
	$c=$myvar->get_arreglo($sql);
					 ?>
                 <input type="checkbox" name="checks_box"
                 id="<? echo $tipos[$i][id_cliente]?>" value="1"
                 />
				 <?
				 if($c[0][ocultarNom]==1){// si lo quiere ocultar
	echo $c[0][nombre]." ".$c[0][apellidos];
	}else{
	echo $c[0][nick];
	}
	?>
   <br>
				 <? }?>
