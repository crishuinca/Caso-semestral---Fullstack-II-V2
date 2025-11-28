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

export const loginUser = async (correo, password) => {
    try {
        const resp = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ correo, password })
        })
        if(!resp.ok) throw new Error("Error en el login")
        const data = await resp.json()
        return data
    } catch (ex) {
        console.error("Error en login:", ex)
        return { success: false, message: "Error de inicio de sesión" }
    }
}

export const registerUser = async (userData) => {
    try {
        const resp = await fetch(`${API}/addUsuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(!resp.ok) throw new Error("Error en el registro")
        const data = await resp.json()
        return { success: true, data }
    } catch (ex) {
        console.error("Error en registro:", ex)
        return { success: false, message: "Error al registrar usuario" }
    }
}




export const updateProducto = async (data) => {
    try {
        const resp = fetch(`${API}/modificarProducto`,{
            method: "PUT",
            body: data
        })
        if(!resp.ok) throw new Error("ERROR no se pudo actualizar el PRODUCTO en la BASE DE DATOS")
        const datos = resp.json()
        return datos
    } catch (ex) {
        console.error("Error:",ex)
    }
}
export const saveDATO = async () => {
    try {
        
    } catch (ex) {
        console.error("Error:",ex)
    }
}
export const updateDATO = async () => {
    try {
        
    } catch (ex) {
        console.error("Error:",ex)
    }
}
export const deleteDATO = async () => {
    try {
        
    } catch (ex) {
        console.error("Error:",ex)
    }
}