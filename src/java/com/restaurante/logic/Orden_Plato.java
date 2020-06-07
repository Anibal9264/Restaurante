
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;

public class Orden_Plato {
    private Plato plato;
    private int cantidad;
    private String detalle;
    private double total;
    private List<Adicional> adicionales;

    public Orden_Plato(Plato plato, int cantidad, String detalle, double total, List<Adicional> adicionales) {
        this.plato = plato;
        this.cantidad = cantidad;
        this.detalle = detalle;
        this.total = total;
        this.adicionales = adicionales;
    }

  
    
     public Orden_Plato() {
        this.plato = new Plato();
        this.cantidad = 1;
        this.detalle = "";
        this.total = 0.0;
        this.adicionales = new ArrayList();
    }

    public List<Adicional> getAdicionales() {
        return adicionales;
    }

    public void setAdicionales(List<Adicional> adicionales) {
        this.adicionales = adicionales;
    }

    public Plato getPlato() {
        return plato;
    }

    public void setPlato(Plato plato) {
        this.plato = plato;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
    
    
    
}
