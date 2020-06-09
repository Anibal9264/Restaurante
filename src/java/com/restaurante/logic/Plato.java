
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;

public class Plato {
  
    private int id;
    private String nombre;
    private String detalle;
    private Double precio;
    private int disponibles;
    private String imagen;
    private List<Adicionales> adicionales;


    public Plato(int id, String nombre, String detalle, Double precio, int disponibles, String imagen, List<Adicionales> adicionales) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
        this.disponibles = disponibles;
        this.imagen = imagen;
        this.adicionales = adicionales;

    }

   
   

    

    public Plato() {
        this.id = 0;
        this.nombre = "";
        this.detalle = "";
        this.precio = 0.0;
        this.disponibles = 0;
        this.imagen = "";
        this.adicionales = new ArrayList();
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

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public int getDisponibles() {
        return disponibles;
    }

    public void setDisponibles(int disponibles) {
        this.disponibles = disponibles;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public List<Adicionales> getAdicionales() {
        return adicionales;
    }

    public void setAdicionales(List<Adicionales> adicionales) {
        this.adicionales = adicionales;
    }

    
  
}
