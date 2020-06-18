
package com.restaurante.presentacion.Cliente;

import com.restaurante.logic.Adicional;
import com.restaurante.logic.Adicionales;
import com.restaurante.logic.Categoria;
import com.restaurante.logic.Model;
import com.restaurante.logic.Plato;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/admin")
public class Admin {
 
    @POST
    @Path("/plato")
    @Consumes(MediaType.APPLICATION_JSON)
    public void AddPlato(Plato plato) {
       try {
            Model.instance().addPlato(plato);
           
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }  
    
    @GET
    @Path("/plato")
    @Produces({MediaType.APPLICATION_JSON})
    public  List<Plato> LPlatos() {
       try {
           return Model.instance().getPlatos();   
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    } 
    
    
    @POST
    @Path("/categoria")
    @Consumes(MediaType.APPLICATION_JSON)
    public void Addcategoria(Categoria categoria) {
       try {
            Model.instance().addCategoria(categoria);
           
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    

    @POST
    @Path("/adicional")
    @Consumes(MediaType.APPLICATION_JSON)
    public void AddAdicional(Adicional adicional) {
       try {
            Model.instance().addAdicional(adicional);   
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    
    
    @GET
    @Path("/adicional")
    @Produces({MediaType.APPLICATION_JSON})
    public  List<Adicional> LAdicional() {
       try {
           return Model.instance().getadicionalL();   
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    } 
    @POST
    @Path("/adicionales")
    @Consumes(MediaType.APPLICATION_JSON)
    public void AddAdicionales(Adicionales adicionales) {
       try {
            Model.instance().addAdicionales(adicionales);
           
        } catch (Exception ex) {
            throw new NotFoundException();
        }  
    }
    
}
