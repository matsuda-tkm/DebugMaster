import React from 'react';

interface VideoModalProps {
  videoSrc: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoSrc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full mx-4 relative animate-pop-in">
        <div className="aspect-video w-full">
          <iframe
            src={videoSrc}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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

export default VideoModal;
