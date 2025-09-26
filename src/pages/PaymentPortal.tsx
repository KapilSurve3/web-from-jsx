import React from "react";  
import { motion } from "framer-motion";
import { GradientBG } from "@/components/shared/GradientBG";
import { Navbar } from "@/components/shared/Navbar";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins } from "lucide-react";
import { InfoTile } from "@/components/shared/InfoTile";
import { plans, paymentHistory } from "@/data/mockData";

const PaymentPortal: React.FC = () => {
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
              <InfoTile icon={<CreditCard className="h-4 w-4" />} label="Outstanding" value="$120.00" />
              <InfoTile icon={<Coins className="h-4 w-4" />} label="Credits" value="$30.00" />
              <div className="grid grid-cols-2 gap-2">
                <Button className="rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform">Pay Now</Button>
                <Button variant="secondary" className="rounded-xl border">Apply Referral Code</Button>
              </div>
            </CardContent>
          </Card>

          {/* Plans */}
          <Card className="md:col-span-2 rounded-2xl bg-glass-bg backdrop-blur-sm border-glass-border shadow-card">
            <CardHeader>
              <CardTitle>Payment Plans</CardTitle>
              <CardDescription>Select or manage subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {plans.map((p) => (
                  <motion.div key={p.id} whileHover={{ y: -6 }}>
                    <Card className="rounded-2xl h-full bg-white/60 backdrop-blur-sm shadow-card">
                      <CardHeader>
                        <CardTitle>{p.name}</CardTitle>
                        <CardDescription>{p.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-extrabold">{p.price}</div>
                        <ul className="mt-3 text-sm text-slate-600 space-y-1 list-disc pl-5">
                          {p.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full rounded-xl bg-gradient-hero text-slate-800 hover:scale-105 transition-transform">Choose</Button>
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
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((h) => (
                    <tr key={h.id} className="border-t">
                      <td className="py-2 pr-4">{h.date}</td>
                      <td className="py-2 pr-4">{h.child}</td>
                      <td className="py-2 pr-4">{h.plan}</td>
                      <td className="py-2 pr-4">{h.amount}</td>
                      <td className="py-2 pr-4">
                        <Badge className="rounded-lg" variant={h.status === "Paid" ? "default" : "secondary"}>{h.status}</Badge>
                      </td>
                    </tr>
                  ))}
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