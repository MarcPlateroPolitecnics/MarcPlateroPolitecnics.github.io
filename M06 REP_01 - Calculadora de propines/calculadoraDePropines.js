function calcularPropina() {
  var numberOfPeople = document.getElementById("numPersones").value;
  var totalBill = document.getElementById("totalFactura").value;
  var serviceOptions = document.getElementById("opcionsServei").value;
  var minimPorpPerPersona = 0.5;

  if (numberOfPeople === "" || numberOfPeople < 1 || isNaN(numberOfPeople)) {
    numberOfPeople = 1;
  }

  if (totalBill === "" || totalBill < 0.01 || isNaN(totalBill)) {
    alert("Introdueix un import vàlid (mínim 0.01).");
    return;
  }

  if (serviceOptions === "selecciona") {
    alert("Selecciona una opció de valoració del servei.");
    return;
  }

  var percentatgePropina = 0;
  switch (serviceOptions) {
    case 'genial':
      percentatgePropina = 0.1;
      break;
    case 'acceptable':
      percentatgePropina = 0.05;
      break;
    case 'horrible':
      percentatgePropina = 0;
      break;
  }

  var propinaTotal = totalBill * percentatgePropina;
  var propinaPerPersona = propinaTotal / numberOfPeople;

  var propinaTotalInferior = totalBill * percentatgePropina;
  var propinaPerPersonaInferior = propinaTotalInferior / numberOfPeople;

  if (propinaPerPersona < minimPorpPerPersona) {
    document.getElementById('propinaInferiorTitulo').style.display = 'block';
    document.getElementById('propinaPerPersonaInferior').innerHTML = 'Propina/persona (inferior a 0.50€) = ' + propinaPerPersonaInferior.toFixed(2) + ' €.';
    document.getElementById('propinaPerPersonaMinim').innerHTML = 'Propina/persona aplicant el mínim = ' + minimPorpPerPersona + ' €.';
    alert("La propina per persona no pot ser inferior a " + minimPorpPerPersona.toFixed(2) + " €.");
    document.getElementById('propinaPerPersona').innerHTML = '';
    
  } else {
    document.getElementById('propinaInferiorTitulo').style.display = 'none';
    document.getElementById('propinaPerPersona').innerHTML = 'Propina/persona = ' + propinaPerPersona.toFixed(2) + ' €.';
  }

  document.getElementById('resultat').style.display = 'block';

  document.getElementById('formulari').reset();
    
}
