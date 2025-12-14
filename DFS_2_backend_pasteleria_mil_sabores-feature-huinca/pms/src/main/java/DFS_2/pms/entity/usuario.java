package DFS_2.pms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="USUARIOS")
public class usuario {
    
    @Id
    @GeneratedValue
    private int u_id;
    
    @Column(name="u_nombre")
    private String u_nombre;
    @Column(name="u_apellido")
    private String u_apellido;
    @Column(name="u_correo")
    private String u_correo;
    @Column(name="u_contrasenia")
    private String u_contrasenia;
    @Column(name="u_direccion")
    private String u_direccion;
    @Column(name="u_f_nacimiento")
    private String u_f_nacimiento;
    @Column(name="u_f_registro")
    private String u_f_registro;
    @Column(name="u_rol")
    private String u_rol;
    @Column(name="u_comuna")
    private String u_comuna;
    @Column(name="u_region")
    private String u_region;
    @Column(name="u_tiene_desc_10")
    private boolean u_descuento_10;
    @Column(name="u_tiene_desc_50")
    private boolean u_descuento_50;
    @Column(name="u_opta_regalo_cumpleanios")
    private boolean u_regalo_cumpleanios;

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    public String getU_nombre() {
        return u_nombre;
    }

    public void setU_nombre(String u_nombre) {
        this.u_nombre = u_nombre;
    }

    public String getU_apellido() {
        return u_apellido;
    }

    public void setU_apellido(String u_apellido) {
        this.u_apellido = u_apellido;
    }

    public String getU_correo() {
        return u_correo;
    }

    public void setU_correo(String u_correo) {
        this.u_correo = u_correo;
    }

    public String getU_contrasenia() {
        return u_contrasenia;
    }

    public void setU_contrasenia(String u_contrasenia) {
        this.u_contrasenia = u_contrasenia;
    }

    public String getU_direccion() {
        return u_direccion;
    }

    public void setU_direccion(String u_direccion) {
        this.u_direccion = u_direccion;
    }

    public String getU_f_nacimiento() {
        return u_f_nacimiento;
    }

    public void setU_f_nacimiento(String u_f_nacimiento) {
        this.u_f_nacimiento = u_f_nacimiento;
    }

    public String getU_f_registro() {
        return u_f_registro;
    }

    public void setU_f_registro(String u_f_registro) {
        this.u_f_registro = u_f_registro;
    }

    public String getU_rol() {
        return u_rol;
    }

    public void setU_rol(String u_rol) {
        this.u_rol = u_rol;
    }

    public String getU_comuna() {
        return u_comuna;
    }

    public void setU_comuna(String u_comuna) {
        this.u_comuna = u_comuna;
    }

    public String getU_region() {
        return u_region;
    }

    public void setU_region(String u_region) {
        this.u_region = u_region;
    }

    public boolean isU_descuento_10() {
        return u_descuento_10;
    }

    public void setU_descuento_10(boolean u_descuento_10) {
        this.u_descuento_10 = u_descuento_10;
    }

    public boolean isU_descuento_50() {
        return u_descuento_50;
    }

    public void setU_descuento_50(boolean u_descuento_50) {
        this.u_descuento_50 = u_descuento_50;
    }

    public boolean isU_regalo_cumpleanios() {
        return u_regalo_cumpleanios;
    }

    public void setU_regalo_cumpleanios(boolean u_regalo_cumpleanios) {
        this.u_regalo_cumpleanios = u_regalo_cumpleanios;
    }

    @Override
    public String toString() {
        return "usuario{" + "u_id=" + u_id + ", u_nombre=" + u_nombre + ", u_apellido=" + u_apellido + ", u_correo=" + u_correo + ", u_contrasenia=" + u_contrasenia + ", u_direccion=" + u_direccion + ", u_f_nacimiento=" + u_f_nacimiento + ", u_f_registro=" + u_f_registro + ", u_rol=" + u_rol + ", u_comuna=" + u_comuna + ", u_region=" + u_region + ", u_descuento_10=" + u_descuento_10 + ", u_descuento_50=" + u_descuento_50 + ", u_regalo_cumpleanios=" + u_regalo_cumpleanios + '}';
    }
    
}
