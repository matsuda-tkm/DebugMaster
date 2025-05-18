import React from 'react';
import { Bug, Code2, Terminal, PlayCircle, XCircle, CheckCircle } from 'lucide-react';
import { Challenge } from './challengesData';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentUnit } from '@codemirror/language';

interface CodeFixingScreenProps {
  challenge: Challenge;
  code: string;
  setCode: (code: string) => void;
  testResults: any[];
  isRunning: boolean;
  handleRunCode: () => void;
  handleSubmitSolution: () => void;
  handleShowHint: () => void;
  isLoadingHint: boolean;
  hintError: string;
}

const CodeFixingScreen: React.FC<CodeFixingScreenProps> = ({
  challenge,
  code,
  setCode,
  testResults,
  isRunning,
  handleRunCode,
  handleSubmitSolution,
  handleShowHint,
  isLoadingHint,
  hintError
}) => {
  
  const getPassingTestsCount = () => {
    return testResults.filter((result) => result.status === 'success').length;
  };
  
  const allTestsPassed = testResults.length > 0 && getPassingTestsCount() === testResults.length;
  
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
            バグ修正チャレンジ
          </div>
        </div>
      </header>

      {/* メインエリア */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* 左エリア：コードエディタ */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-slate-400" />
              <span className="text-slate-200">main.py</span>
            </div>
          </div>
          <div className="h-[calc(100vh-200px)] bg-slate-900 overflow-auto">
            <CodeMirror
              value={code}
              height="100%"
              extensions={[python(), oneDark, indentUnit.of('    ')]}
              onChange={(value) => setCode(value)}
              className="w-full h-full font-mono text-sm bg-transparent text-slate-200"
            />
          </div>
        </div>
        
        {/* 右エリア：テスト実行結果 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-slate-400" />
              <span className="text-slate-200">テスト結果</span>
            </div>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className={`flex items-center gap-2 px-3 py-1 rounded ${
                isRunning
                  ? 'bg-slate-700 text-slate-400'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } text-sm transition`}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                  実行中...
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  テスト実行
                </>
              )}
            </button>
          </div>
          <div className="h-[calc(100vh-200px)] bg-slate-50 overflow-auto p-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg ${
                  result.status === 'success' ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.status === 'success' ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div
                      className={`font-medium text-lg ${
                        result.status === 'success'
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}
                    >
                      テストケース {result.testCase}
                    </div>
                    
                    {/* 入力と出力の視覚的表示 */}
                    <div className="mt-2 text-sm">
                      <div className="mb-2">
                        <span className="font-medium text-slate-700">入力:</span>
                        <div className="bg-white p-2 rounded border border-slate-200 mt-1">
                          {JSON.stringify(result.input || [])}
                        </div>
                      </div>
                      
                      {result.status === 'success' ? (
                        <div className="mb-2">
                          <span className="font-medium text-green-700">出力 (正解!):</span>
                          <div className="bg-white p-2 rounded border border-green-200 mt-1">
                            {JSON.stringify(result.actual)}
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <span className="font-medium text-slate-700">期待される出力:</span>
                            <div className="bg-white p-2 rounded border border-slate-200 mt-1">
                              {JSON.stringify(result.expected)}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium text-red-700">実際の出力:</span>
                            <div className="bg-white p-2 rounded border border-red-200 mt-1">
                              {JSON.stringify(result.actual)}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {result.status !== 'success' && (
                        <div className="text-red-600 mt-2">
                          {result.status === 'forbidden'
                            ? 'APIキーを抜き取ろうとするコードは許可されていません！'
                            : result.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {testResults.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-indigo-50 p-6 rounded-lg max-w-md">
                  <Terminal className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-indigo-800 mb-2">テスト結果がここに表示されます</h3>
                  <p className="text-slate-600">
                    コードが正しいかを確認するには「テスト実行」ボタンをクリックしてください。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* フッター */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* 左側：ヒントキャラクター */}
          <div className="relative">
            <img 
              src="/images/character.png" 
              alt="ヒントキャラクター" 
              className="w-16 h-16 object-cover cursor-pointer hover:opacity-80 transition"
              onClick={handleShowHint}
              style={{pointerEvents: isLoadingHint ? 'none' : 'auto' }}
            />
            {isLoadingHint && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {hintError && (
              <div className="absolute top-full left-0 mt-1 text-red-600 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                {hintError}
              </div>
            )}
          </div>
          
          {/* 右側：テスト状況と提出ボタン */}
          <div className="flex items-center gap-4">
            {testResults.length > 0 && (
              <div className="text-sm font-medium">
                <span className={allTestsPassed ? 'text-green-600' : 'text-slate-600'}>
                  {getPassingTestsCount()}/{testResults.length} テスト成功
                </span>
              </div>
            )}
            
            <button
              onClick={handleSubmitSolution}
              disabled={!allTestsPassed}
              className={`px-6 py-2 rounded-lg ${
                !allTestsPassed
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700 transition animate-pulse'
              }`}
            >
              解答を提出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFixingScreen;
