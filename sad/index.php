<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1">

<title>SAD </title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600' rel='stylesheet' type='text/css'>
<link href="css/login.css" rel="stylesheet" type="text/css" />
<script language="javascript" src="scriptaculous/lib/prototype.js"></script>
<!--[if lt IE 7]>

<script defer type="text/javascript" src="pngfix.js"></script>

<![endif]-->
<script language="javascript">
function procesaForm(){

if($('user').value=='' || $('pass').value==''){
/////////////////////////////////////////////////////

var url="autentificacion.php";
var parametros="inputs=no";
var peticion= new Ajax.Request(
url,
{
method: 'get',
parameters: parametros,
onComplete: function(respuesta){
$('respuesta').innerHTML=respuesta.responseText;
}
}
);
////////////////////////////////////////////////////////


}else{
var user=$('user').value;
var pass=$('pass').value;
var url="autentificacion.php";
var parametros="user="+user+"&pass="+pass;

var peticion= new Ajax.Request(
url,
{
method: 'post',
parameters: parametros,
onComplete: funcionReceptora
}
);



}



}

function funcionReceptora(respuesta){
if(respuesta.responseText=='valido'){
					eval("parent.location='inicio.php'");
					}else{
				$('respuesta').innerHTML=respuesta.responseText;
					}


}

</script>

</head>
<body onload="document.getElementById('user').focus();">


<form name="forma" id="forma"  enctype="multipart/form-data" method="post" action="autentificacion.php" onsubmit="return procesaForm();">
	<div class="iniciosesion">
	<img src="images/logo-lofers.png" />
    <h1><br />
	sistema de GESTIÓN</h1>
    <h2>Favor de iniciar sesión con  usuario y clave</h2>
    

<input name="user" type="text" class="textfield_effect" id="user" placeholder="Usuario"/></td>
<input name="pass" type="password" class="textfield_effect" id="pass" onkeyup="if(event.keyCode==13){ procesaForm(); }"  placeholder="Clave"/>

        <div class="bt-login">
        <a class="bt-entra" href="#" onclick="procesaForm();">Entrar</a>
        </div>
        <div id="respuesta"></div>
	</div>
</form>





<div id="pie">
<p>2016. LOFERS, Sistema de Administración Dinámica<br />
  Soporte: <a href="mailto:sistemas@wddconsultores.com"> sistemas@wddconsultores.com</a></p>
</div>
</body>
</html>