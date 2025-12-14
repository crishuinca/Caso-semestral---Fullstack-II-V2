package DFS_2.pms.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8094");
        server.setDescription("Servidor de desarrollo");

        Contact contact = new Contact();
        contact.setName("Pastelería Mil Sabores");
        contact.setEmail("contacto@milsabores.com");

        License license = new License()
                .name("Apache 2.0")
                .url("https://www.apache.org/licenses/LICENSE-2.0.html");

        Info info = new Info()
                .title("API Pastelería Mil Sabores")
                .version("1.0.0")
                .description("API REST para el sistema de gestión de la Pastelería Mil Sabores. " +
                        "Permite gestionar productos, usuarios, categorías, boletas y detalles de boletas.")
                .contact(contact)
                .license(license);

        return new OpenAPI()
                .info(info)
                .servers(List.of(server));
    }
}
