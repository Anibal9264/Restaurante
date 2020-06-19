function loaded(){
$('#A-Contenido').load("com/Admin/principal/estadistica.html");
$('#addPlato').on("click",()=>{viewNPlato();});
$('#view-Platos').on("click",()=>{viewPlatos();});
$('#addCategoria').on("click",()=>{viewNCategoria();});
$('#view-Categorias').on("click",()=>{viewCategorias();});
$('#addAdicionales').on("click",()=>{viewNAdicionales();});
$('#view-Adicionales').on("click",()=>{viewAdicionales();});
$('#addAdicional').on("click",()=>{viewNAdicional();});
$('#view-Adicional').on("click",()=>{viewAdicional();});
}
$(loaded);


  
