// frontend/src/components/admin/AIAnalysis.jsx
import React, { useState, useEffect } from 'react';
import { processSubmissionAI, getAIAnalysis } from '../../utils/api';
import { showError } from '../../utils/toast';

const AIAnalysis = ({ submission, onAnalysisComplete }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Check for existing analysis when component mounts
  useEffect(() => {
    const checkExistingAnalysis = async () => {
      try {
        const existingAnalysis = await getAIAnalysis(submission.id);
        setResult(existingAnalysis);
      } catch (err) {
        // No existing analysis is fine, just continue
        console.log('No existing AI analysis found');
      }
    };

    checkExistingAnalysis();
  }, [submission.id]);

// In your AIAnalysis component
const handleAIAnalysis = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const analysis = await processSubmissionAI(submission.id);
    setResult(analysis);
    if (onAnalysisComplete) {
      onAnalysisComplete(analysis);
    }
  } catch (err) {
    let errorMessage = 'Failed to process with AI. Please try again.';
    
    // Handle specific error types
    if (err.message.includes('quota exceeded') || err.message.includes('insufficient_quota')) {
      errorMessage = 'AI service quota exceeded. Please contact the administrator.';
    } else if (err.message.includes('model_not_found')) {
      errorMessage = 'AI model not available. Please contact the administrator.';
    } else if (err.message.includes('service unavailable')) {
      errorMessage = 'AI service is temporarily unavailable. Please try again later.';
    } else if (err.message.includes('timeout')) {
      errorMessage = 'AI analysis timed out. Please try again.';
    }
    
    setError(errorMessage);
    showError(errorMessage);
    console.error('AI Analysis error:', err);
  } finally {
    setLoading(false);
  }
};

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case 'true': return 'text-green-600 bg-green-100';
      case 'false': return 'text-red-600 bg-red-100';
      case 'misleading': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h3 className="text-lg font-medium text-blue-800 mb-2">AI Fact-Checking Assistant</h3>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!result ? (
        <div>
          <p className="text-sm text-blue-700 mb-3">
            Use AI to get a preliminary analysis of this claim. This can help speed up your fact-checking process.
          </p>
          <button
            onClick={handleAIAnalysis}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing with AI...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Analyze with AI
              </>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500">Suggested Verdict</p>
              <p className={`text-lg font-semibold px-2 py-1 rounded inline-block ${getVerdictColor(result.suggested_verdict)}`}>
                {result.suggested_verdict.charAt(0).toUpperCase() + result.suggested_verdict.slice(1)}
              </p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm text-gray-500">Confidence Score</p>
              <div className="flex items-center">
                <p className="text-lg font-semibold mr-2">
                  {(result.confidence_score * 100).toFixed(1)}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${result.confidence_score * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {result.evidence_sources && result.evidence_sources.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Evidence Sources:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {result.evidence_sources.map((source, index) => (
                  <li key={index} className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.similar_claims && result.similar_claims.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Similar Claims:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {result.similar_claims.map((claim, index) => (
                  <li key={index} className="flex">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{claim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            Analyzed with {result.ai_model_used} in {result.processing_time?.toFixed(2) || '0.00'}s
          </div>
          
          <button
            onClick={() => setResult(null)}
            className="text-blue-600 hover:text-blue-800 text-sm mt-2"
          >
            Re-analyze with AI
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;