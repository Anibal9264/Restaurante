function viewNAdicional(){
    $('#A-Contenido').load("com/Admin/principal/new-adicional.html");
    setTimeout(
function() { 
     CargarPlatos();
       $("#AddAdicional").on("click",()=>{addAdicionalN();});
    },300);
}

function viewAdicional(){
    $('#A-Contenido').load("com/Admin/principal/lista-adicional.html");
}

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
       data: JSON.stringify(Adicional),contentType: "application/json"});
       window.location.href = "index2.html";
     }
    
  }