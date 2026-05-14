import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { plans, PlanSlug } from "@/data/plans";

interface CheckoutPageProps {
  params: Promise<{ plan: string }>;
}

export async function generateStaticParams() {
  return [{ plan: "calm" }, { plan: "fit" }, { plan: "daily" }];
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { plan: planSlug } = await params;
  const plan = plans[planSlug as PlanSlug];
  if (!plan) notFound();

  return (
    <>
      <Header />
      <main className="bg-paper min-h-screen py-16">
        <CheckoutForm plan={plan} />
      </main>
      <Footer />
    </>
  );
}
