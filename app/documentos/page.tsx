import { Suspense } from "react";
import DocumentosClient from "./DocumentosClient";

export default function GerarDocumentoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DocumentosClient />
    </Suspense>
  );
}
