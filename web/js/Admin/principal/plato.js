/* global result*/

function viewNPlato(){
$('#A-Contenido').load("com/Admin/principal/new-plato.html");
setTimeout(
function() { 
    $("#P-add").on("click",()=>{addPlatoN();});
    $('#P-image').change(function(e){addImage(e);});},500);
}
function viewPlatos(){
    $('#A-Contenido').load("com/Admin/principal/lista-platos.html");
}

// funcion cargar Imagen
     function addImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
      
      if (!file.type.match(imageType))return;
     
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
     }
  
     function fileOnload(e) {
      result=e.target.result;
      $('#imgSalida').attr("src",result);
     }
      
  function addPlatoN(){
      Plato={
          nombre:$('#P-nombre').val(),
          detalle:$('#P-detalle').val(),
          precio:$('#P-precio').val(), 
          disponibles:$('#P-disp').val(),
          imagen:result
      };
      if (Plato.nombre.length === 0 ||
      Plato.detalle.length === 0 ||
      Plato.precio.length === 0 ||
      Plato.disponibles.length === 0 ||
      Plato.imagen.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/admin/plato",
       data: JSON.stringify(Plato),contentType: "application/json"});
       window.location.href = "index2.html";
     }
    
  }
     

     




  
