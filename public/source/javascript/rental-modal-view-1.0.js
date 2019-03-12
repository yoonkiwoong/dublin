let rentalModal = document.getElementById('rentalModalView')

let rentalButton = document.getElementById('rentalModalViewButton')

let rentalSpan = document.getElementsByClassName('rentalModalViewClose')[0]

rentalButton.onclick = function () {
  rentalModal.style.display = 'block'
}

rentalSpan.onclick = function () {
  rentalModal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target === rentalModal) {
    rentalModal.style.display = 'none'
  }
}
