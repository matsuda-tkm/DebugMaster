import React from 'react';
import { ChevronRight, PartyPopper, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Challenge } from './challengesData';
import { DownloadFeedbackQR } from './DownloadFeedbackQR';

interface CelebrationScreenProps {
  challenge: Challenge;
  userAnswer: string;
  explanation: string;
  onClose: () => void;
}

const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  challenge,
  userAnswer,
  explanation,
  onClose
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative overflow-hidden">
        {/* 上部装飾 */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-bounce" />
            <PartyPopper
              className="w-12 h-12 text-pink-500 absolute top-0 left-0 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="text-center mt-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">すごい！バグを修正できたね！</h2>

          {/* バグの解説 */}
          {explanation && (
            <div className="mt-6 bg-slate-50 p-6 rounded-lg text-left">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">バグの説明:</h3>
              <div className="text-slate-700 whitespace-pre-wrap">
                {explanation}
              </div>
            </div>
          )}

          {/* ボタン */}
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => navigate('/')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-medium"
            >
              次のチャレンジへ
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-800 transition"
            >
              もう一度挑戦
            </button>
          </div>
        </div>

        {/* 認定証セクション */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Debug Master認定証をゲット！</h3>
              <p className="text-white/80 text-sm">
                QRコードをスキャンして、あなたの成果を共有しよう！
              </p>
            </div>
            <DownloadFeedbackQR challenge={challenge} userAnswer={userAnswer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationScreen;
