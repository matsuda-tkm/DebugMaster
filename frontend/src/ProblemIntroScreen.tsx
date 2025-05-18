import React from 'react';
import { Bug } from 'lucide-react';
import { Challenge } from './challengesData';

interface ProblemIntroScreenProps {
  challenge: Challenge;
  onAcceptMission: () => void;
}

const ProblemIntroScreen: React.FC<ProblemIntroScreenProps> = ({ challenge, onAcceptMission }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ヘッダー */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bug className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-slate-800">Debug Master</span>
          </div>
          <div className="text-sm font-medium text-slate-600">
            ミッション #{challenge.id}
          </div>
        </div>
      </header>

      {/* メインエリア */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* キャラクターイラスト */}
            <div className="w-40 h-40 flex-shrink-0">
              <img 
                src="/images/character.png" 
                alt="Debug Master Character" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* 吹き出し形式の問題文 */}
            <div className="flex-1 bg-indigo-50 rounded-2xl p-5 relative">
              {/* 吹き出しの尻尾 */}
              <div className="absolute top-1/2 left-0 w-4 h-4 bg-indigo-50 transform translate-y-[-50%] translate-x-[-50%] rotate-45 hidden md:block"></div>
              
              <h2 className="text-xl font-bold text-indigo-800 mb-3">ミッション：{challenge.title}</h2>
              <div className="text-slate-700 whitespace-pre-wrap mb-4">
                {challenge.instructions}
              </div>
            </div>
          </div>
          
          {/* フッター：「ミッションを受ける」ボタン */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={onAcceptMission}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-lg font-medium animate-pulse"
            >
              ミッションを受ける
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemIntroScreen;
