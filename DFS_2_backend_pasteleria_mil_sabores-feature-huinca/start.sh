#!/bin/bash

# Script para iniciar el proyecto completo
# Backend: Spring Boot con Oracle en Docker
# Frontend: React con Vite

echo "🚀 Iniciando proyecto Pastelería Mil Sabores..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Iniciar Oracle en Docker
echo -e "${YELLOW}📦 Iniciando Oracle Database en Docker...${NC}"
cd "$(dirname "$0")"
docker-compose up -d

echo -e "${YELLOW}⏳ Esperando a que Oracle esté listo (esto puede tomar 2-3 minutos)...${NC}"
sleep 10

# Esperar a que Oracle esté completamente iniciado
max_attempts=60
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker exec oracle-xe sqlplus -s sys/MiClaveBD123@localhost:1521/XE as sysdba <<< "SELECT 1 FROM DUAL;" | grep -q "1"; then
        echo -e "${GREEN}✅ Oracle Database está listo!${NC}"
        break
    fi
    attempt=$((attempt + 1))
    echo -e "${YELLOW}   Intento $attempt/$max_attempts...${NC}"
    sleep 5
done

if [ $attempt -eq $max_attempts ]; then
    echo -e "${YELLOW}⚠️  Oracle puede no estar completamente listo, pero continuando...${NC}"
fi

# Ejecutar script de inicialización
echo -e "${YELLOW}🔧 Configurando usuario de base de datos...${NC}"
sleep 5
docker exec -i oracle-xe sqlplus sys/MiClaveBD123@localhost:1521/XE as sysdba < init-db.sql 2>/dev/null || echo "Usuario puede que ya exista, continuando..."

# 2. Iniciar Backend
echo -e "${YELLOW}☕ Iniciando Backend Spring Boot...${NC}"
cd pms
if [ ! -f "target/pms-0.0.1-SNAPSHOT.jar" ]; then
    echo -e "${YELLOW}   Compilando proyecto Maven...${NC}"
    ./mvnw clean package -DskipTests
fi

# Iniciar backend en background
echo -e "${GREEN}✅ Backend iniciándose en puerto 8094...${NC}"
./mvnw spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../backend.pid

# Esperar un poco para que el backend inicie
sleep 15

# 3. Iniciar Frontend
echo -e "${YELLOW}⚛️  Iniciando Frontend React...${NC}"
cd "../../Caso-semestral---Fullstack-II-V2-master"

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Instalando dependencias de npm...${NC}"
    npm install
fi

echo -e "${GREEN}✅ Frontend iniciándose...${NC}"
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../frontend.pid

echo ""
echo -e "${GREEN}✨ Proyecto iniciado exitosamente!${NC}"
echo ""
echo "📍 Servicios disponibles:"
echo "   - Frontend: http://localhost:5173 (o el puerto que Vite asigne)"
echo "   - Backend API: http://localhost:8094"
echo "   - Swagger UI: http://localhost:8094/swagger-ui.html"
echo "   - Oracle DB: localhost:1521"
echo ""
echo "📝 Logs:"
echo "   - Backend: tail -f backend.log"
echo "   - Frontend: tail -f frontend.log"
echo ""
echo "🛑 Para detener los servicios:"
echo "   - Backend/Frontend: pkill -f 'spring-boot:run' y pkill -f 'vite'"
echo "   - Oracle: docker-compose down"
echo ""
