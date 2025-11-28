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




// Obtener todos los usuarios
export const getUsuarios = async () => {
    try {
        const resp = await fetch(`${API}/usuarios`)
        if(!resp.ok) throw new Error("ERROR al cargar usuarios")
        const data = await resp.json()
        return data
    } catch (ex) {
        console.error("Error al obtener usuarios:", ex)
        return []
    }
}

// Actualizar producto
export const updateProducto = async (producto) => {
    try {
        const resp = await fetch(`${API}/modificarProducto`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })
        if(!resp.ok) throw new Error("ERROR al actualizar producto")
        const data = await resp.json()
        return { success: true, data }
    } catch (ex) {
        console.error("Error al actualizar producto:", ex)
        return { success: false, message: "Error al actualizar producto" }
    }
}

// Actualizar usuario
export const updateUsuario = async (usuario) => {
    try {
        const resp = await fetch(`${API}/modificarUsuario`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        if(!resp.ok) throw new Error("ERROR al actualizar usuario")
        const data = await resp.json()
        return { success: true, data }
    } catch (ex) {
        console.error("Error al actualizar usuario:", ex)
        return { success: false, message: "Error al actualizar usuario" }
    }
}

// Eliminar usuario
export const deleteUsuario = async (id) => {
    try {
        const resp = await fetch(`${API}/eliminarUsuario/${id}`, {
            method: "DELETE"
        })
        if(!resp.ok) throw new Error("ERROR al eliminar usuario")
        return { success: true }
    } catch (ex) {
        console.error("Error al eliminar usuario:", ex)
        return { success: false, message: "Error al eliminar usuario" }
    }
}