window.existeP; 

 function loaded(){
  $("#loginAd").on("click",()=>{LoginA();}); 
  $("#Bregistro").on("click",()=>{registroShow();});
  $("#register").on("click",()=>{AddUserAd();});
 } 
$(loaded);

function LoginA(){
   
   persona={
     correo:$("#inputEmail").val().toLowerCase(),
     contraseña:$("#inputPassword").val()
   };
      if (persona.correo.length === 0 ||persona.contraseña.length === 0){   
        errorMessage(999,$("#loginErrorDiv"));
    } else {
   $.ajax({type: "POST", url:"api/login",
                data: JSON.stringify(persona),contentType: "application/json"})
      .then((persona)=>{persona.correo="";CargarA(persona);},
             (error)=>{errorMessage(error.status,$("#loginErrorDiv"));});  
    }
}

function CargarA(persona){
  sessionStorage.setItem('Admin',JSON.stringify(persona));
  window.location.href = "index2.html";
}

function LogoutAd(){
   $.ajax({type: "DELETE",url:"api/login" })
   .then( ()=>{logoutSuccessA();},
   (error)=>{ errorMessage(error.status,$("#loginErrorDiv"));}); 
}

function logoutSuccessA(){ 
  sessionStorage.removeItem('Admin');
  window.location.href = "login.html";
 }

function errorMessage(status,place){
    error=status;
    $("#msjerror").modal("show");
            switch(status){
                case 401: error= "Usuario no registrado"; break;
                case 403: case 405: error="Usuario no autorizado"; break;                
                case 404: error= "Contraseña o Usuario no valido"; break;
                case 999: error= "Campo en blanco"; break;
            };            
            place.html('<div class="alert alert-danger fade show">' +
            '<button type="button" class="close" data-dismiss="alert">' +
            '&times;</button><h6 class="alert-heading">Error!: '+error+'</h6></div>');
            return;     
}

///////////////////////////////

function registroShow(){
    $('#A-Contenido').load("com/Admin/login/register.html");
setTimeout(
function() { 
    $("#R_email").attr("placeholder","tucorreo@example.com");
    $("#R_email").removeClass("is-invalid");
    $("#R_email").removeClass("is-valid");
    $('#modalRegistro').modal("show");
    $("#R_email").on("change",()=>{Verificar();});
    $("#R_email").on("keyup",()=>{Verificar();});
    $("#R_register").on("click",()=>{AddUserAd();});
},500);

}

function Verificar(){
    existeP = null;
    Existe();
    if(!existeP){
         $("#R_email").removeClass("is-invalid");
         $("#R_email").addClass("is-valid");
    }
}

function Existe(){
   persona={
     correo:$("#R_email").val().toLowerCase()
   };
    $.ajax({type:"POST", url:"api/login/get",
                data: JSON.stringify(persona),contentType: "application/json"})
      .then((persona)=>{if(persona){existeP = true;
           $("#R_email").removeClass("is-valid");
           $("#R_email").addClass("is-invalid");  
           $("#R_email").attr("placeholder",persona.correo); 
        }});  
}

function  AddUserAd(){
    
     persona={
          nombre:$("#R_nombre").val(),
          apellidos:$("#R_apellidos").val(),
          telefono:$("#R_telefono").val(),
          correo:$("#R_email").val(),
          contraseña:$("#R_contra").val(),
          isAdmin:true
       };
      if (persona.nombre.length === 0 ||
      persona.apellidos.length === 0 ||
      persona.telefono.length === 0 ||
      persona.correo.length === 0 ||
      persona.contraseña.length === 0||
      existeP
      ){
      alert("No puede haber campos vacios");
    } else {
      $.ajax({type:"POST", url:"api/login/add",
       data: JSON.stringify(persona),contentType: "application/json"})
      .then(()=>{registroShow();SuccessAddAd();},
      (error)=>{errorMessage(error.status,$("#ErrorDiv"));});
     }     
}

  
  function SuccessAddAd(){
      $("#addExito").modal("show");
     setTimeout(
     function() 
     {
      viewGrafica();
       $("#addExito").modal("hide");
     }, 1000); 
  }


// ---------------------registrar------------------------


