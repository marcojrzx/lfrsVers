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


if($_POST['borrar-reporteCliente']){
	$sql="update reportesCliente set activo=".$_POST['borrar-reporteCliente'].", fechaAceptado='".date("Y-m-d H:i:s")."' where id_reporteCliente=".$_POST[id_reporteCliente]."";
	$myvar->execute($sql);
	
	
	if($_POST['borrar-reporteCliente']==0){ // no se acepta el reporte
		
	}elseif($_POST['borrar-reporteCliente']==2){// se acepta el reporte
		
		$sql="select * from reportesCliente where id_reporteCliente=".$_POST[id_reporteCliente]."
		 limit 1";
		$an=$myvar->get_arreglo($sql);

		$sql="update reportesCliente set activo=0 where id_cliente=".$an[0][id_cliente]." and  
		id_reporteCliente!=".$_POST[id_reporteCliente]."";
		$total=$myvar->get_arreglo($sql);


	}
	
//

exit();
}
?>

<?php
if($_GET['paginas-desp-bus']){
	//(titulo like '%".utf8_decode($_GET['palabra'])."%' or caracteristicas like '%".utf8_decode($_GET['palabra'])."%') 
$sql=" select  * from reportesCliente where activo=1  
order by id_reporteCliente desc"; 
$reportes=$myvar->get_arreglo($sql);
?>
    
        <div class="list">
     	 <div class="lalista">
         	<ul>
            <li>
             <?  for($i=0;$i<=count($reportes)-1;$i++){

$sql2=" select * from clientes where id_cliente=".$reportes[$i][id_cliente]." limit 1"; 
$cliente=$myvar->get_arreglo($sql2);


$sql="select * from tiposCliente where id_tipoCliente=".$anuncio[0][id_tipoCliente]."
 limit 1";
$tipo=$myvar->get_arreglo($sql);


$sql="select * from clientes where id_cliente=".$reportes[$i][id_clienteReportado]."
limit 1";
$clienteReporte=$myvar->get_arreglo($sql);


?>
            	<div class="fila">
                	<div class="accordion vertical lafila">
                    	<ul>
                        	<li class="id"><? echo $reportes[$i][id_reporteCliente]?></li>
                            <li class="datos">
                            	 <input type="checkbox" id="checkbox-<? echo $i+1?>" name="checkbox-accordion" />
								<label for="checkbox-<? echo $i+1?>">
                                	<? if($cliente[0][foto]!=''){?>
                                    <img class="ima-cd-sad ics1" src="../imagenes/clientes/<? echo $cliente[0][foto]?>" />
                                    <? }?>
                                    <h4><? echo $anuncio[0][nombre]." ".$anuncio[0][apellidos]?></h4>
                                     <p>Tipo: <strong>
					    <? echo $tipo[0][dsc_tipoCliente]?></strong></p>
                                     <p>CLIENTE REPORTA: <strong><? echo $clienteReporte[0][nombre]." ".$clienteReporte[0][apellidos]?></strong></p>
                                            <a class="btop"><img src="imagenes/ico-ver22.gif"></a>
                                    
                                   </label>
								
                            </li>
                            <li class="op">
                            	<div class="lasop">
                                <?  /*//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(4,1)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a href="javascript:void(0);" onClick="edita(<?php echo $reportes[$i][id_cliente]; ?>,1);" class="btop"> <img src="imagenes/ico-modificar-22.gif" alt="Editar anuncio"></a>  <? } ?>
<? */
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(4,3)==1){
//////////////////// P E R M I S O S  ///////////////////
?>  
<a href="javascript:void(0);" onclick="borrar(0,<?php echo $reportes[$i][id_reporteCliente]; ?>,1);" class="btop"> <img src="imagenes/ico-borrar-22.gif" alt="Eliminar anuncio"></a>
<a href="javascript:void(0);" onclick="borrar(2,<?php echo $reportes[$i][id_reporteCliente]; ?>,1);" class="btop"> Aceptar</a><? } ?>


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

