
//window.Categoria

 // al Cargar la pagina completa
 function loaded(){
    $('#add-modal').load("detalles.html");
    $('#add-modal2').load("Direcciones.html");
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
    var a = $("<label>");
    a.addClass("btn btn-secondary");
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