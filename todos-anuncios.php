<? 
include("Auth/nxs_auth.inc.php");
$aut = new nxs_auth();
$urlprincipal="http://lofers.club/"; 

if (!$aut->revisar()){
	if($_GET[id_cliente]){
		header("Location: ".$urlprincipal."perfil-Amigo.php?id=".$_GET[id_cliente]);
	}else{
	header("Location: ".$urlprincipal."index.html?msg=3");
	}
	
	
}else{
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



if($_POST[buscar]==1){
	if($_POST[id_tipoAnuncio]){
			$b=" or id_tipoAnuncio=".$_POST[id_tipoAnuncio];
		}
	
	if($_POST[titulo]){
			$b.=" or titulo '%".$_POST[titulo]."%'";
		}
	if($_POST[nombre]){
			$b.=" or nombre '%".$_POST[nombre]."%'";
		}
	if($_POST[fechaSuceso]){
			$b.=" or fechaSuceso=".$_POST[fechaSuceso];
		}
	if($_POST[id_estado]){
			$b.=" or id_estado=".$_POST[id_estado];
		}
	if($_POST[lugarSuceso]){
			$b.=" or  lugarSuceso '%".$_POST[lugarSuceso]."%'";
		}
	if($_POST[ubicacion]){
			$b.=" or ubicacion '%".$_POST[ubicacion]."%'";
		}
	if($_POST[id_tipoPago]){
			$b.=" or id_tipoPago=".$_POST[id_tipoPago];
		}
	if($_POST[monto]){
			$b.=" or monto=".$_POST[monto];
		}
		
		

	
}else{
		if($_GET[id_cliente]){
			$b="  id_cliente=".$_GET[id_cliente];
		}

		
}

include "funciones-arriba.php";
		
include "arrayAnuncios.php";

$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  
	and ".$caaa." and id_cliente!=".$_SESSION[id_clienteLof4]."  order by id_anuncio desc "; 

$anuncios1=$myvar->get_arreglo($sql);
	
	// SE ANEXO
	$b='';	
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
									$anuncios[$i]['id_cliente']=$resultados['id_cliente'] ;
									$anuncios[$i]['id_aquienComparte']=$resultados['id_aquienComparte'] ;
									$anuncios[$i]['id_estado']=$resultados['id_estado'] ;
									$anuncios[$i]['id_municipio']=$resultados['id_municipio'] ;
									
									$i++;
							}




							
							?>
							
<script>
function cambiarPaginaBusqueda(pag){
	var parametros = {
                "t" : document.getElementById('t').value,
                "palabra" : document.getElementById('palabra').value,
                "paginas-desp-bus" : 1,
				"_pagi_pg" : pag
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>ajax-todos-anuncios.php',
                type:  'get',
                beforeSend: function () {
                        $("#losproductos").html("<div class='cargandoinfo'><img src='<? echo $urlprincipal?>imagenes/loading.gif'/></div>");
                },
                success:  function (response) {
                        $("#losproductos").html(response);
                }
        });
	
	
}

		
</script>


<? include "menu-interno.php"; //Buscar anuncio:?>	 
<center><br>

Buscar anuncio: <input name="palabra" id="palabra" type="text" placeholder="Titulo o caracteristicas" onchange="cambiarPaginaBusqueda(1)" style="width: 200px!important;"/><div class="lupa"><img src="<? echo $urlprincipal?>imagenes/lupa.png"></div>

<input name="t" id="t" type="hidden"  value="<? echo $_GET[t]?>"/>
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
							}?> </div>      
             
   <? 
   
   if(count($anuncios)>0){
   for($i=0; $i<count($anuncios); $i++){ 
   ?>
      
            
       <? for($a=0; $a<3; $a++){
		   
		  if($i<count($anuncios)){
			
		 
		/*   $ban=0;
	   if($anuncios[$i][id_aquienComparte]==0){ // si es poblico general
	   }elseif($anuncios[$i][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncios[$i][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from clientes_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente1=".$anuncios[$i]['id_cliente']." and id_cliente=".$_SESSION[id_clienteLof4].")) limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

	   			if(count($siesamigo)>0)
				$ban=1;
				
	   }elseif($anuncios[$i][id_aquienComparte]==3){ // un amigo
	   			$sql=" select id_compartidoA from compartidoA where id_anuncio=".$anuncios[$i][id_anuncio]."
				and id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

				  if(count($siesamigo)>0)
							$ban=1;
							
	   }elseif($anuncios[$i][id_aquienComparte]==4){ // amigos Estado
	   			$sql=" select id_estado from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_estado]==$anuncios[$i][id_estado])
				 $ban=1;
				 
	   }elseif($anuncios[$i][id_aquienComparte]==5){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncios[$i][id_municipio])
				 $ban=1;
	   }
	   
		   
		 if($ban==1){*/
	  		$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$anuncios[$i][id_anuncio]." limit 1";
			 $anuncio=$myvar->get_arreglo($sql2);
			
				$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			 
			 $sql2=" select * from clientes where activo=1 and id_cliente=".$anuncio[0][id_cliente]." limit 1";
			 $cliente=$myvar->get_arreglo($sql2);
		
		?>
         
	<div class="unAnun">
    <a href="<? echo $urlprincipal?><? echo $anuncio[0][id_anuncio]?>/anuncio">
    	<div class="imAn" style="background-image:url(
        <? if($imagen[0][imagen]!=''){?>
            <? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>
            <? }else{?>
            <? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg
            <? }//else?>
        );">
        	
		</div>
     </a>
        <div class="txAn">
            
            <p><strong> <? echo $anuncio[0][titulo]?></strong></p>
            <p>Publicado por: <strong><? 
			if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?></strong></p>
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
							}?> </div>
</div>
</center> 

<? include "funciones-abajo.php";?>
<? }?>