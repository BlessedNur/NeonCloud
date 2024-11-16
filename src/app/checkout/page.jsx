"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Calendar,
  Package,
  Info,
  Lock,
} from "lucide-react";


const PaymentMethodCard = ({ selected, title, type, last4, expires, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      selected
        ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
        : "border-white/10 hover:border-white/20 bg-white/5"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center">
        <CreditCard
          className={selected ? "text-[rgba(207,8,140,1)]" : "text-white"}
          size={24}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          {selected && (
            <CheckCircle className="text-[rgba(207,8,140,1)]" size={20} />
          )}
        </div>
        <div className="text-sm text-gray-400">
          {type} •••• {last4} | Expires {expires}
        </div>
      </div>
    </div>
  </div>
);

const PlanFeature = ({ included }) => (
  <div className="flex items-center gap-2">
    <CheckCircle
      size={16}
      className={included ? "text-green-500" : "text-gray-500"}
    />
    <span className={included ? "text-white" : "text-gray-500"}>
      {included ? "Included" : "Not included"}
    </span>
  </div>
);

function Page() {
  const [selectedPayment, setSelectedPayment] = useState("existing");
  const [billingCycle, setBillingCycle] = useState("annual");

  // Mock data for the selected plan
  const selectedPlan = {
    name: "Professional Plan",
    price: billingCycle === "annual" ? 299.88 : 29.99,
    cycle: billingCycle === "annual" ? "year" : "month",
    features: [
      "Unlimited Projects",
      "Priority Support",
      "Custom Domain",
      "Analytics Dashboard",
      "Team Collaboration",
    ],
  };

  // Calculate pricing
  const subtotal = selectedPlan.price;
  const discount = billingCycle === "annual" ? 59.99 : 0;
  const tax = (subtotal - discount) * 0.1; // 10% tax
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-black text-white">
<Navbar/>
      <header className="border-b border-white/10">
        <div className="max-w-[1270px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[rgba(207,8,140,1)] via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Checkout
            </h1>
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-[rgba(207,8,140,1)]" />
              <span className="text-sm text-gray-400">Secure Checkout</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-[1270px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            <div className="space-y-8">
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Selected Plan</h2>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {selectedPlan.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Package size={16} />
                        <span>Professional features included</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        ${selectedPlan.price}
                      </div>
                      <div className="text-sm text-gray-400">
                        per {selectedPlan.cycle}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm font-medium">Billing Cycle</div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`p-4 rounded-lg border transition-all ${
                          billingCycle === "monthly"
                            ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="font-medium mb-1">Monthly</div>
                        <div className="text-sm text-gray-400">
                          $29.99/month
                        </div>
                      </button>
                      <button
                        onClick={() => setBillingCycle("annual")}
                        className={`p-4 rounded-lg border transition-all relative overflow-hidden ${
                          billingCycle === "annual"
                            ? "border-[rgba(207,8,140,1)] bg-[rgba(207,8,140,0.1)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        {billingCycle === "annual" && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle
                              className="text-[rgba(207,8,140,1)]"
                              size={16}
                            />
                          </div>
                        )}
                        <div className="font-medium mb-1">Annual</div>
                        <div className="text-sm text-gray-400">
                          $299.88/year
                        </div>
                        <div className="text-xs text-[rgba(207,8,140,1)] mt-1">
                          Save 20%
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <div className="space-y-4">
                  <PaymentMethodCard
                    selected={selectedPayment === "existing"}
                    title="Current Card"
                    type="Visa"
                    last4="4242"
                    expires="12/24"
                    onClick={() => setSelectedPayment("existing")}
                  />
                  <PaymentMethodCard
                    selected={selectedPayment === "new"}
                    title="Add New Card"
                    type="Credit Card"
                    last4=""
                    expires=""
                    onClick={() => setSelectedPayment("new")}
                  />
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Billing Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[rgba(207,8,140,1)]"
                    />
                  </div>
                </div>
              </section>
            </div>

            <div>
              <div className="sticky top-8 space-y-6">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-[rgba(207,8,140,1)]">
                        <span>Annual Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        per {selectedPlan.cycle}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 px-4 bg-[rgba(207,8,140,1)] text-white rounded-lg mt-6 hover:bg-[rgba(207,8,140,0.8)] transition-colors">
                    Complete Purchase
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-400">
                    <Shield size={16} />
                    <span>Secure payment processing</span>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-semibold mb-4">Included Features</h3>
                  <ul className="space-y-3">
                    {selectedPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[rgba(207,8,140,1)]"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-sm text-gray-400 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Info size={16} />
                    <span>Need help? Contact our support team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ParticlesContent/>
    </div>
  );
}

export default Page;