
package com.restaurante.logic;

import java.util.ArrayList;
import java.util.List;


public class Orden {
   private int id;
   private Double total;
   private boolean Entrega_recoge; // true es entrega y false es recoje
   private String fecha;
   private int estado; // 1 : recivida o enviada 2: Preparacion 3: Lista
   private String cliente;
   private String direccion;
   private List<Orden_Plato> Orden_platos;
   private String formaPago;

    public Orden(int id, Double total, boolean Entrega_recoge, String fecha, int estado, String cliente, String direccion, List<Orden_Plato> Orden_platos, String formaPago) {
        this.id = id;
        this.total = total;
        this.Entrega_recoge = Entrega_recoge;
        this.fecha = fecha;
        this.estado = estado;
        this.cliente = cliente;
        this.direccion = direccion;
        this.Orden_platos = Orden_platos;
        this.formaPago = formaPago;
    }

    public Orden() {
        this.id = 0;
        this.total = 0.0;
        this.Entrega_recoge = true;
        this.fecha = "";
        this.estado = 0;
        this.cliente = "";
        this.direccion = "";
        this.Orden_platos = new ArrayList();
        this.formaPago = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public boolean isEntrega_recoge() {
        return Entrega_recoge;
    }

    public void setEntrega_recoge(boolean Entrega_recoge) {
        this.Entrega_recoge = Entrega_recoge;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public List<Orden_Plato> getOrden_platos() {
        return Orden_platos;
    }

    public void setOrden_platos(List<Orden_Plato> Orden_platos) {
        this.Orden_platos = Orden_platos;
    }

    public String getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(String formaPago) {
        this.formaPago = formaPago;
    }

    public String toEntregaRecoge() {
        if(Entrega_recoge)return "1";
        return "0" ;
    }
    
    
 
   

}
