<?php
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: index.php?msg=3");
}


include("funciones-bd.php");

$myvar = new db_mysql;
$myvar->conectarBd();

include("general.php");

arriba();
?>


<div id="centros">

<h1>Sesión iniciada</h1>
<h2>Bienvenido, favor de seleccionar una opción del menú</h2>

</div>


<?php
abajo();
?>