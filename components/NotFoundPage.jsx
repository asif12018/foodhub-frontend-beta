import Link from 'next/link';
import React from 'react';

function NotFoundPage() {

  return (
    <div className="flex flex-col items-center justify-center p-2 overflow-hidden bg-white">
      <div className="w-full max-w-md p-2">
        {/* 404 Number */}
        <h1 className="text-7xl font-bold text-black text-center leading-none">404</h1>
        
        {/* 404 Illustration */}
        <div className="w-full h-100 my-4 relative">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>
        
        {/* Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <button
            className="w-full bg-black hover:bg-black text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            <Link href="/">Go Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;