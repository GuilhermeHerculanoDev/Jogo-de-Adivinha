let numberAleatorio = Math.round(Math.random() * 100);
let containerTable = document.querySelector('#containerTable')
let classificacaoArray = [];
let containerTentativas = document.querySelector('#tentativas')
let tentativas = 0
const containerVencedor = document.querySelector('#containerVencedor')
const vencedor = document.querySelector('#vencedor')
const mensagemVencedor = document.querySelector('#mensagemVencedor')

document.querySelector('#input').addEventListener('keydown', (e) => {
if(e.key === 'Enter'){
  const input = document.querySelector('#input')
  if (!input.value) {
    alert("Digite algum numero!!!")
    return
  }
  conferir(input.value)
  input.value = ''
}

})


function conferir(input) {
  tentativas++
  if (input > 100 || input < 0) {
    alert("O nimero esta entre 1 e 100")
    return
  }
  transformar(input)
}

function transformar(input) {
  const number = parseFloat(input)
  calcularPorcentagem(number)
}


function calcularPorcentagem(number) {
  razao = number / numberAleatorio

  porcentagem = Math.floor(razao * 100)

  criacao(porcentagem, number)
}

function criacao(porcentagem, number) {
  var objeto = {
    number: number,
    porcentagem: porcentagem,
  }

  if (objeto.porcentagem > 100) {
    objeto.porcentagem = "+100"
  }

  classificacaoArray.push(objeto)
  classificacaoArray.sort(function (a, b) {
    return b.porcentagem - a.porcentagem
  })

  addClassificacao(objeto)
}

function addClassificacao(objeto) {
  containerTable.innerHTML = ``

  classificacaoArray.forEach(objeto => {


    let containerClassificacao = document.createElement('div')
    containerClassificacao.classList.add('lineClassificacao')

    containerClassificacao.innerHTML = `
    <div class="fundo"></div>
    <div class="number">
    <p class="number">${objeto.number}</p>
    </div>
    <div class="porcentagem">
    <p class="porcentagem">${objeto.porcentagem}%</p>
    </div>
    `
    containerTable.appendChild(containerClassificacao)
    let fundo = containerClassificacao.querySelector('.fundo')
    if (fundo) {
      if (objeto.porcentagem < 25) {
        fundo.style.width = `${objeto.porcentagem}%`;
        fundo.style.backgroundColor = '#f25157';
        containerClassificacao.style.border = `1px solid #f25157`
      } else if (objeto.porcentagem > 25 && objeto.porcentagem <= 50) {
        fundo.style.width = `${objeto.porcentagem}%`;
        fundo.style.backgroundColor = '#eb7c34';
        containerClassificacao.style.border = `1px solid #eb7c34`
      } else {
        fundo.style.width = `${objeto.porcentagem}%`;
        fundo.style.backgroundColor = '#04bc7c';
        containerClassificacao.style.border = `1px solid #04bc7c`
      }
    } else {
      console.log("não");
    }

    checarVencedor(objeto)

  })
}

function checarVencedor(objeto) {
  if (objeto.number == numberAleatorio) {
    document.getElementById('containerVencedor').style.display = 'block'
  document.querySelector('#container').style.filter = 'blur(15px)'
    mensagemVencedor.innerHTML = `Você acertou o número ${numberAleatorio} em ${tentativas} Tentativas`
  }
}

function rejogar(){
  location.reload()
}