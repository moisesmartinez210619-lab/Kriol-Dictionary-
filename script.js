// Verifica en qué página estamos
const esAdmin = window.location.pathname.includes("admin.html");

// Inicializa o carga palabras desde localStorage
let palabras = JSON.parse(localStorage.getItem("palabras")) || [];

if (esAdmin) {
  const lista = document.getElementById("lista-palabras");
  const boton = document.getElementById("agregar");

  function mostrarPalabras() {
    lista.innerHTML = "";
    palabras.forEach(p => {
      const li = document.createElement("li");
      li.textContent = `${p.kriol} → ${p.espanol} (Ej: ${p.ejemplo})`;
      lista.appendChild(li);
    });
  }

  boton.addEventListener("click", () => {
    const kriol = document.getElementById("kriol").value.trim();
    const espanol = document.getElementById("espanol").value.trim();
    const ejemplo = document.getElementById("ejemplo").value.trim();

    if (!kriol || !espanol) return alert("Rellena todos los campos");

    palabras.push({ kriol, espanol, ejemplo });
    localStorage.setItem("palabras", JSON.stringify(palabras));
    mostrarPalabras();

    document.getElementById("kriol").value = "";
    document.getElementById("espanol").value = "";
    document.getElementById("ejemplo").value = "";
  });

  mostrarPalabras();

} else {
  const buscarInput = document.getElementById("buscar");
  const botonBuscar = document.getElementById("btnBuscar");
  const resultado = document.getElementById("resultado");

  botonBuscar.addEventListener("click", () => {
    const query = buscarInput.value.trim().toLowerCase();
    const palabra = palabras.find(p => p.kriol.toLowerCase() === query);

    if (palabra) {
      resultado.innerHTML = `
        <strong>${palabra.kriol}</strong> → ${palabra.espanol}<br>
        <em>Ejemplo:</em> ${palabra.ejemplo}
      `;
    } else {
      resultado.textContent = "Palabra no encontrada 😢";
    }
  });
}
