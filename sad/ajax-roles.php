<?php
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include_once("funciones-bd.php");
include("permisos.php");

$myvar = new db_mysql;
$myvar->conectarBd();

if($_POST['borrar-rol']){
$sql="call sp_updateStatusRol(".$_POST[id_rol].",0)";
$myvar->execute($sql);
exit();
}
?>

<?php
if($_GET['paginas-desp-bus']){
$sql="select * from roles where (nombre_rol like '%".utf8_decode($_GET['palabra'])."%') and status=1 and id_rol!=1 order by id_rol desc";
$rol=$myvar->get_arreglo($sql);
?>
    
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
                                        	<? for($j=0;$j<=count($usuario)-1;$j++){
												
												?>
                                            <div class="unacot">
                                            <div class="user">
                                                <ul>
                                                 <li>
                                                <? 
												$sql2="select * from personas where activo=1 and id_persona=".$usuario[$j]['id_persona']." limit 1 "; 
												$id_tipoUsuarioC=$myvar->get_arreglo($sql2);

												
												echo $id_tipoUsuarioC[0]['nombre']." ".$id_tipoUsuarioC[0]['apaterno']." ".$id_tipoUsuarioC[0]['amaterno']?>
                                               
                                                </li> <li class="der">
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
         
         <?php
		 exit();
		 }
		 ?>

