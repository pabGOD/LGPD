//car
let carArr = [];

class Car {


  constructor(modelo, preco, alturaCacamba, alturaVeiculo, alturaSolo, capacidadeCarga, motor, potencia, volumeCacamba, roda, image) {
    this.modelo = modelo
    this.preco = preco
    this.alturaCacamba = alturaCacamba
    this.alturaVeiculo = alturaVeiculo
    this.alturaSolo = alturaSolo
    this.capacidadeCarga = capacidadeCarga
    this.motor = motor
    this.potencia = potencia
    this.volumeCacamba = volumeCacamba
    this.roda = roda
    this.image = image
  }
}

// Se existir carClass retornando 1 se não retornar -1
function GetCarArrPosition(arr, carClass) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].modelo === carClass.modelo)
      return i;
  }
  return -1;
}

function SetCarToCompare(el, carClass) {

  if (carClass instanceof Car) {
    const pos = GetCarArrPosition(carArr, carClass)
    if (el.checked) {
      if (pos < 0) carArr.push(carClass)

      if (carArr.length > 2) carArr = carArr.filter((el, i, arr) => i > arr.length - arr.length)
    } else {
      carArr = carArr.filter((el, i) => i != pos)
    }
  } else {
    throw "Defina uma classe!";
  }
}

function ShowCompare() {
  if (carArr.length < 2) {
    alert("Precisa marcar 2 carros!");
    return;
  }

  UpdateCompareTable(carArr);
  document.getElementById("compare").style.display = "block";
}

function HideCompare() {
  document.getElementById("compare").style.display = "none";
}

function UpdateCompareTable(carsData) {
  if (typeof carsData === "object" && carsData.length === 0)
    throw "Dados vazios"

  const table = document.querySelector('div#compare table')

  const tbody = table.querySelector('tbody')

  let td = [];
  for (let i = 0; i < tbody.children.length; i++) {
    let tr = tbody.children[i]

    for (let _td = 0; _td < tr.children.length; _td++) {
      if (tr.children[_td].id.length > 0) td.push(tr.children[_td])
    }
  }

  carsData.map(function (el, index, arr) {
    let keysEl = Object.keys(el)
    const keysElIndex = keysEl.map(v => v.toLowerCase() + "_" + index)

    let idlower = '';

    for (let i = 0; i < td.length; i++) {
      idlower = td[i].id.toLowerCase()
      for (let _i = 0; _i < keysEl.length; _i++)
        if (idlower.includes(keysElIndex[_i]))
          td[i].innerHTML = (keysElIndex[_i].includes('image')) ? `<img src='${el[keysEl[_i]]}'>` : `${el[keysEl[_i]]}`;
    }
  })
}