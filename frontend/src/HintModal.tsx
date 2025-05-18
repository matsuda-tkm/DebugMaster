import React from 'react';

interface HintModalProps {
  hint: string;
  onClose: () => void;
}

const HintModal: React.FC<HintModalProps> = ({ hint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full mx-4 relative animate-pop-in">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2">ヒント</h3>
          <div className="prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: hint }} />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm font-medium"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintModal;
