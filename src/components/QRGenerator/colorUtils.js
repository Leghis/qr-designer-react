// Utility functions for color manipulation and theme application

/**
 * Extracts the primary color from a color definition (simple color or gradient)
 */
export const extractPrimaryColor = (colorDef) => {
  if (!colorDef) return '#000000';
  
  // Simple color
  if (typeof colorDef === 'string') {
    return colorDef;
  }
  
  // Gradient
  if (colorDef.gradient?.colorStops?.length > 0) {
    return colorDef.gradient.colorStops[0].color;
  }
  
  // Color property in object
  if (colorDef.color) {
    return colorDef.color;
  }
  
  return '#000000';
};

/**
 * Checks if a color definition is a gradient
 */
export const isGradient = (colorDef) => {
  return colorDef && typeof colorDef === 'object' && colorDef.gradient;
};

/**
 * Converts a hex color to HSL
 */
export const hexToHSL = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * Converts HSL to hex color
 */
export const hslToHex = (h, s, l) => {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Adjusts the brightness of a color
 */
export const adjustBrightness = (color, factor) => {
  const hsl = hexToHSL(color);
  hsl.l = Math.max(0, Math.min(100, hsl.l * factor));
  return hslToHex(hsl.h, hsl.s, hsl.l);
};

/**
 * Applies a color theme to a color definition while preserving its structure
 */
export const applyColorTheme = (originalDef, themeColor, elementType) => {
  if (!originalDef) {
    return themeColor;
  }
  
  // If original is a simple color, return theme color
  if (typeof originalDef === 'string') {
    return themeColor;
  }
  
  // If original has a gradient, create a gradient with theme colors
  if (originalDef.gradient) {
    const gradient = { ...originalDef.gradient };
    const themeHSL = hexToHSL(themeColor);
    
    // Apply theme color to gradient stops with variations
    gradient.colorStops = originalDef.gradient.colorStops.map((stop, index) => {
      let adjustedColor = themeColor;
      
      // Create variations for multiple stops
      if (gradient.colorStops.length > 1) {
        const brightnessRange = 0.3; // 30% variation range
        const factor = 1 - (brightnessRange * (index / (gradient.colorStops.length - 1)));
        adjustedColor = adjustBrightness(themeColor, factor);
      }
      
      return {
        ...stop,
        color: adjustedColor
      };
    });
    
    return { gradient };
  }
  
  // If original has color property in object
  if (originalDef.color) {
    return { ...originalDef, color: themeColor };
  }
  
  return themeColor;
};

/**
 * Generates a complete color scheme from a primary color
 */
export const generateColorScheme = (primaryColor) => {
  const primary = hexToHSL(primaryColor);
  
  return {
    dots: primaryColor,
    background: hslToHex(primary.h, Math.max(5, primary.s - 80), Math.min(98, primary.l + 45)),
    corners: adjustBrightness(primaryColor, 0.8),
    cornersAlt: adjustBrightness(primaryColor, 1.2)
  };
};

/**
 * Applies a complete theme to template options
 */
export const applyThemeToTemplate = (templateOptions, theme) => {
  // If no template options, create default structure with theme colors
  if (!templateOptions || Object.keys(templateOptions).length === 0) {
    return {
      dotsOptions: { color: theme.dots },
      backgroundOptions: { color: theme.background },
      cornersSquareOptions: { color: theme.corners },
      cornersDotOptions: { color: theme.cornersAlt || theme.corners }
    };
  }
  
  const newOptions = { ...templateOptions };
  
  // Apply theme to dots
  if (templateOptions.dotsOptions) {
    newOptions.dotsOptions = {
      ...templateOptions.dotsOptions
    };
    
    if (isGradient(templateOptions.dotsOptions)) {
      newOptions.dotsOptions = applyColorTheme(templateOptions.dotsOptions, theme.dots, 'dots');
    } else if (templateOptions.dotsOptions.color) {
      newOptions.dotsOptions.color = theme.dots;
    } else if (templateOptions.dotsOptions.gradient) {
      newOptions.dotsOptions = applyColorTheme({ gradient: templateOptions.dotsOptions.gradient }, theme.dots, 'dots');
    }
  } else {
    // Create dots options if they don't exist
    newOptions.dotsOptions = { color: theme.dots };
  }
  
  // Apply theme to background
  if (templateOptions.backgroundOptions) {
    newOptions.backgroundOptions = {
      ...templateOptions.backgroundOptions
    };
    
    if (isGradient(templateOptions.backgroundOptions)) {
      newOptions.backgroundOptions = applyColorTheme(templateOptions.backgroundOptions, theme.background, 'background');
    } else if (templateOptions.backgroundOptions.color) {
      newOptions.backgroundOptions.color = theme.background;
    } else if (templateOptions.backgroundOptions.gradient) {
      newOptions.backgroundOptions = applyColorTheme({ gradient: templateOptions.backgroundOptions.gradient }, theme.background, 'background');
    }
  } else {
    // Create background options if they don't exist
    newOptions.backgroundOptions = { color: theme.background };
  }
  
  // Apply theme to corners
  if (templateOptions.cornersSquareOptions) {
    newOptions.cornersSquareOptions = {
      ...templateOptions.cornersSquareOptions
    };
    
    if (isGradient(templateOptions.cornersSquareOptions)) {
      newOptions.cornersSquareOptions = applyColorTheme(templateOptions.cornersSquareOptions, theme.corners, 'corners');
    } else if (templateOptions.cornersSquareOptions.color) {
      newOptions.cornersSquareOptions.color = theme.corners;
    } else if (templateOptions.cornersSquareOptions.gradient) {
      newOptions.cornersSquareOptions = applyColorTheme({ gradient: templateOptions.cornersSquareOptions.gradient }, theme.corners, 'corners');
    }
  } else {
    // Create corners options if they don't exist
    newOptions.cornersSquareOptions = { color: theme.corners };
  }
  
  // Apply theme to corner dots
  if (templateOptions.cornersDotOptions) {
    newOptions.cornersDotOptions = {
      ...templateOptions.cornersDotOptions
    };
    
    if (isGradient(templateOptions.cornersDotOptions)) {
      newOptions.cornersDotOptions = applyColorTheme(templateOptions.cornersDotOptions, theme.cornersAlt || theme.corners, 'cornerDots');
    } else if (templateOptions.cornersDotOptions.color) {
      newOptions.cornersDotOptions.color = theme.cornersAlt || theme.corners;
    } else if (templateOptions.cornersDotOptions.gradient) {
      newOptions.cornersDotOptions = applyColorTheme({ gradient: templateOptions.cornersDotOptions.gradient }, theme.cornersAlt || theme.corners, 'cornerDots');
    }
  } else {
    // Create corner dots options if they don't exist
    newOptions.cornersDotOptions = { color: theme.cornersAlt || theme.corners };
  }
  
  return newOptions;
};

/**
 * Extracts all colors from template options
 */
export const extractTemplateColors = (templateOptions) => {
  const colors = {
    dots: extractPrimaryColor(templateOptions?.dotsOptions),
    background: extractPrimaryColor(templateOptions?.backgroundOptions),
    corners: extractPrimaryColor(templateOptions?.cornersSquareOptions),
    cornersAlt: extractPrimaryColor(templateOptions?.cornersDotOptions)
  };
  
  return colors;
};