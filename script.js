function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.seccion');
  secciones.forEach(seccion => {
    seccion.classList.remove('activa');
  });
  document.getElementById(id).classList.add('activa');

  if (id === 'estadisticas') {
    mostrarEstadisticas();
  }
}

document.getElementById('form-registro').addEventListener('submit', function(e) {
  e.preventDefault();
  const tipos = Array.from(document.querySelectorAll('input[name="tipos"]:checked')).map(el => el.value);
  const entrega = document.querySelector('select[name="entrega"]').value;
  const registro = { tipos, entrega, fecha: new Date().toISOString() };
  const datos = JSON.parse(localStorage.getItem('registros') || '[]');
  datos.push(registro);
  localStorage.setItem('registros', JSON.stringify(datos));
  alert('Registro guardado con éxito');
  this.reset();
});

function mostrarEstadisticas() {
  const datos = JSON.parse(localStorage.getItem('registros') || '[]');
  const conteo = { orgánico: 0, reciclable: 0, "no reciclable": 0 };
  datos.forEach(r => {
    r.tipos.forEach(t => conteo[t]++);
  });

  document.getElementById('stats').innerHTML = `
    <p>Registros totales: ${datos.length}</p>
    <p>Orgánico: ${conteo["orgánico"]}</p>
    <p>Reciclable: ${conteo["reciclable"]}</p>
    <p>No reciclable: ${conteo["no reciclable"]}</p>
  `;
}