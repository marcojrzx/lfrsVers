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
	if((permisos(1,0)==0)&&(permisos(1,1)==0)&&(permisos(1,2)==0)&&(permisos(1,3)==0)&&
	(permisos(2,0)==0)&&(permisos(2,1)==0)&&(permisos(2,2)==0)&&(permisos(2,3)==0)){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
//////////////////// P E R M I S O S  ///////////////////

$myvar = new db_mysql;
$myvar->conectarBd();


$sql2=" select * from roles where status=1 and id_rol!=1 order by id_rol desc"; 
$rol=$myvar->get_arreglo($sql2);

	
arriba();


?>
<div class="cabecera">
      <h1>Roles y usuarios del sistema</h1>
      <!--h2>Lista de clientes RACSO</h2-->
      <? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(1,0)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a class="btop" href="admin-rol.php"><img src="imagenes/ico-agregar22.gif"></a>
      <? }?>
     
      <input name="palabra" id="palabra" type="text" placeholder="Busca un rol" onchange="cambiarPaginaBusqueda(1)"/>
     
      </div>
     <div id="consulta"> 
      <div class="list">
     	 <div class="lalista">
         	<ul>
            <li>
            	<div class="fila">
                	<div class="accordion vertical lafila">
                    	<? for($i=0;$i<=count($rol)-1;$i++){
							
							$sql2="select * from usuarios where activo=1 and id_rol=".$rol[$i]['id_rol']." order by id_usuario desc "; 
							$usuario=$myvar->get_arreglo($sql2);


?>
                        <ul>
                        	<li class="id"><? echo $rol[$i]['id_rol']?></li>
                            <li class="datos">
                            	<input type="checkbox" id="checkbox-<? echo $i+1?>" name="checkbox-accordion" />
								<label for="checkbox-<? echo $i+1?>">
                                	<h4><? echo $rol[$i]['nombre_rol']?></h4>
                                    <p><strong>Discripción:</strong> <? echo $rol[$i]['dsc_rol']?></p>
                                    <p>Usuarios dentro de este rol: <span class="cot-ico si"><? echo count($usuario);?></span></p>
                                        
<? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(2,0)==1){
//////////////////// P E R M I S O S  ///////////////////
?>  <a class="btop" href="admin-usuario.php"><img src="imagenes/ico-agregar22.gif"></a>
<? }?>
                                </label>
                                
								<div class="content">
                                <div class="losdatos">
                                	<div class="cot">
                                    	<ul>
                                        <li>
                                        	<? for($j=0;$j<=count($usuario)-1;$j++){?>
                                            <div class="unacot">
                                            <div class="user">
                                                <ul>
                                                <li><? 
												$sql2="select * from personas where activo=1 and id_persona=".$usuario[$j]['id_persona']." limit 1 "; 
												$id_tipoUsuarioC=$myvar->get_arreglo($sql2);

												
												echo $id_tipoUsuarioC[0]['nombre']." ".$id_tipoUsuarioC[0]['apaterno']." ".$id_tipoUsuarioC[0]['amaterno']?>
                                               
                                                </li>
                                                <li class="der">
                                                   <? //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(2,1)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a href="javascript:void(0);" onClick="editaU(<?php echo $usuario[$j]['id_usuario']; ?>,1);" class="btop"><img src="imagenes/ico-modificar-22.gif"  /> </a>  <? } ?>
       <? 
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(2,3)==1){
//////////////////// P E R M I S O S  ///////////////////
?>
                 <a href="javascript:void(0);" onclick="borrarU(<?php echo $usuario[$j]['id_usuario']; ?>,1);" class="btop"><img src="imagenes/ico-borrar-22.gif"  /></a><? } ?>                                             
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
                               
                            </li>
                            <li class="op">
                            	<div class="lasop">
                             <?  //////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(1,1)==1){
//////////////////// P E R M I S O S  ///////////////////
?><a href="javascript:void(0);" onClick="edita(<?php echo $rol[$i]['id_rol']; ?>,1);" class="btop"><img src="imagenes/ico-modificar-22.gif"></a>  <? } ?>
<? 
//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
	if(permisos(1,3)==1){
//////////////////// P E R M I S O S  ///////////////////
?>
                 
<a href="javascript:void(0);" onclick="borrar(<?php echo $rol[$i]['id_rol']; ?>,1);" class="btop"> <img src="imagenes/ico-borrar-22.gif"></a><? } ?>
                                </div>
                            </li>
                        </ul>
                        
                        <?  }//for?>
                    </div>
                    
                </div>
                
                
               
            </li>
            </ul>
         </div>
      </div>
	  </div><?php
	 
abajo();
?>
<script language="javascript">
	Event.observe(window, 'load',
	      function() { <?php if($_GET['msg']=="editar"){ ?>$('palabra').value="<?php echo $_GET['palabra']; ?>";cambiarPaginaBusqueda(<?php echo $_GET['pag']; ?>);<?php }else{ ?><?php } ?> }
	);
</script>

<script type="text/JavaScript">
function borrar(id_rol,pag){
Dialog.confirm("Desea borrar el registro ?",{id: "winConfirma", className: "alphacube", title: "", width:300, height:100,okLabel: "Si",cancelLabel: "No",
cancel:function(win){ win.close(); },
ok:function(win){ 
var url="ajax-roles.php";
var parametros="borrar-rol=1&id_rol="+id_rol;
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
var url="ajax-roles.php";
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

function edita(id_rol,pag){
eval("parent.location='admin-rol.php?id_rol="+id_rol+"'");	

}



function borrarU(id_usuario,pag){
Dialog.confirm("Desea borrar el registro ?",{id: "winConfirma", className: "alphacube", title: "", width:300, height:100,okLabel: "Si",cancelLabel: "No",
cancel:function(win){ win.close(); },
ok:function(win){ 
var url="ajax-usuarios.php";
var parametros="borrar-usuario=1&id_usuario="+id_usuario;
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

 
//////////////////////////////////////////
//edicion de producto

function editaU(id_usuario,pag){
eval("parent.location='admin-usuario.php?id_usuario="+id_usuario+"'");	

}

</script>
