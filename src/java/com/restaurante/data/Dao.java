
package com.restaurante.data;

import com.restaurante.logic.Adicional;
import com.restaurante.logic.Adicionales;
import com.restaurante.logic.Categoria;
import com.restaurante.logic.Direccion;
import com.restaurante.logic.Orden;
import com.restaurante.logic.Orden_Plato;
import com.restaurante.logic.Persona;
import com.restaurante.logic.Plato;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Dao {
      RelDatabase db;
    
    public Dao(){
        db= new RelDatabase();
    }
 
    
    //**************************AGREGAR********************************
    
    public void PersonaAdd(Persona p) throws Exception{
        String sql="insert into restaurante.persona (correo,nombre,apellidos,contraseña,"
                + "telefono,isAdmin) values('%s','%s','%s','%s','%s','%s')";
        sql=String.format(sql,p.getCorreo(),p.getNombre(),p.getApellidos(),
                p.getContraseña(),p.getTelefono(),p.toIsAdmin());
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("persona ya existe");
        }
     }
    
     public void AdicionalAdd(Adicional a) throws Exception{
        String sql="insert into restaurante.adicional (detalle,precio)"+
         " values('%s','%s')";
        sql=String.format(sql,a.getDetalle(),a.getPrecio());
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Adicional ya existe");
        }
     }
     
      public void AdicionalesAdd(Adicionales a) throws Exception{
        String sql="insert into restaurante.adicionales (nombre,tipo)"+
         " values('%s','%s')";
        sql=String.format(sql,a.getNombre(),a.toTipo());
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Adicionales ya existe");
        }
     }
      
       public void PlatoAdd(Plato p) throws Exception{
        String sql="insert into restaurante.plato (nombre,detalle,precio,disponibles,"
                + "imagen) values('%s','%s','%s','%s','%s')";
        sql=String.format(sql,p.getNombre(),p.getDetalle(),p.getPrecio(),
                p.getDisponibles(),p.getImagen());
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Plato ya existe");
        }
      }
        
    public void CategoriaAdd(Categoria c) throws Exception{
        String sql="insert into restaurante.Categoria (nombre) values('%s')";
        sql=String.format(sql,c.getNombre());
        int count=db.executeUpdate(sql);
        
        //Obtengo el id de la Categoria que acabo de agregar
        sql="SELECT MAX(id) AS id2 FROM restaurante.categoria";
        ResultSet rs = db.executeQuery(sql);
        int id=0;
        if (rs.next()) {
        id = rs.getInt("id2");
        }
        for(Plato p:c.getPlatos()){
        Categoria_plato(id,p.getId());
        }
        if (count==0){
            throw new Exception("Categoria ya existe");
        }
     }
    
      public void Categoria_plato(int cat,int plato) throws Exception{
        String sql="insert into restaurante.Categoria_Plato (Categoria,Plato)"
         + " values('%s','%s')";
        sql=String.format(sql,cat,plato);
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Error");
        }
 }
    
    
        
     public void OrdenAdd(Orden o) throws Exception{
         String sql;
        if(o.getDireccion().isEmpty()){
        sql="insert into restaurante.orden (total,entrega_recoge,fecha,estado,"
                 + "Persona,formaPago)"+
         " values('%s','%s','%s','%s','%s','%s')";
        sql=String.format(sql,o.getTotal(),o.toEntregaRecoge(),o.getFecha(),
                o.getEstado(),o.getCliente(),o.getFormaPago());
        }else{
        sql="insert into restaurante.orden (total,entrega_recoge,fecha,estado,"
                 + "Persona,Direccion,formaPago)"+
         " values('%s','%s','%s','%s','%s','%s','%s')";
        sql=String.format(sql,o.getTotal(),o.toEntregaRecoge(),o.getFecha(),
                o.getEstado(),o.getCliente(),o.getDireccion(),o.getFormaPago());
        }
        int count=db.executeUpdate(sql);
        
        //Obtengo el id de la orden que acabo de agregar
        sql="SELECT MAX(id) AS id2 FROM restaurante.orden where Persona like '%s'";
        sql=String.format(sql,o.getCliente());
        ResultSet rs = db.executeQuery(sql);
        int id=0;
        if (rs.next()) {
        id = rs.getInt("id2");
        }
        for(Orden_Plato op:o.getOrden_platos()){
        Orden_platoADD(op,id);
        }
        if (count==0){
            throw new Exception("Orden ya existe");
        }
     }
     
 public void Orden_platoADD (Orden_Plato op, int orden) throws Exception{
        String sql="insert into restaurante.orden_plato (Orden,Plato,cantidad,detalle,"
                 + "total)"+
         " values('%s','%s','%s','%s','%s')";
        sql=String.format(sql,orden,op.getPlato().getId(),op.getCantidad(),
                op.getDetalle(),op.getTotal());
        int count=db.executeUpdate(sql);
        
        for(Adicional adicional:op.getAdicionales()){
             Orden_plato_Adicional(adicional.getId(),op.getPlato().getId(),orden);
        }
        if (count==0){
            throw new Exception("Orden ya existe");
        }
 }
 
  public void Orden_plato_Adicional (int adicional,int plato, int orden) throws Exception{
        String sql="insert into restaurante.orden_plato_adicional (Orden,Plato,Adicional)"
         + " values('%s','%s','%s')";
        sql=String.format(sql,orden,plato,adicional);
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Orden ya existe");
        }
 }
     
      public void DireccionAdd(Direccion d) throws Exception{
        String sql="insert into restaurante.direccion (provincia,canton,distrito,exacta,"
                 + "Persona)"+
         " values('%s','%s','%s','%s','%s')";
        sql=String.format(sql,d.getProvincia(),d.getCanton(),d.getDistrito(),
                d.getExacta(),d.getPersona_correo());
        int count=db.executeUpdate(sql);
        if (count==0){
            throw new Exception("Orden ya existe");
        }
     }
      
      
      
      
    //**************************GETS********************************
    public Persona getPersona(String correo) throws Exception {
     String sql="select * from restaurante.persona where correo like '%s'";
        sql = String.format(sql,correo);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return PersonaRender(rs);
        }
        else{
            return null;   
        }
    }
    
    public Adicionales getAdicionales(int id) throws Exception {
     String sql="select * from Adicionales where id like '%%%s%%'";
        sql = String.format(sql,id);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return AdicionalesRender(rs);
        }
        else{
            return null;   
        }
    }
    
     public Adicional getAdicional(int id) throws Exception {
     String sql="select * from Adicional where id like '%%%s%%'";
        sql = String.format(sql,id);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return AdicionalRender(rs);
        }
        else{
            return null;   
        }
    }
    
     public Plato getPlato(int Plato_id) throws Exception {
     String sql="select * from Plato where id like '%%%s%%'";
        sql = String.format(sql,Plato_id);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return PlatoRender(rs);
        }
        else{
            return null;   
        }
    }
    
     public Direccion getDireccion(int Direccion_id) throws Exception {
     String sql="select * from restaurante.direccion where id like '%%%s%%'";
        sql = String.format(sql,Direccion_id);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return DireccionRender(rs);
        }
        else{
            return null;   
        }
    }
    
     public Orden getOrden(int Direccion_id) throws Exception {
     String sql="select * from restaurante.Orden where id like '%s'";
        sql = String.format(sql,Direccion_id);
        ResultSet rs =  db.executeQuery(sql);
        if (rs.next()) {
            return OrdenRender(rs);
        }
        else{
            return null;   
        }
    }
    
      
    //**************************GETS Listas********************************
    
    public List<Adicional> ListaAdicional(int id) throws Exception{
        List<Adicional> resultado = new ArrayList<Adicional>();
        try {
            String sql="select * from Adicionales_Adicional "+
                    "where Adicionales like '%%%s%%'";
            sql=String.format(sql,id);
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(getAdicional(rs.getInt("Adicional")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
     public List<Adicional> ListaAdicionalL() throws Exception{
        List<Adicional> resultado = new ArrayList<Adicional>();
        try {
            String sql="select * from restaurante.adicional";
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(AdicionalRender(rs));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
        public List<Adicionales>ListaAdicionales(int Plato_id) throws Exception{
        List<Adicionales> resultado = new ArrayList<Adicionales>();
        try {
            String sql="select * from Plato_Adicionales "+
                    "where Plato like '%%%s%%'";
            sql=String.format(sql,Plato_id);
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
            resultado.add(getAdicionales(rs.getInt("Adicionales")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
    public List<Plato> ListaPlatoxCategoria(int Categoria_id) throws Exception{
        List<Plato> resultado = new ArrayList<Plato>();
        try {
            String sql="select * from restaurante.Categoria_Plato "+
                    "where Categoria like '%%%s%%'";
            sql=String.format(sql,Categoria_id);
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
            resultado.add(getPlato(rs.getInt("Plato")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
    public List<Plato> ListaPlatos() throws Exception{
        List<Plato> resultado = new ArrayList<Plato>();
        try {
            String sql="select * from restaurante.Plato ";
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
            resultado.add(PlatoRender(rs));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
      
    public List<Categoria> ListaCategoria() throws Exception{
        List<Categoria> resultado = new ArrayList<Categoria>();
        try {
            String sql="select * from Categoria ";
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(CategoriaRender(rs));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }  
        public List<Orden_Plato> ListaPlatoxOrden(int Orden_id) throws Exception{
        List<Orden_Plato> resultado = new ArrayList<Orden_Plato>();
        try {
            String sql="select * from Orden_Plato "+
                    "where Orden like '%%%s%%'";
            sql=String.format(sql,Orden_id);
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
            resultado.add(RenderOrden_Plato(rs));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
         
     private List<Adicional> getAdicionalXOrden_plato(ResultSet d) throws Exception {
      List<Adicional> resultado = new ArrayList<Adicional>();
        try {
            String sql="select * from Orden_Plato_Adicional "
                    + "where Orden like '%%%s%%' and Plato like '%%%s%%'";
            sql=String.format(sql,d.getInt("Orden"),d.getInt("Plato"));
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(getAdicional(rs.getInt("Adicional")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
      private List<Direccion> ListDirecciones(String correo) throws Exception {
      List<Direccion> resultado = new ArrayList<Direccion>();
        try {
            String sql="select * from restaurante.direccion "
                    + "where Persona like '%s'";
            sql=String.format(sql,correo);
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(getDireccion(rs.getInt("id")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    public List<Orden> ListaOrdenes(Persona logged) throws Exception {
    List<Orden> resultado = new ArrayList<Orden>();
        try {
            String sql="select * from restaurante.Orden "
                    + "where Persona like '%s'";
            sql=String.format(sql,logged.getCorreo());
            ResultSet rs =  db.executeQuery(sql);
            while (rs.next()) {
                resultado.add(getOrden(rs.getInt("id")));
            }
        } catch (SQLException ex) {
        return resultado;
        }
        return resultado;
    }
    
    //**************************RENDERS********************************    
      
        private Persona PersonaRender(ResultSet rs) throws Exception {
           Persona p = new Persona();
        try {
            p.setCorreo(rs.getString("correo"));
            p.setNombre(rs.getString("nombre"));
            p.setApellidos(rs.getString("apellidos"));
            p.setContraseña(rs.getString("contraseña"));
            p.setTelefono(rs.getNString("telefono"));
            p.setIsAdmin(rs.getBoolean("isAdmin"));
            p.setDirecciones(ListDirecciones(p.getCorreo()));
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
        
     private Adicional AdicionalRender(ResultSet rs) {
           Adicional a = new Adicional();
        try {
            a.setId( rs.getInt("id"));
            a.setDetalle(rs.getString("detalle"));
            a.setPrecio(rs.getDouble("precio"));
            return a;
        } catch (SQLException ex) {
            return null;
        }
    }
     
     private Adicionales AdicionalesRender(ResultSet rs) throws Exception {
           Adicionales a = new Adicionales();
        try {
            a.setId( rs.getInt("id"));
            a.setNombre(rs.getString("nombre"));
            a.setTipo(rs.getBoolean("tipo"));
            a.setListAdicionales(ListaAdicional(a.getId()));
            return a;
        } catch (SQLException ex) {
            return null;
        }
    }
     
   private Plato PlatoRender(ResultSet rs) throws Exception {
           Plato p = new Plato();
        try {
            p.setId( rs.getInt("id"));
            p.setNombre(rs.getString("nombre"));
            p.setDetalle(rs.getString("detalle"));
            p.setPrecio(rs.getDouble("precio"));
            p.setDisponibles(rs.getInt("disponibles"));
            p.setImagen(rs.getString("imagen"));
            p.setAdicionales(ListaAdicionales(p.getId()));
           
            return p;
        } catch (SQLException ex) {
            return null;
        }
    }
     
  private Categoria CategoriaRender(ResultSet rs) throws Exception {
           Categoria c = new Categoria();
        try {
            c.setId( rs.getInt("id"));
            c.setNombre(rs.getString("nombre"));
            c.setPlatos(ListaPlatoxCategoria(c.getId()));
            return c;
        } catch (SQLException ex) {
            return null;
        }
    }
    
   private Direccion DireccionRender(ResultSet rs) throws Exception {
           Direccion d = new Direccion();
        try {
            d.setId( rs.getInt("id"));
            d.setProvincia(rs.getString("provincia"));
            d.setCanton(rs.getString("canton"));
            d.setDistrito(rs.getString("distrito"));
            d.setExacta(rs.getString("exacta"));
            d.setPersona_correo(rs.getString("Persona"));
            return d;
        } catch (SQLException ex) {
            return null;
        }
    }
    
     
    private Orden OrdenRender(ResultSet rs) throws Exception {
           Orden o = new Orden();
        try {
            o.setId( rs.getInt("id"));
            o.setTotal(rs.getDouble("total"));
            o.setEntrega_recoge(rs.getBoolean("entrega_recoge"));
            o.setFecha(rs.getString("fecha"));
            o.setEstado(rs.getInt("estado"));
            o.setCliente(rs.getString("Persona"));
            o.setFormaPago(rs.getString("formaPago"));
            o.setDireccion(rs.getString("Direccion"));
            o.setOrden_platos(ListaPlatoxOrden(o.getId()));
            return o;
        } catch (SQLException ex) {
            return null;
        }
    }

    private Orden_Plato RenderOrden_Plato(ResultSet rs) throws Exception {
          Orden_Plato op = new Orden_Plato();
            try {
                op.setPlato(getPlato(rs.getInt("Plato")));
                op.setCantidad(rs.getInt("cantidad"));
                op.setDetalle(rs.getString("Detalle"));
                op.setTotal(rs.getDouble("total"));
                op.setAdicionales(getAdicionalXOrden_plato(rs));
                return op;
           } catch (SQLException ex) {
            return null;
        }
    }

    

   
     
}
