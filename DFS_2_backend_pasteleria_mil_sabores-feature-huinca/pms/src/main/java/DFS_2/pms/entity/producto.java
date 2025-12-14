package DFS_2.pms.entity;

import jakarta.persistence.*;

@Entity
@Table (name = "PRODUCTO")
public class producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "producto_seq")
    @SequenceGenerator(name = "producto_seq", sequenceName = "PRODUCTO_SEQ", allocationSize = 1)
    private int p_id;
    
    @Column(name="p_codigo")
    private String p_codigo;
    @Column(name="p_nombre")
    private String p_nombre;
    @Column(name="p_categoria")
    private String p_categoria;
    @Column(name="p_descripcion")
    private String p_descripcion;
    @Column(name="p_precio")
    private int p_precio;
    @Column(name="p_imagen")
    private String p_imagen;
    @Column(name="p_stock")
    private int p_stock;
    @Column(name="p_stock_critico")
    private int p_stock_critico;
    @Column(name="p_precio_oferta")
    private int p_precio_oferta;

    public String getP_codigo() 
        {return p_codigo;}
    public void setP_codigo(String p_codigo) 
        {this.p_codigo = p_codigo;}
    
    public int getP_id() 
        {return p_id;}
    public void setP_id(int p_id) 
        {this.p_id = p_id;}

    public String getP_nombre() 
        {return p_nombre;}
    public void setP_nombre(String p_nombre) 
        {this.p_nombre = p_nombre;}

    public String getP_categoria() 
        {return p_categoria;}
    public void setP_categoria(String p_categoria) 
        {this.p_categoria = p_categoria;}

    public String getP_descripcion() 
        {return p_descripcion;}
    public void setP_descripcion(String p_descripcion) 
        {this.p_descripcion = p_descripcion;}

    public int getP_precio() 
        {return p_precio;}
    public void setP_precio(int p_precio) 
        {this.p_precio = p_precio;}

    public int getP_stock() 
        {return p_stock;}
    public void setP_stock(int p_stock) 
        {this.p_stock = p_stock;}

    public int getP_stock_critico() 
        {return p_stock_critico;}
    public void setP_stock_critico(int p_stock_critico) 
        {this.p_stock_critico = p_stock_critico;}

    public String getP_imagen() {
        return p_imagen;
    }

    public void setP_imagen(String p_imagen) {
        this.p_imagen = p_imagen;
    }

    public int getP_precio_oferta() {
        return p_precio_oferta;
    }

    public void setP_precio_oferta(int p_precio_oferta) {
        this.p_precio_oferta = p_precio_oferta;
    }
    
    
    
    @Override
    public String toString() 
    {
        return "producto{" 
        + "p_id=" + p_id 
        + ", p_nombre=" + p_nombre 
        + ", p_categoria=" + p_categoria 
        + ", p_descripcion=" + p_descripcion 
        + ", p_precio=" + p_precio 
        + ", p_stock=" + p_stock 
        + ", p_stock_critico=" + p_stock_critico 
        + '}';
    }
    
}
