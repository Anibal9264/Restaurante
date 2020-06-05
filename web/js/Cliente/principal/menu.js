
function GetListPlatos(ID){
    Categoria = {id:ID};
    $.ajax({type: "GET", url:"/Restaurante/api/menu?id="+Categoria.id,
         contentType: "application/json"})
      .then( (platos)=>{listplatos(platos);},
             (error)=>{ alert(errorMessage(error.status));});    
}
  
function listplatos(platos){
    var listado=$("#platoslist");
    listado.html("");
    platos.forEach((p)=>{row(listado,p);});	
}

function row(listado,plato){
	var div =$("<div>");
        div.addClass("col-lg-4 col-md-6 mb-4");
	div.html(
                 "<div class="+"card h-100"+">"+
               "<img class="+"card-img-top"+" src="+plato.imagen+" alt="+""+">"+
                "<div class="+"card-body"+">"+
                "<h4 class="+"card-title"+">"+
                "<a id="+"nombre"+">"+plato.nombre+"</a>"+
                "</h4>"+
                +"<h5>"+ plato.precio.toString()+"</h5>"+
                "<p class="+"card-text"+">"+plato.detalle+"</p>"+
              "</div>"+
              "<div class="+"card-footer"+">"+
              "<small class="+"text-muted"+">&#9733; &#9733; &#9733; &#9733; &#9734;</small>"+
              "</div>"+
              "</div>"
               );  
        div.find("#nombre").on("click",()=>{PopopPlato(plato);});
	listado.append(div); 
          
  }     