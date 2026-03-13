import React from 'react';
import Icon from '../../components/ui/AppIcon';

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-coral-400 opacity-20">404</h1>
        <h2 className="text-2xl font-medium text-enterprise-mid mb-2">Page Not Found</h2>
        <p className="text-enterprise-grey mb-8">
          The page you're looking for doesn't exist. Let's get you back!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 bg-coral-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-500 transition-colors duration-200"
          >
            <Icon name="ArrowLeftIcon" size={16} />
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-enterprise-mid px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <Icon name="HomeIcon" size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}