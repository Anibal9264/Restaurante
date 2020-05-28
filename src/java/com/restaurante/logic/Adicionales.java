
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;


public class Adicionales {
   private int id;
   private String nombre;
   private boolean tipo;// true is multiple  y false is single 
   private List<Adicional> listAdicionales;

    public Adicionales(int id, String nombre, boolean tipo, List<Adicional> listAdicionales) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.listAdicionales = listAdicionales;
    }

     public Adicionales() {
        this.id = 0;
        this.nombre = "";
        this.tipo = false;
        this.listAdicionales =  new ArrayList();
    }
    
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public boolean isTipo() {
        return tipo;
    }

    public void setTipo(boolean tipo) {
        this.tipo = tipo;
    }

    public List<Adicional> getListAdicionales() {
        return listAdicionales;
    }

    public void setListAdicionales(List<Adicional> listAdicionales) {
        this.listAdicionales = listAdicionales;
    }

   


}
