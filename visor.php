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


if($_POST['id_anuncio'])
$_GET[id]=$_POST['id_anuncio'];

if ($_POST['status']) {
	
	if($_POST['comentario']!=''){
	$sql='insert into comentariosAnuncio (id_cliente,id_anuncio,fecha,comentario,activo) 
	values ("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d H:i:s").'",
	"'.$_POST['comentario'].'",1)'; 
	$myvar->execute($sql);
	}
	
	header('Location: '.$urlprincipal.$_POST['id_anuncio'].'/'.$_POST['t'].'/anuncio');
	
	exit;
	
}


if ($_POST['botonesmio']) {
	
	if($_POST['comentarioEsmio']!=''){
	
	$sql='insert into quienencuentra (id_cliente,id_anuncio,fecha,comentario,activo) values 
	("'.$_SESSION[id_clienteLof4].'","'.$_POST['id_anuncio'].'","'.date("Y-m-d").'","'.$_POST['comentarioEsmio'].'",0)'; 
	$myvar->execute($sql);
	}
	header('Location: '.$urlprincipal.$_POST['id_anuncio'].'/anuncio/InformacionEnviada');
		
		exit;
	
}

$bandera=0;

$sql=" select count(*) as total from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$_GET[id]."
and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
	$sihay=$myvar->get_arreglo($sql);

if($sihay[0][total]>0){
	$_GET[t]=1;
	}

if(!$_GET[t]){
	$b="id_anuncio=".$_GET[id];
	
	include "arrayAnuncios.php";
	
	$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$_GET[id]."
		and ".$caaa." and id_cliente!=".$_SESSION[id_clienteLof4]."  limit 1"; 
	$anuncio=$myvar->get_arreglo($sql);
	
	//////////// V E R I F I C A R //////////////////
	  /* $ban=0;
	   $ban=1;
	   if($anuncio[0][id_aquienComparte]==0){ // si es poblico general
	   }elseif($anuncio[0][id_aquienComparte]==1){ // si es poblico general
	   $ban=1;
	   }elseif($anuncio[0][id_aquienComparte]==2){ // amigos
	   			$sql=" select id_clienteCliente from clientes_has_clientes where id_statusSolicitud=1 
				 and  ((id_cliente=".$anuncio[0]['id_cliente']." and id_cliente1=".$_SESSION[id_clienteLof4].") or 
				 (id_cliente1=".$anuncio[0]['id_cliente']." and id_cliente=".$_SESSION[id_clienteLof4].")) limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

	   			if(count($siesamigo)>0)
				$ban=1;
				
	   }elseif($anuncio[0][id_aquienComparte]==3){ // un amigo
	   			$sql=" select id_compartidoA from compartidoA where id_anuncio=".$anuncio[0][id_anuncio]."
				and id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);

				  if(count($siesamigo)>0)
							$ban=1;
							
	   }elseif($anuncio[0][id_aquienComparte]==4){ // amigos Estado
	   			$sql=" select id_estado from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_estado]==$anuncio[0][id_estado])
				 $ban=1;
				 
	   }elseif($anuncio[0][id_aquienComparte]==5){ // Amigos Municipio
	   			$sql=" select id_municipio from clientes where  id_cliente=".$_SESSION[id_clienteLof4]." limit 1 "; 
				$siesamigo=$myvar->get_arreglo($sql);
	   
	  			if($siesamigo[0][id_municipio]==$anuncio[0][id_municipio])
				 $ban=1;
	   }*/
	 	//////////// V E R I F I C A R //////////////////
  
		   
}else{
	$sql=" select * from anuncios where activo=1 and id_statusAnuncio=1  and id_anuncio=".$_GET[id]."
	 and id_cliente=".$_SESSION[id_clienteLof4]."  limit 1"; 
	$anuncio=$myvar->get_arreglo($sql);
	
	$bandera=1;

}




$sql=" select * from aquienComparte where activo=1  and id_aquienComparte=".$anuncio[0][id_aquienComparte]." limit 1"; 
	$aquienComparte=$myvar->get_arreglo($sql);


$sql=" select * from clientes where activo=1  and id_cliente=".$anuncio[0][id_cliente]." limit 1"; 
	$cliente=$myvar->get_arreglo($sql);

$_SESSION[anunciosSimilares]='';

