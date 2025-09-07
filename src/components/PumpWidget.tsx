import React from 'react';

const PumpWidget: React.FC = () => {
  return (
    <section id="dex" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">Live $EGG Market Chart</h2>
        
        <div className="w-full">
          <iframe
            src="https://pump.fun/Gr1PWUXKBvEWN3d67d3FxvBmawjCtA5HWqfnJxSgDz1F"
            frameBorder="0"
            className="w-full rounded-xl shadow-lg"
            style={{
              height: '600px',        // Desktop height
              minHeight: '400px',     // Mobile minimum
            }}
            allowFullScreen
            title="DEX Screener $EGG"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default PumpWidget;