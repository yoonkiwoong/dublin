function sortDeviceTable (n) {
  let table
  let rows
  let switching
  let i
  let x
  let y
  let shouldSwitch
  let dir
  let switchcount = 0

  table = document.getElementById('deviceTable')
  switching = true
  dir = 'asc'
  while (switching) {
    switching = false
    rows = table.rows
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false
      x = rows[i].getElementsByTagName('TD')[n]
      y = rows[i + 1].getElementsByTagName('TD')[n]
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true
          break
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
      switching = true
      switchcount++
    } else {
      if (switchcount === 0 && dir === 'asc') {
        dir = 'desc'
        switching = true
      }
    }
  }
}
