<? include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;
include("funciones-arriba.php"); ?>
<?php include("traductor.php"); ?>
    
    
<div class="txGrales">
    	<div class="container">
    	  <p><strong>Qué es Lofers!</strong></p>
    	  <p><strong>Lofers!</strong> es una red digital que incentiva <strong>la comunicación entre aquellas personas</strong> que han perdido alguna mascota o algún objeto (LOF) y otras que han encontrado LOF’s, esperando que haya coincidencias para reencontrar esos Animales y/o Cosas perdidas  con sus dueños.<br>
    	    Esta plataforma <strong>también ofrece la ayuda</strong> (por mínima que sea) que pueda brindar en el caso de personas perdidas o, bien, aquellas que son encontradas necesitando ayuda pues no saben cómo regresar a casa.<br>
   	      Aunque englobamos a personas, animales y cosas en el término LOF, dedicamos al rubro de personas un <strong>tratamiento especial, por la naturaleza delicada del tema</strong>, que podrás encontrar en el apartado sobre personas halladas y/o desaparecidas de nuestra <a href="<? echo $urlprincipal?>aviso">Política de Privacidad</a>. </p>
    	  <p>También se consideran <strong>avistamientos</strong> de LOF’s como información en general que sea de ayuda.</p>
    	  <p>Para hacer uso de nuestro servicio, tienes que registrarte <a href="<? echo $urlprincipal?>registro">Aquí</a>.</p>
    	  <p><strong>¿Qué me ofrece LOFERS!?</strong></p>
    	  <p>Ofrecemos un espacio popular donde los usuarios puedan <strong>subir su información</strong> de LOF’s perdidos y/o encontrados para buscar regresarlos con sus seres queridos o sus dueños. <br>
          <strong>Pero además</strong> de originar reportes de pérdidas y consultar aquellos de hallazgos, la Red Lofers! te ofrece el <strong>filtro de comparación</strong> entre ellos para facilitar, en dado caso, los reencuentros.</p>
    	  <p>El servicio <strong>puede ser usado por individuos</strong>, instituciones y organizaciones varias para reportar Pérdidas y/o Encuentros, Avistamientos e,<strong> incluso, generar</strong> ‘Sitios Virtuales’ para contribuir a los reencuentros entre quienes han perdido LOF’s como aquellos que, en su caso, los han encontrado.</p>
    	  <p>Recuerda, si tú intervienes para que algún LOF logre su reencuentro con sus seres queridos o sus dueños,<strong> ¡tú eres un LOFER!</strong></p>
    	  <p>Como lo notarás, la iniciativa de originar estos reportes sólo puede surgir del <strong>altruismo</strong> de la gente.<br>
   	      Comienza a ayudar y abre una <a href="<? echo $urlprincipal?>registro">cuenta en Lofers!</a></p>
    	  <br>
<p> <a href="<? echo $urlprincipal?>registro">Registrame en Lofers</a></p>

</div>
    </div>
