let numberComma = function (value, priceUnit) {
  var str
  if (!value) return ''
  if (typeof value !== 'number') {
    return value
  }
  if (window.$.isNumeric(value)) value = Math.floor(value)
  str = String(value)
  return (str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')) + priceUnit
}

export default {
  numberComma
}
