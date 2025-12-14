package DFS_2.pms.config;

import DFS_2.pms.entity.usuario;
import DFS_2.pms.repository.usuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@Order(2) // Se ejecuta después de CategoriasLoader
public class UsuarioAdminLoader implements CommandLineRunner {

    @Autowired
    private usuarioRepositorio usuarioRepo;

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existe el usuario admin
        if (usuarioRepo.count() > 0) {
            // Verificar específicamente si existe el admin por correo
            boolean adminExists = usuarioRepo.findAll().stream()
                .anyMatch(u -> "admin@gmail.com".equals(u.getU_correo()));
            
            if (adminExists) {
                System.out.println("=== Usuario administrador ya existe en la base de datos ===");
                return;
            }
        }

        System.out.println("=== Creando usuario administrador por defecto... ===");

        usuario admin = new usuario();
        admin.setU_nombre("Administrador");
        admin.setU_apellido("Sistema");
        admin.setU_correo("admin@gmail.com");
        admin.setU_contrasenia("123"); // Misma contraseña que el frontend
        admin.setU_direccion("Oficina Central");
        admin.setU_f_nacimiento("");
        admin.setU_f_registro(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        admin.setU_rol("ADMIN");
        admin.setU_comuna("Santiago");
        admin.setU_region("Región Metropolitana");
        admin.setU_descuento_10(false);
        admin.setU_descuento_50(false);
        admin.setU_regalo_cumpleanios(false);

        usuarioRepo.save(admin);
        System.out.println("=== Usuario administrador creado exitosamente ===");
        System.out.println("=== Credenciales: admin@gmail.com / 123 ===");
    }
}
