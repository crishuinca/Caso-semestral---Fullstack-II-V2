package DFS_2.pms.service;

import DFS_2.pms.entity.categoria;
import DFS_2.pms.repository.categoriaRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class categoriaServicio {
    
    @Autowired
    private categoriaRepositorio repositorio;
    
    //CRUD
    @SuppressWarnings("null")
    public categoria guardarCategoria(categoria c){
        return repositorio.save(c);
    }
    public List<categoria> obtenerCategorias(){
        return repositorio.findAll();
    }
    public categoria obtenerCategoriaID(int id_c){
        return repositorio.findById(id_c).orElse(null);
    }
    public categoria modificarCategoria(categoria c_mod){
        categoria cat_modificado = repositorio.findById(c_mod.getC_id()).orElse(null);
            cat_modificado.setC_categoria(c_mod.getC_categoria());
        return repositorio.save(cat_modificado);
    }
    public String borrarCategoria(int id_c){
        repositorio.deleteById(id_c);
        return "Categoria eliminada correctamente.";
    }
}
