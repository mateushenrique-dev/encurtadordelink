document.querySelector('label').addEventListener(('click'), () =>{
  document.querySelector('.menu nav').classList.toggle('ativo')
  document.querySelector('.login-field').classList.toggle('ativo')
  document.querySelector('.header').classList.toggle('ativo')
})

const button = document.querySelector('.encurter-field a').addEventListener('click', botao => botao.preventDefault())

function encurtarLink() {
  const url = document.querySelector('#url')
  const apiUrl = 'https://api.shrtco.de/v2/shorten?url=' + url.value
  if(url.value !== '') {
  url.classList.remove('empty')
  document.querySelector('.encurter-field a').classList.add('remove')
  document.querySelector('.encurter-field > div').classList.add('loader')
  content(apiUrl, url.value)
  } else {
    url.classList.add('empty')
    url.setAttribute('placeholder', 'Plase add a link here')
  }
}

async function content(url, urloriginal) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    document.querySelector('.encurter-field a').classList.remove('remove')
    document.querySelector('.encurter-field > div').classList.remove('loader')
    linkEncurtado(data.result, urloriginal)
  } catch (error) {
    console.error(error)
  }
}

 let height = 0

function linkEncurtado(link, linkoriginal) {
  const linksField = document.querySelector('.encurter-links ul')
  const liLinks = document.createElement('li')
  liLinks.innerHTML = `
  <p>${linkoriginal}</p>
  <a href="https://${link.short_link}" target="_blank">${link.short_link}</a>
  <button id="${link.code}" onclick="copiar('${link.short_link}', '${link.code}')">Copy</button>
  `
  linksField.appendChild(liLinks)
  sessionStorage.setItem('Links', linksField.innerHTML)
}

function copiar(linkShort, linkCode) {
  navigator.clipboard.writeText(linkShort)
  setTimeout(() => {
    document.querySelector(`#${linkCode}`).innerHTML = 'Copied'
    document.querySelector(`#${linkCode}`).classList.add('copied')
  }, 0)
  setTimeout(() => {
    document.querySelector(`#${linkCode}`).innerHTML = 'Copy'
    document.querySelector(`#${linkCode}`).classList.remove('copied')
  }, 2000)
}

if(sessionStorage['Links']) {
  document.querySelector('.encurter-links ul').innerHTML = sessionStorage['Links']
}


