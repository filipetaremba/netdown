"use client";

import { useState } from "react";
import Button from "./Button";
import ContactInput from "./ContactInput";
import ContactTextarea from "./ContactTextarea";

export default function Contact() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <section className="w-full py-24 px-6 md:px-20 flex flex-col items-center bg-neutral-light">

      {/* Label topo */}
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-primary mb-3">
        <span className="w-5 h-[2px] bg-primary"></span>
        Contactos
      </div>

      {/* Cabeçalho */}
      <h2 className="text-primary font-bold text-3xl md:text-4xl tracking-wide text-center mb-4 font-heading">
        Fala Connosco
      </h2>
      <p className="text-neutral-dark/60 text-sm md:text-base text-center max-w-4xl mb-14 font-sans leading-relaxed">
        Se tiver alguma dúvida, sugestão ou encontrar algum problema, entre em contacto. Estamos disponíveis para apoiar e melhorar continuamente a experiência da NetDown.
      </p>

      {/* Formulário */}
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <ContactInput label="Nome" name="nome" value={form.nome} onChange={handleChange} />
        <ContactInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <ContactTextarea label="Mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} />
        <Button label="ENVIAR MENSAGEM" variant="primary" onClick={handleSubmit} />
      </div>

    </section>
  );
}