
package com.restaurante.presentacion.Cliente;

import com.google.gson.Gson;
import com.restaurante.logic.Model;
import com.restaurante.logic.Orden;
import com.restaurante.logic.Persona;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

@Path("/realizar")
public class Realizar {
    
    
    @Context
    HttpServletRequest request;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void addorden(String data){
    java.util.Date fecha = new Date();
    SimpleDateFormat objSDF = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Gson gson = new Gson();
    Orden orden = gson.fromJson(data,Orden.class);
    HttpSession session = request.getSession(true);
    Persona p = (Persona) session.getAttribute("usuario");
        try {
            orden.setCliente(p.getCorreo());
            orden.setFecha(objSDF.format(fecha));
            Model.instance().addOrden(orden);
        } catch (Exception ex) {
            Logger.getLogger(Realizar.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
      
}
