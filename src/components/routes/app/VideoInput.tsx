import React, { useState } from 'react';
import { Youtube } from 'lucide-react';

interface VideoInputProps {
  onSubmit: (url: string) => void;
}

export function VideoInput({ onSubmit }: VideoInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic YouTube URL validation
    if (!url.includes('youtube.com/') && !url.includes('youtu.be/')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Youtube className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="url"
          className={`block w-full pl-10 pr-24 py-3 text-sm rounded-lg border ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
            'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } bg-white shadow-sm`}
          placeholder="Paste your YouTube video URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Summarize
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}