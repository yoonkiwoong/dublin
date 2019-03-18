function redirectPost (url) {
  const form = document.createElement('form')
  document.body.appendChild(form)
  form.method = 'post'
  form.action = url
  form.submit()
  document.body.removeChild(form)
}

function deletePopupView (id) {
  if (window.confirm('장비를 삭제하시겠습니까?')) {
    redirectPost(id + '/delete')
  }
}
