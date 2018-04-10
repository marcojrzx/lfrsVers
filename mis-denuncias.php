<? 
include("Auth/nxs_auth.inc.php");
$urlprincipal="http://lofers.club/"; $aut = new nxs_auth();

if (!$aut->revisar()){
	header("Location: ".$urlprincipal."index.html?msg=3");
}

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


include "funciones-arriba.php";

$sql=" select a.*,r.fecha,r.activo as activoRep,r.fechaAceptado from reportesAnuncio r, anuncios a where 
r.id_anuncio=a.id_anuncio and a.activo=1 and a.id_statusAnuncio=1 and 
r.id_cliente=".$_SESSION[id_clienteLof4]."  order by r.id_reporteAnuncio desc"; 
 $reportes=$myvar->get_arreglo($sql);
	
							
							?>
							
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<center><br>

  <div id="losproductos">
  
 
		<? for($i=0; $i<count($reportes); $i++){ ?>
           
           
<div id="templateColumns">
    
       <? for($a=0; $a<3; $a++){
		
		if($i<count($reportes)){
			$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$reportes[$i][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			?>
         <div class="templateColumnContainer">
           
			
            <div class="unAnun">
            <div class="imAn">
            	<? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173"class="columnImage"/>
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" class="columnImage" width="173"/>
            <? }//else?>
                
            </div>
            
           
            
            <div class="txAn">
            	<p>Título: <strong><? echo $reportes[$i][titulo]?></strong></p>
 				<p>Fecha de Reporte: <strong><? echo obtenerfecha(date("Y-m-d", strtotime($reportes[$i][fecha])));?></strong></p>
            	<? if($reportes[$i][activoRep]==2){?>
                <p>Fecha de Respuesta: <strong><? echo obtenerfecha($reportes[$i][fechaAceptado]);?></strong></p>
                <? }else{
						echo "pendiente";
				}?>
                </div>
            </div>
           
        </div>
       <?
		}//if
	    $i++; 
	   }// for a?>

</div>
<br><br><br>
<? }//for?>

</div>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
  <script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
