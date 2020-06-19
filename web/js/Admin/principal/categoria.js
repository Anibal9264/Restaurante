function viewNCategoria(){
    $('#A-Contenido').load("com/Admin/principal/new-categoria.html");
    setTimeout(
function() { 
     CargarPlatos();
      $("#C-add").on("click",()=>{addCategoriaN();});
    },300);
}

function viewCategorias(){
    $('#A-Contenido').load("com/Admin/principal/lista-categ.html");
}

function CargarPlatos(){
 $.ajax({type:"GET", url:"api/admin/plato",contentType:"application/json"})
      .then((Platos)=>{listP(Platos);},
             (error)=>{ alert("Error al obtener Categorias: "+error);});      
}
function listP(Platos){
    var Tabl = $('#T-add-cat');
    Platos.forEach( (p)=>{Rowplatos(Tabl,p);});
}
function Rowplatos(Tabl,p){
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
      data: JSON.stringify(Cetegoria),contentType: "application/json"});
     $("#addExito").modal("show");
     setTimeout(
     function() 
     {
       viewNCategoria();
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
      
  