import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Params = Promise<Record<string, string | string[] | undefined>>;

const FACTURES_PAR_MOIS = 6;
const TAUX_ACOMPTE = 0.3;
const PRIX_MENSUEL = 29;

const MONTANTS = ["300", "1200", "3500", "8000"];
const DELAIS = ["0", "5", "18", "40"];
const ACOMPTES: Record<string, { sans: number; texte: string }> = {
  toujours: { sans: 0, texte: "tu demandes toujours un acompte" },
  parfois: { sans: 0.5, texte: "tu demandes parfois un acompte" },
  rarement: { sans: 0.8, texte: "tu demandes rarement un acompte" },
  jamais: { sans: 1, texte: "tu ne demandes jamais d'acompte" },
};

function texte(valeur: string | string[] | undefined): string {
  return typeof valeur === "string" ? valeur : "";
}

function euros(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Math.round(n / 10) * 10);
}

async function Contenu({ searchParams }: { searchParams: Params }) {
  const p = await searchParams;
  const m = texte(p.montant);
  const d = texte(p.delai);
  const a = texte(p.acompte);

  if (
    !MONTANTS.includes(m) ||
    !DELAIS.includes(d) ||
    !Object.keys(ACOMPTES).includes(a)
  ) {
    redirect("/questions");
  }

  const montant = Number(m);
  const delai = Number(d);
  const sansAcompte = ACOMPTES[a].sans;

  const avance = FACTURES_PAR_MOIS * montant * TAUX_ACOMPTE * sansAcompte;
  const baseFinale = montant * (1 - TAUX_ACOMPTE * (1 - sansAcompte));
  const attente = (FACTURES_PAR_MOIS * baseFinale * delai) / 30;
  const total = avance + attente;

  const delaiTexte =
    delai === 0 ? "le jour même" : `environ ${delai} jours après le chantier`;
  const parJour = (PRIX_MENSUEL / 30).toFixed(2).replace(".", ",");

  return (
    <>
      <p className="text-sm font-semibold uppercase tracking-wide text-encre">
        Ton résultat
      </p>

      {total >= 200 ? (
        <h1 className="mt-2 font-titre text-4xl font-extrabold leading-[1.05] text-encre">
          Ta façon de facturer immobilise environ{" "}
          <span className="bg-chantier px-1">{euros(total)}</span> de trésorerie.
        </h1>
      ) : (
        <h1 className="mt-2 font-titre text-4xl font-extrabold leading-[1.05] text-encre">
          Tu factures déjà vite. Il reste les relances.
        </h1>
      )}

      <p className="mt-6 border-l-4 border-chantier pl-4">
        Tu factures en moyenne {euros(montant)}, ta facture part {delaiTexte},
        et {ACOMPTES[a].texte}.
      </p>

      {total >= 200 && (
        <dl className="mt-8 border-4 border-encre bg-white">
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-encre/20 px-4 py-4">
            <dt>Avancés de ta poche, faute d&apos;acompte</dt>
            <dd className="font-titre text-xl font-extrabold text-encre">
              {euros(avance)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-encre/20 px-4 py-4">
            <dt>En attente à cause du retard d&apos;envoi</dt>
            <dd className="font-titre text-xl font-extrabold text-encre">
              {euros(attente)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 bg-encre px-4 py-4 text-creme">
            <dt className="font-semibold">Trésorerie immobilisée</dt>
            <dd className="font-titre text-2xl font-extrabold text-chantier">
              {euros(total)}
            </dd>
          </div>
        </dl>
      )}

      <section className="mt-10 border-t-4 border-encre pt-6">
        <h2 className="font-titre text-2xl font-extrabold text-encre">
          Ce que Note change
        </h2>
        <ul className="mt-4 space-y-3">
          <li>
            La demande d&apos;acompte part dès que ton client accepte le devis.
          </li>
          <li>La facture part le jour même, depuis ton téléphone.</li>
          <li>
            Les impayés sont relancés à 7, 15 et 30 jours, sans que tu y
            penses.
          </li>
        </ul>
        {total >= 200 && (
          <p className="mt-6 text-lg">
            Tu libères environ{" "}
            <strong className="text-encre">{euros(total)}</strong> de trésorerie.
            L&apos;abonnement coûte {PRIX_MENSUEL}&nbsp;€ par mois, soit{" "}
            {parJour}&nbsp;€ par jour.
          </p>
        )}
      </section>

      <p className="mt-8 text-sm text-anthracite">
        Estimation fondée sur {FACTURES_PAR_MOIS} factures par mois et un
        acompte de {Math.round(TAUX_ACOMPTE * 100)}&nbsp;%. Cette somme est de
        la trésorerie bloquée, pas un gain mensuel.
      </p>
    </>
  );
}

export default function Resultat({ searchParams }: { searchParams: Params }) {
  return (
    <main className="mx-auto max-w-xl px-5 py-8">
      <Suspense fallback={<p>Calcul de ton résultat…</p>}>
        <Contenu searchParams={searchParams} />
      </Suspense>
      <Link
        href="/questions"
        className="mt-6 inline-block font-semibold text-encre underline underline-offset-4"
      >
        Refaire le test
      </Link>
    </main>
  );
}