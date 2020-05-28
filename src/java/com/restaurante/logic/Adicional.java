
package com.restaurante.logic;


public class Adicional {
   private int id;
   private String detalle;
   private double precio;

    public Adicional(int id, String detalle, double precio) {
        this.id = id;
        this.detalle = detalle;
        this.precio = precio;
    }

     public Adicional() {
        this.id = 0;
        this.detalle = "";
        this.precio = 0.0;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }
   
   
}
