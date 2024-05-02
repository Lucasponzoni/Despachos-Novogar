// Inicializar Firebase
const firebaseConfig = {
    // Tu configuración de Firebase aquí
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  // Función para cargar datos
  function cargarDatos() {
    const cliente = document.getElementById('clienteInput').value;
    const remito = document.getElementById('remitoInput').value;
    const etiqueta = document.getElementById('etiquetaInput').value;
    const email = document.getElementById('emailInput').value;
  
    const timestamp = new Date().toLocaleString();
  
    // Guardar datos en Firebase
    database.ref('datos').push({
      fecha: timestamp,
      cliente: cliente,
      remito: remito,
      etiqueta: etiqueta,
      email: email
    });
  
    // Limpiar los campos de entrada
    document.getElementById('clienteInput').value = '';
    document.getElementById('remitoInput').value = '';
    document.getElementById('etiquetaInput').value = '';
    document.getElementById('emailInput').value = '';
  
    // Mostrar datos en la tabla
    mostrarDatos(timestamp, cliente, remito, etiqueta, email);
  }
  
  // Función para mostrar datos en la tabla
  function mostrarDatos(fecha, cliente, remito, etiqueta, email) {
    const tableBody = document.getElementById('dataBody');
    const newRow = `<tr>
                      <td>${fecha}</td>
                      <td>${remito}</td>
                      <td>${cliente}</td>
                      <td>${etiqueta}</td>
                      <td>${email}</td>
                    </tr>`;
    tableBody.insertAdjacentHTML('afterbegin', newRow);
  }
  
  // Escuchar cambios en la base de datos de Firebase y mostrarlos
  database.ref('datos').on('child_added', (snapshot) => {
    const data = snapshot.val();
    mostrarDatos(data.fecha, data.cliente, data.remito, data.etiqueta, data.email);
  });
  