<? 
session_start();

include_once('sad/funciones-bd.php');
include_once('sad/funciones.php');
$myvar = new db_mysql;
$myvar->conectarBd();
$urlprincipal="http://lofers.club/"; 
if($_GET['paginas-desp-bus']){

	if($_GET[t]){
			$b1=" and id_tipoAnuncio=".$_GET[t];
			
		}else{
			$b1='';
		}



		$sql=" select * from anuncios where activo=1 and (id_statusAnuncio=1 or id_statusAnuncio=2) and id_cliente=".$_SESSION[id_clienteLof4]."  ".$b1."   and (titulo like '%".$_GET[palabra]."%' or caracteristicas like '%".$_GET[palabra]."%') order by id_anuncio desc "; 
						$anuncios1=$myvar->get_arreglo($sql);
						if(!empty($anuncios1)){
						$max=ceil(count($anuncios1)/9);
						}
						$mas=$_GET['_pagi_pg']+1;
						$menos=$_GET['_pagi_pg']-1;

			
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




		?><div class="paginacion">
					
			<? if($_GET['_pagi_pg']==1 ){
				  echo "&nbsp;";
			 }else{?>
           		 <a href="javascript:void(0);" onclick="cambiarPaginaBusqueda(<?php echo $menos; ?>);" class="btop gr">Anterior</a>
            
			<?php
   			 }
	
			if(empty($anuncios)){ echo "&nbsp;"; }else{
				echo  $_GET['_pagi_pg']." de ".$max.""; ?> 
            <?php
   			 }
				  
			if($_GET['_pagi_pg']==$max || empty($anuncios)){
					echo "&nbsp;";
			}else{?>
            	<a href='javascript:void(0);'  onclick="cambiarPaginaBusqueda(<?php echo $mas; ?>);" class="btop gr"> Siguiente </a>
            <?php }	 
							?>
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
                            
                            
                                <? if($anuncios[$i][id_statusAnuncio]==2){ ?>
                               <? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" class="columnImage" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" width="173" class="columnImage" />
            <? }//else?>  
                                
                 <img src="<? echo $urlprincipal?>images/status/blanco.png"  border="0">
				<?
				 }else{
				 ?>
                  <a href="<? echo $urlprincipal?><? echo $anuncios[$i][id_anuncio];?>/anuncio"  
                            class="btop cf">EDITAR</a> <!--a href="javascript:void(0);" onclick="editar(<?php echo $anuncios[$i][id_anuncio]; ?>);"-->
                      <a href="<? echo $urlprincipal?><? echo $anuncios[$i][id_anuncio]?>/1/anuncio">
                           <? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" width="173" class="columnImage" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" width="173" class="columnImage" />
            <? }//else?>  
                           </a>
                            
                            
                 <? }?>
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
                                <a href="javascript:void(0);" onclick="editar(<?php echo $anuncios[$i][id_anuncio]; ?>);"><p>Título: <strong><? echo $anuncios[$i][titulo]?></strong></p>
                                <p>Fecha de suceso: <strong><? echo obtenerfecha($anuncios[$i][fechaSuceso]);?></strong></p></a>
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
			
			<script src="<? echo $urlprincipal?>js/jquery.validate.js" type="text/javascript"></script>
<script>

//////ELIMINAR SERVICIOS
		     var href2;
 
        $('.eliminarServicio').click(function(e) {
          e.preventDefault();
          href2 = $(this).attr('href');
          $('#dialog2'+href2).fadeIn(200, function() {
            $(this).html('¿Realmente desea eliminar este registro?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso2' value='Aceptar'>");
            $(this).append("<input type='button' id='cerrar_dialogo2' value='Cancelar'>");
          });
			
        $('#dialog2'+href2).on("click", "#ejecutar_proceso2", function(event) {
    ejecutar2(href2);
});
        $('#dialog2'+href2).on("click", "#cerrar_dialogo2", function(event) {
    cerrar2(href2);
});
 });
		
		
        function cerrar2(href2) {
          $('#dialog2'+href2).fadeOut();
        }
 
        function ejecutar2(href2) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?borrar-anuncio=1&id="+href2, 
            success: function(data) {
				  location.href = "anuncios.php"
              //$('#dialog2'+href2).html(data);
            }
          });
          $(".unica2"+href2).remove();
        }
		
		
</script>
<? exit();

}
//Gel?>  