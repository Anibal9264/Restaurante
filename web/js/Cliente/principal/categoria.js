
/* global categoria */
  function GetCategorias(){
    $.ajax({type:"GET", url:"/Restaurante/api/categorias",contentType:"application/json"})
      .then((Categorias)=>{listCat(Categorias);},
             (error)=>{ alert("Error al obtener Categorias: "+error);});                          
   }
   
  function listCat(Categorias){
    var cat = $('#categorias');
    Categorias.forEach( (c)=>{CategoriasAdd(cat,c);});	
  }
  
  function CategoriasAdd(cat,categoria){
    var a = $("<label>");
    a.addClass("btn btn-secondary");
    a.html(categoria.nombre);
    a.on("click",()=>{
        sessionStorage.setItem('categoria',categoria.id);
        GetListPlatos(categoria.id);
    });
    cat.append(a); 
  }