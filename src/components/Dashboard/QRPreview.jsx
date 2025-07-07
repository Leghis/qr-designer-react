import { useEffect, useRef } from 'react';
import qrService from '../../services/qrService';

const QRPreview = ({ data, type, qrType }) => {
  const qrContainerRef = useRef(null);

  useEffect(() => {
    if (!qrContainerRef.current || !data) return;

    // Clear existing QR code
    qrContainerRef.current.innerHTML = '';

    // Generate QR code
    const qrCode = qrService.generateQRCode({
      data: data,
      dotsOptions: {
        color: '#3b82f6',
        type: 'rounded'
      },
      cornersSquareOptions: {
        color: '#764ba2',
        type: 'extra-rounded'
      },
      backgroundOptions: {
        color: '#ffffff'
      }
    });

    qrCode.append(qrContainerRef.current);
  }, [data]);

  return (
    <div className="space-y-4">
      {/* QR Code Display */}
      <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-8 flex items-center justify-center">
        <div ref={qrContainerRef} className="w-full max-w-[200px]">
          {!data && (
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
                Remplissez le formulaire pour voir l'aperçu
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Type Info */}
      {qrType && (
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${qrType.color}`}>
            <span className="text-2xl">{qrType.icon}</span>
            <span className="text-white font-medium">{qrType.name}</span>
          </div>
        </div>
      )}

      {/* Data Preview */}
      {data && (
        <div className="bg-gray-100 dark:bg-dark-800 rounded-lg p-3">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Données du QR Code :
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200 break-all line-clamp-3">
            {data}
          </p>
        </div>
      )}
    </div>
  );
};

export default QRPreview;