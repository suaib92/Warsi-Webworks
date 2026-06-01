"use client";

import { useState } from 'react';
import { Banknote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SalaryCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<number>(50000);
  const [taxPercentage, setTaxPercentage] = useState<number>(10);
  const [pfPercentage, setPfPercentage] = useState<number>(12);
  const [annualBonus, setAnnualBonus] = useState<number>(50000);

  const calculateSalary = () => {
    const grossAnnual = monthlySalary * 12 + annualBonus;
    
    const monthlyPf = (monthlySalary * pfPercentage) / 100;
    const annualPf = monthlyPf * 12;
    
    // Simplistic tax calculation for demo
    const taxableIncome = grossAnnual - annualPf;
    const annualTax = (taxableIncome * taxPercentage) / 100;
    const monthlyTax = annualTax / 12;

    const netMonthly = monthlySalary - monthlyPf - monthlyTax;
    const netAnnual = netMonthly * 12 + annualBonus; // Assuming bonus is tax-free for simplicity here, though not strictly accurate in real world

    return {
      grossAnnual,
      monthlyPf,
      annualPf,
      monthlyTax,
      annualTax,
      netMonthly,
      netAnnual
    };
  };

  const results = calculateSalary();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Inputs */}
      <div className="lg:col-span-2 space-y-6">
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="monthlySalary">Gross Monthly Salary (₹)</Label>
              <Input 
                id="monthlySalary" 
                type="number" 
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="bg-surface border-border-section"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="annualBonus">Annual Bonus (₹)</Label>
              <Input 
                id="annualBonus" 
                type="number" 
                value={annualBonus}
                onChange={(e) => setAnnualBonus(Number(e.target.value))}
                className="bg-surface border-border-section"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxPercentage">Estimated Tax Bracket (%)</Label>
              <Input 
                id="taxPercentage" 
                type="number" 
                value={taxPercentage}
                onChange={(e) => setTaxPercentage(Number(e.target.value))}
                className="bg-surface border-border-section"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pfPercentage">Provident Fund Deduction (%)</Label>
              <Input 
                id="pfPercentage" 
                type="number" 
                value={pfPercentage}
                onChange={(e) => setPfPercentage(Number(e.target.value))}
                className="bg-surface border-border-section"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Output */}
      <div>
        <div className="bg-surface sticky top-24 border border-border-section rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <Banknote size={20} />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Your Take Home</h3>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-text-muted mb-1">Net Monthly Take Home</p>
            <div className="text-3xl font-black text-emerald-500">
              ₹{Math.round(results.netMonthly).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-text-muted mb-1">Net Annual Take Home (incl. bonus)</p>
            <div className="text-xl font-bold text-text-primary">
              ₹{Math.round(results.netAnnual).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-border-section text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Gross Annual</span>
              <span className="font-medium text-text-primary">₹{Math.round(results.grossAnnual).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Annual PF Deductions</span>
              <span className="font-medium text-red-400">-₹{Math.round(results.annualPf).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Annual Tax Deductions</span>
              <span className="font-medium text-red-400">-₹{Math.round(results.annualTax).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
