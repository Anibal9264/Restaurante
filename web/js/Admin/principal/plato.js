/* global result*/

function viewNPlato(){
$('#A-Contenido').load("com/Admin/principal/new-plato.html");
setTimeout(
function() { 
    $("#P-add").on("click",()=>{addPlatoN();});
    CargarAdicionales();
    $('#P-image').change(function(e){addImage(e);}); 
},500);
    
}
function viewPlatos(){
    $('#A-Contenido').load("com/Admin/principal/lista-platos.html");
}
function CargarAdicionales(){
 $.ajax({type:"GET", url:"api/admin/adicionales",contentType:"application/json"})
      .then((Adicionales)=>{listAds(Adicionales);},
             (error)=>{ alert("Error al obtener adicionales: "+error);});      
}
function listAds(Adicionales){
    
    var Tabl = $('#T-add-P');
    Adicionales.forEach((a)=>{RowAdicionales(Tabl,a);});
}
function RowAdicionales(Tabl,a){
  var tr = $("<tr>");
  var td = $("<td>");
  a.listAdicionales.forEach((ad)=>{RowAdicional(td,ad);});
  tr.html("<th scope='row'>"+    
 "<div class='custom-control custom-checkbox'>"+
 "<input type='checkbox' class='custom-control-input' id='"+a.id+"'> "+
 "<label class='custom-control-label' for='"+a.id+"'>"+a.nombre+"</label>"+
 "</div>"+
 "</th>"+
 "<td>"+renderTipo(a.tipo)+"</td>");
  tr.append(td);
  Tabl.append(tr);                                                                                                                        
}


function renderTipo(t){
    if(t) return "Seleccion unica";
    return "Selecion Multiple";
}
 function RowAdicional(td,ad){
     var span = $("<span>");
     span.addClass("label  row");
     span.html(" "+ad.detalle+" ₡"+ad.precio);
     td.append(span);    
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
          adicionales:obtenerSelect(),
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
        $("#addExito").modal("show");
     setTimeout(
     function() 
     {
       viewNPlato();
     }, 2000);
     }
    
  }
  
    function obtenerSelect(){
    var selects =[];
     $("input[type=checkbox]:checked").each(function() {
         Plato={
             id:$(this).attr("id")
         };
      selects.push(Plato);
     }); 
     return selects;
}
     

     




  
