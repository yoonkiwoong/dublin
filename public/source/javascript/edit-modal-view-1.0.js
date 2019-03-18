const modal = document.getElementById('editModalView')

const button = document.getElementById('openEditModalView')

button.onclick = function () {
  modal.style.display = 'block'
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none'
  }
}