if($anuncio[0]['id_tipoAnuncio']==1){ //perdi
// los similares encontrados  o vistos 
	 
	 $sql='SELECT  s.* FROM similares s, anuncios a where  (s.id_anuncio="'.$anuncio[0]['id_anuncio'].'" and a.id_anuncio=s.id_anuncioSimilar and a.id_tipoAnuncio!=1 ) 
	 or (s.id_anuncioSimilar="'.$anuncio[0]['id_anuncio'].'"  and a.id_anuncio=s.id_anuncio and a.id_tipoAnuncio!=1 ) 
	 ';
	$sihay=$myvar->get_arreglo($sql);
								
	 $iban=0;
	 for($ss=0;$ss<count($sihay); $ss++){
		 	if($sihay[$ss][id_anuncio]==$anuncio[0]['id_anuncio']){
				$_SESSION['anunciosSimilares'][$iban]=$sihay[$ss][id_anuncioSimilar];
				$iban++;
			}else{
				$_SESSION['anunciosSimilares'][$iban]=$sihay[$ss][id_anuncio];
				$iban++;
			}
			
	}

			
}else{ // si lo ve o lo encuentra
	// similares perdidos
// los similares encontrados  o vistos 
	 
	 $sql='SELECT  s.* FROM similares s, anuncios a where  (s.id_anuncio="'.$anuncio[0]['id_anuncio'].'" and a.id_anuncio=s.id_anuncioSimilar and
	  a.id_tipoAnuncio=1 ) 
	 or (s.id_anuncioSimilar="'.$anuncio[0]['id_anuncio'].'"  and a.id_anuncio=s.id_anuncio and a.id_tipoAnuncio=1 ) 
	 ';
	$sihay=$myvar->get_arreglo($sql);
								
	 $iban=0;
	 for($ss=0;$ss<count($sihay); $ss++){
		 	if($sihay[$ss][id_anuncio]==$anuncio[0]['id_anuncio']){
				$_SESSION['anunciosSimilares'][$iban]=$sihay[$ss][id_anuncioSimilar];
				$iban++;
			}else{
				$_SESSION['anunciosSimilares'][$iban]=$sihay[$ss][id_anuncio];
				$iban++;
			}
			
	}

}//esle

$clave = array_search($anuncio[0][id_anuncio], $_SESSION[anunciosSimilares]);

if(($clave-1)>=0){ // todavia hay uno
	$otrosproducto[0][id_anuncio]=$_SESSION[anunciosSimilares][$clave-1];
}
if(($clave+1)<count($_SESSION[anunciosSimilares])){ // todavia hay uno
	$motrosproducto[0][id_anuncio]=$_SESSION[anunciosSimilares][$clave+1];
}



/*$sql="select id_anuncio from anuncios where id_anuncio!='".$anuncio[0][id_anuncio]."' and id_activoAnuncio=1 
 and id_cliente!=".$_SESSION[id_clienteLof4]." and id_anuncio<'".$anuncio[0][id_anuncio]."' and activo=1   order by id_anuncio desc limit 1  "; 
	$otrosproducto=$myvar->get_arreglo($sql);
	

	$sql="select id_anuncio from anuncios where  id_anuncio!='".$anuncio[0][id_anuncio]."' and id_activoAnuncio=1   and id_cliente!=".$_SESSION[id_clienteLof4]."  
	and id_anuncio>'".$anuncio[0][id_anuncio]."' and activo=1  order by id_anuncio asc  limit 1 "; 
	$motrosproducto=$myvar->get_arreglo($sql);*/
	
	
	$sql="SELECT *
 FROM reportesAnuncio 
 WHERE id_cliente =".$_SESSION[id_clienteLof4]."
 AND id_anuncio=".$anuncio[0][id_anuncio]." and activo=1";
$c=$myvar->get_arreglo($sql); // te mandaron la info




$sql2=" select * from clientes where activo=1 and id_cliente=".$_SESSION[id_clienteLof4]." limit 1"; 
$cliente1=$myvar->get_arreglo($sql2);

$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";
include "funciones-arriba.php";

?>

<script>
$(function() {
    var pull = $('#pull');
    menu = $('nav ul');
    menuHeight = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
});

$(window).resize(function(){
    var w = $(window).width();
    if(w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});


function verImagen(id,t){
        var parametros = {
                "id" : id,
				"tipo" : t
        };
        $.ajax({
                data:  parametros,
                url:   '<? echo $urlprincipal?>mostrar-imagen.php',
                type:  'post',
                beforeSend: function () {
                        $("#resultado").html("Procesando, espere por favor...");
                },
                success:  function (response) {
                        $("#resultado").html(response);
                }
        });
}



function cambiarPagina(id){
	        var parametros = {
	                "paginas-desp-bus" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#consulta').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-visor.php',
	                type:  'get',
	                beforeSend: function () {
	                        $contenidoAjax.html();
	                },
	                success:  function (response) {
	                        $contenidoAjax.html(response);
	                }
	        });
	}
	


