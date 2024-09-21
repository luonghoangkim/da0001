
export const REGEX = {
    USERNAME: /^[a-z0-9]+$/i,  // Chỉ cho phép chữ cái không dấu và số
    PASSWORD: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,  // Password với ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt
    CARDNUMBER: /^\d{16}$/, // Nhập đủ 16 số
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, //Email
};