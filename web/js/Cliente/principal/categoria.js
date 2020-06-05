
//window.Categoria

 // al Cargar la pagina completa
 function loaded(){
    $('#add-modal').load("detalles.html");
    GetCategorias();
 }
$(loaded);

  function GetCategorias(){
    $.ajax({type:"GET", url:"/Restaurante/api/categorias",contentType:"application/json"})
      .then((Categorias)=>{listCat(Categorias);},
             (error)=>{ alert(errorMessage(error.status));});                          
   }
   
  function listCat(Categorias){
    var cat = $('#categorias');
    Categorias.forEach( (c)=>{CategoriasAdd(cat,c);});	
  }
  
  function CategoriasAdd(cat,categoria){
    var a = $("<a>");
    a.addClass("list-group-item w3-bar-item w3-button");
    a.html(categoria.nombre);
    a.on("click",()=>{GetListPlatos(categoria.id);});
    cat.append(a); 
  }
  
   function errorMessage(status){
        switch(status){
            case 404: return "Registro no encontrado";
            case 403: case 405: return "Usuario no autorizado";
            case 406: return "Registro duplicado";
            default: return "Error: " + status;
        }
    }