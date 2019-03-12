function rentalPopupView () {
  let txt
  if (confirm ('Press a button!')) {
    txt = 'You Pressd Confirm'
  } else {
    txt = 'You Pressd Cancel'
  }
}

module.exports = rentalPopupView
