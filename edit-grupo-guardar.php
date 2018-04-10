<meta http-equiv="Content-type" content="text/html; charset=UTF-8" /><?
//session_start();
session_start();
$urlprincipal="http://lofers.club/"; include("sad/funciones.php");
include_once("sad/funciones-bd.php");
/// SQL PARA INSERTAR GRUPOS -> 	INSERT INTO `Grupo` (`id_Group`, `id_Owner`, `name_Group`) VALUES ('1', '4', 'Grupo Prueba');
$myvar = new db_mysql;
$myvar->conectarBd();



	$sql="select id_cliente from grupo_miembros where  id_group=".$_POST[idGrupo]." ";

	$tipos=$myvar->get_arreglo($sql);
 /******** SQL TRAE EL NOMBRE DEL GRUP  **********/
     $sql3="select name_Group from Grupo where id_Group=".$_POST[idGrupo]." ";
     $tipos3=$myvar->get_arreglo($sql3);
?>
<h3> Editar nombre: </h3>
<label >Nombre: </label>
<input name="nombre" value="<? echo $tipos3[0][name_Group] ?>" ></input>
<h3> Eliminar miembros: </h3>
<?

	for($i=0;$i<count($tipos);$i++){
  $sql2="select * from clientes where  id_cliente=".$tipos[$i][id_cliente]." ";
	$tipos2=$myvar->get_arreglo($sql2);

	//echo "nick es"+$tipos2."";



  ?>
	<li id="<? echo $tipos2[0][id_cliente]; ?>">
   <h5 style="display: inline-block;"> <? echo $tipos2[0][nombre]; ?>  </h5><button id="eliminarBotonMiembro" onclick="eliminarBotonMiembro(<? echo $tipos2[0][id_cliente]; echo ",";?><? echo $_POST[idGrupo]; ?>)" style="float:right;background-color:#ff0303;" type="button" dee="" class="btn btn-primary" >Eliminar</button>
  </li>
<? } ?>

<?
?> <h3>Agregar miembros:</h3>  <?
 $sql4=" (select id_clienteCliente, id_cliente1 as id_cliente from clientes_has_clientes where
id_cliente=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1) UNION
(select id_clienteCliente,id_cliente from clientes_has_clientes where  id_cliente1=".$_SESSION[id_clienteLof4]." and id_statusSolicitud=1)";


	$tipos4=$myvar->get_arreglo($sql4);

    for($j=0; $j<count($tipos4);$j++){
        $x = 0;
      for($k=0; $k<count($tipos);$k++){
        if($tipos[$k][id_cliente] == $tipos4[$j][id_cliente] ){
            $x = $x + 1;
         }
     }
     if($x == 0){

		$sql=" select * from clientes where id_cliente=".$tipos4[$j][id_cliente];
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
	<?
     }

}

 ?>
