<?php
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include_once("funciones-bd.php");
include_once("funciones.php");
include("permisos.php");

$myvar = new db_mysql;
$myvar->conectarBd();

if($_POST['borrar-cliente']){
$sql="update clientes set activo=0, id_statusCliente=3 where id_cliente=".$_POST[id_cliente]."";
$myvar->execute($sql);
exit();
}
?>

<?php
if($_GET['paginas-desp-bus']){
	
$sql="select * from clientes where (nombre like '%".utf8_decode($_GET['palabra'])."%' or 
apellidos like '%".utf8_decode($_GET['palabra'])."%') 
and activo=1 and id_statusCliente=1 order by id_cliente desc";
$clientes=$myvar->get_arreglo($sql);
?>
    
        <div class="list">
     	 <div class="lalista">
         	<ul>
            <li>
             <?  for($i=0;$i<=count($clientes)-1;$i++){

?>
            	<div class="fila">
                	<div class="accordion vertical lafila">
                    	<ul>
                        	<li class="id"><? echo $clientes[$i][id_cliente]?></li>
                            <li class="datos">
                            	 <input type="checkbox" id="checkbox-<? echo $i+1?>" name="checkbox-accordion" />
								<label for="checkbox-<? echo $i+1?>">
                                	<? if($clientes[$i][foto]!=''){?>
                                    <img class="ima-cd-sad ics1" src="../imagenes/clientes/<? echo $clientes[$i][foto]?>" />
                                    <? }?>
                                    
                                    <h4><? echo $clientes[$i][nombre]." ".$clientes[$i][apellidos]?></h4>
                                     <p>Email: <strong><? echo $clientes[$i][email]?></strong></p>
                                    <a class="btop"><img src="imagenes/ico-ver22.gif"></a>
                                   
                                   </label>
								<div class="content">
                                <div class="losdatos">
                                        <div class="cot">
                                            <ul>
                                            <li>
                                             <p>Nick: <strong><? echo $clientes[$i][nick]?></strong></p>
                                            <p>Telefono: <strong><? echo $clientes[$i][telefono]?></strong></p>
                                            <p>Fecha Nacimiento: <strong><? echo obtenerfecha($clientes[$i][fechaNac])?></strong></p>
                                            <p>Estado: <strong><? echo $estado[0][nombre]?></strong></p>
                                            <p>Municipio: <strong><? echo $municipio[0][nombre]?></strong></p>
                                          
                                                
                                            </li>
                                            </ul>
                                        </div>
                                </div>
                                </div>
                            </li>
                            <li class="op">
                            	<div class="lasop">
                                <?  /*//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(3,1)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a href="javascript:void(0);" onClick="edita(<?php echo $clientes[$i][id_cliente]; ?>,1);" class="btop"> <img src="imagenes/ico-modificar-22.gif" alt="Editar cliente"></a>  <? } ?>
<? */
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(3,3)==1){
//////////////////// P E R M I S O S  ///////////////////
?>  
<a href="javascript:void(0);" onclick="borrar(<?php echo $clientes[$i][id_cliente]; ?>,1);" class="btop"> <img src="imagenes/ico-borrar-22.gif" alt="Eliminar cliente"></a><? } ?>


                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
                     <? }//for?>

            </li>
            </ul>
         </div>
      </div>
         
         <?php
		 exit();
		 }
		 ?>

