import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/[locale]/**/*.{js,ts,jsx,tsx}", // Thêm đường dẫn tới thư mục [locale]
    "./src/components/**/*.{js,ts,jsx,tsx}",  // Nếu có components bên ngoài locale
    "./src/lib/**/*.{js,ts,jsx,tsx}",  // Nếu có thư mục lib
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
