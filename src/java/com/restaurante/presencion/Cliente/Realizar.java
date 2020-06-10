
package com.restaurante.presencion.Cliente;

import com.google.gson.Gson;
import com.restaurante.logic.Model;
import com.restaurante.logic.Orden;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

@Path("/realizar")
public class Realizar {
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addorden(String data){
    Gson gson = new Gson();
    Orden orden = gson.fromJson(data,Orden.class);
        try {
            Model.instance().addOrden(orden);
        } catch (Exception ex) {
            Logger.getLogger(Realizar.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
      
}
