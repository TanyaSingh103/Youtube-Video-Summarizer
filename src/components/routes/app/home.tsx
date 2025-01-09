import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'; // Import Apollo Client hooks
import { VideoInput } from './VideoInput';
import { Summary } from './Summary';
import { Youtube } from 'lucide-react';

// Define the GraphQL mutation for the Hasura action
const GENERATE_SUMMARY = gql`
  mutation GenerateSummary($videoUrl: String!) {
    generateSummary(videoUrl: $videoUrl)
  }
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string>('');

  // Apollo Client mutation hook
  const [generateSummary] = useMutation(GENERATE_SUMMARY);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setSummary('');
  
    try {
      const { data } = await generateSummary({
        variables: { videoUrl: url },
      });
  
      // Set the summary from the API response
      setSummary(data.generateSummary || 'No summary available.');
    } catch (error) {
      console.error('Error:', error);
      setSummary('Error: Unable to summarize the video. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Youtube className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            YouTube Video Summarizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get quick, AI-generated summaries of any YouTube video. Just paste the URL below.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <VideoInput onSubmit={handleSubmit} />
          <Summary isLoading={isLoading} summary={summary} />
        </div>
      </div>
    </div>
  );
}
