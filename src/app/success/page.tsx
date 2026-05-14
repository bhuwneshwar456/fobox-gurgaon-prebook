import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SuccessContent } from "@/components/SuccessContent";

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="bg-paper min-h-screen">
        <Suspense fallback={<div className="py-32 text-center text-ink-3">Loading...</div>}>
          <SuccessContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
