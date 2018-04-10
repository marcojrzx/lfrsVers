<? 
include("sad/funciones-bd.php");
include("sad/funciones.php");
include("thumb.php");
$urlprincipal="http://lofers.club/"; 
$myvar = new db_mysql;
$myvar->conectarBd();
$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";



include "funciones-arriba.php";?>
 
 
<div class="txSlogan txSC" style="color: #a70e79;padding: 15px 0px 0px;">
	¿Perdiste o encontraste algo?
</div>

<div class="container">

  

<div class="contCierre">

    <div class="imaCH">
    <img src="<? echo $urlprincipal?>images/image_cerrar.jpg" class="img">
    </div>
    
   
    
    <div class="txCierre">
    	<p>Gracias por usar el servicio</p>
    </div>
    
    <div class="imaCFoot">
    <img src="<? echo $urlprincipal?>images/corazon.png" class="img" />
    </div>
    
    
	</div>
  
  
</div>
</div>

<? include "funciones-abajo.php";?>