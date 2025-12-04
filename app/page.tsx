'use client';

import { FormEvent, useState } from 'react';

export default function HomePage() {
  const [role, setRole] = useState<'freelancer' | 'company' | ''>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, note }),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      setRole('');
      setName('');
      setEmail('');
      setNote('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-500" />
            <span className="text-lg font-semibold tracking-tight">
              Skillr
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Trygg markedsplass for stillasbyggere
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24 pt-10">
        {/* HERO */}
        <section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Pilotfase – kun for stillasbyggere
            </div>

            <h1 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Flere oppdrag. Mindre mas. <br />
              <span className="text-emerald-400">Trygge jobber for seriøse stillasbyggere.</span>
            </h1>

            <p className="mb-6 text-sm text-slate-300 md:text-base">
              Skillr kobler selvstendige stillasbyggere med bedrifter og privatpersoner
              som trenger rask, trygg og fagmessig hjelp. Fastpris eller time – du velger.
              All betaling går trygt gjennom plattformen.
            </p>

            <a
              href="#signup"
              className="inline-block rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-400"
            >
              Få tidlig tilgang
            </a>

            <ul className="mt-6 space-y-2 text-sm text-slate-300">
              <li>• Kun seriøse oppdrag – ingen useriøse jobber</li>
              <li>• Du får betalt via Stripe – alltid</li>
              <li>• Fastpris eller timebetaling</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200 shadow-xl">
            <h2 className="mb-3 text-base font-semibold text-white">
              Hva løser Skillr for deg?
            </h2>
            <ul className="space-y-2">
              <li>✓ Mindre tid på telefon og meldinger</li>
              <li>✓ Ingen krangling om betaling</li>
              <li>✓ Klare avtaler før jobb</li>
              <li>✓ Flere seriøse forespørsler på ett sted</li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              Vi bygger ikke en “småjobb-app”. Dette er en fagplattform for profesjonelle stillasbyggere.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Slik fungerer det
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="mb-2 text-xs font-semibold uppercase text-emerald-400">
                Steg 1
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white">
                Registrer deg
              </h3>
              <p className="text-xs text-slate-300">
                Opprett profil med erfaring, sertifikater og priser.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="mb-2 text-xs font-semibold uppercase text-emerald-400">
                Steg 2
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white">
                Motta oppdrag
              </h3>
              <p className="text-xs text-slate-300">
                Bedrifter og privatpersoner sender forespørsler direkte til deg.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="mb-2 text-xs font-semibold uppercase text-emerald-400">
                Steg 3
              </div>
              <h3 className="mb-1 text-sm font-semibold text-white">
                Utfør jobb – få betalt
              </h3>
              <p className="text-xs text-slate-300">
                Kunden betaler via Skillr. Du får automatisk utbetalt når jobben er fullført.
              </p>
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section id="signup" className="mt-16">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Bli med i pilotfasen
          </h2>
          <p className="mb-4 text-sm text-slate-300">
            Vi åpner for et begrenset antall stillasbyggere i første runde.
            Registrer deg nå for prioritet.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-6"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                Jeg er
              </label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as 'freelancer' | 'company' | '')
                }
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              >
                <option value="">Velg</option>
                <option value="freelancer">Selvstendig stillasbygger</option>
                <option value="company">Bedrift / privatkunde</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                Navn
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                E-post
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-200">
                Kort om deg / behovet ditt
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Sender...' : 'Registrer interesse'}
              </button>

              {status === 'success' && (
                <span className="text-xs text-emerald-400">
                  Takk! Vi tar kontakt.
                </span>
              )}
              {status === 'error' && (
                <span className="text-xs text-red-400">
                  Noe gikk galt, prøv igjen.
                </span>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
