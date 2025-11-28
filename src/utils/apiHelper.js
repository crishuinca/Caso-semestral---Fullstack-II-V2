const API = 'http://localhost:8094/api/v1'

export const getProductos = async () => {
    console.log("Cargando productos ctm")
    try {
        const resp = await fetch(`${API}/productos`)
        console.log("Respuesta base: " + resp)
        if(!resp.ok) throw new Error("ERROR cannot load PRODUCTOS from DATABASE")
        const data = await resp.json()
        console.log("Datos base: " + data)
        return data
    } catch (ex) {
        console.error("Error:",ex)
    }
}

export const updateProducto = async (data) => {
    try {
        const resp = await fetch(`${API}/modificarProducto`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        if(!resp.ok) throw new Error("ERROR no se pudo actualizar el PRODUCTO en la BASE DE DATOS")
        const datos = await resp.json()
        return datos
    } catch (ex) {
        console.error("Error:",ex)
    }
}

export const API_FUNCION = async () => {
    try {
        
    } catch (ex) {
        console.error("Error:",ex)
    }
}