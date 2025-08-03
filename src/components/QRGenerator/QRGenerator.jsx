import QRGeneratorAdvanced from './QRGeneratorAdvanced';

const QRGenerator = ({ preSelectedTemplate, templateOptions, onDataChange }) => {
  // If template is provided, use template editor with template
  if (preSelectedTemplate && templateOptions) {
    return (
      <QRGeneratorAdvanced
        template={{ id: preSelectedTemplate, options: templateOptions }}
        templateOptions={templateOptions}
        onDataChange={onDataChange}
        initialData="https://qr-designer.com"
      />
    );
  }
  
  // Otherwise show default generator
  return (
    <div className="max-w-6xl mx-auto">
      <QRGeneratorAdvanced
        template={null}
        templateOptions={null}
        onDataChange={onDataChange}
        initialData="https://qr-designer.com"
      />
    </div>
  );
};

export default QRGenerator;