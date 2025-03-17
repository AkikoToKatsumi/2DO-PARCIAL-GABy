document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userform");
    const userList = document.getElementById("usuarios"); // Corregido el ID

    if (!userForm) {
        console.error("El formulario con ID 'userform' no se encontró en el DOM.");
        return;
    }

    if (!userList) {
        console.error("La lista con ID 'usuarios' no se encontró en el DOM.");
        return;
    }

    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const direccion = document.getElementById("direccion").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const correo = document.getElementById("correo").value.trim();

        if (!nombre || !apellido || !correo) {
            alert("Nombre, Apellido y Correo son obligatorios.");
            return;
        }

        // Enviar datos al backend
        const response = await fetch("/api/datos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellido, direccion, telefono, edad, correo })
        });

        if (response.ok) {
            userForm.reset(); // Limpia el formulario
            loadUsers(); // Recarga la lista de usuarios
        } else {
            console.error("Error al enviar los datos al servidor.");
        }
    });

    // Cargar usuarios al inicio
    loadUsers();
});

// Función para cargar y mostrar los usuarios
async function loadUsers() {
    const userList = document.getElementById("usuarios");

    try {
        const response = await fetch("/api/datos");
        const users = await response.json();
        userList.innerHTML = "";

        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.nombre} ${user.apellido} - ${user.correo}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
}
