/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function  AddPlato(theForm){
       plato={
           id: theForm.id.value,
          nombre: theForm.nombre.value,
          detalle: theForm.detalle.value,
          precio: theForm.precio.value,
          disp: theForm.disp.value,
          image: theForm.image.value
       };
     AddPlato(plato);
}