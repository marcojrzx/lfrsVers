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


if($_POST['borrar-reporteAnuncio']){
	$sql="update reportesAnuncio set activo=".$_POST['borrar-reporteAnuncio'].", fechaAceptado='".date("Y-m-d H:i:s")."' where id_reporteAnuncio=".$_POST[id_reporteAnuncio]."";
	$myvar->execute($sql);
	
	
	if($_POST['borrar-reporteAnuncio']==0){ // no se acepta el reporte
		
	}elseif($_POST['borrar-reporteAnuncio']==2){// se acepta el reporte
		
		$sql="select * from reportesAnuncio where id_reporteAnuncio=".$_POST[id_reporteAnuncio]."
		 limit 1";
		$an=$myvar->get_arreglo($sql);

		$sql="update reportesAnuncio set activo=0 where id_anuncio=".$an[0][id_anuncio]." and  
		id_reporteAnuncio!=".$_POST[id_reporteAnuncio]."";
		$total=$myvar->get_arreglo($sql);


	}
	
//

exit();
}
?>

<?php
if($_GET['paginas-desp-bus']){
	//(titulo like '%".utf8_decode($_GET['palabra'])."%' or caracteristicas like '%".utf8_decode($_GET['palabra'])."%') 
$sql=" select  * from reportesAnuncio where activo=1  
order by id_reporteAnuncio desc"; 
$reportes=$myvar->get_arreglo($sql);
?>
    
        <div class="list">
     	 <div class="lalista">
         	<ul>
            <li>
             <?  for($i=0;$i<=count($reportes)-1;$i++){


$sql2=" select * from anuncios where id_anuncio=".$reportes[$i][id_anuncio]." limit 1"; 
$anuncio=$myvar->get_arreglo($sql2);

$sql="select * from imagenesAnuncio where id_anuncio=".$anuncio[0][id_anuncio]."
 order by fotoPrincipal desc limit 1";
$ima=$myvar->get_arreglo($sql);

$sql="select * from categoriasAnuncio where id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]."
 limit 1";
$categoria=$myvar->get_arreglo($sql);


$sql="select * from clientes where id_cliente=".$anuncio[0][id_cliente]."
limit 1";
$clientes=$myvar->get_arreglo($sql);



$sql="select * from clientes where id_cliente=".$reportes[$i][id_cliente]."
limit 1";
$clienteReporte=$myvar->get_arreglo($sql);


?>
            	<div class="fila">
                	<div class="accordion vertical lafila">
                    	<ul>
                        	<li class="id"><? echo $reportes[$i][id_reporteAnuncio]?></li>
                            <li class="datos">
                            	 <input type="checkbox" id="checkbox-<? echo $i+1?>" name="checkbox-accordion" />
								<label for="checkbox-<? echo $i+1?>">
                                	<? if($ima[0][imagen]!=''){?>
                                    <img class="ima-cd-sad ics1" src="../imagenes/imagenesAnuncio/<? echo $ima[0][imagen]?>" />
                                    <? }?>
                                    <h4><? echo $anuncio[0][titulo]?></h4>
                                     <p>Fecha Suceso: <strong>
					    <? echo obtenerfecha($anuncio[0][fechaSuceso])?></strong></p>
                                    <a class="btop"><img src="imagenes/ico-ver22.gif"></a>
                                    
                                   </label>
								<div class="content">
                                <div class="losdatos">
                                        <div class="cot">
                                            <ul>
                                            <li>
                                             <p>Cliente: <strong><? echo $clientes[0][nombre]." ".$clientes[0][apellidos]?></strong></p>
                                            <p>Categoria: <strong><? echo $categoria[0][dsc_categoriaAnuncio]?></strong></p>
                                            <p>CLIENTE REPORTA: <strong><? echo $clienteReporte[0][nombre]." ".$clienteReporte[0][apellidos]?></strong></p>
                                            
                                                
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
	if(permisos(5,1)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a href="javascript:void(0);" onClick="edita(<?php echo $reportes[$i][id_anuncio]; ?>,1);" class="btop"> <img src="imagenes/ico-modificar-22.gif" alt="Editar anuncio"></a>  <? } ?>
<? */
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(5,3)==1){
//////////////////// P E R M I S O S  ///////////////////
?>  
<a href="javascript:void(0);" onclick="borrar(0,<?php echo $reportes[$i][id_reporteAnuncio]; ?>,1);" class="btop"> <img src="imagenes/ico-borrar-22.gif" alt="Eliminar anuncio"></a>
<a href="javascript:void(0);" onclick="borrar(2,<?php echo $reportes[$i][id_reporteAnuncio]; ?>,1);" class="btop"> Aceptar</a><? } ?>


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

