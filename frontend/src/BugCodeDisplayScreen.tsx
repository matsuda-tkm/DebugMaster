import React, { useEffect, useState } from 'react';
import { Bug, Code2 } from 'lucide-react';
import { Challenge } from './challengesData';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentUnit } from '@codemirror/language';

interface BugCodeDisplayScreenProps {
  challenge: Challenge;
  generatedCode: string;
  isGenerating: boolean;
  generationError: string;
  onFixBug: () => void;
  onGenerateCode: () => void;
}

const BugCodeDisplayScreen: React.FC<BugCodeDisplayScreenProps> = ({ 
  challenge, 
  generatedCode, 
  isGenerating, 
  generationError,
  onFixBug,
  onGenerateCode
}) => {
  
  useEffect(() => {
    if (!generatedCode && !isGenerating) {
      onGenerateCode();
    }
  }, [generatedCode, isGenerating, onGenerateCode]);

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
            {challenge.title}
          </div>
        </div>
      </header>

      {/* メインエリア */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {/* キャラクターイラスト（小さめ） */}
            <div className="w-20 h-20 flex-shrink-0">
              <img 
                src="/images/character.png" 
                alt="Debug Master Character" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* 指示テキスト */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-indigo-800 mb-1">バグを見つけよう！</h2>
              <p className="text-slate-700">
                このコードには問題があるよ！どこがおかしいか見つけられるかな？
              </p>
            </div>
          </div>
        </div>
        
        {/* コード表示エリア（読み取り専用） */}
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-slate-400" />
              <span className="text-slate-200">main.py</span>
            </div>
          </div>
          
          {isGenerating ? (
            <div className="h-96 bg-slate-900 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-300">コードを準備中...</p>
              </div>
            </div>
          ) : generationError ? (
            <div className="h-96 bg-slate-900 flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-red-400 mb-4">⚠️ コードの生成に失敗しました</p>
                <button
                  onClick={onGenerateCode}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  もう一度試す
                </button>
              </div>
            </div>
          ) : (
            <div className="h-96 bg-slate-900 overflow-auto">
              <CodeMirror
                value={generatedCode}
                height="100%"
                extensions={[python(), oneDark, indentUnit.of('    ')]}
                editable={false}
                className="w-full h-full font-mono text-sm bg-transparent text-slate-200"
              />
            </div>
          )}
        </div>
        
        {/* フッター：「バグを修正する」ボタン */}
        <div className="mt-8">
          <button
            onClick={onFixBug}
            disabled={!generatedCode || isGenerating}
            className={`px-8 py-3 rounded-lg flex items-center gap-2 text-lg font-medium ${
              !generatedCode || isGenerating
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 transition animate-pulse'
            }`}
          >
            バグを修正する
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugCodeDisplayScreen;
