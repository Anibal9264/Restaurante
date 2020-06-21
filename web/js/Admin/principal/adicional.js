function viewNAdicional(){
    $('#A-Contenido').load("com/Admin/principal/new-adicional.html");
    setTimeout(
function() { 
       $("#AddAdicional").on("click",()=>{addAdicionalN();});
    },300);
}

function viewAdicional(){
    $('#A-Contenido').load("com/Admin/principal/lista-adicional.html");
    cargarAdicional();
}


///////////////////////////////////////

function cargarAdicional(){
 $.ajax({type:"GET", url:"api/admin/adicional",contentType:"application/json"})
      .then((AdicionalL)=>{listarAdicional(AdicionalL);},
             (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});      
}
function listarAdicional(AdicionalL){
    var Tabl = $('#listaAdicional');
    AdicionalL.forEach( (a)=>{rowAdicion(Tabl,a);});
}

 function rowAdicion(Tabl,ad){
  var tr = $("<tr>");
  tr.html(
 "<td>"+ad.id+"</td>" + "<td>"+ad.detalle+"</td>"+"<td>"
 +ad.precio+"</td>"
 );
  Tabl.append(tr);    
 }
//////////////////////////////////////

  function addAdicionalN(){
      Adicional={
          detalle:$('#A-nombre').val(),
          precio:$('#A-precio').val()
      };
      if (Adicional.detalle.length === 0 ||
          Adicional.precio.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
       $.ajax({type:"POST", url:"api/admin/adicional",
       data: JSON.stringify(Adicional),contentType: "application/json"})
     .then( ()=>{adicionalSuccessA();},
       (error)=>{ errorMessage(error.status,$("#ErrorDiv"));}); 
     }
    
  }
  
  function adicionalSuccessA(){
      $("#addExito").modal("show");
     setTimeout(
     function() 
     {
       viewNAdicional();
       $("#addExito").modal("hide");
     }, 2000); 
  }