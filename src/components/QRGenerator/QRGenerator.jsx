import QRGeneratorTemplateEditor from './QRGeneratorTemplateEditor';

const QRGenerator = ({ preSelectedTemplate, templateOptions, onDataChange }) => {
  // If template is provided, use template editor with template
  if (preSelectedTemplate && templateOptions) {
    return (
      <QRGeneratorTemplateEditor
        template={{ id: preSelectedTemplate, options: templateOptions }}
        templateOptions={templateOptions}
        onDataChange={onDataChange}
      />
    );
  }
  
  // Otherwise show default generator
  return (
    <div className="max-w-6xl mx-auto">
      <QRGeneratorTemplateEditor
        template={null}
        templateOptions={null}
        onDataChange={onDataChange}
      />
    </div>
  );
};

export default QRGenerator;