function viewNAdicionales(){
    $('#A-Contenido').load("com/Admin/principal/new-adicionales.html");
    setTimeout(
function() { 
     CargarAdicionalL();
       $("#A-add").on("click",()=>{addAdicionalesN();}); 
    },300);
}

function viewAdicionales(){
    $('#A-Contenido').load("com/Admin/principal/lista-adicionales.html");
}


function CargarAdicionalL(){
 $.ajax({type:"GET", url:"api/admin/adicional",contentType:"application/json"})
      .then((AdicionalL)=>{listA(AdicionalL);},
             (error)=>{ alert("Error al obtener Categorias: "+error);});      
}
function listA(AdicionalL){
    var Tabl = $('#T-add-A');
    AdicionalL.forEach( (a)=>{Rowplatos(Tabl,a);});
}
function Rowplatos(Tabl,a){
  var tr = $("<tr>");
  tr.html("<th scope='row'>"+    
 "<div class='custom-control custom-checkbox'>"+
 "<input type='checkbox' class='custom-control-input' id='"+a.id+"'> "+
 "<label class='custom-control-label' for='"+a.id+"'>"+a.id+"</label>"+
 "</div>"+
 "</th><td>"+a.detalle+"</td><td>"+a.precio+"</td>");
  Tabl.append(tr);                                                                                                                        
}

function addAdicionalesN(){
      Adicionales={
          nombre:$('#A-nombre').val(),
          tipo:true,
          listAdicionales:obtenerSelect()
      };
      if (Adicionales.nombre.length === 0 ||
          Adicionales.listAdicionales.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/admin/adicionales",
      data: JSON.stringify(Adicionales),contentType: "application/json"});
      window.location.href = "index2.html";
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