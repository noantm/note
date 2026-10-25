import Link from "next/link";

export default async function Resultat({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const p = await searchParams;
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <h1 className="font-titre text-3xl font-extrabold text-encre">
        Tes réponses sont enregistrées.
      </h1>
      <p className="mt-4">
        Montant moyen : {p.montant} € · Délai d'envoi : {p.delai} jours ·
        Acompte : {p.acompte}
      </p>
      <p className="mt-4 text-anthracite">
        Ton résultat chiffré arrive à l'étape suivante.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block font-semibold text-encre underline underline-offset-4"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}