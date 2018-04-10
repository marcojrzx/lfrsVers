<? session_start();
if($_SESSION[id_clienteLof4]){
	//header("Location: ".$urlprincipal."muro-de-anuncios");
}
$urlprincipal="http://lofers.club/"; $tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";
include("sad/funciones.php");

?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><? echo $tituloGL; ?></title>
<link rel="icon" type="image/png" href="<? echo $_SESSION[url];?>favicon.png">

<!-- SEO EN META -->
<link rel="image_src" href="<? echo $_SESSION[url].$imagenGL; ?>"/>

<meta name="description"			content="<? echo $descripcionGL; ?>">
<meta name="keywords"				content="<? echo $keywordsGL; ?>">
<meta http-equiv="Language"			content= "Spanish">
<meta http-equiv="Distribution"		content= "Global">
<meta http-equiv="Rating"			content= "General">
<meta http-equiv="Robots"			content= "ALL">
<meta http-equiv="Revisit-after"	content= "1 days">
<meta http-equiv="Author"			content= "LOFERS">

<!-- SEO EN OG: -->
<meta property="og:image"		content="<? echo $_SESSION[url].$imagenGL; ?>" />
<meta property="og:title"		content="<? echo $tituloGL; ?>" />
<meta property="og:description"	content="<? echo $descripcionGL; ?>" />

<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/estiloswdd3.css" rel="stylesheet" type="text/css">
<link href="<? echo $urlprincipal?>css/jquery.bxslider.css" rel="stylesheet" type="text/css">

<link href="http://www.lofers.club/apple-touch-icon.png" rel="apple-touch-icon" />
<link href="http://www.lofers.club/icon-hires.png" rel="icon" sizes="192x192" />
<link href="http://www.yoursite.com/icon-normal.png" rel="icon" sizes="128x128" />

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
 

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    
	<!-- JS PARA EL SLIDER -->
	<script src="<? echo $urlprincipal?>js/vendor/modernizr-2.6.2.min.js"></script> <!-- Modernizr -->
	<script src="<? echo $urlprincipal?>js/jquery.bxslider.min.js"></script>

	<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones_calendar.js"></script>
	<script language="JavaScript" src="<? echo $urlprincipal?>js/funciones.js"></script>
  	<script language="JavaScript" src="<? echo $urlprincipal?>js/codigo.js"></script>

    

<script language="javascript">
function procesaForm(){
	
	if(document.getElementById('user').value=='' || document.getElementById('pass').value==''){
		var parametros = {
                "inputs" : "no",
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'get',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#respuesta").html(response);
                }
        });
		
	}else{
		
		var parametros = {
                "user" : document.getElementById('user').value,
                "pass" : document.getElementById('pass').value
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>autentificacion.php',
                type:  'post',
                beforeSend: function () {
                        $("#respuesta").html("<div class='cargandoinfo'><img src='<? echo $_SESSION[url];?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                      if(response=='valido'){
							eval("parent.location='anuncios.php'");
						}else{
							$("#respuesta").html(response);
						}
					  
					   
                }
        });
	
		
	}//else
}//funcion

</script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-79391110-1', 'auto');
  ga('send', 'pageview');

</script>
</head>
 
<body>


<div class="cabHeaderP">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
        	<img src="<? echo $urlprincipal?>images/menu1.png" class="p1izq">
        </td>
        <td width="100%">
        	<div class="c0cen" style="margin-bottom: 3px;">
            	<div class="logointerno">
                <img src="<? echo $urlprincipal?>images/Logo3.png" border="0">
                </div>
                <div class="logointerno2">
                <img src="<? echo $urlprincipal?>icon-normal.png" border="0">
                </div>
                <!--div class="traductor"><!--?php include("traductor.php"); ?></div-->
    			<!--a href="index.php"><img src="images/Logo3.png" border="0"></a-->
        	</div>
        </td>
        <td>
        	<img src="<? echo $urlprincipal?>images/menu1-03.png" class="p2der">
        </td>
      </tr>
