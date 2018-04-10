<? 
include("Auth/nxs_auth.inc.php");
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

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include "funciones-arriba.php";

$sql=" select a.* from quienencuentra q, anuncios a where q.activo=1 and 
q.id_cliente=".$_SESSION[id_clienteLof4]." and q.id_anuncio=a.id_anuncio and
 a.activo=1 and a.id_statusAnuncio=2  order by q.fecha desc "; 
$anuncios=$myvar->get_arreglo($sql);
				?>
							
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>



<div class="formas">

	 	
<center><br>

          
  <div id="losproductos">
  
 	
    				   
           <? for($i=0; $i<count($anuncios); $i++){ ?>
           
                <div id="templateColumns">
                    
                       <? for($a=0; $a<3; $a++){
                        if($i<count($anuncios)){
                            $sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncios[$i][id_anuncio]." order by fotoPrincipal desc limit 1";
                             $imagen=$myvar->get_arreglo($sql2);
                        ?>
                         <div class="templateColumnContainer">
                           
                            
                            <div class="unAnun">
                            <div class="imAn">
                                
                         <? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" class="columnImage"/>
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" width="173" class="columnImage"/>
            <? }//else?>
                            
                            
                              
                            </div>
                            
                            <!-- <p>Categoria:
                                <?
                             $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncios[$i][id_categoriaAnuncio]." limit 1"; 
                             $tipos=$myvar->get_arreglo($sql2);
                             
                             echo $tipos[0][dsc_categoriaAnuncio];
                             ?>
                             </p>
                            <p>Tipo de Anuncio:
                                <?
                             $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncios[$i][id_tipoAnuncio]." limit 1"; 
                             $tipos=$myvar->get_arreglo($sql2);
                             
                             echo $tipos[0][dsc_tipoAnuncio];
                             ?>
                             </p> -->
                             
                           <div class="txAn">
                              <p>Título: <strong><? echo $anuncios[$i][titulo]?></strong></p>
                                <p>Fecha de suceso: <strong><? echo obtenerfecha($anuncios[$i][fechaSuceso]);?></strong></p>
                                
                                
                               
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
</div>
</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
