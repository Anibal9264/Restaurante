
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
    private int cantidad;
    private int Categoria_id;
    private int Orden_id;

    public Plato(int id, String nombre, String detalle, Double precio, int disponibles, String imagen, List<Adicionales> adicionales, int cantidad, int Categoria_id, int Orden_id) {
        this.id = id;
        this.nombre = nombre;
        this.detalle = detalle;
        this.precio = precio;
        this.disponibles = disponibles;
        this.imagen = imagen;
        this.adicionales = adicionales;
        this.cantidad = cantidad;
        this.Categoria_id = Categoria_id;
        this.Orden_id = Orden_id;
    }

   
   

    

    public Plato() {
        this.id = 0;
        this.nombre = "";
        this.detalle = "";
        this.precio = 0.0;
        this.disponibles = 0;
        this.imagen = "";
        this.adicionales = new ArrayList();
        this.cantidad = 1;
        this.Categoria_id = 1;
        this.Orden_id = 1;
    }

    public int getCategoria_id() {
        return Categoria_id;
    }

    public void setCategoria_id(int Categoria_id) {
        this.Categoria_id = Categoria_id;
    }

    public int getOrden_id() {
        return Orden_id;
    }

    public void setOrden_id(int Orden_id) {
        this.Orden_id = Orden_id;
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

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    
  
}
