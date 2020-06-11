package com.restaurante.logic;

import com.restaurante.data.Dao;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Model {
  private static Model uniqueInstance;
 
    HashMap<String,Cliente> clientes;
  
     Dao base;
    public Model(){
      //clientes = new HashMap<String,Cliente> ();
      base = new Dao();
    }
    public static Model instance(){
        if (uniqueInstance == null){
            uniqueInstance = new Model();
        }
        return uniqueInstance;
    }
    
    
    ////////////////////////////////////////////////
    public Cliente getCliente(String correo)throws Exception {
        if (clientes.get(correo)!=null){
            return clientes.get(correo);
            
        }
        else{
            throw new Exception ("404- no se encuentra registrado");
        }
    }
      
      
//    public Cliente Find(String correo,String pass) {
//        Cliente c;
//        try {
//            //c = base.GetCliente(correo);
//            if (correo.equals(c.getContraseña())) {
//                return c;
//            }else if(c!=null){
//              c.setContraseña("");
//              return c;
//            } else {
//                return null;
//            }
//            
//        } catch (Exception ex) {
//            return null;
//        }
//       
//    } 
      
      
    ////////////////////////////////////////////////
      
      
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
    
  
    
  
    
}
