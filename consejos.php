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
    	  <p><strong>CONSEJOS LOFERS!</strong></p>
    	  <p><strong>CONSEJOS PARA PREVENIR PÉRDIDAS Y/O AYUDARTE A UN REENCUENTRO CON TU LOF</strong></p>
    	  <p>En el caso de tus mascotas, coloca siempre alguna identificación o contacto en alguna parte como su collar o correa.</p>
    	  <p>Si le pones ropita a tus mascotas, siempre ayudará que les bordes su nombre en ella; si tu mascota no tiene una peculiaridad física, su nombre bordado servirá para que quien llegue a encontrarle pueda identificarlo de esa forma.</p>
    	  <p>También puedes memorizar características especiales que tengan en alguna parte del cuerpo, manchas, formas peculiares, etc. Ten siempre fotos de tus mascotas.</p>
    	  <p>En la medida de lo posible, trata de familiarizar a tus mascotas con tu casa y sus alrededores, zonas y cuadras circundantes con el paseo diario.</p>
    	  <p>Para tus objetos o cosas en general, es importante que recuerdes si cuenta también con una peculiaridad como un rayón, golpe o desgaste en algún lugar en específico.<br>
    	    O, bien, siempre ayuda <strong>marcar</strong> tus pertenencias para reconocerlas y, más aún, si tu Lofer informante te pide mencionar características como esas para comprobar que realmente es tuyo el LOF en cuestión.<br>
    	    Ahora que contamos con Lofers! puedes prever alguna pérdida y tener algunas fotos de tus objetos con mayor riesgo de perderse y guardarlas en algún respaldo como la nube, no sólo en tu teléfono.<br>
    	    En los colegios, es usual poner los nombres de los dueños en los útiles escolares o la ropa o cosas como alguna memoria usb.<br>
    	    En empresas o diversas instituciones, estas medidas no están de más, sobre todo cuando la gente de esos lugares se conoce entre sí.</p>
    	  <p><strong>PERO</strong> aquí te dejamos un <strong style="color: #FF0004">TIP LOFERS!</strong> y es que puedes, sencillamente, poner la palabra Lofers! en aquellos objetos con mayor riesgo de pérdida y es posible que las personas que lo encuentren interpreten que colocaste esta palabra por si llegabas a necesitar su búsqueda en nuestra Red =).</p>
    	  <p>En el caso de personas, tristemente sabemos que en ocasiones llegan a extraviarse niños, adultos mayores, personas con capacidades diferentes, etc.; procura que tus seres queridos con estas circunstancias memoricen el nombre de la persona moral y legalmente responsable o alguna dirección o teléfono al cual acudir, independientemente de que uses la red Lofers! o no pues es necesario dar parte a las autoridades de tu localidad también.</p>
    	  <p><strong>CONSEJOS PARA EVITAR ESTAFAS</strong></p>
    	  <p>Evita dar datos personales como nombre o apellidos (te sugerimos usar sólo un Nick o un nombre falso), teléfonos de casa o direcciones residenciales. Es preferible otorgar algún correo electrónico que no sea personal o laboral y, si es un número telefónico, que sea celular de preferencia.</p>
    	  <p>Si eres Lofer2 o Lofer3 y buscas regresar un Lof con su dueño o ser querido, te recomendamos establezcas una <strong>condición para regresarlo</strong>. <br>
   	      Desgraciadamente, habrá muchos amantes de lo ajeno que querrán aprovecharse de la oportunidad de hacerse de algo que no es suyo al mentir e inventar que les pertenece tal o cual LOF y una condición para regresarlo puede ser el pedir que <strong>comprueben ser dueños del LOF</strong>.</p>
    	  <p>Hablamos, claro, de la situación donde los usuarios encuentran un LOF y lo exhiben. Si es tu caso,  aunque se pueden ingresar detalles del LOF, recomendamos no poner absolutamente todo lo que percibas para que puedas preguntar por algún detalle más o, por ejemplo, si es un teléfono móvil puedes pedir que lo desbloqueen. Sólo son ideas que aportamos pero seguramente tú puedes generar mejores.</p>
    	  <p>En el caso de ofrecer alguna recompensa, evita que sea muy ostentosa pues hay quien pudiese aprovecharse de esto para darte falsas esperanzas, engañarte con un LOF que no sea el tuyo o, incluso, pedirte una suma mayor al notar tus recursos; y, si ofreces alguna recompensa, jamás la otorgues o transfieras por adelantado.</p>
    	  <p>Si detectas algún mail como estafa cibernética, bloquéalo, denuncia el abuso a partir del menú USUARIO y, si hay algún mayor problema, acude ante el Ministerio Público de tu localidad o contacta a la Policía Cibernética.</p>
<p> <a href="javascript:history.back()">Regresa </a></p>

</div>
    </div>

<? include("funciones-abajo.php");?>