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

if($_POST[t])
$_GET[t]=$_POST[t];

if($_GET[t]){
			$b1=" and id_tipoAnuncio=".$_GET[t];
			
		}else{
			$b1='';
		}
		
		
$sql=" select * from anuncios where activo=1 and (id_statusAnuncio=1 or id_statusAnuncio=2) and id_cliente=".$_SESSION[id_clienteLof4]." ".$b1."  ".$w."   
order by id_anuncio desc "; 
$anuncios1=$myvar->get_arreglo($sql);


if($_POST[statusELIMINAR]){
	//eliminando13
	
	for($i=0; $i<count($anuncios1); $i++){
		if($_POST[eliminando.$anuncios1[$i][id_anuncio]]==1){
			$sql="update anuncios set activo=0 ,id_statusAnuncio=2 where id_anuncio=".$anuncios1[$i][id_anuncio]." limit 1";
			$myvar->execute($sql);
		}//if
	}//for
	
}//if

	$sql=" select * from anuncios where activo=1 and (id_statusAnuncio=1 or id_statusAnuncio=2)  
	and id_cliente=".$_SESSION[id_clienteLof4]." ".$b1."  ".$w."   order by id_anuncio desc "; 
$anuncios1=$myvar->get_arreglo($sql);

						if(!empty($anuncios1)){
							$maximo=ceil(count($anuncios1)/9);
						}
			
						$_pagi_sql = $sql;
						$_pagi_cuantos =9;

						include("Pag/paginator.inc.php");
						$primera= "<a href=".$_pagi_primera . ">";
							if ($_pagi_anterior=="no hay mas"){
								$anterior= " ";
							}else{
								$anterior= "<a href=".$_pagi_anterior.">";
							}
							
							if ($_pagi_siguiente=="no hay mas"){
								$siguiente= " ";
							}else{
								$siguiente= "<a href=".$_pagi_siguiente.">";
							}

							$ultimo= "<a href=".$_pagi_ultimo .">";
							$i=0;

							while($resultados = mysqli_fetch_array($_pagi_result)){
									$anuncios[$i]['id_anuncio']=$resultados['id_anuncio'] ;
									$anuncios[$i]['id_categoriaAnuncio']=$resultados['id_categoriaAnuncio'] ;
									$anuncios[$i]['id_tipoAnuncio']=$resultados['id_tipoAnuncio'] ;
									$anuncios[$i]['titulo']=$resultados['titulo'] ;
									$anuncios[$i]['fechaSuceso']=$resultados['fechaSuceso'] ;
									$anuncios[$i]['id_statusAnuncio']=$resultados['id_statusAnuncio'] ;
									
									$i++;
							}




							
							?>
							
<script>
function cambiarPaginaBusqueda(pag){
	var parametros = {
                "palabra" : document.getElementById('palabra').value,
                "paginas-desp-bus" : 1,
				"_pagi_pg" : pag
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>ajax-anuncios.php',
                type:  'get',
                beforeSend: function () {
                        $("#losproductos").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#losproductos").html(response);
                }
        });
	
	
}

function editar(id){
	 location.href = "modificar-anuncio.php?id="+id;
}

function compartir(id){
	 location.href = "compartir-anuncio.php?id="+id;
}

function comentarios(id){
	 location.href = "comentarios-anuncio.php?id="+id;
}

function mostrar(){
		document.getElementById("eliminarx1").style.display = "block";
		document.getElementById("eliminarx").style.display = "none";

	for (i=0;i<document.formularioANUNCIOS.elements.length;i++){ 
      if(document.formularioANUNCIOS.elements[i].type == "checkbox"){	
         document.formularioANUNCIOS.elements[i].disabled = false;
	  }
	}
}

function mostrar1(){
	document.getElementById("eliminarx1").style.display = "none";
	document.getElementById("eliminarx").style.display = "block";

for (i=0;i<document.formularioANUNCIOS.elements.length;i++){ 
      if(document.formularioANUNCIOS.elements[i].type == "checkbox"){	
         document.formularioANUNCIOS.elements[i].disabled = true;
	  }
	}
}

		
</script>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>



