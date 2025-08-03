// Helper functions to convert between simple and advanced QR options

export const convertSimpleToAdvanced = (simpleOptions) => {
  return {
    dotsOptions: {
      color: simpleOptions.dotsColor || '#000000',
      type: simpleOptions.dotsType || 'square',
      gradientType: 'solid'
    },
    backgroundOptions: {
      color: simpleOptions.bgColor || '#ffffff',
      gradientType: 'solid'
    },
    cornersSquareOptions: {
      color: simpleOptions.cornersColor || '#000000',
      type: simpleOptions.cornersType || 'square',
      gradientType: 'solid'
    },
    cornersDotOptions: {
      color: simpleOptions.cornersColor || '#000000',
      type: simpleOptions.cornersType || 'square',
      gradientType: 'solid'
    },
    margin: simpleOptions.margin || 20,
    qrOptions: {
      errorCorrectionLevel: simpleOptions.errorCorrectionLevel || 'H'
    }
  };
};

export const convertAdvancedToSimple = (advancedOptions) => {
  return {
    dotsColor: advancedOptions.dotsOptions?.color || '#000000',
    dotsType: advancedOptions.dotsOptions?.type || 'square',
    bgColor: advancedOptions.backgroundOptions?.color || '#ffffff',
    cornersColor: advancedOptions.cornersSquareOptions?.color || '#000000',
    cornersType: advancedOptions.cornersSquareOptions?.type || 'square',
    margin: advancedOptions.margin || 20,
    errorCorrectionLevel: advancedOptions.qrOptions?.errorCorrectionLevel || 'H'
  };
};

// Merge template options with current options
export const mergeTemplateOptions = (currentOptions, templateOptions) => {
  const merged = {
    ...currentOptions,
    ...templateOptions
  };

  // Ensure all sections exist
  ['dotsOptions', 'backgroundOptions', 'cornersSquareOptions', 'cornersDotOptions'].forEach(section => {
    if (!merged[section]) {
      merged[section] = {};
    }
  });

  return merged;
};