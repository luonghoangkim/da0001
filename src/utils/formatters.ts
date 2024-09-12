import moment from 'moment';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatDate(date: string): string {
    return moment(date).format('HH:mm DD/MM/YYYY');
}

export function formatCardNumber(cardNumber: number): string {
    if (!cardNumber) return '';
    const cardNumberStr = cardNumber.toString();
    const cleaned = cardNumberStr.replace(/\D+/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cardNumberStr;
}