function esmio(id){
	        var parametros = {
	                "esmio" : 1,
	                "id" : id
	        };
			var $contenidoAjax = $('div#esmio').html('<div align="center" style="padding-top:180px; padding-bottom:180px;"><img src="<? echo $urlprincipal?>icon-loading.gif" /></div>');
			
		    $.ajax({
                	data:  parametros,
	                url:   '<? echo $urlprincipal?>ajax-esmio.php',
	                type:  'get',
	                beforeSend: function () {
	                        $contenidoAjax.html();
	                },
	                success:  function (response) {
						
	                        $contenidoAjax.html(response);
	                }
	        });
	}
	
</script>

 <? if($_GET[msg]){?>
 <script>alert(<? echo $_GET[msg]?>)</script>
 <? }?>
 <? //if($ban==1){?>
 
 
 <div class="container">

<div id="consulta">

 
	<section>
	  </nav>

<? 

if($bandera==1){ // es anuncio de quien lo ve
?>

<div class="menuAux2">
  <? 
 	 if($anuncio[0][id_tipoAnuncio]==1){// perdid
	 					$sql='SELECT  * FROM similares where  (id_anuncio="'.$_GET[id].'" ) or (id_anuncioSimilar="'.$_GET[id].'" ) and activo=1';
						//$sql="select * from similares where  id_anuncio='".$_GET[id]."' and activo=1"; 
						$alguien=$myvar->get_arreglo($sql);
			
			
			 if(count($alguien)>0){?>
 				 <img src="<? echo $urlprincipal?>images/status/naranja.png"  border="0"> <a class="btop cf" href="<? echo $urlprincipal?><? echo $_GET[id];?>/coincidencias"> COINCIDENCIAS
<div class="notF"><? echo count($alguien)?></div></a>
					<?  /*for($a=0; $a<count($alguien); $a++){
                        $sql="select * from anuncios where  id_anuncio='".$alguien[$a][id_anuncioSimilar]."' and activo=1 limit 1 "; 
                        $anu=$myvar->get_arreglo($sql);
					?> 
							
							<a href="visor.php?id=<? echo $alguien[$a][id_anuncioSimilar]?>" class="btop cf"><? echo $anu[0][titulo];?></a> 
							<br>
							
							<?
					}*/
				
			 }else{//if
				 if($anuncio[0][id_statusAnuncio]==2){  ?>
                     <img src="<? echo $urlprincipal?>images/status/blanco.png"  border="0">
                <?  }else{
                     ?>
                       <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
                    <?
				 }//else
             }
			 
	 }else{//encontrado
	 	$sql="select * from quienencuentra where  id_anuncio='".$_GET[id]."' and activo=0  "; // alguien ya lo encontro 
		$alguien=$myvar->get_arreglo($sql);
			 if(count($alguien)>0){?>
				<img src="<? echo $urlprincipal?>images/status/rojo.png"  border="0">
			<? }else{//if
			 
				 if($anuncio[0][id_statusAnuncio]==2){ ?>
				 <img src="<? echo $urlprincipal?>images/status/blanco.png"  border="0">
				<?
				 }else{
				 ?>
				   <img src="<? echo $urlprincipal?>images/status/intermitente.gif"  border="0">
				<?
				 }//else
             }//else
	 }//else
	 
	?>
	
       
</div>


 
 <? /*<a href="modificar-anuncio.php?id=<? echo $anuncio[0][id_anuncio];?>"  class="btop cf">MODIFICAR</a>*/?>

<? }else{?>
		<a  href='javascript:void(0);' onclick="esmio(<?php echo $anuncio[0][id_anuncio]; ?>);"
         class="btop cf">Este LOF es mio</a>
		<? if(count($c)<=0){?>
                <div id="dialog4<? echo $anuncio[0][id_anuncio];?>" class="dialogo">
                <a href="<? echo $anuncio[0][id_anuncio];?>"  class="btop cf reportarAnuncio">DENUNCIAR ANUNCIO</a></div>
            	<? }else{?>
                	<div class="error">DENUNCIAR REPORTADO</div>
				<? }?>         
    

<div id="esmio">

</div>
<? }//Else?>


	<? 
	$sql2=" select * from imagenesAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$imagenes=$myvar->get_arreglo($sql2);
	
	
	$sql2=" select * from videos where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." ";
	$videos=$myvar->get_arreglo($sql2);
	
	?>

