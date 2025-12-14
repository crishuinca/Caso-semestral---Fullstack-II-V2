package DFS_2.pms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="BOLETA")
public class boleta {
    
    @Id
    @GeneratedValue
    private int b_id;
    
    @Column(name="b_id_detalle")
    private int b_id_detalle;
    
    @Column(name="b_nombre_comprador")
    private String b_nombre_comprador;
    @Column(name="b_nombre_recibidor")
    private String b_nombre_recibidor;
    @Column(name="b_monto_total")
    private int b_monto_total;

    public int getB_id() {
        return b_id;}
    public void setB_id(int b_id) {
        this.b_id = b_id;}

    public int getB_id_detalle() {
        return b_id_detalle;}
    public void setB_id_detalle(int b_id_detalle) {
        this.b_id_detalle = b_id_detalle;}

    public String getB_nombre_comprador() {
        return b_nombre_comprador;}
    public void setB_nombre_comprador(String b_nombre_comprador) {
        this.b_nombre_comprador = b_nombre_comprador;}

    public String getB_nombre_recibidor() {
        return b_nombre_recibidor;}
    public void setB_nombre_recibidor(String b_nombre_recibidor) {
        this.b_nombre_recibidor = b_nombre_recibidor;}

    public int getB_monto_total() {
        return b_monto_total;}
    public void setB_monto_total(int b_monto_total) {
        this.b_monto_total = b_monto_total;}

    @Override
    public String toString() {
        return "boleta{" 
            + "b_id=" + b_id 
            + ", b_id_detalle=" + b_id_detalle 
            + ", b_nombre_comprador=" + b_nombre_comprador 
            + ", b_nombre_recibidor=" + b_nombre_recibidor 
            + ", b_monto_total=" + b_monto_total + '}';
    }
}
