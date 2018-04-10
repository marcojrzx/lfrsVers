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
	if((permisos(3,1)==0)&&(permisos(3,2)==0)&&(permisos(3,3)==0)){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
//////////////////// P E R M I S O S  ///////////////////

$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select * from clientes where activo=1 and id_statusCliente=1 order by id_cliente desc"; 
$clientes=$myvar->get_arreglo($sql2);

	
arriba();


?>
	<div class="cabecera">
      <h1>Clientes</h1>
      <!--h2>Lista de clientes RACSO</h2-->
      <? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
/*	if(permisos(3,0)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a class="btop" href="admin-empleado.php"><img src="imagenes/ico-agregar22.gif"></a>
      <? }*/?>
      
      <input name="palabra" id="palabra" type="text" placeholder="busca cliente" onchange="cambiarPaginaBusqueda(1)"/>
     
       </div>
     <div id="consulta"> 
     
      <div class="list">
     	 <div class="lalista">
         	<ul>
            <li>
             <?  for($i=0;$i<=count($clientes)-1;$i++){
$sql2=" select * from estados where id_estado=".$clientes[$i][id_estado]." limit 1"; 
$estado=$myvar->get_arreglo($sql2);
$sql2=" select * from municipios where id_municipio=".$clientes[$i][id_municipio]." limit 1"; 
$municipio=$myvar->get_arreglo($sql2);

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
function borrar(id_cliente,pag){
Dialog.confirm("Desea borrar el registro ?",{id: "winConfirma", className: "alphacube", title: "", width:300, height:100,okLabel: "Si",cancelLabel: "No",
cancel:function(win){ win.close(); },
ok:function(win){ 
var url="ajax-clientes.php";
var parametros="borrar-cliente=1&id_cliente="+id_cliente;
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
var url="ajax-clientes.php";
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
eval("parent.location='admin-cliente.php?id_cliente="+id_cliente+"'");	

}






</script>
