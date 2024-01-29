/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {

      //for bgs and texts
      'white': '#F0F3F8',
      'black': '#263238',
      'grey': '#818497',
      'purple': '#A285D5',
      'purple-light': '#E8DBFF',

      'border-light': '#E7ECF3',

      //for profile and project sections
      'section-light': '#E6EAF2',
      'section-dark': '#121214',

      //for lists
      'list-dark': '#24232A',

      //for cards (project-cards, lists, tasks, forms)
      'card-light': '#FFF',
      'card-light-hover': '#F0F3F8',

      'card-dark': '#2F303A',
      'card-dark-hover': '#46475B',

      'card-wrapper-dark': '#1E1E23',
      'card-wrapper-dark-hover': '#18181A',

      'card-text': '#919092',
      
      //for task urgency selectors, some icons and error messages (red)
      'green': '#97DE9E',
      'green-light': '#e3ffe5',
      'green-lighter': '#f1fff2',
      'yellow': '#FBE591',
      'orange': '#FFBD84',
      'red': '#F97171',
      'red-light': '#FFEEEE',
      'red-lighter': '#fff3f3',
      'red-darker': '#C54949',

    },
    fontSize: {
      sm: '1.5rem',
      base: '1rem',
      xl: '2rem',
      '2xl': '2rem',
      '3xl': '3rem',
      '4xl': '5rem',
      '5xl': '5rem',
      '7xl': '7.2rem',
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}
