<? 
include("Auth/nxs_auth.inc.php");
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
          <p><strong>AVISO DE PRIVACIDAD</strong></p>
          <p>En este apartado te explicamos la forma en que usamos los datos que nos otorgas así como nuestra política al respecto. Todo esto conforme a la Ley Federal de Protección de Datos Personales en Posesión de Particulares (LFPDPPP, México).<br>
            Al abrir una cuenta en Lofers! y hacer uso de nuestra página y sus servicios, automáticamente aceptas nuestros términos respecto a las Condiciones del Servicio y a la presente Política de Privacidad. Si no estás de acuerdo, abstente de usar nuestra plataforma.</p>
          <p><strong>PRIVACIDAD Y SU POLÍTICA EN LOFERS!</strong></p>
          <p>Para usar nuestro servicio, nos proporcionas un nombre con el cual se registrará tu cuenta y uno más para que los usuarios de esta red te identifiquen (NICK); para ambos, bien puedes usar un pseudónimo, apodo, alias o un nombre real, esa será tu decisión. <br>
            Pero más importantes en este tema son los datos que proporcionas para ser contactado por otros usuarios, información como algún correo electrónico, sitio web y/o teléfono. </p>
          <p>La primer función que tiene la información que nos das al abrir tu cuenta es, exclusivamente, para poder generar un contacto con el que puedas acceder a nuestro servicio y también podamos comunicarnos contigo. Para eso requerimos, mínimo, una cuenta de correo electrónico y/o teléfono. Ésta es obligatoria por razones obvias y es a éste contacto que enviaremos las notificaciones de coincidencias de reportes y para cualquier asunto particular con tu cuenta.</p>
          <p>Debes crear una clave, contraseña o password que te permitirá accesar  a tu cuenta junto con tu correo electrónico. Eres completamente responsable de la creación, confidencialidad y uso de tu contraseña y de las acciones y consecuencias generadas a partir de ésta por lo cual te recomendamos el buen cuidado de tu contraseña.</p>
          <p>Después de eso, por la naturaleza de este sitio web, requerimos datos que son destinados a hacer llegar tu información (de cada anuncio generado) a otras personas así como el que éstas últimas puedan comunicarse contigo y facilitar el que ambas partes puedan ayudarse a lograr el reencuentro de personas, animales y/u objetos perdidos con sus seres queridos y/o sus respectivos dueños.<br>
            Es tu decisión y plena responsabilidad el tipo de información proporcionada tomando en cuenta que otros usuarios podrán tener acceso a ella con la finalidad de comunicarse, en su caso, contigo.</p>
          <p>Aquí, te ofrecemos opciones para que decidas el alcance que tendrá la exhibición de tu información. </p>
          <p>Al ingresar tus datos de contacto para que puedan localizarte otros usuarios. La única opción obligatoria que quedará a la vista de los demás usuarios es la del correo electrónico que nos proporciones. Te damos la opción de ocultar el nombre proporcionado y mostrar sólo tu Nick y también la opción de ocultar (si es que nos lo proporcionaste) tu teléfono. Te repetimos que tú decides si la información de nombre, apellidos, teléfono que nos proporciones es real o ficticia, apodos, etc.</p>
          <p>Debes ser consciente de que nuestro servicio no puede controlar el mal uso que le den otros usuarios a la información que decidas exhibir en tu sitio y en tus anuncios, por ejemplo, que llamen a algún número que hayas proporcionado, solamente para molestar. <br>
            En este caso, sólo podremos confiar en la madurez y el altruismo de los demás miembros. </p>
          <p>De igual forma comentado en las Condiciones de Uso de nuestro Servicio, te invitamos a denunciar a quien(es) creas que violan nuestras Condiciones del Servicio y nuestra Política de Privacidad y a cualquier usuario que se comporte de manera inadecuada, obscena o sospechosa. También te pedimos que trates respetuosamente los datos, información y contenido de otros usuarios a los que tengas acceso prohibiéndote (y a cada usuario) tajantemente la transmisión a terceros de tales datos, información y/o contenido (así como su uso indebido) sin el consentimiento expreso del usuario en cuestión pues serás la única persona responsable de toda consecuencia de cualquier tipo en que dichos actos derivasen.</p>
          <p>También te pedimos una imagen con la que gustes identificar tu cuenta frente a los demás usuarios. Esta función es opcional y puedes mantener ese espacio vacío; por lo pronto, la exhibición de esta imagen es pequeña y se muestra con tu nombre o tu Nick y en la información general de tu sitio. <br>
            Puedes o no ingresar también alguna imagen como cabecera de tu Sitio en Lofers! </p>
          <p>Igual de importante es la información, imágenes, videos y contenido en general que ingresas en los anuncios de LOF’s perdidos, encontrados o avistamientos.<br>
            Por la naturaleza del servicio, la información, imágenes, videos y contenido que ingreses al generar anuncios en Lofers! es más útil mientras más fiable sea pero recuerda que tales anuncios serán exhibidos a más gente, usuarios Lofers! que podrán apreciarlos como resultado de comparación con los que ellos generen. <br>
            Es por eso que debes ser muy cuidados@ del tipo de información y contenido que ingreses pues serás completamente responsable por sus consecuencias y resultados pues es tu plena voluntad y decisión subir tal información y contenido para que sea exhibida a más gente.</p>
          <p>Es importante mencionar que, para este caso, te damos las opciones de compartir tus anuncios con Público General, Amigos (para que selecciones específicamente cuáles amigos), Un Amigo, Amigos de tu Estado y Amigos de tu Municipio. Tú decides a quién(es) compartir tus anuncios.</p>
          <p><strong>Sobre personas halladas y/o desaparecidas</strong></p>
          <p>El tema <span style="color: #FF0004"><strong>más delicado</strong></span> a tratar en nuestra Política de Privacidad es respecto a la información y contenido de personas halladas y/o desaparecidas. Cualquiera que haga uso de la red Lofers! a este respecto estará sujeto, como nosotros, al cumplimiento de los principios de protección de datos personales que indica la LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de Particulares) y de su Reglamento en México. </p>
          <p>El artículo 16 de la Carta magna de la Constitución Política de los Estados Unidos Mexicanos, en su segundo párrafo, establece el derecho que toda persona tiene a la protección de sus datos personales en los términos siguientes: </p>
          <p><strong>“Artículo 16. […] </strong><br>
            Toda persona tiene derecho a la protección de sus datos personales, al acceso, rectificación cancelación de los mismos, así como a manifestar su oposición, en los términos que fije la ley, la cual establecerá los supuestos de excepción a los principios que rijan el tratamiento de datos, por razones de seguridad nacional, disposiciones de orden público, seguridad y salud públicas o para proteger los derechos de terceros. <br>
          […]”</p>
          <p>Es muy importante la consideración sobre el tratamiento de datos personales referentes a personas perdidas o desaparecidas en atención a lo dispuesto por la normativa aplicable en materia de datos personales, en particular en aquellos casos en que los titulares no puedan manifestar su consentimiento ya sea porque están ausentes o porque se trata además de personas que no tienen capacidad jurídica conforme a la ley para manifestar su consentimiento, como es el caso de menores de edad.</p>
          <p>Te dejamos aquí los links tanto de la LFPDPPP <a href="http://inicio.ifai.org.mx/LFPDPPP/LFPDPPP.pdf" target="_blank">http://inicio.ifai.org.mx/LFPDPPP/LFPDPPP.pdf</a> así como de su reglamento <a href="http://inicio.ifai.org.mx/PROTECCIONDEDATOSPERSONALES/RLFPDPP.pdf" target="_blank">http://inicio.ifai.org.mx/PROTECCIONDEDATOSPERSONALES/RLFPDPP.pdf</a><br>
          Podrás consultarlos y estar al tanto de las disposiciones y normativa aplicable en materia de datos personales.</p>
          <p>Al contrario, en el caso de que notes que otro usuario está haciendo uso de datos personales y/o imágenes tuyas, notifícanoslo inmediatamente al correo <a href="mailto:contacto@lofers.club">contacto@lofers.club</a><br>
            También tienes la opción de <strong>Denunciar Anuncio</strong> que es un botón ubicado en la parte superior de la pantalla que exhibe el visor de imágenes en los anuncios de Lofers! Nosotros pediremos la información correspondiente y le daremos seguimiento a estos casos.</p>
          <p>Acerca de tu información en el apartado Noticias/Testimoniales donde se ubican noticias y anécdotas de Reencuentros:<br>
            Esperando que tus anuncios de Pérdidas y Hallazgos lleguen a buen fin que sería el Reencuentro de LOF’s perdidos y/o encontrados con sus seres queridos y/o respectivos dueños, te invitaremos a escribir algunas palabras al respecto para compartirlas con toda la Comunidad Lofers! así como el público en general; de la misma forma y si así lo deseas, podrás compartir algunas imágenes junto con tu anécdota.</p>
          <p style="color: #FF0004"><strong>Lofers! se reserva el derecho a emitir los resultados de Reencuentos como promoción principal de la página.</strong></p>
          <p>Una vez cerrado el ciclo del servicio Lofers!, llegando a un reencuentro o bien, por cualquier motivo decidas suspender la búsqueda, te recomendamos insistentemente que cierres el anuncio en cuestión pues, entre menos tiempo se exhiban datos tan importantes, mejor. Tan pronto cierres y elimines el anuncio, dejará de estar disponible su contenido.</p>
          <p>CUALQUIER IMAGEN INADECUADA, VIDEO INADECUADO Y/O VIOLACIÓN DE LAS CONDICIONES DEL SERVICIO DE LOFERS! Y/O DE SU POLÍTICA DE PRIVACIDAD SERÁN CAUSA DE ELIMINACIÓN DE TU CUENTA Y TODO LO REFERENTE A ELLA.</p>
          <p>Y también te invitamos a Denunciar a cualquier usuario que notes que incurra en esta falta.<br>
            Desde que abres tu cuenta y haces uso de la web Lofers! nos autorizas el acceso, de manera ilimitada, a toda y cualquier información, contenido y material que hayas ingresado a tu cuenta y a la actividad que realices en ella. También tendrás acceso a la información de perfil proporcionada para actualizarla (excepto tu correo electrónico, éste último siempre será tu nombre de acceso para la cuenta que bajo ese correo creaste) y al contenido ingresado en los anuncios para editarlo o borrarlos.</p>
          <p>Si lo requiere, esta falta también puede ocasionar que canalicemos el caso con las autoridades pertinentes con quienes siempre estaremos dispuestos a cooperar. Así pues, debes tener consciencia de que en caso de sernos requeridos por las autoridades competentes, les revelaremos tus datos, información y/o cualquier contenido en tu cuenta así como toda información generada o derivada de ella como correos electrónicos o cualquier tipo de actividad relacionada con tu cuenta en nuestra plataforma Lofers! <br>
            Procuremos el mejor comportamiento por el bien de nuestras sociedades.</p>
          <p>Protegeremos tu información con los métodos legales que estén en nuestras manos pero no nos responsabilizaremos por cualquier daño, perjuicio, reclamación, interpretación, uso indebido de nuestros servicios, información y/o contenido cualquiera exhibido en Lofers!, actividad indebida o sospechosa, cualquier daño de cualquier tipo a cualquier persona, animal, objeto, empresa y/o cualquier entidad física, moral y/o de cualquier tipo a partir de la actividad generada y/o derivada a partir de nuestra plataforma Lofers! y mucho menos de cualquier otro tipo de actividad incluyendo aquella de tipo ilegal que pueda violar nuestro sistema y extraer cualquier información y/o contenido de cualquier usuario así como de cualquier tipo de uso que de ella hagan y/o cualquier actividad que de esto derive.</p>
          <p>Con otras palabras y para que lo tengas muy claro, es plena decisión y total responsabilidad de cada usuario el subir información importante y delicada de terceros y de las consecuencias y actos que eso genere. La página Lofers! no tiene responsabilidad alguna tal y como sucede en distintas redes sociales en que la gente ha decidido exhibir información importante de sus seres queridos, es responsabilidad total de los usuarios el hecho de subir esa información (y toda consecuencia de cualquier tipo que de aquello genere y/o derive) a las páginas web y no de éstas últimas.</p>
          <p>El hacer uso de nuestra página Lofers! implica haber leído y aceptado tanto nuestras Condiciones del Servicio como nuestra Política de Privacidad y nos deslindas de cualquier responsabilidad. Si no estás de acuerdo, abstente de usar Lofers!</p>
          <p>CAMBIOS AL AVISO DE PRIVACIDAD</p>
          <p>Cualquiera de nuestras Políticas de Privacidad puede cambiar sin previo aviso pero encontrarás en este apartado una notificación de actualización de nuestro Aviso de Privacidad.</p>
          
  
  <a href="javascript:history.back()">Regresa a la página</a>
  
</div>
    </div>
<? include("funciones-abajo.php");?>