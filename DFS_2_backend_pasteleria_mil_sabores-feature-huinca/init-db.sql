-- Script de inicialización de la base de datos Oracle
-- Este script se ejecutará cuando el contenedor esté listo

-- Crear usuario para la aplicación
CREATE USER FullstackBD IDENTIFIED BY MiClaveBD123;

-- Otorgar privilegios necesarios
GRANT CONNECT, RESOURCE, DBA TO FullstackBD;
GRANT UNLIMITED TABLESPACE TO FullstackBD;

-- Permitir que el usuario cree sesiones
ALTER USER FullstackBD ACCOUNT UNLOCK;

COMMIT;
