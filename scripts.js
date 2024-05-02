// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBIXlgOct2UzkrZbZYbyHu6_NbLDzTqqig",
  authDomain: "despachos-novogar.firebaseapp.com",
    databaseURL: "https://despachos-novogar-default-rtdb.firebaseio.com",
    projectId: "despachos-novogar",
    storageBucket: "despachos-novogar.appspot.com",
    messagingSenderId: "346020771441",
    appId: "1:346020771441:web:c4a29c0db4200352080dd0",
    measurementId: "G-64DDP7D6Q2"
  };
  
  // Inicialización de Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Referencia a la base de datos en tiempo real
  const db = firebase.database();
  
  // Función para cargar los datos en Firebase al cargar la página
  window.addEventListener('DOMContentLoaded', () => {
    // Referencia a la ubicación de los datos en la base de datos
    const datosRef = db.ref('datos');
  
    // Escuchar eventos de "child_added" para obtener los datos
    datosRef.on('child_added', (snapshot) => {
      const dato = snapshot.val();
      // Llamar a una función para agregar el dato a tu tabla HTML
      agregarDatoATabla(dato);
    });
  });
  
  // Función para agregar un dato a la tabla HTML
  function agregarDatoATabla(dato) {
    const tablaDatos = document.getElementById('tablaDatos');
    const row = `
      <tr>
        <td>${dato.fechaHora}</td>
        <td>${dato.remito}</td>
        <td>${dato.cliente}</td>
        <td>${dato.etiqueta}</td>
        <td>${dato.email}</td>
      </tr>`;
    tablaDatos.innerHTML += row;
  }
  
  // Función para cargar los datos en la tabla y en Firebase
  function cargarDatos() {
    const cliente = document.getElementById('clienteInput').value;
    const remito = document.getElementById('remitoInput').value;
    const etiqueta = document.getElementById('etiquetaInput').value;
    const email = document.getElementById('emailInput').value;
    const fechaHora = new Date().toLocaleString();
  
    // Guardar los datos en la base de datos de Firebase
    db.ref('datos').push({
      fechaHora,
      cliente,
      remito,
      etiqueta,
      email
    });
  
    // Agregar los datos a la tabla HTML
    const tablaDatos = document.getElementById('tablaDatos');
    const newRow = `<tr>
                    <td>${fechaHora}</td>
                    <td>${remito}</td>
                    <td>${cliente}</td>
                    <td>${etiqueta}</td>
                    <td>${email}</td>
                  </tr>`;
    tablaDatos.innerHTML = newRow + tablaDatos.innerHTML; // Agrega el nuevo dato al principio de la tabla
  }
  