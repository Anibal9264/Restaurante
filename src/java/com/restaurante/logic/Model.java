package com.restaurante.logic;
import com.restaurante.data.Dao;
import java.util.ArrayList;
import java.util.List;

public class Model {
  private static Model uniqueInstance;
 
  
     Dao base;
    public Model(){
      base = new Dao();
    }
    public static Model instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Model();
        }
        return uniqueInstance;
    }

    public List<Categoria> getCategorias() {
      try {
          return base.ListaCategoria();
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public List<Plato> getPlatos(int id) {
      try {
          return base.ListaPlatoxCategoria(id);
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public List<Adicionales> getAdicionales(int id) {
    try {
          return base.ListaAdicionales(id);
      } catch (Exception ex) {
          return new ArrayList();
      }
    }

    public void addOrden(Orden o) throws Exception {
      base.OrdenAdd(o);
    }

    public Persona get(Persona cliente) throws Exception {
     return base.getPersona(cliente.getCorreo());
    }

    public void addPersona(Persona cliente) throws Exception {
       base.PersonaAdd(cliente);
    }

    public void addDireccion(Direccion d) throws Exception {
        base.DireccionAdd(d);
    }

    public List<Orden> getOrdenes(Persona logged) {
        return base.ListaOrdenes(logged);
    }
    
  
    
  
    
}
