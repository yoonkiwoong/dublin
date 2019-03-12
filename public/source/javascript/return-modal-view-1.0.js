let returnModal = document.getElementById('returnModalView')

let returnButton = document.getElementById('returnModalViewButton')

let returnSpan = document.getElementsByClassName('returnModalViewClose')[0]

returnButton.onclick = function () {
  returnModal.style.display = 'block'
}

returnSpan.onclick = function () {
  returnModal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target === returnModal) {
    returnModal.style.display = 'none'
  }
}
