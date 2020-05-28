
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;


public class Categoria {
 private int id;
 private String  nombre;
 private List<Plato> platos;

    public Categoria(int id, String nombre, List<Plato> platos) {
        this.id = id;
        this.nombre = nombre;
        this.platos = platos;
    }

    public Categoria() {
        this.id = 0;
        this.nombre = "";
        this.platos = new ArrayList();
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

    public List<Plato> getPlatos() {
        return platos;
    }

    public void setPlatos(List<Plato> platos) {
        this.platos = platos;
    }
 
 
 
}
