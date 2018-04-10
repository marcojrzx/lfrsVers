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

if($_GET[t]){
	$b=" and a.id_tipoCliente=".$_GET[t];
}else{
	$b='';
}

$sql=" select a.* from quienencuentra q, clientes a where q.id_cliente=".$_SESSION[id_clienteLof4]." and  q.activo=1 and 
q.id_cliente=a.id_cliente and a.activo=1 and a.id_statusCliente=1 ".$b.""; 
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
                url:   '<? echo $urlprincipal?>ajax-encontrados.php',
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
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";
//Buscar anuncio: ?>	 
<center><br>

<input name="palabra" id="palabra" type="hidden" placeholder="Titulo o caracteristicas" onchange="cambiarPaginaBusqueda(1)"/>

<input name="t" id="t" type="hidden"  value="<? echo $_GET[t]?>"/>
  <div id="losproductos">
  
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
   <? for($i=0; $i<count($anuncios); $i++){ 
	   
	   $ban=0;
	   if($anuncios[$i][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncios[$i][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from cliente_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente=".$anuncios[$i]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].")) limit 1 "; 
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
				 
	   }elseif($anuncios[$i][id_aquienComparte]==6){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncios[$i][id_municipio])
				 $ban=1;
	   }
	   
	   
	   
	   if($ban==1){
	   		
	   ?>
             
             
             <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateColumns">
    
    <tr>
       <? for($a=0; $a<3; $a++){
		if($i<count($anuncios)){
			$sql2=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$anuncios[$i][id_anuncio]." limit 1";
			 $anuncio=$myvar->get_arreglo($sql2);
			
				$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by fotoPrincipal desc limit 1";
			 $imagen=$myvar->get_arreglo($sql2);
			 
			 $sql2=" select * from clientes where activo=1 and id_cliente=".$anuncio[0][id_cliente]." limit 1";
			 $cliente=$myvar->get_arreglo($sql2);
		?>
         <td align="center" valign="top"  class="templateColumnContainer">
            <table border="0" cellpadding="10" cellspacing="0" width="100%">
                <tr>
                    <td align="center" valign="middle" class="leftColumnContent">
                    <a href="<? echo $urlprincipal?><? echo $anuncio[0][id_anuncio]?>/anuncio">
                    <? if($imagen[0][imagen]!=''){?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagen[0][imagen]?>" />
            <? }else{?>
            <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/sf.jpg" />
            <? }//else?>
              <p>Categoria:
                <?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_categoriaAnuncio];
			 ?>
             </p>
			<p>Tipo de Anuncio:
                <?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncio[0][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?>
             </p>
            
            
            <p>Titulo:<? echo $anuncio[0][titulo]?></p>
 			<p>FechaIngreso:<? echo date("Y-m-d",$anuncio[0][fechaIngreso]);?></p>
            <p>Cliente:<? 
			if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cliente[0][nombre]." ".$cliente[0][apellidos];
	}else{
	echo $cliente[0][nick];
	}?></p></a>
                    </td>
                </tr>
                <tr>
                    <td height="30">
                    </td>
                </tr>
            </table>
        </td>
       <?
		}//if
	    $i++; 
	   }// for a?>
    </tr>
</table>
             
             
             
             
            
            
            
 			
             
<br><br><br>
<? 		}//if ban
   }//for?>


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
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
