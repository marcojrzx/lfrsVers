<? 
/////////////////////////////////////////////////// U  S U A R I O S  ////////////////////////////////////////////

include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}
header("Cache-Control: no-store, no-cache, must-revalidate");
include_once("general.php");
include_once("funciones-bd.php");
include_once("funciones.php");
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
// status= 0:alta, 1=modificar, 2=consultar,3=eliminar
	if((permisos(4,1)==0)&&(permisos(4,2)==0)&&(permisos(4,3)==0)){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
//////////////////// P E R M I S O S  ///////////////////

$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select  * from reportesCliente where activo=1  order by id_reporteCliente desc"; 
$reportes=$myvar->get_arreglo($sql2);

	
arriba();


?>
	<div class="cabecera">
      <h1>Clientes Reportados</h1>
      <? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
/*	if(permisos(4,0)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a class="btop" href="admin-empleado.php"><img src="imagenes/ico-agregar22.gif"></a>
      <? }
      
      <input name="palabra" id="palabra" type="text" placeholder="busca anuncio" onchange="cambiarPaginaBusqueda(1)"/>
     */?><input name="palabra" id="palabra" type="hidden" placeholder="busca anuncio" onchange="cambiarPaginaBusqueda(1)"/>
       </div>
     <div id="consulta"> 
     
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
      </div>
   <?php
   
   
   if($_GET[msg]=='NvaCot'){
	   echo "<script language='javascript'></script>";
	   
	   }
abajo();

?>
<script language="javascript">
	Event.observe(window, 'load',
	      function() { <?php if($_GET['msg']=="editar"){ ?>$('palabra').value="<?php echo $_GET['palabra']; ?>";cambiarPaginaBusqueda(<?php echo $_GET['pag']; ?>);<?php }else{ ?><?php } ?> }
	);
</script>

<script type="text/JavaScript">
function borrar(a,id_reporteCliente,pag){
Dialog.confirm("Desea borrar el registro ?",{id: "winConfirma", className: "alphacube", title: "", width:300, height:100,okLabel: "Si",cancelLabel: "No",
cancel:function(win){ win.close(); },
ok:function(win){ 
var url="ajax-reporteClientes.php";
var parametros="borrar-reporteCliente="+a+"&id_reporteCliente="+id_reporteCliente;
var peticion= new Ajax.Request(
url,
{
method: 'post',
parameters: parametros,
onComplete: function(respuesta){
win.close();
cambiarPaginaBusqueda(pag);
//Dialog.alert("Se ha eliminado el registro con exito.",{id: "avisoBorrado", className: "alphacube", title: "", width:300, height:100,okLabel: "Aceptar"});
}
//onLoading: muestraLoading
}
);


 }//ok
});
}


function cambiarPaginaBusqueda(pag){
var palabra= $('palabra').value;
var url="ajax-reporteClientes.php";
var parametros="paginas-desp-bus=1&_pagi_pg="+pag+"&palabra="+palabra;
var peticion= new Ajax.Request(
url,
{
method: 'get',
parameters: parametros,
onComplete: funcionReceptoraPagBus
//onLoading: muestraLoading
}
);
}

function funcionReceptoraPagBus(respuesta){
	
//$('lightLoading').style.display='none';
$('consulta').innerHTML=respuesta.responseText;
} 
//////////////////////////////////////////
//edicion de producto

function edita(id_cliente,pag){
eval("parent.location='admin-anuncio.php?id_cliente="+id_cliente+"'");	

}






</script>
