/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{vue,html,js}"];
export const theme = {
  extend: {},
};
export const plugins = [
  require('@tailwindcss/forms'),
];