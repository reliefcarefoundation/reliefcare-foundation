import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DonateSection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: 'checking'
  });

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setAmount(numValue);
    }
  };

  const handleNext = () => {
    if (step === 1 && amount && amount > 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep2 = () => {
    const required = ['fullName', 'email', 'address1', 'city', 'state', 'zipCode'];
    const allFilled = required.every(field => formData[field as keyof typeof formData]);

    if (paymentMethod === 'card') {
      return allFilled && formData.cardNumber && formData.cardholderName && formData.expirationDate && formData.cvv;
    } else {
      return allFilled && formData.bankName && formData.routingNumber && formData.accountNumber;
    }
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleReturnHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <section id="donate-section" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-[#00529b] mb-12">
          Your Donation Saves Lives
        </h2>

        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select Amount</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                {presetAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleAmountSelect(value)}
                    className={`py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                      amount === value && !customAmount
                        ? 'bg-[#00529b] text-white'
                        : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-600 text-lg">$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none text-lg"
                  />
                </div>
              </div>
            </div>

            {amount && amount > 0 && (
              <button
                onClick={handleNext}
                className="w-full bg-[#00529b] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Your Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Address Line 1 *"
              value={formData.address1}
              onChange={(e) => handleInputChange('address1', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
            />

            <input
              type="text"
              placeholder="Address Line 2"
              value={formData.address2}
              onChange={(e) => handleInputChange('address2', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City *"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
              />
              <input
                type="text"
                placeholder="State *"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
              />
              <input
                type="text"
                placeholder="ZIP Code *"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
            />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#00529b] text-white'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    paymentMethod === 'bank'
                      ? 'bg-[#00529b] text-white'
                      : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
                >
                  Bank Transfer / ACH
                </button>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expirationDate}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Bank Name"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Routing Number"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                />
                <select
                  value={formData.accountType}
                  onChange={(e) => handleInputChange('accountType', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00529b] focus:outline-none"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            )}

            <p className="text-sm text-slate-600 italic">
              Your payment information is not stored or processed. Donations are completed via our secure GoFundMe campaign.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-200 text-slate-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!validateStep2()}
                className="flex-1 bg-[#00529b] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#003d75] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Review Donation
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-3xl font-bold text-[#00529b]">
              Thank You, {formData.fullName}!
            </h3>

            <p className="text-lg text-slate-700">
              Your donation of <span className="font-bold text-[#f58220]">${amount}</span> has been received.
              A confirmation has been sent to <span className="font-medium">{formData.email}</span>.
            </p>

            <p className="text-slate-600">
              We are grateful for your support in fighting diabetes in our community. Your contribution will help fund essential diabetes supplies, medication, and education programs for patients in need.
            </p>

            <button
              onClick={handleReturnHome}
              className="bg-[#00529b] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#003d75] transition-colors"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
