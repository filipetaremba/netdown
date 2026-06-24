import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import DownloadPage from "@/components/DownloadUI";

export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-primary font-heading">A carregar...</div>}>
        <DownloadPage />
      </Suspense>
    </main>
  );
}