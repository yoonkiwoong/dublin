const modal = document.getElementById('addModalView')

const button = document.getElementById('openAddModalView')

button.onclick = function () {
  modal.style.display = 'block'
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
