import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../app/components/ui/button';
import { Card } from '../../app/components/ui/card';
import { Input } from '../../app/components/ui/input';
import { Label } from '../../app/components/ui/label';
import { Separator } from '../../app/components/ui/separator';
import { CreditCard, Lock, ShieldCheck, Truck } from 'lucide-react';
import { LoadingSpinner } from '../../app/components/Loading';
import { toast } from 'sonner';

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const kit = location.state?.kit;
  const [processing, setProcessing] = useState(false);

  if (!kit) {
    navigate('/subscriptions');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success('Subscription confirmed!', {
        description: 'Your first kit will ship within 2-3 business days.',
      });
      navigate('/confirmation', { state: { kit } });
    }, 1500);
  };

  return (
    <div className="flex-1 bg-neutral-50 py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl mb-3 tracking-tight">Secure Checkout</h1>
            <p className="text-neutral-600">Complete your subscription in just a few steps</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 md:p-10 border-neutral-100">
                <h2 className="text-xl mb-6 tracking-tight">Shipping Information</h2>
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        required 
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        required 
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="mt-2 h-11 border-neutral-300 focus:border-neutral-900"
                      placeholder="you@example.com" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input 
                      id="address" 
                      required 
                      className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        required 
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="province">Province</Label>
                      <Input 
                        id="province" 
                        required 
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="postal">Postal Code</Label>
                      <Input 
                        id="postal" 
                        required 
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900" 
                      />
                    </div>
                  </div>
                </form>
              </Card>

              <Card className="p-8 md:p-10 border-neutral-100">
                <h2 className="text-xl mb-6 tracking-tight">Payment Information</h2>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative mt-2">
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="h-11 border-neutral-300 focus:border-neutral-900 pl-10"
                      />
                      <CreditCard className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM / YY"
                        required
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        className="mt-2 h-11 border-neutral-300 focus:border-neutral-900"
                      />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg">
                    <Lock className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Your payment information is encrypted and secure. We never store your full card details.
                    </p>
                  </div>
                </form>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-8 border-neutral-100 sticky top-24">
                <h3 className="text-lg font-semibold mb-6 tracking-tight">Order Summary</h3>
                
                <div className="space-y-4 mb-6 pb-6 border-b border-neutral-100">
                  <div>
                    <p className="font-medium mb-1">{kit.name}</p>
                    <p className="text-sm text-neutral-600">{kit.tier} Tier</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Monthly subscription</span>
                    <span className="font-medium">${kit.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-neutral-600">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-semibold">Total Today</span>
                  <div className="text-right">
                    <p className="text-2xl font-semibold">${kit.price}</p>
                    <p className="text-xs text-neutral-600">CAD per month</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={processing}
                  className="w-full h-12 bg-neutral-900 hover:bg-neutral-800 mb-4"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Complete Subscription'
                  )}
                </Button>

                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Secure SSL encrypted payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping across Canada</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <Lock className="w-4 h-4" />
                    <span>Cancel anytime, no commitments</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}