<div class="formas">

	 	<div class="menuAux3">
          <a href="<? echo $urlprincipal?>nuevo-anuncio" class="btop cf"> Generar Anuncio</a>
          <a href="<? echo $urlprincipal?>anuncios-encontrados" class="btop cf">Mis Lofs reencontrados</a>
          
        </div>
        	 
<center><br>

Buscar anuncio: <input name="palabra" id="palabra" type="text" placeholder="Titulo o caracteristicas" onchange="cambiarPaginaBusqueda(1)" style="width: 200px!important;"/><div class="lupa"><img src="<? echo $urlprincipal?>imagenes/lupa.png"></div>
          
  <div id="losproductos">
  
 	<div class="paginacion">
			<? if(empty($anuncios)){  echo "&nbsp;"; }else{
            ?>
			<?php echo "1 de ".$maximo;?>
				<?php
                }
                if($maximo > 1){
                ?>
                <a href="javascript:void(0)" onclick="cambiarPaginaBusqueda(2);" class="btop gr"> Siguiente</a>
                <?php
				}?>
		
	</div> 
    	<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formularioANUNCIOS" id="formularioANUNCIOS" >
<input type="hidden" value="<? echo $_GET[t];?>"  id="t" name="t" >
<div  id="eliminarx"><input type="button" value="ELIMINAR" onclick="mostrar()"  class="btop cf"></div>

<div  id="eliminarx1" style="display:none">

<input type="hidden" name="statusELIMINAR"  id="statusELIMINAR"/>
 <p id="bot">
 <p>Seleccione los anuncios a eliminar</p>
 <input name="submit" type="submit" id="boton" value="Eliminar anuncios seleccionados" class="boton"  
 onclick="document.getElementById('statusELIMINAR').value = '1';"/>
 
 <input type="button" value="CANCELAR" onclick="mostrar1()">
 
 </p>


</div>
			   
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
                                
                            <!--a href="<? echo $anuncios[$i][id_anuncio];?>"  class="btEliminar eliminarServicio">X</a-->
                            <div id="dialog2<? echo $anuncios[$i][id_anuncio];?>" class="dialogo"></div>
                            
                            
                            
                 <? 
				 
				 if($anuncios[$i][id_statusAnuncio]==2){ ?>
						 <? if($imagen[0][imagen]!=''){?>
                            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" class="columnImage"/>
                            <? }else{?>
                            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" width="173" class="columnImage"/>
                            <? }//else?>
                         
                         <img src="<? echo $urlprincipal?>images/status/blanco.png" style="width: 40px; height:auto; border-radius: 0;border: none;display: block"; border="0">
				<?
				 }else{ 
				 
				 ?>
                  <!--a href="javascript:void(0);" onclick="editar(<?php echo $anuncios[$i][id_anuncio]; ?>);"-->
                    <a href="<? echo $urlprincipal?><? echo $anuncios[$i][id_anuncio];?>/modificar-anuncio" class="btop cf">EDITAR</a>
					<a href="<? echo $urlprincipal?><? echo $anuncios[$i][id_anuncio]?>/1/anuncio">
                           <? if($imagen[0][imagen]!=''){?>
                                <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" class="columnImage"/>
                                <? }else{?>
                                <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" width="173" class="columnImage"/>
                                <? }//else?>
                  </a>
                        
                
                
                 <? }?>
                            
                                
                            </div>
                           
                           <div class="txAn">
                                <p><strong><? echo $anuncios[$i][titulo]?></strong></p>
                                <p><strong><? echo obtenerfecha($anuncios[$i][fechaSuceso]);?></strong></p>
                                 <input name="eliminando<?php echo $anuncios[$i][id_anuncio]; ?>" id="eliminando" type="checkbox" value="1" disabled="disabled"/>
                               
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
            </form>
            
            <div class="paginacion">
			<? if(empty($anuncios)){  echo "&nbsp;"; }else{
            ?>
			<?php echo "1 de ".$maximo;?>
				<?php
                }
                if($maximo > 1){
                ?>
                <a href="javascript:void(0)" onclick="cambiarPaginaBusqueda(2);" class="btop gr"> Siguiente</a>
                <?php
				}?>
		
	</div>

</div>
</center> 
</div>
</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
  <script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>

