import { Suspense } from "react";
import DownloadPage from "@/components/DownloadPage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Suspense>
        <DownloadPage />
      </Suspense>
      <Footer />
    </>
  );
}