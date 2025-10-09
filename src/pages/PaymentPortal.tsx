import React, { useEffect, useState } from "react";  
import { motion } from "framer-motion";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins, Download } from "lucide-react";
import { InfoTile } from "@/components/shared/InfoTile";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  credits_per_period: number;
  price_cents: number;
  features: string[] | null;
}

interface PaymentRecord {
  id: string;
  payment_date: string;
  credits_purchased: number;
  amount_cents: number;
  status: string;
  invoice_url: string | null;
  children: { full_name: string } | null;
  subscription_plans: { name: string } | null;
}

const PaymentPortal: React.FC = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([]);
  const [credits, setCredits] = useState({ balance: 0, used: 0 });
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubscribe(plan: SubscriptionPlan) {
    setPurchasing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payment_history')
        .insert({
          parent_email: profile.email,
          credits_purchased: plan.credits_per_period,
          amount_cents: plan.price_cents,
          plan_id: plan.id,
          status: 'paid',
        });

      if (paymentError) throw paymentError;

      // Update parent credits
      const { data: existingCredits } = await supabase
        .from('parent_credits')
        .select('credits_balance')
        .eq('parent_email', profile.email)
        .maybeSingle();

      if (existingCredits) {
        const { error: updateError } = await supabase
          .from('parent_credits')
          .update({
            credits_balance: existingCredits.credits_balance + plan.credits_per_period,
          })
          .eq('parent_email', profile.email);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('parent_credits')
          .insert({
            parent_email: profile.email,
            credits_balance: plan.credits_per_period,
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "Success!",
        description: `You have purchased ${plan.credits_per_period} credits for $${(plan.price_cents / 100).toFixed(2)}`,
      });

      await fetchData();
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to process subscription",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  }

  function downloadReceipt(payment: PaymentRecord) {
    // Generate simple text receipt
    const receiptContent = `
RECEIPT
-------
Date: ${new Date(payment.payment_date).toLocaleString()}
Amount: $${(payment.amount_cents / 100).toFixed(2)}
Credits: ${payment.credits_purchased}
Plan: ${payment.subscription_plans?.name || 'N/A'}
Status: ${payment.status.toUpperCase()}
-------
Thank you for your purchase!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function fetchData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (!profile) return;

      // Fetch subscription plans
      const { data: plansData, error: plansError } = await supabase
        .from('subscription_plans')
        .select('*');

      if (plansError) throw plansError;

      // Fetch payment history
      const { data: historyData, error: historyError } = await supabase
        .from('payment_history')
        .select(`
          *,
          children (full_name),
          subscription_plans (name)
        `)
        .eq('parent_email', profile.email)
        .order('payment_date', { ascending: false });

      if (historyError) throw historyError;

      // Fetch credit balance
      const { data: creditsData, error: creditsError } = await supabase
        .from('parent_credits')
        .select('credits_balance, credits_used')
        .eq('parent_email', profile.email)
        .maybeSingle();

      if (creditsError) throw creditsError;

      setPlans(plansData || []);
      setPaymentHistory(historyData || []);
      setCredits({ 
        balance: creditsData?.credits_balance || 0, 
        used: creditsData?.credits_used || 0 
      });
    } catch (error) {
      console.error('Error fetching payment data:', error);
      toast({
        title: "Error",
        description: "Failed to load payment data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <GradientBG>
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <p>Loading...</p>
        </div>
      </GradientBG>
    );
  }

  return (
    <GradientBG>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumb title="Payment Portal" />
        <div className="grid md:grid-cols-3 gap-6">
          {/* Summary Card */}
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Balance & Credits</CardTitle>
              <CardDescription>Track your payments and referral credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoTile icon={<Coins className="h-4 w-4" />} label="Available Credits" value={`${credits.balance} credits`} />
              <InfoTile icon={<CreditCard className="h-4 w-4" />} label="Credits Used" value={`${credits.used} credits`} />
              <div className="text-sm text-slate-600 mt-2">
                1 credit = 1 week of lessons
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <Card className="md:col-span-2 rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Choose a plan to purchase credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((p) => (
                  <motion.div key={p.id} whileHover={{ y: -6 }}>
                    <Card className="rounded-2xl h-full bg-white/60 backdrop-blur-sm shadow-card">
                      <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                        <CardDescription>{p.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-extrabold">{p.credits_per_period} credits</div>
                        <div className="text-lg text-slate-600 mt-2">${(p.price_cents / 100).toFixed(2)}</div>
                        {p.features && p.features.length > 0 && (
                          <ul className="mt-3 text-sm text-slate-600 space-y-1 list-disc pl-5">
                            {p.features.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform"
                          onClick={() => handleSubscribe(p)}
                          disabled={purchasing}
                        >
                          {purchasing ? 'Processing...' : 'Subscribe'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div className="mt-6">
          <Card className="rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Child</th>
                    <th className="py-2 pr-4">Plan</th>
                    <th className="py-2 pr-4">Credits</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-slate-500">No payment history found</td>
                    </tr>
                  ) : (
                    paymentHistory.map((h) => (
                      <tr key={h.id} className="border-t">
                        <td className="py-2 pr-4">{new Date(h.payment_date).toLocaleDateString()}</td>
                        <td className="py-2 pr-4">{h.children?.full_name || 'N/A'}</td>
                        <td className="py-2 pr-4">{h.subscription_plans?.name || 'N/A'}</td>
                        <td className="py-2 pr-4">{h.credits_purchased} credits</td>
                        <td className="py-2 pr-4">${(h.amount_cents / 100).toFixed(2)}</td>
                        <td className="py-2 pr-4">
                          <Badge className="rounded-lg" variant={h.status === "paid" ? "default" : "secondary"}>
                            {h.status}
                          </Badge>
                        </td>
                        <td className="py-2 pr-4">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="rounded-lg"
                            onClick={() => downloadReceipt(h)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </GradientBG>
  );
};

export default PaymentPortal;