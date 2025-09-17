import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { OTPVerification } from './components/OTPVerification';
import { PersonalDetails } from './components/PersonalDetails';
import { IncomeDetails } from './components/IncomeDetails';
import { EligibilityResults } from './components/EligibilityResults';
import { DocumentVerification } from './components/DocumentVerification';
import { LenderSelection } from './components/LenderSelection';
import { ApplicationStatus } from './components/ApplicationStatus';
import { ProgressBar } from './components/ProgressBar';
import { Navbar } from './components/Navbar';

export interface ApplicationData {
  fullName: string;
  mobileNumber: string;
  employmentType: string;
  panNumber: string;
  dob: string;
  residencePincode: string;
  monthlyIncome: string;
  workPincode: string;
  existingEmi: string;
  residenceAddress?: string;
  officeAddress?: string;
  aadhaarNumber?: string;
  selectedLender?: any;
  bookingNumber?: string;
  bookingAmount?: string;
  applicationId?: string;
}

const STEPS = [
  'Apply',
  'Verify',
  'Personal',
  'Income',
  'Eligibility',
  'Documents',
  'Lenders',
  'Status'
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    fullName: '',
    mobileNumber: '',
    employmentType: '',
    panNumber: '',
    dob: '',
    residencePincode: '',
    monthlyIncome: '',
    workPincode: '',
    existingEmi: ''
  });

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <LandingPage 
            onApplyNew={() => {
              setIsReturningCustomer(false);
              nextStep();
            }}
            onContinueApplication={() => {
              setIsReturningCustomer(true);
              nextStep();
            }}
          />
        );
      case 1:
        return (
          <OTPVerification 
            isReturningCustomer={isReturningCustomer}
            applicationData={applicationData}
            updateApplicationData={updateApplicationData}
            onVerified={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <PersonalDetails 
            applicationData={applicationData}
            updateApplicationData={updateApplicationData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <IncomeDetails 
            applicationData={applicationData}
            updateApplicationData={updateApplicationData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <EligibilityResults 
            applicationData={applicationData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <DocumentVerification 
            applicationData={applicationData}
            updateApplicationData={updateApplicationData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <LenderSelection 
            applicationData={applicationData}
            updateApplicationData={updateApplicationData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 7:
        return (
          <ApplicationStatus 
            applicationData={applicationData}
            onBack={() => setCurrentStep(0)}
          />
        );
      default:
        return null;
    }
  };

  const showProgressBar = currentStep > 0 && currentStep < STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {showProgressBar && (
        <ProgressBar currentStep={currentStep - 1} totalSteps={STEPS.length - 2} />
      )}
      <div className="container mx-auto px-4 py-4">
        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default App;