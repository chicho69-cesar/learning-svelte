export function currencyFormatter(quantity) {
  return Number(quantity).toLocaleString('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits: 2
  })
}

export function percentageFormatter(quantity) {
  return Number(quantity).toLocaleString('en-US', {
    style: 'percent',
    maximumFractionDigits: 2
  })
}

export function dateFormatter(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}
