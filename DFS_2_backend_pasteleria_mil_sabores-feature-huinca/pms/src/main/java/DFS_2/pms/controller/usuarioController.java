package DFS_2.pms.controller;

import DFS_2.pms.dto.LoginRequest;
import DFS_2.pms.dto.LoginResponse;
import DFS_2.pms.dto.UsuarioDTO;
import DFS_2.pms.entity.usuario;
import DFS_2.pms.service.usuarioServicio;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Usuarios V1", description = "API v1 para gestión de usuarios del sistema")
public class usuarioController {
    
    @Autowired
    private usuarioServicio servicio;
    
    @Operation(summary = "Crear un nuevo usuario", description = "Registra un nuevo usuario en el sistema")
    @PostMapping("/addUsuario")
    public usuario c_guardarUsuario(@RequestBody usuario u){
        return servicio.guardarUsuario(u);
    }
    @PostMapping("/addUsuarios")
    public List<usuario> c_guardarUsuarios(@RequestBody List<usuario> ls_u){
        return servicio.guardarUsuarios(ls_u);
    }
    
    @GetMapping("/usuarios")
    public List<usuario> c_obtenerUsuarios(){
        return servicio.obtenerUsuario();
    }
    @GetMapping("/usuarioByID/{u_id}")
    public usuario c_obtenerUsuarioID(@PathVariable int u_id){
        return servicio.obtenerUsuarioID(u_id);
    }
    
    @PutMapping("/modificarUsuario")
    public usuario c_modificarUsuario(@RequestBody usuario u){
        return servicio.modificarUsuario(u);
    }
    
    @DeleteMapping("eliminarUsuario/{u_id}")
    public String c_borrarUsuario(@PathVariable int u_id){
        return servicio.borrarUsuario(u_id);
    }
    
    @Operation(summary = "Login de usuario", description = "Valida las credenciales del usuario")
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        usuario usuario = servicio.validarLogin(request.getCorreo(), request.getPassword());
        
        if(usuario != null){
            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(usuario.getU_id());
            usuarioDTO.setNombre(usuario.getU_nombre());
            usuarioDTO.setApellido(usuario.getU_apellido());
            usuarioDTO.setCorreo(usuario.getU_correo());
            usuarioDTO.setDireccion(usuario.getU_direccion());
            usuarioDTO.setFechaNacimiento(usuario.getU_f_nacimiento());
            usuarioDTO.setFechaRegistro(usuario.getU_f_registro());
            usuarioDTO.setRol(usuario.getU_rol());
            usuarioDTO.setComuna(usuario.getU_comuna());
            usuarioDTO.setRegion(usuario.getU_region());
            usuarioDTO.setIsAdmin("ADMIN".equals(usuario.getU_rol()));
            usuarioDTO.setIsVendedor("VENDEDOR".equals(usuario.getU_rol()));
            
            return new LoginResponse(true, "Login exitoso", usuarioDTO);
        }
        
        return new LoginResponse(false, "Correo o contraseña incorrectos", null);
    }
}
