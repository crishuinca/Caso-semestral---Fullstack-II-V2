package DFS_2.pms.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name="DETALLE_BOLETA")
public class detalle_boleta {
    
    @Id
    @GeneratedValue
    private int db_id;
    
    @Column(name="db_id_boleta")
    private int db_id_boleta;
    
    @Column(name="db_nombre_comprador")
    private String db_nombre_comprador;
    @Column(name="db_nombre_recibidor")
    private String db_nombre_recibidor;
    
    @Column(name="db_direccion_despacho")
    private String db_direccion_despacho;
    @Column(name="db_fecha_despacho")
    private Date db_fecha_despacho;
    @Column(name="db_fecha_compra")
    private Date db_fecha_compra;
    
    @Column(name="db_cantidad_total")
    private int db_cantidad_total;
    @Column(name="db_monto_total")
    private int db_monto_total;
    @Column(name="db_id_productos_comprados")
    private String db_id_productos_comprados;

    public int getDb_id() {
        return db_id;}
    public void setDb_id(int db_id) {
        this.db_id = db_id;
    }

    public int getDb_id_boleta() {
        return db_id_boleta;}
    public void setDb_id_boleta(int db_id_boleta) {
        this.db_id_boleta = db_id_boleta;
    }

    public String getDb_nombre_comprador() {
        return db_nombre_comprador;}
    public void setDb_nombre_comprador(String db_nombre_comprador) {
        this.db_nombre_comprador = db_nombre_comprador;
    }

    public String getDb_nombre_recibidor() {
        return db_nombre_recibidor;}
    public void setDb_nombre_recibidor(String db_nombre_recibidor) {
        this.db_nombre_recibidor = db_nombre_recibidor;
    }

    public String getDb_direccion_despacho() {
        return db_direccion_despacho;}
    public void setDb_direccion_despacho(String db_direccion_despacho) {
        this.db_direccion_despacho = db_direccion_despacho;
    }

    public Date getDb_fecha_despacho() {
        return db_fecha_despacho;}
    public void setDb_fecha_despacho(Date db_fecha_despacho) {
        this.db_fecha_despacho = db_fecha_despacho;
    }

    public Date getDb_fecha_compra() {
        return db_fecha_compra;}
    public void setDb_fecha_compra(Date db_fecha_compra) {
        this.db_fecha_compra = db_fecha_compra;
    }

    public int getDb_cantidad_total() {
        return db_cantidad_total;}
    public void setDb_cantidad_total(int db_cantidad_total) {
        this.db_cantidad_total = db_cantidad_total;
    }

    public int getDb_monto_total() {
        return db_monto_total;}
    public void setDb_monto_total(int db_monto_total) {
        this.db_monto_total = db_monto_total;
    }

    public String getDb_id_productos_comprados() {
        return db_id_productos_comprados;}
    public void setDb_id_productos_comprados(String db_id_productos_comprados) {
        this.db_id_productos_comprados = db_id_productos_comprados;
    }

    @Override
    public String toString() {
        return "detalle_boleta{" 
            + "db_id=" + db_id 
            + ", db_id_boleta=" + db_id_boleta 
            + ", db_nombre_comprador=" + db_nombre_comprador 
            + ", db_nombre_recibidor=" + db_nombre_recibidor 
            + ", db_direccion_despacho=" + db_direccion_despacho 
            + ", db_fecha_despacho=" + db_fecha_despacho 
            + ", db_fecha_compra=" + db_fecha_compra 
            + ", db_cantidad_total=" + db_cantidad_total 
            + ", db_monto_total=" + db_monto_total 
            + ", db_id_productos_comprados=" + db_id_productos_comprados 
            + '}';
    }
    
}
