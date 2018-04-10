<? include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 

include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");


$myvar = new db_mysql;
$myvar->conectarBd();
$html = new html;

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include("funciones-arriba.php"); ?>
	<?php include("traductor.php"); ?><div class="txGrales">
    	<div class="container">
    	  <p><strong>CONDICIONES DEL SERVICIO</strong></p>
    	  <p>Bienvenid@ a LOFERS! Si usas nuestro servicio,  <strong>aceptas automáticamente nuestras condiciones.</strong> El uso de nuestra plataforma requiere necesariamente abrir una cuenta en Lofers!, que tengas la edad mínima de 13 años y que sigas nuestras instrucciones para cada función. Abstente de usar Lofers! si no estás de acuerdo con nuestras condiciones y políticas pues (repetimos), <strong><span style="color: #FF0004">si usas nuestro servicio, aceptas automáticamente nuestras condiciones y políticas.</span></strong></p>
    	  <p>Debes accesar a nuestra Red sólo por la interfaz que ofrecemos, por ningún otro medio. Entiende que el hacer uso de Lofers! no te convierte en titular de la página ni del mismo servicio o de algún rubro del mismo, ni de la marca de la página ni de los derechos de propiedad intelectual de los anteriores ni tienes derecho de cambiar, dañar, modificar, borrar u ocultar cualquier material de nuestro servicio ni realizar cualquier acto que consideremos como alteración y/o mal uso de nuestros material y servicios. La copia, distribución, retransmisión, etc., de cualquier material de nuestra página está estrictamente prohibido sin nuestro consentimiento expreso y por escrito.<br>
    	    Si  a nuestro Servicio le das un uso que consideremos malintencionado será causa de suspensión o cancelación del mismo, la eliminación de tu cuenta en él y hasta canalización con las respectivas autoridades.<br>
   	      Prohibida la venta de cualquier contenido de esta página o de la misma, el lucro con su contenido, el uso comercial de nuestra web y/o los servicios y contenidos que en ella se ofrecen. Prohibido cualquier otro uso directo y/o indirecto de nuestra página, su contenido, su base de datos, etc., que no sea el que expresamente te ofrece Lofers!</p>
    	  <p>Tu acceso al  servicio de Lofers! es únicamente para tu uso personal. Son tu responsabilidad los detalles de accesos y contraseña de tu cuenta, a nadie las des, a excepción de un administrador de la web Lofers! También aceptas toda la responsabilidad por toda la actividad que ocurra bajo tu cuenta y/o contraseña. Te recomendamos uses una contraseña difícil y única de tu cuenta para prevenir el robo de la misma. Obviamente, si detectas alguna actividad inusual de tu cuenta, no la reconozcas y/o notes comprometida su confidencialidad, repórtanoslo inmediatamente a <a href="mailto:contacto@lofers.club">contacto@lofers.club</a> .</p>
    	  <p>Si lo consideramos necesario para la seguridad de nuestra red, nos reservamos el derecho de realizar cualquier acción como cerrar tu cuenta o comunicarnos contigo para requerir información y, al hacer uso de nuestros servicios, también nos deslindas de cualquier daño o responsabilidad que surja de estas acciones que realicemos.</p>
    	  <p>Lofers! es una plataforma web que fomenta el reencuentro de personas, animales y/o cosas (LOF’s) con sus seres queridos y/o dueños a partir de la generación de anuncios y la comparación mediante filtros de búsqueda entre ellos; el ingreso de datos, información y contenido en general es voluntario, tu plena responsabilidad y decisión a partir de la naturaleza del tipo de circunstancias y situaciones concernientes al uso del servicio de esta página web Lofers!</p>
    	  <p>Tus datos en Lofers! se rigen a partir de nuestra Política de Privacidad; al usar nuestro servicio nos autorizas el tratamiento de tus datos como se expone en nuestra <a href="<? echo $urlprincipal?>aviso">Política de Privacidad</a>.</p>
    	  <p>En cuanto a tu contenido que se exhibe en Lofers!: Todo material que subas y almacenes podrá ser usado por Lofers! para la promoción y mejora de nuestra página y nuestros servicios. Al abrir una cuenta y subir material nos autorizas nacional e internacionalmente para hacer uso de él, reproducirlo, modificarlo o alterarlo parcial o totalmente, publicarlo y distribuirlo (como en el caso de nuestra promoción a partir de los reencuentros entre LOF’s y LOFERS) desde el momento en que haces uso de nuestros servicios, al abrir una cuenta y aún después de cerrarla. Abstente de usar Lofers! si no estás de acuerdo.<br>
    	    Tú seguirás  manteniendo (si los tienes) los derechos de autor y/o propiedad intelectual de todo el contenido que subas y, si crees que alguien infringe tales derechos, notifícanoslo a <a href="mailto:contacto@lofers.club">contacto@lofers.club</a> . Para tales derechos nos regimos por la Ley Federal del Derecho de Autor de México.<br>
    	    Obviamente, en el caso de la información e imágenes de personas perdidas y/o encontradas, nos regimos a partir de la Ley Federal de Protección de Datos Personales en Posesión de Particulares de México.</p>
    	  <p>CUALQUIER IMAGEN INADECUADA, VIDEO INADECUADO Y/O VIOLACIÓN DE LAS CONDICIONES DEL SERVICIO DE LOFERS! Y/O DE SU POLÍTICA DE PRIVACIDAD SERÁN CAUSA DE ELIMINACIÓN DE TU CUENTA Y TODO LO REFERENTE A ELLA.<br>
    	    Y también te invitamos a Denunciar a cualquier usuario que notes que incurra en esta falta.</p>
    	  <p>Lofers! se reserva el derecho a emitir los resultados de reencuentros como promoción principal de la página. </p>
    	  <p><strong>NOTA IMPORTANTE:</strong></p>
    	  <p>La Red Lofers! ofrece un servicio de Buena Fe. Sin embargo, el principal conductor es la voluntad de las personas que decidan ayudar a otras a reencontrarse con sus LOF‘s. <strong>Esto no te asegura</strong>, repetimos <strong><span style="color: #FF0004">NO ES UNA GARANTÍA</span></strong> de que recuperarás algo. <br>
    	    Sabemos que hay muchas personas que, tristemente, deciden no regresar a sus dueños algo que hayan encontrado, aún contando con esa posibilidad.<br>
   	      Lo único que podremos hacer es fiarnos de todos aquellos que decidan portarse de manera altruista y deseen ayudar a que las personas, los animales o cosas perdidas regresen con sus dueños.</p>
    	  <p>Habrá muchos amantes de lo ajeno que querrán aprovecharse de la oportunidad de hacerse de algo que no es suyo al mentir e inventar que les pertenece tal o cual LOF.<br>
    	    Podrás encontrar algunos tips para prevenir esto en la sección de <a href="<? echo $urlprincipal?>consejos">Consejos para Evitar Estafas</a><br>
   	      Y, recuerda, ¡Cuida Siempre de tus cosas! Encuentra aquí <a href="<? echo $urlprincipal?>consejos">Consejos para Evitar Pérdidas</a></p>
    	  <p>Una vez que sí te hayas reencontrado con tu LOF perdido, tendrás <strong>la responsabilidad</strong> de generar una anécdota describiendo el proceso de pérdida y reencuentro con tu LOF o, bien, algunas palabras concernientes al tema como un agradecimiento al usuario que te ayudó a lograr el reencuentro o a la misma Red Lofers!</p>
    	  <p>De la misma forma en que generas tus anuncios y el sistema Lofers! busca coincidencias comparándolos con los existentes y te hacemos llegar los resultados, cada que te hagamos llegar anuncios a partir de tus propias búsquedas y/o de las categorías de interés, tienes la responsabilidad de abrirlos, checar su contenido y verificar si tienes o no información que ayude al reencuentro del respectivo LOF con sus seres queridos y/o dueños. Contribuye con tu altruismo dando a otros usuarios la buena atención y consideración que querrías para ti.</p>
    	  <p>Cualquiera de nuestras Condiciones de Uso del Servicio puede cambiar sin previo aviso pero encontrarás en este apartado una notificación de actualización.</p>
    	  <p> <a href="javascript:history.back()">Regresa a la página</a></p>

</div>
    </div>
<? include("funciones-abajo.php");?>