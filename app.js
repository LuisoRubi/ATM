var usuarios = [
    { nombre: "Saul", saldo: 200, nip: "1234" },
    { nombre: "Luis", saldo: 290, nip: "5678" },
];

function validateNip() {
    var usernameInput = document.getElementById("username").value;
    var nipInput = document.getElementById("nip").value;

    var usuario = usuarios.find(u => u.nombre.toLowerCase() === usernameInput.toLowerCase());

    if (usuario && esNipValido(nipInput) && usuario.nip === nipInput) {
        sessionStorage.setItem("currentUser", usuario.nombre);
        window.location.href = "userpage.html";
    } else {
        alert("Usuario o NIP incorrectos, intenta nuevamente.");
    }
}

function esNipValido(nip) {
    const regex = /^\d{4}$/;  
    return regex.test(nip);
}

document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("userpage.html")) {
        var username = sessionStorage.getItem("currentUser");
        console.log("Usuario en sessionStorage:", username);
        if (username) {
            document.getElementById("username").textContent = username;
        } else {
            alert("No has iniciado sesión. Redirigiendo al inicio de sesión.");
            window.location.href = "index.html";
        }
    }
});

function getCurrentUser() {
    var username = sessionStorage.getItem("currentUser");
    return usuarios.find(u => u.nombre === username);
}

function checkBalance() {
    var usuario = getCurrentUser();
    if (usuario) {
        alert("Tu saldo actual es: $" + usuario.saldo);
    } else {
        alert("Error: no se encontró el usuario.");
    }
}

function depositMoney() {
    var usuario = getCurrentUser();
    if (!usuario) {
        alert("Error: no se encontró el usuario.");
        return;
    }

    var monto = prompt("¿Cuánto deseas depositar?");
    monto = parseFloat(monto);

    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido.");
    } else if (usuario.saldo + monto > 990) {
        alert("No puedes tener más de $990 en tu cuenta.");
    } else {
        usuario.saldo += monto;
        alert("Has depositado $" + monto + ". Tu nuevo saldo es: $" + usuario.saldo);
    }
}

function withdrawMoney() {
    var usuario = getCurrentUser();
    if (!usuario) {
        alert("Error: no se encontró el usuario.");
        return;
    }

    var monto = prompt("¿Cuánto deseas retirar?");
    monto = parseFloat(monto);

    if (isNaN(monto) || monto <= 0) {
        alert("Ingresa un monto válido.");
    } else if (usuario.saldo - monto < 10) {
        alert("No puedes tener menos de $10 en tu cuenta.");
    } else {
        usuario.saldo -= monto;
        alert("Has retirado $" + monto + ". Tu nuevo saldo es: $" + usuario.saldo);
    }
}

function resetATM() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function cambiarNip() {
    var usuario = getCurrentUser();
    if (!usuario) {
        alert("Error: no se encontró el usuario.");
        return;
    }

    var nipActual = prompt("Ingrese su NIP actual:");
    
    if (esNipValido(nipActual) && usuario.nip === nipActual) {
        var nuevoNip = prompt("Ingrese su nuevo NIP (4 dígitos):");
        var confirmarNuevoNip = prompt("Confirme su nuevo NIP:");
        
        if (esNipValido(nuevoNip) && nuevoNip === confirmarNuevoNip) {
            usuario.nip = nuevoNip;
            alert("NIP cambiado exitosamente.");
        } else {
            alert("Los NIP no coinciden o no son válidos.");
        }
    } else {
        alert("El NIP actual es incorrecto.");
    }
}
