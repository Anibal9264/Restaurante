/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.existeP;



 function loaded(){
  $("#loginAd").on("click",()=>{Login();});   
  
  existeP = null;
 }
 
$(loaded);

function CargarDatosCliente(){
     var cliente = $.parseJSON(sessionStorage.getItem('cliente'));
     var nom=$("#Login");
     nom.html(cliente.nombre+" "+cliente.apellidos);
     $('#Logout').removeClass("hide");
     $('#histo').removeClass("hide");
     $('#Login').off("click"); 
}

function quitarDatos(){
     $('#Logout').addClass("hide");
     $('#histo').addClass("hide");
     $("#Login").html("Login");
    
}

function cargarlogin(){
    $('#Contenido').html("");
    $('#Contenido').load("com/Admin/login/login.html");
     setTimeout(
    function() 
     {
      onloaded();
     },700);   
}
//
//function RegistroShow(){                  //mostrar 
//    $("#R_email").attr("placeholder","tucorreo@example.com");
//    $("#R_email").removeClass("is-invalid");
//    $("#R_email").removeClass("is-valid");
//    $('#modalRegistro').modal("show");
//    $("#R_email").on("change",()=>{verificar();});
//}



function verificar(){       //para el registrar, si el correo ya existe entonces no me deja registrar otro
    existeP = null;
    existe();
    if(!existeP){
         $("#R_email").removeClass("is-invalid");
         $("#R_email").addClass("is-valid");
    }
}

function existe(){
   persona={
     correo:$("#R_email").val().toLowerCase()
   };
    $.ajax({type:"POST", url:"api/login/get",
                data: JSON.stringify(persona),contentType: "application/json"}) //JSON.stringify(persona) aqui le paso la funcion Rest java
      .then((persona)=>{if(persona){existeP = persona;
           $("#R_email").removeClass("is-valid");
           $("#R_email").addClass("is-invalid");  
           $("#R_email").val("");
           $("#R_email").attr("placeholder",persona.correo);
            
           
        }});  
}

//function  AddUser(){
//    
//     persona={
//          nombre:$("#R_nombre").val(),
//          apellidos:$("#R_apellidos").val(),
//          telefono:$("#R_telefono").val(),
//          correo:$("#R_email").val(),
//          contraseña:$("#R_contra").val()
//       };
//      if (persona.nombre.length === 0 ||
//      persona.apellidos.length === 0 ||
//      persona.telefono.length === 0 ||
//      persona.correo.length === 0 ||
//      persona.contraseña.length === 0
//      ){
//      alert("No puede haber campos vacios");
//    } else {
//      $.ajax({type:"POST", url:"api/login/add",
//       data: JSON.stringify(persona),contentType: "application/json"})
//      .then((persona)=>{persona.correo="";CargarCliente(persona);},
//      (error)=>{errorMessage(error.status,$("#loginErrorDiv"));});
//     }
//      
//       
//        
//}


function Login(){
   
   if(!validar()) return; 
   persona={
     correo:$("#inputEmail").val().toLowerCase(),
     contraseña:$("#inputPassword").val()
   };
   
   $.ajax({type: "POST", url:"api/login",
                data: JSON.stringify(persona),contentType: "application/json"})
      .then((persona)=>{persona.correo="";CargarCliente(persona);},
             (error)=>{errorMessage(error.status,$("#loginErrorDiv"));});  
}

function CargarCliente(persona){
  sessionStorage.setItem('cliente',JSON.stringify(persona));
  window.location.href = "index2.html";
}


function Logout(){
   $.ajax({type: "DELETE",url:"api/login" })
   .then( ()=>{logoutSuccess();},
   (error)=>{ errorMessage(error.status,$("#loginErrorDiv"));}); 
}
function logoutSuccess(){
  sessionStorage.removeItem('cliente');
  window.location.href = "login.html";
  }
  function validar(){
    var error=false;
    $("#formulario input").removeClass("invalid");
    error |= $("#formulario input[type='email']")
            .filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='email']")
            .filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    error |= $("#formulario input[type='password']")
            .filter( (i,e)=>{ return e.value=='';}).length>0;        
    $("#formulario input[type='password']")
            .filter( (i,e)=>{ return e.value=='';}).addClass("invalid");
    return !error;
  }
  
  
function errorMessage(status,place){
            error=status;
            switch(status){
                case 401: error= "Usuario no registrado"; break;
                case 403: case 405: error="Usuario no autorizado"; break;                
                case 404: error= "Contraseña o Usuario no valido"; break;
            };            
            place.html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h4 class="alert-heading">Error!</h4>'+error+'</div>');
            return;        
}

