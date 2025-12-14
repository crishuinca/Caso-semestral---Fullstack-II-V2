package DFS_2.pms.entity;

import jakarta.persistence.*;

@Entity
@Table(name="CATEGORIA")
public class categoria {
    
    @Id
    @GeneratedValue
    private int c_id;
    
    @Column(name="c_categoria")
    private String c_categoria;

    public int getC_id() {
        return c_id;}
    public void setC_id(int c_id) {
        this.c_id = c_id;}

    public String getC_categoria() {
        return c_categoria;}
    public void setC_categoria(String c_categoria) {
        this.c_categoria = c_categoria;}

    @Override
    public String toString() {
        return "categoria{" 
            + "c_id=" + c_id 
            + ", c_categoria=" + c_categoria + '}';
    }
    
}
