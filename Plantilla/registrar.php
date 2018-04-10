<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;


include "funciones-arriba.php";


$sql2=" select * from categoriasAnuncio where activo=1"; 
		$categorias=$myvar->get_arreglo($sql2);
		
if ($_POST['status']) {
	
	
	$sql="update clientes set nombre='".$_POST[nombre]. "',apellidos='".$_POST[apellidos]. "', telefono='".$_POST[telefono]. "', 
	ocultarTel='".$_POST[ocultarTel]. "',sexo='".$_POST[sexo]. "',fechaNac='".$_POST[fechaNacimiento]. "',nick='".$_POST[nick]. "',
	id_ocupacion='".$_POST[id_ocupacion]. "', id_tipoCliente='".$_POST[id_tipoCliente]. "', id_estado='".$_POST[id_estado]. "', id_municipio='".$_POST[id_municipio]. "'  where id_cliente=".$_SESSION[id_clienteLof4];
		$myvar->execute($sql);
		
		if($_POST[password]!=''){// cambiara password
			$sql9="update clientes set password='".sha1($_POST[password])."' where id_cliente=".$_SESSION[id_clienteLof4];
			$myvar->execute($sql9);
		}
		
	
		header("Location: registrar.php?msg=nuevo");

		exit();
}//if submit


?>

<script type="text/javascript">
 /*function validarFormulario(){
          $("#formulario").validate();
  }*/
       
$(document).ready(function(){

    $("#formulario").validate({
        rules: {
            nombre: { required: true, minlength: 2},
            apellidos: { required: true, minlength: 2},
            email: { required:true, email: true},
			password: {required: true,minlength: 2},
           password2: {required: true,minlength: 2,equalTo: password }
            
        },
        messages: {
            nombre: "Debe introducir su nombre.",
            apellidos: "Debe introducir su apellido.",
            email : "Debe introducir un email válido.",
            password : "Debe agregar password",
            password2 : "Deber verificar confirmacion de password"
        }
    });
});



</script>

<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


	 
<center><br>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >

             <p>Nombre*:</p>
             <p><input name="nombre" type="text" id="nombre"  placeholder="Pon tu nombre" autofocus  value=""/></p>
 
 <p>Apellidos*:</p>
             <p><input name="apellidos" type="text" id="apellidos" placeholder="Pon tus apellidos" autofocus  value=""/></p>
 
 
 <p>Email (usuario)*:</p>
             <p><input name="email" type="email" id="email"  placeholder="Pon tu Email" autofocus  value="<? echo $cliente[0][email]?>" disabled="disabled"/></p>
 
 <p>Password*:</p>
             <p><input name="password" type="password" id="password"  placeholder="Pon tu Password" autofocus  /></p>
 <p>Confirmar Password*:</p>
             <p><input name="password2" type="password" id="password2"  placeholder="confirma Password" autofocus  /></p>
 
                   
  <input type="hidden" name="status"  id="status"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Registrar" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
</form>
<br><br><br>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
