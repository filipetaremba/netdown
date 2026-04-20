"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Link from 'next/link';

const navLinks = [
  {label: "INICIO",href: "#inicio"},
  {label: "COMO FUNCIONA",href: "#como-funciona"},
  {label: "REQUERIMENTOS", href: "#requerimentos"}
  ];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-primary px-10 py-4 shadow-md">

      {/* Linha principal */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link href="/">
          <span className="text-neutral-white font-bold text-xl tracking-widest font-heading">
            NETDOWN
          </span>
        </Link>

        {/* Desktop — Links + Botão */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}
                  className="text-neutral-white/70 text-sm font-medium tracking-wide hover:opacity-75 transition-opacity font-heading"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/gerar-documento">
            <Button label="Gerar Requerimento" variant="primary" />
          </a>
        </div>

        {/* Mobile — Botão Hamburguer */}
        <button
          className="md:hidden text-neutral-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

      </div>

      {/* Mobile — Menu aberto */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}
                  className="text-neutral-white text-sm font-medium tracking-wide hover:opacity-75 transition-opacity font-heading"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
              <a href="/gerar-documento">
                <Button label="Gerar Requerimento" variant="primary" />
              </a>
          </div>
        </div>
      )}

    </nav>
  );
}