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



if ($_POST['statusComentario']) {

$sql='update clientes set activo=0, id_statusCliente=2
	 where id_cliente='.$_SESSION[id_clienteLof4].' limit 1';
	$myvar->execute($sql);
	
	$sql2=" select * from anuncios where id_cliente=".$_SESSION[id_clienteLof4].""; 
	$anuncios=$myvar->get_arreglo($sql2);

	for($i=0; $i<count($anuncios); $i++){
		$sql='delete form imagenesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form videos where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form comentariosAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form compartidoA where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form quienencuentra where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form reportesAnuncio where id_anuncio='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	$sql='delete form similares where id_anuncio='.$anuncios[$i][id_anuncio].' or  id_anuncioSimilar='.$anuncios[$i][id_anuncio];
		$myvar->execute($sql);
	
	}//for
	
		$sql='delete form clientes_has_categoriasAnuncio where id_cliente='.$_SESSION[id_clienteLof4];
		$myvar->execute($sql);
	
		$sql='delete form clientes_has_clientes where id_cliente='.$_SESSION[id_clienteLof4].' or id_cliente1='.$_SESSION[id_clienteLof4];
		$myvar->execute($sql);
	
		$sql='delete form reportesCliente where id_cliente='.$_SESSION[id_clienteLof4];
		$myvar->execute($sql);
	
		header("Location: ".$urlprincipal."1/cerrar-sesion");

		exit();
}//if submit


$tituloGL="Lofers.club | Lo pierdes, lo buscas, lo encuentras";
$imagenGL="imagenes/logoredes.png";
$descripcionGL="Comunidad para reportar pérdidas y hallazgos, personas, mascotas, objetos y cosas desaparecidas y encontradas.";
$keywordsGL="lofers.club,lofers,ayuda para encontrar,encontré,encontre,perdí,perdi,pérdida, pérdidas,estoy buscando,busco,acabo de encontrar,personas perdidas,perdi celular,busco perrito,buscando,buscamos,hallamos,encontramos,objetos perdidos,mascotas perdidas,extraviados,extraviadas,ayuda para buscar,perdimos un,perdimos a nuestro,perdimos a nuestra,perdimos una,perdimos unos,perdimos unas,perdi un, perdi una, perdi unos,perdi unas,localizar,ayuda,apoyo,donde puedo encontrar,reportar,celulares perdidos,perdi mis llaves,lost and found,lose and find,lose,find,found,lost,lost items,missing,missing items,dissapeareance of items,loss of items,lost property,abandoned,strayed,taken,tainted,idle,miss,drop,locate,located,traced,trace,guess,encounter,spot,missing cellphone,missing my,lost my,found a";


include "funciones-arriba.php";
?>
<table width="100%" border="0" cellspacing="0" cellpadding="0" background="images/Pantalla_White.png">
  <tr>
    <td>


<? include "menu-interno.php";?>	 
<? include "menu2Aux.php";?>	 


<center><br>

  <div id="losproductos">
  
  	     
            <div class="unAmigo">
            	
            
            <form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" enctype="multipart/form-data" name="formulario" id="formulario" >
 <p>¿SEGURO DESEA CERRAR CUENTA?</p>
             <input type="hidden" name="statusComentario"  id="statusComentario"/> 
             <p id="bot"><input name="submit" type="submit" id="boton" value="si" class="boton" 
              onclick="document.getElementById('statusComentario').value = '1';"/>
 <A href="<? echo $urlprincipal?>mi-sitio">NO</A></p>
 
 
 
 <p>SE PERDERAN TODOS TUS DATOS E HISTORIAL</p>
		</form>  
             </div>
			
         
            
            	

</div>
</center> 

</td>
  </tr>
</table>
<? include "funciones-abajo.php";?>