</table>
</div>

 
<div class="container">
 
	<section class="wB">

	<div class="registroH">
			<ul>
				<li><input type="text" placeholder="Usuario" required id="user" name="user" /></li>
				<li><input type="password" placeholder="Clave" required id="pass" name="pass" onkeyup="if(event.keyCode==13){ procesaForm(); }" /></li>
				<li>
               <a class="btop gr" href="#" onclick="procesaForm();" >Entrar</a><div id="respuesta"></div></li>
				<li><a href="<? echo $urlprincipal?>registro" class="btop cf">Registrarme</a></li>
                
				 <li><a href="<? echo $urlprincipal?>recuperacion" class="linkGral2">¿Olvido Contraseña?</a></li>
               
			</ul> 
            
    </div>
    



    <div class="txSlogan txSH">
        ¿Perdiste o encontraste algo?
    </div>

    <center>
    	<img src="<? echo $urlprincipal?>images/Logo_Home2.png" class="imgLH">
        <br>
        <a href="<? echo $urlprincipal?>queeslofers" class="btop cf">¿Qué es Lofers?</a>
            
            
    </center>
   
    
 	</section>
	
    
    <aside>
<center>
<!-- EMPIEZA SLIDER (CARRUSEL DE IMAGENES) -->
		<div class="carruselP">
            <ul class="bxslider">
                <?
				 include("sad/funciones-bd.php");
				$myvar = new db_mysql;
				$myvar->conectarBd();
				?>
                <? 
				if($_SESSION[id_clienteLof4]){
				
				include "arrayAnuncios.php";
				$sql=" select * from anuncios where activo=1 and ".$caaa." and id_statusAnuncio=1  
				order by  RAND() limit 5"; 
				
				
				 }else{// no esta registrado
				 
					$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
					and id_aquienComparte=1 order by id_anuncio desc ";  // solo los publicos
					
				
				 }
				 
				  $anuncios=$myvar->get_arreglo($sql);
				  
				  
				
				for($i=0; $i<count($anuncios); $i++){
					
					$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios[$i]['id_anuncio']." order by fotoPrincipal desc limit 1";
					 $imagen=$myvar->get_arreglo($sql2);
					 
					 $sql2=" select * from estados where activo=1 and id_estado=".$anuncios[$i]['id_estado']." limit 1";
					 $es=$myvar->get_arreglo($sql2);
					 $sql2=" select * from municipios where activo=1 and id_municipio=".$anuncios[$i]['id_municipio']." limit 1";
					 $mun=$myvar->get_arreglo($sql2);
					 ?>
                <li><div class="fdoPback unPback<? echo $i;?>">
               
               <? if($imagen[0][imagen]!=''){
				   $imbn=$imagen[0][imagen];
             }else{ $imbn="sf.jpg";}//else?>
               
                <style>.unPback<? echo $i;?> {
    background-image: url("<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imbn;?>");
}</style>
                <div class="txPback">
				<p><? echo $anuncios[$i]['titulo']?></p>
                <p>
				<? echo $mun[0]['nombre'].", ".$es[0]['nombre']."  ".obtenerfecha($anuncios[$i]['fechaSuceso'])?>
                </p>
                
                </div>
                <div class="infoPback">
				<? if($_SESSION[id_clienteLof4]){?><a href="<? echo $urlprincipal?><?  echo $anuncios[$i]['id_anuncio']?>/anuncio">
                Si tienes info click aquí</a>
                <? }else{?>
                <a href="<? echo $urlprincipal?><?  echo $anuncios[$i]['id_anuncio']?>/autenticacion">
                Si tienes info click aquí</a>
                <? }?></div></div></li>
                <? }?>
            </ul>
        </div>
	<!-- TERMINA SLIDER (CARRUSEL DE IMAGENES) -->
    
    </center>
</aside>
 
	<footer>
		
	</footer>
</div>

<? include("footer.php"); ?>


</body><!-- LAS ANIMACIONES PERSONALES DEL SITIO -->
<script src="<? echo $urlprincipal?>js/animaciones.js"></script>


</html>