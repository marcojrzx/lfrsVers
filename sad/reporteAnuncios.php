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
	if((permisos(5,1)==0)&&(permisos(5,2)==0)&&(permisos(5,3)==0)){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
//////////////////// P E R M I S O S  ///////////////////

$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select  * from reportesAnuncio where activo=1  order by id_reporteAnuncio desc"; 
$reportes=$myvar->get_arreglo($sql2);

	
arriba();


?>
	<div class="cabecera">
      <h1>Anuncios Reportados</h1>
      <!--h2>Lista de anuncios RACSO</h2-->
      <? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
/*	if(permisos(5,0)==1){
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
function borrar(a,id_reporteAnuncio,pag){
Dialog.confirm("Desea borrar el registro ?",{id: "winConfirma", className: "alphacube", title: "", width:300, height:100,okLabel: "Si",cancelLabel: "No",
cancel:function(win){ win.close(); },
ok:function(win){ 
var url="ajax-reporteAnuncios.php";
var parametros="borrar-reporteAnuncio="+a+"&id_reporteAnuncio="+id_reporteAnuncio;
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
var url="ajax-reporteAnuncios.php";
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

function edita(id_anuncio,pag){
eval("parent.location='admin-anuncio.php?id_anuncio="+id_anuncio+"'");	

}






</script>
