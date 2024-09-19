import moment from 'moment';

export const APP_FORMATTERS = {
    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    },

    formatDate(date: string): string {
        return moment(date).format('HH:mm DD/MM/YYYY');
    },

    formatCardNumber(cardNumber: number): string {
        if (!cardNumber) return '';
        const cardNumberStr = cardNumber.toString();
        const cleaned = cardNumberStr.replace(/\D+/g, ''); // Xóa ký tự không phải số
        const match = cleaned.match(/.{1,4}/g); // Chia thành nhóm 4 chữ số
        return match ? match.join(' ') : cardNumberStr;
    },
};
