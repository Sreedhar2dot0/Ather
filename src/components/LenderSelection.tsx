import React, { useState } from 'react';
import { ChevronLeft, Star, TrendingUp, DollarSign, Clock, FileText, CheckCircle } from 'lucide-react';
import { ApplicationData } from '../App';

interface LenderSelectionProps {
  applicationData: ApplicationData;
  updateApplicationData: (data: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface LenderOffer {
  id: string;
  name: string;
  logo: string;
  maxAmount: number;
  interestRate: number;
  tenure: number;
  processingFee: string;
  emi: number;
  features: string[];
  rating: number;
  specialOffer?: string;
  finalAmount?: number;
  finalEmi?: number;
}

export const LenderSelection: React.FC<LenderSelectionProps> = ({
  applicationData,
  updateApplicationData,
  onNext,
  onBack
}) => {
  const [selectedLender, setSelectedLender] = useState<string | null>(null);
  const [offers, setOffers] = useState<Record<string, LenderOffer>>({});
  const [loadingOffer, setLoadingOffer] = useState<string | null>(null);
  const [bookingAmount, setBookingAmount] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');

  const lenders: LenderOffer[] = [
    {
      id: 'hdfc',
      name: 'HDFC Bank',
      logo: '🏦',
      maxAmount: 150000,
      interestRate: 8.5,
      tenure: 60,
      processingFee: '1%',
      emi: 3041,
      features: ['Quick Approval', 'Zero Foreclosure', 'Digital Process'],
      rating: 4.5,
      specialOffer: '0% Processing Fee for EV Loans'
    },
    {
      id: 'icici',
      name: 'ICICI Bank',
      logo: '🏛️',
      maxAmount: 140000,
      interestRate: 8.75,
      tenure: 60,
      processingFee: '0.5%',
      emi: 2895,
      features: ['Instant Approval', 'Flexible EMI', 'Online Account'],
      rating: 4.3,
      specialOffer: 'Get 0.25% rate reduction on EV loans'
    },
    {
      id: 'bajaj',
      name: 'Bajaj Finserv',
      logo: '💰',
      maxAmount: 135000,
      interestRate: 9.25,
      tenure: 48,
      processingFee: '2%',
      emi: 3421,
      features: ['No Documentation', 'Quick Disbursal', '24x7 Support'],
      rating: 4.2
    },
    {
      id: 'tata',
      name: 'Tata Capital',
      logo: '🚗',
      maxAmount: 125000,
      interestRate: 9.5,
      tenure: 48,
      processingFee: '1.5%',
      emi: 3187,
      features: ['EV Specialist', 'Green Benefits', 'Extended Warranty'],
      rating: 4.1,
      specialOffer: 'Special EV financing with green benefits'
    }
  ];

  const handleApplyWithLender = (lenderId: string) => {
    setLoadingOffer(lenderId);
    
    // Simulate API call to get final offer
    setTimeout(() => {
      const lender = lenders.find(l => l.id === lenderId);
      if (lender) {
        const finalOffer = {
          ...lender,
          finalAmount: lender.maxAmount * 0.9, // 90% of max amount
          finalEmi: lender.emi * 0.95 // 5% discount on EMI
        };
        
        setOffers(prev => ({ ...prev, [lenderId]: finalOffer }));
      }
      setLoadingOffer(null);
    }, 2000);
  };

  const handleSelectLender = (lenderId: string) => {
    setSelectedLender(lenderId);
    const lender = lenders.find(l => l.id === lenderId);
    updateApplicationData({ selectedLender: lender });
  };

  const handleProceed = () => {
    updateApplicationData({ 
      bookingAmount, 
      bookingNumber,
      applicationId: `AL${Date.now().toString().slice(-6)}`
    });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Preferred Lender</h2>
        <p className="text-gray-600">Click "Apply" to get personalized offer from each lender</p>
      </div>

      <div className="space-y-6">
        {lenders.map((lender) => {
          const isLoading = loadingOffer === lender.id;
          const hasOffer = offers[lender.id];
          const isSelected = selectedLender === lender.id;

          return (
            <div key={lender.id} className={`bg-white rounded-xl shadow-lg p-6 transition-all ${isSelected ? 'ring-2 ring-green-500' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{lender.logo}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{lender.name}</h4>
                    <div className="flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(lender.rating) ? 'fill-current' : ''}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({lender.rating})</span>
                    </div>
                  </div>
                </div>
                
                {!hasOffer && !isLoading && (
                  <button
                    onClick={() => handleApplyWithLender(lender.id)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Apply
                  </button>
                )}
              </div>

              {lender.specialOffer && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-orange-800">🎯 {lender.specialOffer}</p>
                </div>
              )}

              {isLoading && (
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="animate-spin w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-3"></div>
                  <p className="font-medium text-blue-800">Generating Your Personalized Offer...</p>
                  <p className="text-sm text-blue-600">This may take a few moments</p>
                </div>
              )}

              {hasOffer && (
                <div className="border-t pt-4">
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <h5 className="font-bold text-green-800 mb-2 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Your Personalized Offer
                    </h5>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">₹{hasOffer.finalAmount?.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Approved Amount</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{hasOffer.interestRate}%</div>
                        <div className="text-sm text-gray-600">Interest Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">₹{hasOffer.finalEmi?.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Monthly EMI</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>Processing Fee: {hasOffer.processingFee} | Tenure: {hasOffer.tenure} months</p>
                    </div>
                    <button
                      onClick={() => handleSelectLender(lender.id)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        isSelected 
                          ? 'bg-green-600 text-white' 
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select This Offer'}
                    </button>
                  </div>
                </div>
              )}

              {!hasOffer && !isLoading && (
                <div className="grid md:grid-cols-4 gap-4 text-center text-sm text-gray-600">
                  <div>
                    <div className="font-semibold">Up to ₹{lender.maxAmount.toLocaleString()}</div>
                    <div>Max Amount</div>
                  </div>
                  <div>
                    <div className="font-semibold">{lender.interestRate}%</div>
                    <div>Interest Rate</div>
                  </div>
                  <div>
                    <div className="font-semibold">₹{lender.emi.toLocaleString()}</div>
                    <div>Est. EMI</div>
                  </div>
                  <div>
                    <div className="font-semibold">{lender.tenure} months</div>
                    <div>Max Tenure</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedLender && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Complete Your Application</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Number (Optional)
              </label>
              <input
                type="text"
                value={bookingNumber}
                onChange={(e) => setBookingNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your Ather booking number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Amount (Optional)
              </label>
              <input
                type="number"
                value={bookingAmount}
                onChange={(e) => setBookingAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Amount paid for booking"
              />
            </div>
          </div>

          <button
            onClick={handleProceed}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300"
          >
            Proceed to Sanction Letter
          </button>
        </div>
      )}
    </div>
  );
};