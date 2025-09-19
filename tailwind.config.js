/** @type {import('tailwindcss').Config} */
const baseShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

const createColorScale = (name, extraShades = []) => {
  const shades = Array.from(new Set([...baseShades, ...extraShades.map(String)])).sort((a, b) => Number(a) - Number(b));

  return shades.reduce((acc, shade) => {
    acc[shade] = `rgb(var(--color-${name}-${shade}) / <alpha-value>)`;
    return acc;
  }, {});
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: createColorScale('primary'),
        accent: createColorScale('accent'),
        purple: createColorScale('accent'),
        slate: createColorScale('slate', ['750', '850']),
        dark: createColorScale('dark'),
        surface: {
          DEFAULT: 'var(--bg-secondary)',
          base: 'var(--bg-primary)',
          soft: 'var(--bg-tertiary)',
          strong: 'var(--bg-secondary)',
          contrast: 'var(--text-primary)'
        },
        border: {
          DEFAULT: 'var(--border-primary)',
          subtle: 'var(--border-secondary)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--muted-foreground)'
        },
        ring: {
          primary: 'var(--ring-primary)',
          accent: 'var(--ring-accent)'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  }
}
