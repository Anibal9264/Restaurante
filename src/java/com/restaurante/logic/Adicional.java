
package com.restaurante.logic;

public class Adicional {
   private int id;
   private String detalle;
   private double precio;
   private int adicionalesID;

    public Adicional(int id, String detalle, double precio, int adicionalesID) {
        this.id = id;
        this.detalle = detalle;
        this.precio = precio;
        this.adicionalesID = adicionalesID;
    }
    

     public Adicional() {
        this.id = 0;
        this.detalle = "";
        this.precio = 0.0;
        this.adicionalesID = 0;
    }

    public int getAdicionalesID() {
        return adicionalesID;
    }

    public void setAdicionalesID(int adicionalesID) {
        this.adicionalesID = adicionalesID;
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
