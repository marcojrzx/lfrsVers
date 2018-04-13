<? $urlprincipal="http://lofers.club/"; ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79391110-1', 'auto');
  ga('send', 'pageview');

</script>
<!DOCTYPE html>
<html lang="es">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><? echo $tituloGL; ?></title>
<link rel="icon" type="image/png" href="<? echo $urlprincipal?>favicon.png">

<!-- SEO EN META -->
<link rel="image_src" href="<? echo $urlprincipal?><? echo $imagenGL; ?>"/>

<meta name="description"			content="<? echo $descripcionGL; ?>">
<meta name="keywords"				content="<? echo $keywordsGL; ?>">
<meta http-equiv="Language"			content= "Spanish">
<meta http-equiv="Distribution"		content= "Global">
<meta http-equiv="Rating"			content= "General">
<meta http-equiv="Robots"			content= "ALL">
<meta http-equiv="Revisit-after"	content= "1 days">
<meta http-equiv="Author"			content= "LOFERS">
<meta name="twitter:card" content="summary" />

<meta name="twitter:site" content="@Lofers_club" />

<meta name="twitter:title" content="Mira lo que encontré" />

<meta name="twitter:description" content="Lo pierdes, lo buscas, lo encuentras." />

<meta name="twitter:image" content="tu imagen fija para mostrar.jpg" />
<!-- SEO EN OG: -->
<meta property="og:image"		content="<? echo $_SESSION[url].$imagenGL; ?>" />
<meta property="og:title"		content="<? echo $tituloGL; ?>" />
<meta property="og:description"	content="<? echo $descripcionGL; ?>" />


<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">

<!-- CSS para menu desplegable -->
<link href="<? echo $urlprincipal?>css/menu2.css" rel="stylesheet" type="text/css">

<!-- CSS de WDD -->
<link href="<? echo $urlprincipal?>css/estiloswdd7.css" rel="stylesheet" type="text/css">


<!-- CSS para menu responsivo -->
<link href="<? echo $urlprincipal?>css/menu-r2.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/bootstrap.css" rel="stylesheet" type="text/css">

<link href="<? echo $urlprincipal?>css/jquery.bxslider.css" rel="stylesheet" type="text/css">
<!--link href="css/nav.css" rel="stylesheet" type="text/css"-->

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
 	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
   <!-- JS PARA COMPARTIR WHATSAPP -->
<script type="text/javascript" src="<? echo $urlprincipal?>js/whatsapp-button.js"></script>

	<!-- JS PARA EL SLIDER -->
	<script src="<? echo $urlprincipal?>js/vendor/modernizr-2.6.2.min.js"></script> <!-- Modernizr -->
	<script src="<? echo $urlprincipal?>js/jquery.bxslider.min.js"></script>

	<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones_calendar.js"></script>
	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones.js"></script>
  <script language="JavaScript" src="<? echo $urlprincipal?>js/codigo.js"></script>
  <script language="JavaScript" src="<? echo $urlprincipal?>js/bootstrap.min.js"></script>


<style type="text/css">
    @media only screen and (max-width: 480px){
        #templateColumns{
            width:100% !important;
        }

        .templateColumnContainer{
            display:block !important;
            width:100% !important;
        }

        .columnImage{
            height:auto !important;
            max-width:480px !important;
            width:100% !important;
        }
    }
</style>

<script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.6";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

</head>

<body>


<? $sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1";
$clienteACTIVO=$myvar->get_arreglo($sql2);
?>
<div class="cabHeaderP">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td class="tdNO">
        	<img src="<? echo $urlprincipal?>images/menu1.png" class="p1izq">
        </td>
        <td width="100%">

        	<div class="c0cen">
            	<? if($_SESSION[id_clienteLof4]){?><? if($clienteACTIVO[0][foto]!=''){?>
        				<div class="imgLogoPers" style="background-image:url(<? echo $urlprincipal?>imagenes/clientes/<? echo $clienteACTIVO[0][foto]?>);">

                        </div>
				<? }?>

                <div class="dropdown">
                      <button onclick="myFunction()" class="dropbtn">
                     <? if($clienteACTIVO[0][ocultarNom]==1){// si lo quiere ocultar
						?>
						<? echo $clienteACTIVO[0][nombre]." ".$clienteACTIVO[0][apellidos];?>

						<? }else{ ?>
						<? echo $clienteACTIVO[0][nick]; ?>

						<? }
						?>
                      </button>
                      <div id="myDropdown" class="dropdown-content">
                        <a href="<? echo $urlprincipal?>mi-sitio">Mi sitio</a>
						<a href="<? echo $urlprincipal?>amigos"> Mis amigos / Lofriends</a>
                       <a href="<? echo $urlprincipal?>muro-de-anuncios">Muro de anuncios</a>
						<a href="<? echo $urlprincipal?>blog">Noticias/Testimoniales</a>
                        <a href="<? echo $urlprincipal?>mis-denuncias">Mis denuncias</a>
                   		<a href="<? echo $urlprincipal?>1/cerrar-sesion" style="color:red;">Cerrar sesión</a>
                      </div>
                    </div>
                    <div class="dropdown1">
                      <button onclick="myFunction1()" class="dropbtn1">
                     	<? if($clienteACTIVO[0][ocultarNom]==1){// si lo quiere ocultar
						?>
						... <!--img class="icoMenuP" src="images/icomenu.png"-->
                        <!--? echo $clienteACTIVO[0][nombre]." ".$clienteACTIVO[0][apellidos];?-->

						<? }else{ ?>
						... <!--img class="icoMenuP" src="images/icomenu.png"-->
                        <!--? echo $clienteACTIVO[0][nick]; ?-->

						<? }
						?>
                      </button>
                      <div id="myDropdown1" class="dropdown-content1">
                        <a href="<? echo $urlprincipal?>perfil">Mi perfil</a>
							 <a href="<? echo $urlprincipal?>ayuda">Ayuda</a>
						<a href="<? echo $urlprincipal?>como-funciona">Como funciona</a>
                        <a href="<? echo $urlprincipal?>consejos">Consejos Lofers</a>
						<a href="<? echo $urlprincipal?>perfil#fotoPerfil">Cambiar foto de perfil y cabecera</a>
                       	<a href="<? echo $urlprincipal?>condiciones">Condiciones</a>
                       	<a href="<? echo $urlprincipal?>aviso">Privacidad</a>
                       	 </div>
                    </div>
                     <? }?>

                    <div class="logointerno">
                    <a href="<? echo $urlprincipal?>mi-sitio">
                    <img src="<? echo $urlprincipal?>images/Logo3.png" border="0">
                    </a>
                    </div>
                    <div class="logointerno2">
                    <a href="<? echo $urlprincipal?>mi-sitio">
                    <img src="<? echo $urlprincipal?>icon-normal.png" border="0">
                    </a>
                    </div>

                <div class="traductor"><?php //include("traductor.php"); ?></div>
    			<!--a href="index.php"><img src="images/Logo3.png" border="0"></a-->
        	</div>

        </td>
        <td class="tdNO">
        	<img src="<? echo $urlprincipal?>images/menu1-03.png" class="p2der">
        </td>
      </tr>
</table>
</div>


<div class="container">
	<section>
