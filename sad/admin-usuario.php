<?php
include_once("Auth/nxs_auth.inc.php");

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
	
if($_GET[id_usuario]){ // es editar
	if(permisos(2,0)==0){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
}else{
	if(permisos(2,1)==0){
		echo "<script type=\"text/javascript\">alert(\"No tiene los permisos suficientes\");history.back(1);</script>";
	
	}
}
//////////////////// P E R M I S O S  ///////////////////


$myvar = new db_mysql;
$myvar->conectarBd();


$sql="select * from sucursales where activo=1";
$sucursales=$myvar->get_arreglo($sql);


if ($_POST['status']) {
	
	
	if(!$_POST[id_usuario]){
		
		$sql="select user from usuarios where user='".$_POST[usuario]."' limit 1";
		$listo=$myvar->get_arreglo($sql);
		
		if(!empty($listo)){
		header("Location: admin-usuario.php?msg=user&nombre=".$_POST['nombre']."&rol=".$_POST[rol]);
		exit();
		}


		$sql="call sp_insertUsuario('".$_POST[nombre]. "','".$_POST[usuario]. "','".sha1($_POST[password]). "','1','".$_POST[rol]. "','".$_POST[id_tipoUsuario]. "','".$_POST[id_persona]. "')";
		$myvar->execute($sql);
		
		$sql="select * from usuarios order by id_usuario desc limit 1";
				$cliente=$myvar->get_arreglo($sql);
				$idcli=$cliente[0]['id_usuario'];
				
				
	}else{// EDITAR
		if($_POST['usuario']!=''){
	
			$sql="call sp_idDifUsuario(1,'".$_POST[id_usuario]."')";
			$usu=$myvar->get_arreglo($sql);
		
			for($i=0; $i<count($usu); $i++){
				if($usu[$i]['user']==$_POST[usuario]){
					echo "<script type=\"text/javascript\">alert(\" 1. Ya fue dado de alta este Usuario \");history.back(1);</script>";
					exit(); 
			
				}//if
			}//for
		}//if

		if($_POST[password]){
			$myvar->conectarBd();
		$sql="call sp_updateUsuario('".$_POST[nombre]. "','".$_POST[usuario]. "','".sha1($_POST[password]). "','".$_POST[rol]. "','".$_POST[id_usuario]."','".$_POST[id_tipoUsuario]."','".$_POST[id_persona]. "')" ;
			$myvar->execute($sql);
		}else{
			$myvar->conectarBd();
		$sql="call sp_updateUsuario('".$_POST[nombre]. "','".$_POST[usuario]. "','','".$_POST[rol]. "','".$_POST[id_usuario]."','".$_POST[id_tipoUsuario]."','".$_POST[id_persona]. "')" ;
			$myvar->execute($sql);
		}
		
		$idcli=$_POST[id_usuario];

	}//else
	
	
		///////////// D A T O S   S U C U R S A L E S /////////////////////
	
			$sql="delete from `usuarios_has_sucursales`  where id_usuario=".$idcli."";
			$myvar->execute($sql);
			
			for($t=0; $t<count($sucursales); $t++){
				if($_POST['id_sucursal'.$sucursales[$t][id_sucursal]]==1){
			
						$sql="INSERT INTO `usuarios_has_sucursales` ( id_usuario,id_sucursal) VALUES ( '".$idcli."', '".$sucursales[$t][id_sucursal]."')";
						$myvar->execute($sql);
				}
				
			}
	
	header("Location: roles.php?msg=editar");
	exit();
}//if submit


//$html = new html;

$myvar->conectarBd();
$sql="call sp_idUsuario('".$_GET[id_usuario]."')";
$datos=$myvar->get_arreglo($sql);

arriba();
?>


<div id="centros"><form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" onSubmit="return validar();">
		<input type="hidden" id="id_usuario" name="id_usuario" value="<? echo $_GET[id_usuario]?>"/>

<h1>Usuarios de sistema</h1>

<div id="filas" class="tablasinternas">    


<table width="100%" border="0" cellspacing="0" cellpadding="5">
        <tr>
          <td align="left">&nbsp;</td>
        </tr>
        <tr>
          <td align="left"><table width="100%" border="0" cellspacing="0" cellpadding="2">
            <tr>
      <td>
      <select name="rol"  id="rol" class="textfield_effect">
        <option value="0"   >Rol de usuario del sistema</option>
          <?
				 $myvar->conectarBd();
$sql="select * from roles where status=1";
 $categorias=$myvar->get_arreglo($sql);

				if(!empty($categorias)){

				  foreach ($categorias as $mivalor){
					if(($mivalor['id_rol']==$datos[0][id_rol]) or ($mivalor['id_rol']==$_GET[rol]) ){
					echo " <option value=\"".$mivalor['id_rol']."\"   selected='selected'>".htmlentities(utf8_decode($mivalor['nombre_rol']))."</option>";
					}else{
					echo " <option value=\"".$mivalor['id_rol']."\"  >".htmlentities(utf8_decode($mivalor['nombre_rol']))."</option>";
					}
				  }
				 } 
?>
        </select>
        <br /></td>
      </tr>
      
             
     <tr>
      <td>
     
      
      <p>
        <input name="usuario" type="text"  id="usuario" size="20" class="textfield_effect" placeholder="Usuario"  value="<? echo $datos[0][user] ?>"/>
        <input name="password" type="password"  id="password" size="20" class="textfield_effect" placeholder="Clave" />             
        <input name="password2" type="password"  id="password2" size="20" class="textfield_effect" placeholder="Confirmacion Clave" />             
      </p></td>
      </tr>
    <tr>
      <td>
      <select  name="id_persona" id="id_persona">
      
      	<option value="0">Seleccione Persona</option>
		<? $myvar->conectarBd();
        $sql="select * from personas where activo=1";
         $personas=$myvar->get_arreglo($sql);
		 
		for($i=0; $i<count($personas); $i++){?>
        	
            <option value="<? echo  $personas[$i][id_persona]?>"
            
            <? if($personas[$i][id_persona]==$datos[0][id_persona]){?>selected="selected"<? }?>><? echo  $personas[$i][nombre]." ".$personas[$i][apaterno]." ".$personas[$i][amaterno]?></option>
		
		<? }?>
      </select></td>
      </tr>
      
      <tr>
      <td>
            	<p>Sucursales:</p>
                <? 
			
			for($t=0; $t<count($sucursales); $t++){
				$sql="select * from usuarios_has_sucursales where id_usuario='".$_GET[id_usuario]."' and id_sucursal=".$sucursales[$t][id_sucursal]." limit 1";
				$tipoActivo=$myvar->get_arreglo($sql);

				
				?>
                <input type="checkbox" name="id_sucursal<? echo $sucursales[$t][id_sucursal] ?>" id="id_sucursal<? echo $sucursales[$t][id_sucursal] ?>" value="1" <? if(count($tipoActivo)>0){?> checked="checked"<? }?> /><? echo $sucursales[$t][dsc_sucursal] ?>
                <? }//for?>
            </td>
      </tr>
            
            
  </table></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          
          <input type="hidden" name="status"  id="status"/>
          
          <td>
          <a href="#" class="textual btop" onclick="document.getElementById('status').value = '1';validar();">Gardar cambios</a>
          </td>
          </tr>
    </table>
    </div>
    </form></div>





<script language="javascript">



function validar(){

var noerror = 1;
var wm = "<div id='elalert'><strong>Falta la siguiente informacion :</strong><br/>";
var cadena="";

if ($('rol').value==0){
  wm +='Debe seleccionar un Rol<br/>';
  noerror = 0;	
 }
 

if ($('id_persona').value==0){
  wm +='Debe seleccionar persona<br/>';
  noerror = 0;	
 }
 

if (trim($('usuario').value)==''){
  wm +='Debe escribir Usuario<br/>';
  noerror = 0;	
 } 

<? if(!$_GET[id_usuario]){ // es nuevo
?>
if (trim($('password').value)==''){
  wm +='Debe escribir password<br/>';
  noerror = 0;	
 } 

<? }?>

if (trim($('password').value)!=''){
  if (trim($('password').value)!=trim($('password2').value)){
		wm +='Clave no coincide<br/>';
  		noerror = 0;
  }
 } 


wm +='</div>';
		

	if(noerror==1){
	document.formulario.submit();
	
	}else{
	muestraAlert(wm);
	}	

}

function trim (str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function hidebar(){

//$('display').style.display='none';

}
function showbar(){

//$('display').style.display='block';

}


function muestraAlert(wm){
  Dialog.alert(wm,{id: "win3", className: "alphacube", title: "", width:300, height:250,okLabel: "Aceptar"});
  
   
  }


</script>

<?php
abajo();

if($_GET['msg']=="user"){$msg="<div id='elalert'>Existe un user con ese nombre. <br/> Favor de verificar.</div>"; }
if ($msg){
?>
<script language="javascript">

Dialog.alert("<?php echo $msg; ?>",{id: "win1", className: "alphacube", title: "", width:300, height:100,okLabel: "Aceptar"});
</script>
<?php

}
?>