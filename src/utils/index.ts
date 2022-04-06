export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'usd',
    style: 'currency',
    minimumFractionDigits: 0
})

export const getProgressBarVariant = (amount: number, max: number) => {
    const ratio = amount / max
    if (ratio < 0.5) return "primary"
    else if (ratio < 0.75) return "warning"
    else return "danger"
}
