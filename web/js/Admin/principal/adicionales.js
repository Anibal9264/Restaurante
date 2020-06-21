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
     cargaAdicionales();

}

//////////////////////////////


function cargaAdicionales(){
 $.ajax({type:"GET", url:"api/admin/adicionales",contentType:"application/json"})
      .then((Adicionales)=>{listAdi(Adicionales);},
             (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});      
}
function listAdi(Adicionales){
    
    var Tabl = $('#listaAdicionales');
    Adicionales.forEach((a)=>{rowAdicionales(Tabl,a);});
}
function rowAdicionales(Tabl,a){
  var tr = $("<tr>");
  var td = $("<td>");
  a.listAdicionales.forEach((ad)=>{rowAdicional(td,ad);});
  tr.html("<td>"+a.id+"</td>"+"<td>"+a.nombre+"</td>"+
 "<td>"+renderTipo(a.tipo)+"</td>"+"<td>"+a.plato+"</td>");
  tr.append(td);
  Tabl.append(tr);                                                                                                                        
}

 function rowAdicional(td,ad){
     var span = $("<span>");
     span.addClass("label  row");
     span.html(" "+ad.detalle);
     td.append(span);    
 }
 
////////////////////////////////
function CargarAdicionalL(){
 $.ajax({type:"GET", url:"api/admin/adicional",contentType:"application/json"})
      .then((AdicionalL)=>{listA(AdicionalL);},
             (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});      
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
          tipo:obtenerRadio(),
          listAdicionales:obtenerSelect()
      };
      if (Adicionales.nombre.length === 0 ||
          Adicionales.listAdicionales.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/admin/adicionales",
      data: JSON.stringify(Adicionales),contentType: "application/json"})
     .then( ()=>{AdicionalesSuccessA();},
     (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});
     } 
  }
  
  function AdicionalesSuccessA(){
     $("#addExito").modal("show");
     setTimeout(
     function() 
     {
       viewNAdicionales();
       $("#addExito").modal("hide");
     }, 2000); 
  }
  
  function obtenerSelect(){
    var selects =[];
     $("input[type=checkbox]:checked").each(function() {
         Adicional={
             id:$(this).attr("id")
         };
      selects.push(Adicional);
     }); 
     return selects;
}
 function obtenerRadio(){
      var is;
       $("input[type=radio]:checked").each(function() {
       is = $(this).attr("id");
       });
       if(is===1)return true;
           return false;
 }