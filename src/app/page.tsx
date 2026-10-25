import Link from "next/link";

const BENEFICES = [
  {
    titre: "Une facture en trois champs",
    texte:
      "Client, montant, objet. Depuis ton téléphone, sur le chantier, en moins d'une minute.",
  },
  {
    titre: "L'acompte part tout seul",
    texte:
      "Dès que le client dit oui, la demande d'acompte est envoyée. Tu n'as plus à oser la demander.",
  },
  {
    titre: "Les impayés sont relancés",
    texte:
      "À 7, 15 et 30 jours, la relance part. Poliment, sans que tu y penses.",
  },
];

export default function Accueil() {
  return (
    <>
      <main className="mx-auto max-w-xl px-5 pb-44 pt-6">
        <header className="flex items-center justify-between">
          <p className="font-titre text-2xl font-extrabold tracking-tight text-encre">
            Note<span className="text-chantier">.</span>
          </p>
          <span
            aria-hidden="true"
            className="-rotate-6 border-2 border-encre px-2 py-0.5 font-titre text-sm font-extrabold uppercase tracking-widest text-encre"
          >
            Payé
          </span>
        </header>

        <h1 className="mt-10 font-titre text-4xl font-extrabold leading-[1.05] text-encre">
          Tes factures et tes acomptes partent à temps. Ta trésorerie suit.
        </h1>

        <p className="mt-6 border-l-4 border-chantier pl-4 text-lg text-anthracite">
          Un acompte de 30&nbsp;% oublié sur un chantier à 4&nbsp;000&nbsp;€,
          c'est <strong className="text-encre">1&nbsp;200&nbsp;€</strong> qui
          dorment chez ton client.
        </p>

        <ul className="mt-10 border-t-4 border-encre">
          {BENEFICES.map((b) => (
            <li key={b.titre} className="border-b-2 border-encre/20 py-5">
              <h2 className="font-titre text-xl font-extrabold text-encre">
                {b.titre}
              </h2>
              <p className="mt-1 text-anthracite">{b.texte}</p>
            </li>
          ))}
        </ul>
      </main>

      <div className="fixed inset-x-0 bottom-0 border-t-4 border-encre bg-creme px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
        <div className="mx-auto max-w-xl">
          <Link
            href="/questions"
            className="block bg-encre py-4 text-center font-titre text-xl font-extrabold text-creme active:bg-chantier active:text-encre"
          >
            Commencer — c'est gratuit
          </Link>
          <p className="mt-2 text-center text-sm text-anthracite">
            3 questions, moins d'une minute.
          </p>
        </div>
      </div>
    </>
  );
}