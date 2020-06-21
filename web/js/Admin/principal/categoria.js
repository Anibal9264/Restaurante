function viewNCategoria(){
    $('#A-Contenido').load("com/Admin/principal/new-categoria.html");
    setTimeout(
function() { 
     CargarPlatosC();
      $("#C-add").on("click",()=>{addCategoriaN();});
    },300);
}

function viewCategorias(){
    $('#A-Contenido').load("com/Admin/principal/lista-categ.html");
}

function CargarPlatosC(){
 $.ajax({type:"GET", url:"api/admin/plato",contentType:"application/json"})
      .then((Platos)=>{listPC(Platos);},
             (error)=>{errorMessage(error.status,$("#ErrorDiv"));});      
}
function listPC(Platos){
    var Tabl = $('#T-add-cat');
    Platos.forEach((p)=>{RowplatosC(Tabl,p);});
}
function RowplatosC(Tabl,p){
  var tr = $("<tr>");
  tr.html("<th scope='row'>"+    
 "<div class='custom-control custom-checkbox'>"+
 "<input type='checkbox' class='custom-control-input' id='"+p.id+"'> "+
 "<label class='custom-control-label' for='"+p.id+"'>"+p.id+"</label>"+
 "</div>"+
 "</th>"+
 "<td>"+p.nombre+"</td>");
  Tabl.append(tr);                                                                                                                        
}

function addCategoriaN(){
      Cetegoria={
          nombre:$('#C-nombre').val(),
          platos:obtenerPSelect()
      };
      if (Cetegoria.nombre.length === 0 ||
          Cetegoria.platos.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/admin/categoria",
      data: JSON.stringify(Cetegoria),contentType: "application/json"})
     .then( ()=>{categoriaSuccessA();},
      (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});
     
  }
  
  function categoriaSuccessA(){
     $("#addExito").modal("show");
     setTimeout(
     function() 
     {
       viewNCategoria();
       $("#addExito").modal("hide");
     }, 2000);
     }  
  }
  
  function obtenerPSelect(){
    var selects =[];
     $("input[type=checkbox]:checked").each(function() {
         Plato={
             id:$(this).attr("id")
         };
      selects.push(Plato);
     }); 
     return selects;
}
      
  