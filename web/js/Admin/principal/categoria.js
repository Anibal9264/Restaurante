function viewNCategoria(){
    $('#A-Contenido').load("com/Admin/principal/new-categoria.html");
    setTimeout(
function() { 
     CargarPlatosC();
      $("#C-add").on("click",()=>{addCategoriaN();});
    },300);
}


function CargarPlatosC(){
 $.ajax({type:"GET", url:"api/admin/plato",contentType:"application/json"})
      .then((Platos)=>{listPC(Platos);},
             (error)=>{errorMessage(error.status,$("#ErrorDiv"));});      
}
function listPC(Platos){
    var Tabl = $('#T-add-cat');
    Tabl.html("");
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



/// listar Cartegorias y editar 



function viewCategorias(){
    $('#A-Contenido').load("com/Admin/principal/lista-categ.html");
    $("#MostrarModal").load("com/Admin/principal/CategoriaEdit.html");
setTimeout(
function() { 
     GetCategorias();
    },300);
}
  function GetCategorias(){
    $.ajax({type:"GET", url:"api/categorias",contentType:"application/json"})
      .then((Categorias)=>{ listCat(Categorias);},  
             (error)=>{ alert("Error al obtener Categorias: "+error);});                          
   }
   
  function listCat(Categorias){
    var tbody = $('#T-CAT');
    Categorias.forEach( (c)=>{CategoriasAdd(tbody,c);});	
  }
  
  function CategoriasAdd(tbody,c){
  var tr =$("<tr>");     
   tr.html("<td Class='w-25'>"+c.nombre+"</td>");
   var td =$("<td>");
   c.platos.forEach( (p)=>{PAdd(td,p);});
  tr.append(td);
  tr.find('td').on("click",()=>{mostrarCategoria(c);});
  tbody.append(tr); 
  }
  function PAdd(td,p){
    var span = $("<span>");
    span.html(p.nombre+", ");
    td.append(span);
  }    
  
  function mostrarCategoria(c){
   $("#C-nombre").val(c.nombre);
   $("#MostrarModal").modal("show");
   CargarPlatosC();
   setTimeout(
function() { 
   marcar(c);
    $("#C-add").off("click");
    $("#C-add").on("click",()=>{updateCategoria(c);});
    },700);
  }
  function marcar(c){
   $("input[type=checkbox]").each(function() {
          var id =$(this).attr("id");
          c.platos.forEach((p)=>{
          if(parseInt(id)===p.id){
          $(this).prop("checked","true");
                }
            });
     }); 

  }
  
  function updateCategoria(c){
      Cetegoria={
          id:c.id,
          nombre:$('#C-nombre').val(),
          platos:obtenerPSelect()
      };
      if (Cetegoria.nombre.length === 0 ||
          Cetegoria.platos.length === 0
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/admin/categoriaEdit",
      data: JSON.stringify(Cetegoria),contentType: "application/json"})
     .then(()=>{categoriaSuccessB();},
      (error)=>{ errorMessage(error.status,$("#ErrorDiv"));});
   }
   
     function categoriaSuccessB(){
     $("#addExito").modal("show");
     setTimeout(
     function() 
     {
        viewCategorias();
       $("#addExito").modal("hide");
     }, 1000);
     }  
}