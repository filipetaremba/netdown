import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import GerarDocumentoForm from "@/components/GerarDocumentoForm";

export default function GerarDocumentoPage() {
  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-primary font-heading">A carregar...</div>}>
        <GerarDocumentoForm />
      </Suspense>
    </main>
  );
}