/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 function log(){
    persona = {correo: $("#inputEmail").val()};
    $.ajax({type: "GET", url:"api/login?correo="+persona.correo,contentType: "application/json"})
      .then( (clientes)=>{list(clientes);},
             (error)=>{ alert(errorMessage(error.status));});                  
  }
  
  function list(clientes){
    var listado=$("#listado");
    listado.html("");
    clientes.forEach( (p)=>{row(listado,p);});	
  }
   function row(listado,persona){
	var tr =$("<tr />");
	tr.html("<td>"+persona.cedula+"</td>"+
                "<td>"+persona.nombre+"</td>");
	listado.append(tr);           
  }