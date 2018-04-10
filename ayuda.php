<? include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 
if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;
include("funciones-arriba.php"); ?><div class="txGrales">
    	<div class="container">
    	  <p><strong>AYUDA / PREGUNTAS FRECUENTES</strong></p>
    	  <p><a href="<? echo $urlprincipal?>queeslofers">¿Qué es LOFERS!  y qué me ofrece?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#que">¿Qué significa LOFER, LOF y LOFRIEND?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#anuncios">¿Qué tipo de Anuncios puedo realizar en mi página LOFERS!? </a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#informa">¿Puedo reportar un LOF (animal o cosa perdida) que no tengo conmigo, sólo lo vi?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#genera">¿Cómo genero/elimino un Anuncio?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#coincide">¿Cómo sé si tengo más de una coincidencia en mis resultados?</a><br>
    	    <br>
          <a href="<? echo $urlprincipal?>como-funciona#agregar">¿Cómo cargar fotos o video a un Visor de Anuncios?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#quienes">¿A quiénes van dirigidos mis anuncios?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#ver">¿Cómo puedo ver si mis Anuncios encuentran alguna Coincidencia?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#contacto">Una vez que obtuve una Coincidencia o información, ¿cómo me contacto con el Lofer Informante? </a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#amigo">¿Puedo tener contactos o amigos en Lofers!?</a><br>
    	    <br>
          <a href="<? echo $urlprincipal?>como-funciona#sus">¿Puedo suscribirme a algún Sitio Lofers!?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#comparte">¿Puedo publicar mis anuncios en redes sociales?</a></p>
    	  <p><a href="<? echo $urlprincipal?>como-funciona#elimina">¿Cómo elimino mi cuenta?</a><br>
  	    </p>
    	  <p><strong>¿No encontraste tu respuesta?  CONTACTO Lofers!</strong></p>
    	  <p>Alguna nota, duda, sugerencia, queja, feedback, saludos y demás, podemos recibirlas en <a href="mailto:contacto@lofers.club">contacto@lofers.club</a></p>
    	  <p>Es la única forma de ponerte en comunicación con nosotros. Trataremos de responderte tan pronto como nos sea posible.</p>
    	  <p> <a href="javascript:history.back()">Regresa</a></p>

</div>
    </div>
<? include("funciones-abajo.php");?>