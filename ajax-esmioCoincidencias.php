<? 
session_start();
$urlprincipal="http://lofers.club/"; 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();


if($_GET['esmio']){


?>

<table width="100%" border="0">
  <tr>
    <td> <form action="<? echo $urlprincipal?>coincidencias" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar Comentario:</p>
             <p><input name="comentarioEsmio" type="text" id="comentarioEsmio"  placeholder="comentario" autofocus /></p>
 			 <input type="hidden" name="esmio"  id="esmio"/>
              <input type="hidden" name="id_anuncio"  id="id_anuncio" value="<? echo $_GET[id]?>"/>
               <input type="hidden" name="idOri"  id="idOri" value="<? echo $_GET[idOri]?>"/>
 <p id="bot"><input name="botonesmio" type="submit" id="botonesmio" value="Es Mio" class="boton"  
 onclick="document.getElementById('esmio').value = '1';"/></p>
		</form> </td>
    
  </tr>
</table>
<? }?>