import { createFileRoute } from "@tanstack/react-router";
import { Candidates } from "@/components/campaign/candidates";
import { Finale } from "@/components/campaign/finale";
import { HeroScene } from "@/components/campaign/hero-scene";
import { Mission } from "@/components/campaign/mission";
import { Program } from "@/components/campaign/program";
import { Promises } from "@/components/campaign/promises";
import { Stats } from "@/components/campaign/stats";
import { WhyVote } from "@/components/campaign/why-vote";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Camille & Léo — Délégués de la 1B" },
      {
        name: "description",
        content:
          "Campagne des délégués de la classe 1B : le duo, les cinq engagements et le programme en quatre mesures. Ensemble, on fait bouger la 1B.",
      },
      { property: "og:title", content: "Camille & Léo — Délégués de la 1B" },
      {
        property: "og:description",
        content:
          "Cinq engagements, quatre mesures concrètes et un duo qui se répartit le travail. Ensemble, on fait bouger la 1B.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Campaign,
});

function Campaign() {
  useSmoothScroll();

  return (
    <main className="relative bg-background">
      <HeroScene />
      <Candidates />
      <Mission />
      <WhyVote />
      <Program />
      <Stats />
      <Promises />
      <Finale />

      <footer className="border-t border-hairline px-6 py-10 text-center lg:px-10">
        <p className="text-xs text-muted-foreground">
          Campagne Camille &amp; Léo — Élection des délégués, classe 1B.
        </p>
      </footer>
    </main>
  );
}
