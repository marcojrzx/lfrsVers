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
$urlprincipal="http://lofers.club/"; 

		$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
		$imagenGL="imagenes/logoredes.png";
		$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
		$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";
		
		$sql2=" select * from clientes where activo=1 and id_cliente=".$_GET[id]." limit 1"; 
		$clieActual=$myvar->get_arreglo($sql2);
		
		
		
		$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
			AND id_aquienComparte=1 and id_cliente=".$_GET[id]."  order by id_anuncio desc "; 
		$anuncios=$myvar->get_arreglo($sql);
			
	?>
	<link href="<? echo $urlprincipal?>css/Estilos.css" rel="stylesheet" type="text/css">

<!-- CSS para menu desplegable -->
<link href="<? echo $urlprincipal?>css/menu2.css" rel="stylesheet" type="text/css">

<!-- CSS de WDD -->
<link href="<? echo $urlprincipal?>css/estiloswdd6.css" rel="stylesheet" type="text/css">


<!-- CSS para menu responsivo -->
<link href="<? echo $urlprincipal?>css/menu-r2.css" rel="stylesheet" type="text/css">

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

<a href="<? echo $urlprincipal?>">INGRESAR</a>
	<center><br>
		
		 <br />
		 <? if($clieActual[0][foto]!=''){?>
			<div class="imgLogoPers" style="background-image:url(<? echo $urlprincipal?>imagenes/clientes/<? echo $clieActual[0][foto]?>);"></div>
		<? }?>
		  <? if($clieActual[0][ocultarNom]==1){// si lo quiere ocultar
				echo $clieActual[0][nombre]." ".$clieActual[0][apellidos];
			 }else{  
				echo $clieActual[0][nick]; 
			 } ?>  
		  <div id="losproductos">
		   <? 
		   
		   if(count($anuncios)>0){
		   for($i=0; $i<count($anuncios); $i++){ 
		   ?>
			  
					
			   <? for($a=0; $a<3; $a++){
				   
				  if($i<count($anuncios)){
					
					$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$anuncios[$i][id_anuncio]." limit 1";
					 $anuncio=$myvar->get_arreglo($sql2);
					
						$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by fotoPrincipal desc limit 1";
					 $imagen=$myvar->get_arreglo($sql2);
					 
					 $sql2=" select * from clientes where activo=1 and id_cliente=".$anuncio[0][id_cliente]." limit 1";
					 $cliente=$myvar->get_arreglo($sql2);
				
				?>
				 
			<div class="unAnun">
				<div class="imAn" style="background-image:url(
				<? if($imagen[0][imagen]!=''){?>
					<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>
					<? }else{?>
					<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg
					<? }//else?>
				);">
					
				</div>
			 	<div class="txAn">
					
					<p><strong> <? echo $anuncio[0][titulo]?></strong></p>
					
					</div>
								</div>
				   
						  
			   <?
				// }//if ban
				}//if
				
				if($a!=2)
				$i++; 
			   }// for a
		   ?>
		  
		<? 		
		   }//for
		   
		   }else{//if ?>
		   No hay anuncios disponibles
		   <? }?>
		
		</div>
		</center> 
		