<div class="cImDe">
    <div class="contImP">
    <span id="resultado">
    <? if(count($imagenes)>0){?>
    <img src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[0][imagen]?>" class="img" border="0">
    <? }elseif(count($videos)>0){?>
    <video  width="100%" src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[0][dsc_video]?>" controls></video>
    <? }?>

    
    
    </span>
    </div>
	<?
	for($i=0; $i<count($imagenes); $i++){
	?>
    
    <div class="contEdicion">
    <span class="TexM"><img onclick="verImagen(<? echo $imagenes[$i][id_imagenAnuncio]?>,1);"
     src="<? echo $urlprincipal?>imagenes/imagenesAnuncio/<? echo $imagenes[$i][imagen]?>" class="imaPqA" border="0"></span>
    </div>
	<? }//for?>
    
    
    	<?
	for($i=0; $i<count($videos); $i++){
	?>
    
    <div class="contEdicion">
    <span class="TexM">
    
     
    
    <video onClick="verImagen(<? echo $videos[$i][id_video]?>,2);"
      width="50%" src="<? echo $urlprincipal?>imagenes/videosAnuncio/<? echo $videos[$i][dsc_video]?>" >
</video></span>
    </div>
	<? }//for?>
	
</div>
	<div class="caracteristicas">
    <span class="Pie"><? echo $anuncio[0][caracteristicas]?></span>
	 <span class="Pie"><? echo $anuncio[0][detalles]?></span>
	</div>
    



	</section>
	<aside>

<div class="compartir">
		<ul>
        	<li>
            <a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
            </li>
			<li>
            <div class="fb-share-button" data-href="" data-layout="button_count" data-mobile-iframe="false"></div>
            </li>
            <li><a href="whatsapp://send" onclick="ga.send('btn1');" data-text="No te pierdas esto: " data-href="" class="wa_btn wa_btn_s" style="display:none">Whatsapp</a></li>
        </ul>
	</div>
