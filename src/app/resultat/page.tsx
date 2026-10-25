import { Suspense } from "react";
import Link from "next/link";

type Params = Promise<Record<string, string | string[] | undefined>>;

async function Contenu({ searchParams }: { searchParams: Params }) {
  const p = await searchParams;
  return (
    <>
      <h1 className="font-titre text-3xl font-extrabold text-encre">
        Tes réponses sont enregistrées.
      </h1>
      <p className="mt-4">
        Montant moyen : {p.montant} € · Délai d&apos;envoi : {p.delai} jours ·
        Acompte : {p.acompte}
      </p>
      <p className="mt-4 text-anthracite">
        Ton résultat chiffré arrive à l&apos;étape suivante.
      </p>
    </>
  );
}

export default function Resultat({ searchParams }: { searchParams: Params }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <Suspense fallback={<p>Chargement de ton résultat…</p>}>
        <Contenu searchParams={searchParams} />
      </Suspense>
      <Link
        href="/"
        className="mt-8 inline-block font-semibold text-encre underline underline-offset-4"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}