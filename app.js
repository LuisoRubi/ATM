var usuarios = [
    { nombre: "Mali", saldo: 200, password: "1234" },
    { nombre: "Gera", saldo: 290, password: "5678" },
    { nombre: "Maui", saldo: 67, password: "9012" },
    { nombre: "Enrique", saldo: 500, password: "9876" },
    { nombre: "Paty", saldo: 458, password: "5432" },
];

function validatePassword() {
    var usernameInput = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;

    var usuario = usuarios.find(u => u.nombre.toLowerCase() === usernameInput.toLowerCase());

    if (usuario && usuario.password === passwordInput) {
        sessionStorage.setItem("currentUser", usuario.nombre);
        window.location.href = "userpage.html";
    } else {
        alert("Usuario o contraseña incorrectos, intenta nuevamente.");
    }
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