package DFS_2.pms.service;

import DFS_2.pms.entity.usuario;
import DFS_2.pms.repository.usuarioRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class usuarioServicio {
    
    @Autowired
    private usuarioRepositorio repositorio;
    
    //CRUD
    @SuppressWarnings("null")
    public usuario guardarUsuario(usuario u){
        return repositorio.save(u);
    }
    @SuppressWarnings("null")
    public List<usuario> guardarUsuarios(List<usuario> ls_u){
        return repositorio.saveAll(ls_u);
    }
    
    public List<usuario> obtenerUsuario(){
        return repositorio.findAll();
    }
    public usuario obtenerUsuarioID(int u_id){
        return repositorio.findById(u_id).orElse(null);
    }
    
    public usuario modificarUsuario(usuario u){
        usuario usr_modificado = repositorio.findById(u.getU_id()).orElse(null);
            usr_modificado.setU_nombre(u.getU_nombre());
            usr_modificado.setU_apellido(u.getU_apellido());
            usr_modificado.setU_correo(u.getU_correo());
            usr_modificado.setU_contrasenia(u.getU_contrasenia());
            usr_modificado.setU_f_registro(u.getU_f_registro());
            usr_modificado.setU_f_nacimiento(u.getU_f_nacimiento());
            usr_modificado.setU_rol(u.getU_rol());
            usr_modificado.setU_comuna(u.getU_comuna());
            usr_modificado.setU_region(u.getU_region());
            usr_modificado.setU_direccion(u.getU_direccion());
            usr_modificado.setU_descuento_10(u.isU_descuento_10());
            usr_modificado.setU_descuento_50(u.isU_descuento_50());
            usr_modificado.setU_regalo_cumpleanios(u.isU_regalo_cumpleanios());
        return repositorio.save(usr_modificado);
    }
    
    public String borrarUsuario(int u_id){
        repositorio.deleteById(u_id);
        return "Usuario eliminado correctamente.";
    }
    
    // Método para validar login
    public usuario validarLogin(String correo, String password){
        List<usuario> usuarios = repositorio.findAll();
        return usuarios.stream()
            .filter(u -> u.getU_correo().equals(correo) && u.getU_contrasenia().equals(password))
            .findFirst()
            .orElse(null);
    }
}
