/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Categoria;
import com.restaurante.logic.Cliente;
import com.restaurante.logic.Model;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
@Path("/login")
/**
 *
 * @author STACY
 */
public class Login {
//    @GET
//    @Produces({MediaType.APPLICATION_JSON})
//    public List<Categoria> list() { 
//       return Model.instance().getCategorias();
//   }
    ///////////////////////////////////////////////////////
    @GET
    @Path("{correo}")
    @Produces({MediaType.APPLICATION_JSON})
    public Cliente get(@PathParam("correo") String correo) {
        try {
            return Model.instance().getCliente(correo);
        } catch (Exception ex) {
            throw new NotFoundException(); 
        }
    }
    ////////////////////////////////////////////////////////
}
