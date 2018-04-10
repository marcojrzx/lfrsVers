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


//////////////////// P E R M I S O S  ///////////////////
//PERMISOS(PANTALLA,STATUS)
// status= 0:alta, 1=modificar, 2=consultar,3=eliminar
if($_GET[id_rol]){ // es editar
	if(permisos(1,0)==0){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
}else{
	if(permisos(1,1)==0){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
}
//////////////////// P E R M I S O S  ///////////////////

$myvar = new db_mysql;
$myvar->conectarBd();

$sql="call sp_pantallas();";
$pantallas=$myvar->get_arreglo($sql);


if ($_POST['bandera']) {

	if(!$_POST[id_rol]){//nuevo
		$myvar->conectarBd();
		$sql="call sp_insertRoles('".$_POST[nombre]."','".$_POST[descripcion]."',1);";
		$myvar->execute($sql);
				
		$myvar->conectarBd();
		$sql="call sp_roles(1)";
		$rol=$myvar->get_arreglo($sql);
				
		$bandrol=$rol[0][id_rol];
		
	}else{
			$myvar->conectarBd();
			$sql="call sp_updateRol('".$_POST[nombre]."','".$_POST[descripcion]."',".$_POST[id_rol].")";
			$myvar->execute($sql);
	
			$myvar->conectarBd();
			$sql="call sp_deleteIdRolPermisos(".$_POST[id_rol].")";
			$myvar->execute($sql);
			
			$bandrol=$_POST[id_rol];
	}//else

			for($i=0; $i<count($pantallas);$i++){
				$perm=0;
				if($_POST["pantalla".$pantallas[$i][id_pantalla].":1"]||$_POST["pantalla".$pantallas[$i][id_pantalla].":2"]||$_POST["pantalla".$pantallas[$i][id_pantalla].":3"]||$_POST["pantalla".$pantallas[$i][id_pantalla].":4"]){
						if(!$_POST["pantalla".$pantallas[$i][id_pantalla].":1"])
							$_POST["pantalla".$pantallas[$i][id_pantalla].":1"]=0;
						if(!$_POST["pantalla".$pantallas[$i][id_pantalla].":2"])
							$_POST["pantalla".$pantallas[$i][id_pantalla].":2"]=0;
						if(!$_POST["pantalla".$pantallas[$i][id_pantalla].":3"])
							$_POST["pantalla".$pantallas[$i][id_pantalla].":3"]=0;
						if(!$_POST["pantalla".$pantallas[$i][id_pantalla].":4"])
							$_POST["pantalla".$pantallas[$i][id_pantalla].":4"]=0;
						
						
					$perm= $_POST["pantalla".$pantallas[$i][id_pantalla].":1"].$_POST["pantalla".$pantallas[$i][id_pantalla].":2"].$_POST["pantalla".$pantallas[$i][id_pantalla].":3"].$_POST["pantalla".$pantallas[$i][id_pantalla].":4"];			
					
					$myvar->conectarBd();
					$sql="call sp_insertPermiso('".$bandrol."','".$pantallas[$i][id_pantalla]."','".$perm."',1)";
					$myvar->execute($sql);
					
	
				}
			}//for
		
	header("Location: roles.php?msg=nuevo");
	exit();
}//if submit


$myvar->conectarBd();
$sql="call sp_infoRol(".$_GET[id_rol].")";
$rol=$myvar->get_arreglo($sql);

arriba();
?>

<div id="centros"><form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" onSubmit="return validar();" >
<div id="filas" class="tablasinternas">   

<table width="100%" border="0" cellspacing="0" cellpadding="0"><input name="bandera" value="1" type="hidden" />
<tr><input name="id_rol"  type="hidden" value="<? echo $_GET[id_rol]?>" />
<td>
                      
<h1>Administracion rol</h1>

<table width="100%" border="0" cellspacing="0" cellpadding="5">
<tr>
                          <td align="left" class="top_draggable">
                            <input type="text" id="nombre" name="nombre"  size="40" value="<? echo $rol[0][nombre_rol]?>" placeholder="Nombre del rol" class="textfield_effect"/>                          </td>
                          </tr>
                        <tr>
                          <td align="left">
                            
  <textarea id="descripcion" name="descripcion" title="*" cols="40" placeholder="Descripción del rol" class="textfield_effect"><? echo $rol[0][dsc_rol]?></textarea>                          </td>
                          </tr>
                      </table></td>
                    </tr>
                    <tr>
                      <td><table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td c>Permisos dentro del sistema</td>
                        </tr>
                        <tr>
                          <td>
      <div class="enlista">                    
                          
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                            <tr>
                              <td width="11%" align="left"  >Sistema</td>
                              <td width="41%" align="left"  >Modulo</td>
                              <td width="15%" align="center"  >Nuevo</td>
                              <td width="11%" align="center"  >Cambio</td>
                              <td width="11%" align="center"  >Consultar</td>
                              <td width="11%" align="center"  >Eliminar</td>
                              </tr>
                            
                            <? for($i=0; $i<count($pantallas); $i++){ ?>
                            
                            <tr>
                              <td align="left" bgcolor="#FFFFFF" class="titulo1ch2"><? echo $pantallas[$i][nombre_menu]?></td>
                              <td align="left" bgcolor="#FFFFFF" class="titulo1ch2"><? echo htmlentities($pantallas[$i][nombre])?></td>
                              
                              
                              
                              <td  align="center" bgcolor="#FFFFFF"><input type="checkbox" name="pantalla<? echo $pantallas[$i][id_pantalla].":1";?>" value="1" 
						<? for($j=0; $j<count($rol); $j++){
									if($rol[$j][id_pantalla]==$pantallas[$i][id_pantalla]){
									if($rol[$j][permiso][0]==1){
										echo "checked";
										}
									
									
									}
								}?>></td>
                              <td  align="center" bgcolor="#FFFFFF"><input type="checkbox" name="pantalla<? echo $pantallas[$i][id_pantalla].":2";?>" value="1"
						<? for($j=0; $j<count($rol); $j++){
									if($rol[$j][id_pantalla]==$pantallas[$i][id_pantalla]){
									if($rol[$j][permiso][1]==1){
										echo "checked";
										}
									
									
									}
								}?>
								></td>
                              <td  align="center" bgcolor="#FFFFFF"><input type="checkbox" name="pantalla<? echo $pantallas[$i][id_pantalla].":3";?>" value="1"
						<? for($j=0; $j<count($rol); $j++){
									if($rol[$j][id_pantalla]==$pantallas[$i][id_pantalla]){
									if($rol[$j][permiso][2]==1){
										echo "checked";
										}
									
									
									}
								}?>></td>
                              <td  align="center" bgcolor="#FFFFFF"><input type="checkbox" name="pantalla<? echo $pantallas[$i][id_pantalla].":4";?>" value="1"
						<? for($j=0; $j<count($rol); $j++){
									if($rol[$j][id_pantalla]==$pantallas[$i][id_pantalla]){
									if($rol[$j][permiso][3]==1){
										echo "checked";
										}
									
									
									}
							}?>
								></td>				
                            </tr>
                            
                            <? } ?>
                          </table>
                          
                          </div>
                         
                         </td>
                        </tr>
                        <tr>
                          <td height="21">&nbsp;</td>
                        </tr>
                        <tr>
                          <td height="21">
                          <a href="#" class="textual btop" onclick="validar();">Guardar</a>
                          </td>
                        </tr>
                      </table></td>
                    </tr>
</table>
</div>
</form></div>





		<script language="javascript">
		  
function validar(){

var noerror = 1;
var wm = "<div id='elalert'><strong>Falta la siguiente informacion :</strong><br/>";
var cadena="";

	if ($('nombre').value==''){
	wm +='Debe escribir Nombre de Rol<br/>';
	noerror = 0;	
	}
wm +='';
		

	if(noerror==1){
	//showbar();
	document.formulario.submit();
	
	}else{
	muestraAlert(wm);
	//alert(wm);
	}	

}

function hidebar(){

}
function showbar(){
}

function muestraAlert(wm){
  Dialog.alert(wm,{id: "win3", className: "alphacube", title: "", width:300, height:250,okLabel: "Aceptar"});
  }


</script>
<?php
abajo();

?>