<table width="100%" border="1" class="visor" cellspacing="0" height="600" cellpadding="0">
  <tr>
    <td align="center" valign="middle">
    <? 
	/*
	//if($bandera!=1){?>
             <div class="navArrows">
                    <div><?php if($otrosproducto[0][id_anuncio]){ ?>
            <a class="bt-3" href="visor.php?id=<?php echo $otrosproducto[0][id_anuncio]?>"> <img src="images/FlechaV_Izq.png" class="img" border="0"> > </a>
            <?php } ?>
            </div>
            <div>
            
            <?php if($motrosproducto[0][id_anuncio]){ ?>
            <a class="bt-3" href="visor.php?id=<?php echo $motrosproducto[0][id_anuncio]; ?>"><img src="images/FlechaV_Der.png" class="img" border="0">< </a>
            <?php } ?>
            </div>
            </div>
    <? //}// if bandea*/?>
    
    </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"> <p>Categoria:</p><?
			 $sql2=" select * from categoriasAnuncio where activo=1 and id_categoriaAnuncio=".$anuncio[0][id_categoriaAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo utf8_encode($tipos[0][dsc_categoriaAnuncio]);
			 ?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Tipo de Anuncio:</p><?
			 $sql2=" select * from tiposAnuncio where activo=1 and id_tipoAnuncio=".$anuncio[0][id_tipoAnuncio]." limit 1"; 
			 $tipos=$myvar->get_arreglo($sql2);
			 
			 echo $tipos[0][dsc_tipoAnuncio];
			 ?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Titulo:</p><? echo $anuncio[0][titulo]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Nombre:</p>
            <? echo $anuncio[0][nombre]?></td>
  </tr><tr>
    <td align="center" valign="middle" class="TexVisor"><p>Fecha Suceso:</p><? echo obtenerfecha($anuncio[0][fechaSuceso]);?>
           </td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Estado:</p>
            <? 
			$sql="select * from estados where id_estado='".$anuncio[0][id_estado]."' limit 1";
			$tipos=$myvar->get_arreglo($sql);
			
			echo $tipos[0][nombre]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Municipio:</p>
            <? 
			$sql="select * from municipios where id_municipio='".$anuncio[0][id_municipio]."' limit 1";
			$tipos=$myvar->get_arreglo($sql);
			
			echo $tipos[0][nombre]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Lugar Suceso:</p>
            <? echo $anuncio[0][lugarSuceso]?></td>
  </tr>
   <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Empresa LF Suceso</p>
            <? echo $anuncio[0][lugarSucesoLF]?></td>
  </tr>
  
  
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Compartido A:</p><? echo $aquienComparte[0][dsc_aquienComparte]?></td>
  </tr>
 <? if($anuncio[0][monto]>0){?>
 <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Recompensa $:</p>
            <? echo "$ ".$anuncio[0][monto]?></td>
  </tr>
  <? }?>
 
  <tr>
    <td align="center" valign="middle" class="TexVisor"><p>Datos del LOFERS:</p><? 
	
	if($cliente[0][ocultarNom]==1){// si lo quiere ocultar
				echo $cliente[0][nombre]." ".$cliente[0][apellidos];
				}else{
				echo $cliente[0][nick];
				}?> <br><?
	
	if($cliente[0][ocultarTel]!=1){ // si ocutar
	
	echo $cliente[0][telefono];
	?>  <br><? }?>
    <? echo $cliente[0][email];?></td>
  </tr>
  <tr>
    <td align="center" valign="middle" class="TexVisor"><?php include("traductor.php"); ?></td>
  </tr>
  
</table>
</aside>
 
 <?
	        
     $sql2=" select * from comentariosAnuncio where activo=1 and id_anuncio=".$anuncio[0][id_anuncio]." order by id_comentarioAnuncio desc ";
	 $comentarios=$myvar->get_arreglo($sql2);
	 ?> 
	<div class="comentarios">
	<h3>Comentarios</h3>
   <? for($i=0; $i<count($comentarios); $i++){
	   ?>
	 
  <div class="uncom">
  ¿Quién comenta?: <strong>
  <? 
	    $sql2=" select * from clientes where id_cliente=".$comentarios[$i][id_cliente]." limit 1 ";
	$cli=$myvar->get_arreglo($sql2);
	
	if($cli[0][ocultarNom]==1){// si lo quiere ocultar
	echo $cli[0][nombre]." ".$cli[0][apellidos];
	}else{
	echo $cli[0][nick];
	}?>
  </strong>
        </p>
        <p>FECHA: <strong><? echo $comentarios[$i][fecha]?></strong>
        </p>
        <p>COMENTARIO: <strong><? echo $comentarios[$i][comentario]?></strong>
          
        </p>
    </div>   
            
	<? }//for?>
</div>
          
          <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>Agregar un comentario:</p>
             <p><input name="comentario" type="text" id="comentario"  placeholder="comentario" autofocus /></p>
 			 <input type="hidden" name="status"  id="status"/> <input type="hidden" name="id_anuncio" 
              id="id_anuncio" value="<? echo $anuncio[0][id_anuncio]?>"/>
              <input type="hidden" name="t" 
              id="t" value="<? echo $_GET[t]?>"/>
 <p id="bot"><input name="submit" type="submit" id="boton" value="Enviar comentario" class="boton"  onclick="document.getElementById('status').value = '1';"/></p>
		</form> 
	
    </div>
</div>

<? /*}else{
	echo "NO HAY INFORMACION";
}*/?>


<script>//////REPORTAR CLIENTE
		     var href4;
 
        $('.reportarAnuncio').click(function(e) {
          e.preventDefault();
          href4 = $(this).attr('href');
          $('#dialog4'+href4).fadeIn(200, function() {
            $(this).html('¿Realmente desea denunciar este anuncio?<br><br>');
            $(this).append("<input type='button' id='ejecutar_proceso4' value='Si'>");
            $(this).append("<input type='button' id='cerrar_dialogo4' value='Cancelar'>");
          });
			
        $('#dialog4'+href4).on("click", "#ejecutar_proceso4", function(event) {
    ejecutar4(href4);
});
        $('#dialog4'+href4).on("click", "#cerrar_dialogo4", function(event) {
    cerrar4(href4);
});
 });
		
	 function cerrar4(href4) {
				$('#dialog4'+href4).html('<a href="'+href4+'"   class="reportarAnuncio">Denunciar Anuncio</a>');
        }
 
        function ejecutar4(href4) {
		 $.ajax({
            type: "GET",
            url: "<? echo $urlprincipal?>eliminar-datos.php?reportar-anuncio=1&id="+href4,
            success: function(data) {
				 $('#dialog4'+href4).html(data);
            }
          });
          $(".unica4"+href4).remove();
        }
		
	// ACEPTAR SOLICITUD
</script><!-- LAS ANIMACIONES PERSONALES DEL SITIO -->
<script src="<? echo $urlprincipal?>js/animaciones.js"></script>

