import React from 'react';
import { Check } from 'lucide-react';

const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Cart', id: 'cart' },
    { number: 2, label: 'Information', id: 'information' },
    { number: 3, label: 'Confirmation', id: 'confirmation' }
  ];

  const getStepStatus = (stepNumber) => {
    if (stepNumber <= currentStep) return 'completed';
    return 'inactive';
  };

  // Calculate progress line width based on current step
  const getProgressWidth = () => {
    if (currentStep === 1) return '0%';
    if (currentStep === 2) return '50%';
    if (currentStep === 3) return '100%';
    return '0%';
  };

  return (
    <div className="relative mb-12 w-full max-w-2xl mx-auto" data-testid="progress-indicator">
      <div className="relative px-5">
        {/* Background line - constrained within circles */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-zinc-700" style={{ zIndex: 0 }} />
        
        {/* Progress line - only extends to completed steps */}
        <div
          className="absolute top-5 left-5 h-0.5 bg-green-500 transition-all duration-500"
          style={{
            width: currentStep === 3 ? 'calc(100% - 40px)' : currentStep === 2 ? 'calc(50% - 20px)' : '0%',
            zIndex: 1
          }}
          data-testid="progress-line"
        />

        {/* Steps */}
        <div className="relative flex justify-between" style={{ zIndex: 2 }}>
        {steps.map((step, index) => {
          const status = getStepStatus(step.number);
          
          return (
            <div key={step.id} className="flex flex-col items-center" data-testid={`step-${step.id}`}>
              {/* Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-2
                  transition-all duration-300
                  ${status === 'completed' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-zinc-700 text-zinc-400'
                  }
                `}
                data-testid={`step-circle-${step.id}`}
              >
                {status === 'completed' ? <Check className="w-5 h-5" /> : step.number}
              </div>
              
              {/* Label */}
              <span
                className={`
                  text-xs uppercase font-semibold
                  ${status === 'completed' 
                    ? 'text-green-400' 
                    : 'text-zinc-400'
                  }
                `}
                data-testid={`step-label-${step.id}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
