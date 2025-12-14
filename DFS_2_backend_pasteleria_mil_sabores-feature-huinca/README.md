# Proyecto Pastelería Mil Sabores

## 🚀 Estado del Proyecto

El proyecto está completamente configurado y funcionando:

- ✅ **Oracle Database**: Corriendo en Docker (puerto 1521)
- ✅ **Backend Spring Boot**: Corriendo en http://localhost:8094
- ✅ **Frontend React**: Corriendo en http://localhost:5173

## 📋 Servicios Disponibles

### Base de Datos Oracle
- **Host**: localhost
- **Puerto**: 1521
- **SID**: XE
- **Usuario**: FullstackBD
- **Contraseña**: MiClaveBD123
- **Usuario Admin**: sys / MiClaveBD123

### Backend API
- **URL**: http://localhost:8094
- **API Base**: http://localhost:8094/api/v1
- **Swagger UI**: http://localhost:8094/swagger-ui.html
- **API Docs**: http://localhost:8094/api-docs

### Frontend
- **URL**: http://localhost:5173

## 🛠️ Comandos Útiles

### Iniciar Oracle Database
```bash
cd DFS_2_backend_pasteleria_mil_sabores-feature-huinca
docker-compose up -d
```

### Detener Oracle Database
```bash
docker-compose down
```

### Ver logs de Oracle
```bash
docker logs oracle-xe -f
```

### Iniciar Backend
```bash
cd DFS_2_backend_pasteleria_mil_sabores-feature-huinca/pms
./mvnw spring-boot:run
```

### Iniciar Frontend
```bash
cd Caso-semestral---Fullstack-II-V2-master
npm run dev
```

### Script de Inicio Automático
```bash
cd DFS_2_backend_pasteleria_mil_sabores-feature-huinca
./start.sh
```

## 📝 Configuración

### Base de Datos
La configuración de la base de datos está en:
- `pms/src/main/resources/application.properties`

### Frontend
La URL del API está configurada en:
- `Caso-semestral---Fullstack-II-V2-master/src/utils/apiHelper.js`

## 🔧 Solución de Problemas

### Si Oracle no inicia
1. Verificar que Docker esté corriendo
2. Verificar que el puerto 1521 no esté en uso: `lsof -i :1521`
3. Ver logs: `docker logs oracle-xe`

### Si el Backend no conecta a la BD
1. Verificar que Oracle esté corriendo: `docker ps | grep oracle`
2. Esperar 2-3 minutos después de iniciar Oracle (tiempo de inicialización)
3. Verificar logs del backend: `tail -f backend.log`

### Si el Frontend no conecta al Backend
1. Verificar que el backend esté corriendo: `curl http://localhost:8094/api-docs`
2. Verificar la variable de entorno `VITE_API_URL` si está configurada

## 📦 Estructura del Proyecto

```
monse/
├── DFS_2_backend_pasteleria_mil_sabores-feature-huinca/  # Backend
│   ├── docker-compose.yml                                # Configuración Docker
│   ├── init-db.sql                                        # Script inicialización BD
│   ├── start.sh                                           # Script de inicio
│   └── pms/                                               # Proyecto Spring Boot
│       └── src/main/resources/application.properties    # Configuración
│
└── Caso-semestral---Fullstack-II-V2-master/              # Frontend
    └── src/
        └── utils/apiHelper.js                            # Configuración API
```

## 🎯 Próximos Pasos

El proyecto está listo para continuar con el desarrollo. Todos los servicios están corriendo y configurados correctamente.
