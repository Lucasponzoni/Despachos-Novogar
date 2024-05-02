// Array para almacenar los datos ingresados
let datos = [];

// Función para cargar los datos en la tabla
function cargarDatos() {
  const cliente = document.getElementById('clienteInput').value;
  const remito = document.getElementById('remitoInput').value;
  const etiqueta = document.getElementById('etiquetaInput').value;
  const email = document.getElementById('emailInput').value;
  const fechaHora = new Date().toLocaleString();

  // Agregar los datos al array
  datos.unshift({ fechaHora, cliente, remito, etiqueta, email });

  // Limpiar tabla y recargar los datos
  const tablaDatos = document.getElementById('tablaDatos');
  tablaDatos.innerHTML = '';
  datos.forEach(dato => {
    const row = `<tr>
                  <td>${dato.fechaHora}</td>
                  <td>${dato.remito}</td>
                  <td>${dato.cliente}</td>
                  <td>${dato.etiqueta}</td>
                  <td>${dato.email}</td>
                </tr>`;
    tablaDatos.innerHTML += row;
  });

  // Paginar la tabla
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 0; i < Math.ceil(datos.length / 5); i++) {
    const button = `<li class="page-item"><button class="page-link" onclick="paginar(${i})">${i + 1}</button></li>`;
    pagination.innerHTML += button;
  }
}

// Función para paginar la tabla
function paginar(pagina) {
  const tablaDatos = document.getElementById('tablaDatos');
  tablaDatos.innerHTML = '';
  const startIndex = pagina * 5;
  const endIndex = startIndex + 5;
  const pageData = datos.slice(startIndex, endIndex);
  pageData.forEach(dato => {
    const row = `<tr>
                  <td>${dato.fechaHora}</td>
                  <td>${dato.remito}</td>
                  <td>${dato.cliente}</td>
                  <td>${dato.etiqueta}</td>
                  <td>${dato.email}</td>
                </tr>`;
    tablaDatos.innerHTML += row;
  });
}
