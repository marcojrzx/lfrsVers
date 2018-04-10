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
include("funciones-arriba.php"); ?>
<?php include("traductor.php"); ?>
<div class="txGrales">
    	<div class="container">
    	  <p><strong>BIENVENIDO A LOFERS!  ASÍ FUNCIONA NUESTRA RED:</strong></p>
    	  <p>Bienvenido a nuestro servicio <strong>Lofers!</strong> En él, podrás compartir anuncios de Pérdidas o Hallazgos de Animales y/o Cosas, así como reportar avistamientos e información concerniente al mismo tema. ¡TODO ESO EN UNA MISMA CUENTA!</p>
    	  <p>(Sí, también se puede compartir información acerca de personas perdidas/encontradas por lo cual también incluiremos a personas en nuestro término <strong>LOF</strong>)<br>
  	    </p>
    	  <p id="que"><strong>PARA TU CONOCIMIENTO (denominaciones)</strong></p>
    	  <p><strong>LOF</strong> – Para una interacción más ágil con nuestro servicio, reuniremos a las opciones de Persona, Animal y/o Cosa perdida o hallada con el término <strong>LOF</strong>. Usaremos <strong>LOF</strong> para referirnos a cualquiera de las anteriores opciones o a más de una de ellas.</p>
    	  <p><strong>LOFER</strong> – A cada opción en que<strong> una o más personas</strong> ayudan para que otras obtengan información para reencontrarse con sus LOF’s a través de esta página, la denominamos <strong>LOFER</strong>.</p>
    	  <p><strong>Lofriend</strong> – A tus contactos o amigos en LOFERS! los denominamos <strong>Lofriend</strong>.</p>
    	  <p><strong>Editar</strong> – Cada que cambies información en tu perfil o edites algún campo de tus anuncios, tienes que <strong>guardar los cambios</strong>.<br>
  	    </p>
    	  <p id="anuncios"><strong>FUNCIONES/ANUNCIOS DE MI PÁGINA EN LOFERS!</strong></p>
    	  <p>Ahora enlistamos los tipos de <strong>Lofers</strong> que te ofrecemos y con los cuales tú y la gente en general ayudarán a más personas en la búsqueda de sus LOF’s:</p>
    	  <p>¿<strong>Perdiste</strong> un LOF? Eres  <strong style="color: #FF0004">LOFER 1 (PÉRDIDAS) </strong></p>
    	  <p>Si eres <strong>Lofer1</strong>, te ofrecemos un espacio popular donde podrás encontrar la información que comparten cibernautas acerca de LOF’s hallados. Esto incluye datos e imágenes que establecimientos, colegios, instituciones e individuos suben a la red para que los LOF’s regresen con sus dueños o seres queridos.<br>
   	      Podrás checar los anuncios que generes como Lofer1 en tu carpeta <strong>MIS PÉRDIDAS</strong>.</p>
    	  <p>¿<strong>Encontraste</strong> un LOF? Eres un <strong>INFORMANTE</strong>; hay 3 tipos de Informante:<strong> Lofer 2, 3 y 4</strong></p>
    	  <p><strong>Informante   <span style="color: #FF0004">LOFER 2 (HALLAZGO EMPRESAS)</span></strong></p>
    	  <p>Para <strong>EMPRESAS</strong> (Establecimientos, colegios, instituciones, etc.) que ofrecen a los usuarios Lofer 1 recuperar los LOF’s perdidos <strong>en sus instalaciones</strong>.<br>
    	    Si eres <strong>Lofer2</strong>, en nuestro espacio podrás exhibir todos los LOF’s que tus usuarios pierdan u olviden en tu negocio, empresa y/o institución. Este servicio siempre es un Plus para consentir a tus clientes y para mostrarte como un lugar altruista e interesado por tus consumidores.<br>
    	    Compararemos la información que subas con aquella de los reportes de usuario Lofer1, quienes hayan extraviado LOF’s.<br>
   	      Podrás checar los anuncios que generes como Lofer2 en tu carpeta <strong>MIS HALLAZGOS (EMPRESA)</strong></p>
    	  <p><strong>Informante   <span style="color: #FF0004">LOFER 3 (HALLAZGO PERSONAS)</span></strong><br>
    	    <strong>INDIVIDUOS</strong> lofer que encuentran uno o más LOF’s y <strong>los mantienen con ellos</strong> o saben específicamente la ubicación de estos LOF’s.<br>
    	    Compararemos la información que subas con aquella de los reportes de usuario Lofer1, quienes hayan extraviado LOF’s.<br>
   	      Podrás checar los anuncios que generes como Lofer3 en tu carpeta <strong>MIS HALLAZGOS (PERSONA)</strong></p>
    	  <p id="informa"><strong>Informante   <span style="color: #FF0004">LOFER 4 (AVISTAMIENTOS) </span></strong><br>
    	    Para usuarios que <strong>sólo  tienen información</strong> y/o el <strong>avistamiento</strong> de un LOF y quieren compartir estos datos para el rápido regreso del LOF en cuestión con sus dueños o con sus seres queridos.<br>
    	    Por ejemplo, si viste un coche abandonado en cierto lugar y puedes reportar esa información pero no llevar contigo el vehículo.<br>
    	    Te recomendamos <strong>siempre tomar fotos o videos como Lofer4.</strong><br>
    	    Compararemos la información que subas con aquella de los reportes de usuario Lofer1, quienes hayan extraviado LOF’s.<br>
    	    Podrás checar los anuncios que generes como Lofer4 en tu carpeta <strong>MIS AVISTAMIENTOS</strong>
  	    </p>
    	  <p><strong>Cada una</strong> de éstas opciones, que puedes usar<strong> desde una misma cuenta,</strong> requerirá de la <strong>creación de anuncios</strong> que exhiban las características de los LOF’s en cuestión.<br>
   	      Cuando a tu cuenta lleguen anuncios de otros usuarios <strong>tendrás la responsabilidad de checarlos</strong> como lo dicen nuestras <a href="<? echo $urlprincipal?>condiciones">Condiciones del Servicio</a></p>
    	  <p>Notarás una quinta carpeta llamada Muro de Anuncios en la cual podrás apreciar todos los anuncios marcados como públicos y entre los cuales también podrás buscar alguno en específico a partir de los parámetros de Título y/o Características.<br>
  	    </p>
    	  <p id="genera"><strong>CÓMO GENERAR ANUNCIOS EN LOFERS!</strong></p>
    	  <p>Desde cualquier carpeta (Pérdidas, Hallazgos (Empresa), Hallazgos (Persona) y Avistamientos), encontrarás la opción de <strong>Generar Anuncio</strong>, ese botón, te llevará al <strong>VISOR DE ANUNCIOS</strong> que usamos para mostrar la información que subes de tus LOF’s. </p>
    	  <p>Llena los campos (eligiendo el tipo de reporte entre los <strong>4 Tipos de Anuncios</strong> que ofrecemos); si alguno no va con el objetivo de tu reporte, <strong>simplemente déjalo en blanco</strong>. Puedes acompañar tu reporte con <strong>imágenes o video</strong> (más información en <strong>Visor de Anuncios</strong>).<br>
    	    Cuando termines, da click en el botón <strong>Hecho/Publicar</strong>.<br>
    	    Los datos que ingresaste, ya sea de nombre de Usuario o Nick, así como datos de contacto como teléfono o e-mail aparecerán en la parte inferior derecha del Visor de tus anuncios (aunque también puedes decidir los datos que aparecen desde <strong>Mi Perfil.</strong><br>
  	    </p>
    	  <p><strong>CÓMO ELIMINAR ANUNCIOS EN LOFERS!</strong></p>
    	  <p>De la misma forma, desde cada carpeta (Pérdidas, Hallazgos (Empresa), Hallazgos (Persona) y Avistamientos), encontrarás la opción de <strong>Eliminar Anuncio</strong>.<br>
    	    El botón <strong>Eliminar</strong> activará la opción para <strong>Seleccionar Anuncios</strong>, sea uno o varios, para su eliminación. <br>
   	      Ésta última será consumada cuando des click en el botón de <strong>Eliminar anuncios seleccionados</strong>. </p>
    	  <p>Ya no podrás recuperarlos aunque, claro, siempre tendrás la opción de generar más. <br>
    	    Por cualquier duda o “error de dedo”, está también el botón de cancelar.<br>
    	    Independientemente del color del logo Lofers! (indicativo del Status del Reporte), el anuncio desaparecerá.</p>
    	  <p>Si es que tienes muchos anuncios publicados y quieres encontrar alguno en especial, en cada carpeta encontrarás también una Barra de Búsqueda de Anuncio para ubicarlo de manera más rápida y práctica.<br>
  	    </p>
    	  <p id="coincide"><strong>VISOR DE ANUNCIOS</strong></p>
    	  <p>Enlistamos, por si lo necesitas, los campos de información que debes llenar acerca del LOF que deseas reportar en el Visor:</p>
    	  <p><strong>NOTA: En los campos encontrarás características de los 4 tipos de anuncios que ofrecemos, si alguna no va con el objetivo de tu reporte, simplemente déjala en blanco.</strong></p>
    	  <p>Hallarás dos bloques, Izquierdo y Derecho (o Todo en una columna si abres la página desde tu móvil).</p>
    	  <p>A la Derecha encontrarás los campos de:<br>
    	    <strong>Tipo de Anuncio</strong><br>
    	    Pérdidas/Hallazgo Empresa/Hallazgo Persona/Avistamiento. Selecciona la opción deseada.<br>
    	    <strong>Categorías</strong><br>
    	    Selecciona la más acorde al LOF que reportarás. Si no hay alguna muy cercana, puedes optar por la opción de <strong>Varios/Otros.</strong><br>
    	    <strong>Título</strong><br>
    	    Por ejemplo “Camioneta Pick Up Roja Marca X 2009”.<br>
    	    Lo que aquí escribas aparecerá junto a las imágenes exhibidas en el visor y en aquella que circule en el recuadro (carrusel de imágenes) de la página principal de la Red LOFERS!, ésta última será la que elijas como “Principal”. Más información en el apartado de IMÁGENES.</p>
    	  <p><strong>Nombre</strong><br>
    	    Por ejemplo “Firulais”, si es tu mascota.<br>
    	    <strong>Fecha del Suceso</strong><br>
    	    Al dar clic en el calendario, podrás escoger la fecha de la Pérdida o el Hallazgo en cuestión.<br>
    	    <strong>País</strong><br>
    	    Si el país en cuestión es México, seguirán las opciones con los combos donde puedes seleccionar el Estado y Municipio en cuestión:<br>
    	    <strong>Estado</strong><br>
    	    Da clic y selecciona el estado donde sucedió.<br>
    	    <strong>Municipio</strong><br>
   	      Da clic para seleccionar el municipio donde sucedió.</p>
    	  <p>Pero si el país en cuestión es Otro, se activarán celdas para que escribas específicamente el País, el Estado y el Municipio indicados.</p>
    	  <p><strong>Lugar del Suceso</strong><br>
    	    Escribe el lugar donde sucedió. Por ejemplo Zócalo de la ciudad o Calles y Colonia del suceso.<br>
    	    <strong>Empresa LF del Suceso</strong><br>
    	    Se despliega un combo donde podrás seleccionar la Empresa Lofers! en cuestión si es que es algún establecimiento, lugar o institución que se haya dado de alta como “Empresa” en Lofers!<br>
    	    Si no es en alguna Empresa Lofers! puedes dejar esa opción en NINGUNO.<br>
    	    <strong>Recompesa</strong><br>
    	    Sólo para los casos de LOFER1, es decir, si perdiste un LOF y ofreces alguna gratificación por su regreso. Sólo escribe la cantidad numérica en ese campo.<br>
    	    Fomentamos el altruismo así que, para los casos L2, L3 y L4,  deseamos eviten pedir alguna retribución y que sean los mismos L1 los que la ofrezcan, dado el caso. <br>
   	      Si no eres L1 o si sí lo eres pero desistes de ofrecerla, déjalo en blanco y no aparecerá en el visor.</p>
    	  <p><strong>Contacto </strong><br>
    	    Esta opción aparecerá en los Anuncios cuando estén ya publicados, será la forma que hayas colocado como opción para que te contacten.<br>
   	      Si no elegiste teléfono o correo electrónico como forma de contacto, la opción dada por default son los mensajes en cada página de anuncios.</p>
    	  <p><strong>Flechas de Anuncios/Resultados de Búsqueda</strong><br>
    	    Si observas el visor desde el modo de resultados de búsqueda (que es la forma en que te mostramos concordancias de anuncios con el LOF que tú buscas), notarás que, en la parte de arriba en las opciones de la derecha, aparecen unas <strong>flechas</strong> para recorrer las concordancias de anuncios <strong>si es que tienes más de un resultado </strong>con gran porcentaje de coincidencias.<br>
  	    </p>
    	  <p>A la izquierda encontrarás las opciones de:</p>
    	  <p id="agregar"><strong>Agregar IMÁGENES </strong><br>
    	    Selecciona la opción agregar imágenes y luego seleccionar archivo.<br>
    	    Puedes agregarlas desde la memoria de tu teléfono, ordenador, memoria externa, etc. <br>
    	    Podrás subir máximo 4 imágenes y seleccionar, si es más de una, <strong>cuál será la principal</strong>. ÉSTA ÚLTIMA ES LA QUE CIRCULARÁ EN LOS RECUADROS (CARRUSEL DE IMÁGENES) DE LA PÁGINA LOFERS!<br>
   	      Puedes leer en <a href="<? echo $urlprincipal?>condiciones">Condiciones del Servicio</a> así como en <a href="<? echo $urlprincipal?>aviso">Política de Privacidad</a> acerca del uso que Lofers! da a tus imágenes y videos.</p>
    	  <p><strong>Agregar VIDEO</strong><br>
    	    Selecciona la opción agregar video y luego seleccionar archivo.<br>
    	    Puedes agregarlo desde la memoria de tu teléfono, ordenador, etc. y será exhibido en el mismo visor de las fotos que hayas subido. La capacidad máxima será de <strong>10 MEGAS</strong>.<br>
          <strong style="color: #FF0004">CUALQUIER IMAGEN INADECUADA, VIDEO INADECUADO Y/O VIOLACIÓN DE LAS CONDICIONES DEL SERVICIO DE LOFERS! SERÁN CAUSA DE ELIMINACIÓN DE TU CUENTA.</strong></p>
    	  <p>También podrás <strong>denunciar abuso</strong> de algún otro usuario que publique <strong>imágenes y/o videos inadecuados</strong> y viole las condiciones de la página. Siempre podrás encontrar esta opción <strong>en cada anuncio que veas publicado</strong>, encontrarás el botón <strong>DENUNCIAR ANUNCIO</strong>.</p>
    	  <p><strong>Características</strong><br>
    	    Describe los datos generales de tu LOF<br>
    	    <strong>Detalles</strong><br>
   	      Te recomendamos que escribas <strong>especificidades</strong> importantes y <strong>prácticas</strong> que ayuden a reconocer a tu LOF (por ejemplo “Mancha de Luna en la oreja izquierda” si es Animal o “Palabra CHAMPION pintada con plumón en la parte trasera del teléfono” si es Cosa o dependiendo el tipo de LOF.</p>
    	  <p><strong>Las 2 opciones anteriores son MUY IMPORTANTES pues las palabras que aquí escribas serán Clave en la búsqueda de Coincidencias en nuestra base de datos.</strong><br>
   	      Ten en cuenta que si sólo pones algo como “Perro doberman perdido en México”, el sistema buscará comparaciones en Estado, Municipio, Nombre, Características, etc. y, si escribes sólo algo así, los resultados que se arrojarán serán de todos los perros dóberman reportados en los anuncios.</p>
    	  <p id="quienes"><strong>Compartir con</strong><br>
    	    Las dos opciones que encontrarás en el llenado de tus anuncios son:<br>
    	    PÚBLICO GENERAL, opción en la cual tus anuncios podrán ser apreciados por todos los usuarios Lofers!, compartidos en redes sociales y vistos incluso por no usuarios a quienes llegue tu anuncio.<br>
   	      SELECCIÓN DE AMIGOS, opción en la cual se activará el modo de selección entre tus Amigos/Lofriends y decidirás a quiénes de ellos harás llegar tu anuncio.</p>
    	  <p>NOTA: Cada que te surja la duda de cómo regresar a tus anuncios, desde el visor de anuncios o cualquier otra de nuestras páginas mientras estés loguead@, podrás hacerlo a través del Menú de tu Perfil o desde el botón Lofers!</p>
    	  <p><strong>RECUERDA, CUANDO TODOS LOS CAMPOS ESTÉN COMPLETADOS, DA CLICK EN “HECHO/PUBLICAR”, INMEDIATAMENTE GENERAREMOS TU ANUNCIO.</strong></p>
    	  <p>DE LA MISMA FORMA, TAN PRONTO SEA GENERADO TU ANUNCIO, LOFERS BUSCARÁ COINCIDENCIAS CONTRA LA BASE DE DATOS DE USUARUIOS LOFERS2, 3 Y 4. </p>
    	  <p id="ver"><strong>STATUS DEL REPORTE</strong><br>
   	      Esta es la forma en que sabrás el progreso de tu búsqueda de coincidencias a partir del logo de Lofers! que aparecerá en tu anuncio (y que sólo tú podrás ver). </p>
    	  <p>Es el ícono de LOFERS!  “LF” con sus diferentes colores:</p>
    	  <p>Si el ícono “LF” está <em>pulsando</em> (<img src="<? echo $urlprincipal?>images/status/intermitente.gif" width="20" height="20"> ) <br>
   	      significa que LOFERS! mantiene constante la búsqueda de coincidencias en su base de datos.</p>
    	  <p>Si está en color <em>morado</em> (<img src="<? echo $urlprincipal?>images/status/naranja.png" width="20" height="20">) <br>
    	    significa que obtuvimos algunas coincidencias, previo envío de su notificación a tu correo, que podrás apreciar en el Visor de Mis Pérdidas. <br>
   	      Si hay dos o más anuncios de coincidencias, podrás cambiar de anuncio con los botones  &lt;   &gt;  de flechas laterales.</p>
    	  <p>Podrás apreciar las fotos que hayan subido del LOF en cuestión alternándolas al dar clic sobre ellas, aparecen al lado de la pantalla que las exhibe en grande.<br>
    	    De igual forma, si los usuarios que generaron esos anuncios, subieron algún video, estará disponible al aparecer, en la misma parte baja del lado del cuadro.<br>
    	    <br>
          <strong id="contacto">Si alguna de las coincidencias corresponde a tu LOF</strong>, tienes 3 opciones de <strong>comunicación</strong> con el Lofer del anuncio en cuestión:</p>
    	  <p> 1)	Si el lofer permite ver su teléfono<br>
    	    2)	Si permite ver su correo electrónico<br>
    	    3)	Si no permite ver alguno de los anteriores, la misma página del anuncio permite la comunicación a través de mensajes de texto que aparecerán ahí mismo, debajo del anuncio.<br>
  	    </p>
    	  <p>En el mismo visor encontrarás el botón <strong>“¡ESTE ES MI LOF!”</strong>. Si haces clic en él, le llegará una notificación al lofer que creó ése anuncio.<br>
    	    <strong>Si después de ponerse en comunicación</strong>, concluyen que sí es tu LOF, podrán confirmarlo con el botón <strong>CONFIRMAR LOF</strong>.<br>
  	    </p>
    	  <p> <strong>Y TAMBIÉN CAMBIARÁ EL STATUS DE TU ANUNCIO (o bien, podrás borrarlo después de haberte contactado con el lofer en cuestión)</strong></p>
    	  <p>Ahora podrás verlo en color rojo, (<img src="<? echo $urlprincipal?>images/status/rojo.png" width="20" height="20">) <br>
    	    que significa algo MUY BUENO, <strong>¡ENCONTRASTE TU LOF PERDIDO!</strong><br>
  	    </p>
    	  <p><strong style="color: #FF0004">LOFERS! se reserva el derecho a emitir los resultados de Reencuentos como promoción principal de la página. </strong><br>
   	      Puedes leerlo en <a href="<? echo $urlprincipal?>condiciones">Condiciones del Servicio</a> así como en <a href="<? echo $urlprincipal?>aviso">Política de Privacidad</a>.</p>
    	  <p><strong>NOTICIAS/TESTIMONIALES</strong><br>
   	      Ahora, a esta altura del proceso, <strong>necesitamos el último paso</strong> cuando el proceso LOFERS! se ha dado:</p>
    	  <p> <strong style="color: #FF0004">Escribir unas palabras del Reencuentro con tu LOF </strong><br>
   	      ¡Estarás de acuerdo con nosotros que una de las mejores formas de reconocer al Lofer altruista que ayudó a que te reencontraras con tu Lof es hacer público el agradecimiento! =) </p>
    	  <p>Cuando confirmas que era tu LOF o, bien, cuando ya te hayas reencontrado con éste último, tendrás a la mano el link hacia la página de <strong>NOTICIAS/TESTIMONIALES</strong>, o puedes encontrarla en tu menú de usuario. <br>
   	      Aquí es donde puedes escribir tus Anécdotas de Reencuentros, es decir, testimoniales de personas que se han reencontrado con sus LOF’s  después de un proceso en nuestra plataforma y puedes acompañarla, si gustas, con una imagen.</p>
    	  <p>En este espacio también podrás apreciar noticias de nuestra Red Lofers!</p>
    	  <p><strong>TUS PALABRAS</strong> son una gran fortaleza de de este gran CLUB que es Lofers! y una responsabilidad de acuerdo a nuestras <a href="<? echo $urlprincipal?>condiciones">Condiciones del Servicio</a>.</p>
    	  <p><strong style="color: #FF0004">Cualquier comentario ofensivo y/o imagen inadecuada serán causa de eliminación de tu cuenta.</strong></p>
    	  <p>Puedes ingresar tus palabras en el espacio que dice COMENTARIOS, puedes acompañarlas con una imagen en el espacio que dice FOTO y subirlo a la página con el Botón que dice <strong>Registrar</strong>.</p>
    	  <p>Hay una última opción en la que puede presentarse el logo LF y ésa es la de color Blanco (<img src="<? echo $urlprincipal?>images/status/blanco.png" width="20" height="20">) <br>
    	    y es una opción que tú podrás decidir y se dejarán de buscar coincidencias en la base de datos.<br>
    	    También puedes eliminar anuncios usando el Botón ELIMINAR que activará la selección de anuncios y podrás borrarlo definitivamente.<br>
  	    </p>
    	  <p id="amigo"><strong>AÑADIR LOFRIENDS (Amigos) </strong></p>
    	  <p>En tu página <strong>Mis Amigos/Lofriends</strong> (menú de usuario) encontrarás la opción <strong>Agregar amigos</strong> con la que accederás al apartado donde podrás buscar usuarios por su nombre o Nick, enviarle una invitación y esperar a que la acepte.</p>
    	  <p>Recuerda que son estos contactos o amigos a quienes compartirás tus anuncios si eliges la opción de <strong>Selección de amigos</strong> y no la de <strong>Público General</strong>.</p>
    	  <p id="sus"><strong>¿Suscripciones?</strong><br>
    	    El añadir <strong>Amigos/Lofriends</strong> es también una forma de <strong>Suscribirte</strong> a los diversos sitios que gustes. Sean usuarios Persona o usuarios Empresa, sus anuncios llegarán a tu cuenta.</p>
    	  <p id="comparte"><strong>COMPARTIR ANUNCIO EN REDES SOCIALES</strong><br>
    	    Sí, también encontrarás los botones de las principales redes sociales para compartir tus anuncios en ellas. Y esto aplica para anuncios tanto los tuyos como los de cualquier Usuario Lofer para que puedan ser exhibidos en distintas redes socales.<br>
   	      Para esto, necesitarás ya haber generado tu anuncio. Una vez hecho esto, vuelve a entrar a tu anuncio (dando clic en la imagen, no en la opción de editar) y encontrarás tales botones arriba de los datos del LOF en cuestión.</p>
    	  <p id="elimina"><strong>Eliminación de tu cuenta</strong><br>
   	      Encontrarás esta opción en el segundo menú de usuario, al entrar en <strong>Mi perfil</strong>. En la parte más baja encontrarás el botón de <strong>Borrar cuenta.</strong></p>
    	  <p>Es importante saber que, una vez eliminada tu cuenta, todos los datos relacionados con ella (identificación, LOF’s, imágenes, videos, notificaciones, etc.) se perderán. Si quieres ser nuevamente un usuario Lofers! tendrás que registrarte con una nueva cuenta</p>
    	  <p> <a href="<? echo $urlprincipal?>registro" >Registrame en Lofers</a></p>

</div>
    </div>

<? include("funciones-abajo.php");?>