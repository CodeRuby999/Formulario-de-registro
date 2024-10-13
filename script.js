// Usuarios iniciales
let usuarios = [
    { id: "1", cedula: "1234567890", nombre: "Juan", apellido: "Pérez", email: "juan@example.com", telefono: "1234567890", direccion: "Calle 1", ciudad: "Ciudad A", pais: "País X" },
    { id: "2", cedula: "0987654321", nombre: "María", apellido: "González", email: "maria@example.com", telefono: "9876543210", direccion: "Calle 2", ciudad: "Ciudad B", pais: "País Y" },
    { id: "3", cedula: "1122334455", nombre: "Carlos", apellido: "Rodríguez", email: "carlos@example.com", telefono: "5544332211", direccion: "Calle 3", ciudad: "Ciudad C", pais: "País Z" }
];

let tablaVisible = false;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registroForm');
    const listarBtn = document.getElementById('listarUsuarios');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            registrarUsuario();
        });
    }

    if (listarBtn) {
        listarBtn.addEventListener('click', toggleListaUsuarios);
    }
});

function registrarUsuario() {
    const id = document.getElementById('id').value;
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const pais = document.getElementById('pais').value;

    if (!validarId(id)) {
        alert('El ID debe contener solo números y no debe estar duplicado.');
        return;
    }

    if (!validarCedula(cedula)) {
        alert('La cédula debe contener solo números y no debe estar duplicada.');
        return;
    }

    const nuevoUsuario = { id, cedula, nombre, apellido, email, telefono, direccion, ciudad, pais };
    usuarios.push(nuevoUsuario);
    alert('Usuario registrado con éxito');
    document.getElementById('registroForm').reset();
    if (tablaVisible) {
        actualizarTablaUsuarios();
    }
}

function validarId(id) {
    if (!/^\d+$/.test(id)) {
        return false;
    }
    return !usuarios.some(usuario => usuario.id === id);
}

function validarCedula(cedula) {
    if (!/^\d+$/.test(cedula)) {
        return false;
    }
    return !usuarios.some(usuario => usuario.cedula === cedula);
}

function toggleListaUsuarios() {
    tablaVisible = !tablaVisible;
    const tabla = document.getElementById('tablaUsuarios');
    const listarBtn = document.getElementById('listarUsuarios');
    
    if (tablaVisible) {
        actualizarTablaUsuarios();
        tabla.style.display = 'table';
        listarBtn.textContent = 'Ocultar Usuarios';
    } else {
        tabla.style.display = 'none';
        listarBtn.textContent = 'Listar Usuarios';
    }
}

function actualizarTablaUsuarios() {
    const tabla = document.getElementById('tablaUsuarios');
    if (!tabla) return;

    tabla.innerHTML = '';
    const thead = tabla.createTHead();
    const headerRow = thead.insertRow();
    ['ID', 'Cédula', 'Nombre', 'Apellido', 'Email', 'Teléfono', 'Dirección', 'Ciudad', 'País'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    const tbody = tabla.createTBody();
    usuarios.forEach(usuario => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = usuario.id;
        row.insertCell(1).textContent = usuario.cedula;
        row.insertCell(2).textContent = usuario.nombre;
        row.insertCell(3).textContent = usuario.apellido;
        row.insertCell(4).textContent = usuario.email;
        row.insertCell(5).textContent = usuario.telefono;
        row.insertCell(6).textContent = usuario.direccion;
        row.insertCell(7).textContent = usuario.ciudad;
        row.insertCell(8).textContent = usuario.pais;
    });
}