"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Question = {
  cle: string;
  titre: string;
  aide: string;
  options: { label: string; valeur: string }[];
};

const QUESTIONS: Question[] = [
  {
    cle: "montant",
    titre: "Quel est le montant moyen d'une de tes factures ?",
    aide: "On s'en sert pour chiffrer ce que te coûte un règlement qui traîne.",
    options: [
      { label: "Moins de 500 €", valeur: "300" },
      { label: "De 500 à 2 000 €", valeur: "1200" },
      { label: "De 2 000 à 5 000 €", valeur: "3500" },
      { label: "Plus de 5 000 €", valeur: "8000" },
    ],
  },
  {
    cle: "delai",
    titre: "Combien de temps après la fin du chantier ta facture part-elle ?",
    aide: "Chaque jour de retard, c'est un jour de plus sans ton argent.",
    options: [
      { label: "Le jour même", valeur: "0" },
      { label: "Dans la semaine", valeur: "5" },
      { label: "Deux à trois semaines après", valeur: "18" },
      { label: "Plus d'un mois après", valeur: "40" },
    ],
  },
  {
    cle: "acompte",
    titre: "Demandes-tu un acompte avant de commencer ?",
    aide: "Sans acompte, tu avances les matériaux avec ta propre trésorerie.",
    options: [
      { label: "Toujours", valeur: "toujours" },
      { label: "Parfois", valeur: "parfois" },
      { label: "Rarement", valeur: "rarement" },
      { label: "Jamais", valeur: "jamais" },
    ],
  },
];

export default function Quiz() {
  const router = useRouter();
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Record<string, string>>({});

  const question = QUESTIONS[etape];
  const progression = Math.round(((etape + 1) / QUESTIONS.length) * 100);

  function choisir(valeur: string) {
    const suite = { ...reponses, [question.cle]: valeur };
    setReponses(suite);
    if (etape < QUESTIONS.length - 1) {
      setEtape(etape + 1);
    } else {
      router.push(`/resultat?${new URLSearchParams(suite).toString()}`);
    }
  }

  return (
    <main
      key={question.cle}
      className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pb-10 pt-4"
    >
      {etape > 0 ? (
        <button
          type="button"
          onClick={() => setEtape(etape - 1)}
          className="self-start py-3 pr-4 text-base font-semibold text-encre underline underline-offset-4"
        >
          ← Retour
        </button>
      ) : (
        <Link
          href="/"
          className="self-start py-3 pr-4 text-base font-semibold text-encre underline underline-offset-4"
        >
          ← Accueil
        </Link>
      )}

      <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-encre">
        Question {etape + 1} sur {QUESTIONS.length}
      </p>
      <div
        className="mt-2 h-3 w-full border-2 border-encre"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-valuenow={etape + 1}
      >
        <div
          className="h-full bg-chantier transition-all"
          style={{ width: `${progression}%` }}
        />
      </div>

      <h1 className="mt-8 font-titre text-3xl font-extrabold leading-tight text-encre">
        {question.titre}
      </h1>
      <p className="mt-3 text-anthracite">{question.aide}</p>

      <ul className="mt-8 space-y-3">
        {question.options.map((o) => (
          <li key={o.valeur}>
            <button
              type="button"
              onClick={() => choisir(o.valeur)}
              className="min-h-16 w-full border-2 border-encre bg-white px-4 py-4 text-left text-lg font-semibold text-encre active:bg-chantier"
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}