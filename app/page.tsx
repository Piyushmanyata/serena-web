"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Gift,
  MessageCircle,
  PackageCheck,
} from "lucide-react";
import { JarSVG, Logo } from "@/components/brand/Logo";
import { JarCard } from "@/components/product/JarCard";
import { getFeaturedProducts } from "@/lib/products";
import { createWhatsAppLink, generalMessage } from "@/lib/whatsapp";
import {
  DELIVERY_WINDOW,
  FREE_SHIPPING_THRESHOLD,
  INSTAGRAM_URL,
  JEWELLERY_TYPES,
  PAYMENT_NOTE,
  SERENA_CONTACT,
  SERENA_CO_OWNER,
  VIBE_CONFIG,
} from "@/lib/constants";

const FEATURED = getFeaturedProducts(8);
const VIBE_NAMES = Object.keys(VIBE_CONFIG).filter((name) => name !== "Surprise Me");

const ORDER_STEPS = [
  {
    title: "Choose the mood",
    body: "Pick a ready drop or send a custom vibe with colours, metal tone, budget, and jewellery types.",
  },
  {
    title: "We curate the jar",
    body: "Manyata and Hridyanshi select 5-10 pieces so the mix feels personal, wearable, and still surprising.",
  },
  {
    title: "Confirm directly",
    body: `Message us on WhatsApp or Instagram. We confirm availability, payment details, and delivery in ${DELIVERY_WINDOW}.`,
  },
];

const TRUST_NOTES = [
  "No website payment is taken here",
  `${FEATURED.length}+ ready jar drops`,
  `Free shipping above Rs ${FREE_SHIPPING_THRESHOLD}`,
];

function PrimaryActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex ${compact ? "flex-col" : "flex-col sm:flex-row"} gap-3`}>
      <a
        href={createWhatsAppLink(generalMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="serena-button serena-button-primary"
      >
        <MessageCircle size={18} aria-hidden="true" />
        WhatsApp SERENA
      </a>
      <Link href="/shop" className="serena-button serena-button-secondary">
        Shop the drops
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="serena-hero">
      <div className="serena-container serena-hero-grid">
        <div className="serena-hero-copy">
          <p className="serena-kicker">Mystery jewellery jars, curated by hand</p>
          <Logo size="xl" className="serena-hero-logo" />
          <div className="serena-mobile-jar" aria-hidden="true">
            <JarSVG accentColor="#b8863b" label="SERENA" />
          </div>
          <h1>A jar made around your vibe, not a random accessory box.</h1>
          <p className="serena-lede">
            Choose your aesthetic, tell us the pieces you wear, and receive 5-10 mystery
            jewellery pieces styled for your mood. The surprise stays intact until you unbox it.
          </p>
          <PrimaryActions />
          <div className="serena-proof-row" aria-label="SERENA order notes">
            {TRUST_NOTES.map((note) => (
              <span key={note}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="serena-hero-stage" aria-label="SERENA mystery jewellery jar visual">
          <div className="serena-stage-card serena-stage-card-front">
            <div className="serena-stage-label">Ready drops from Rs 399</div>
            <JarSVG accentColor="#b8863b" label="SERENA" className="serena-hero-jar" />
            <div className="serena-stage-foot">
              <span>5-10 pieces</span>
              <span>Custom notes welcome</span>
            </div>
          </div>
          <div className="serena-stage-card serena-stage-card-back" aria-hidden="true">
            <p>Coquette</p>
            <p>Celestial</p>
            <p>Streetwear</p>
            <p>Ocean Breeze</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrderRitualSection() {
  return (
    <section className="serena-section serena-section-cream">
      <div className="serena-container">
        <div className="serena-section-heading serena-heading-split">
          <div>
            <p className="serena-kicker">How ordering works</p>
            <h2>Personal curation, clear confirmation.</h2>
          </div>
          <p>
            SERENA is a direct-message storefront. Save what you like, send the order, and we
            confirm everything before payment details are shared.
          </p>
        </div>

        <div className="serena-step-grid">
          {ORDER_STEPS.map((step, index) => (
            <article key={step.title} className="serena-step">
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedDropsSection() {
  return (
    <section className="serena-section">
      <div className="serena-container">
        <div className="serena-section-heading serena-heading-split">
          <div>
            <p className="serena-kicker">Ready to reserve</p>
            <h2>Current jar drops</h2>
          </div>
          <Link href="/shop" className="serena-text-link">
            View all jars <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="serena-product-grid">
          {FEATURED.map((product) => (
            <JarCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </section>
  );
}

function VibeStudioSection() {
  const [activeVibe, setActiveVibe] = useState(VIBE_NAMES[0] ?? "Coquette / Romance");
  const config = VIBE_CONFIG[activeVibe];
  const message = useMemo(
    () =>
      `Hi SERENA! I want a custom mystery jewellery jar in the ${activeVibe} vibe. Can you help me curate one?`,
    [activeVibe]
  );

  return (
    <section className="serena-section serena-vibe-studio">
      <div className="serena-container serena-vibe-grid">
        <div>
          <p className="serena-kicker">Custom jar studio</p>
          <h2>Start with a mood. We will build the mix around it.</h2>
          <p className="serena-section-copy">
            Tap a vibe to preview the direction, then send it directly to SERENA. You can still
            add reference photos, budget, jewellery type, and metal tone in chat.
          </p>
          <div className="serena-vibe-pills" role="list" aria-label="SERENA jar vibes">
            {VIBE_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setActiveVibe(name)}
                className={name === activeVibe ? "is-active" : ""}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <aside className="serena-vibe-preview" style={{ "--vibe-accent": config.colors[0] } as CSSProperties}>
          <div className="serena-vibe-art">
            <JarSVG accentColor={config.colors[0]} label={config.emoji} className="serena-vibe-jar" />
          </div>
          <div>
            <p>{config.palette}</p>
            <h3>{activeVibe}</h3>
            <span>{config.desc}</span>
          </div>
          <a href={createWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="serena-button serena-button-primary">
            <MessageCircle size={18} aria-hidden="true" />
            Send this vibe
          </a>
        </aside>
      </div>
    </section>
  );
}

function InsideSection() {
  return (
    <section className="serena-section serena-section-ink">
      <div className="serena-container serena-inside-grid">
        <div>
          <p className="serena-kicker">What can be inside</p>
          <h2>Small pieces, styled as one reveal.</h2>
          <p>
            The exact pieces stay a mystery, but the curation is not random. Tell us what you wear,
            what you avoid, and the occasions you are styling for.
          </p>
        </div>
        <div className="serena-type-grid">
          {JEWELLERY_TYPES.map((type) => (
            <span key={type}>{type}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function GiftAndSocialSection() {
  return (
    <section className="serena-section">
      <div className="serena-container serena-feature-band">
        <article>
          <Gift size={24} aria-hidden="true" />
          <h2>Gift a jar without guessing her exact jewellery style.</h2>
          <p>
            Share the occasion, recipient vibe, preferred tones, and any no-go styles. We curate a
            gift-ready mystery jar and confirm timing directly.
          </p>
          <Link href="/gift" className="serena-text-link">
            Plan a gift jar <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </article>

        <article>
          <Camera size={24} aria-hidden="true" />
          <h2>Follow drops before they disappear.</h2>
          <p>
            New jar batches, behind-the-scenes packing, and quick DM ordering live on Instagram.
            Message {SERENA_CONTACT.instagram} for custom requests.
          </p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="serena-text-link">
            Open Instagram <ArrowRight size={16} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="serena-final">
      <div className="serena-container serena-final-grid">
        <div>
          <p className="serena-kicker">Small batches, direct confirmation</p>
          <h2>Ready to build your mystery jar?</h2>
          <p>{PAYMENT_NOTE}</p>
        </div>
        <div className="serena-final-actions">
          <PrimaryActions compact />
          <a
            href={`https://wa.me/${SERENA_CO_OWNER.whatsapp}?text=${encodeURIComponent("Hi Hridyanshi! I want to order a SERENA jar.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="serena-secondary-contact"
          >
            <PackageCheck size={17} aria-hidden="true" />
            Message Hridyanshi too
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OrderRitualSection />
      <FeaturedDropsSection />
      <VibeStudioSection />
      <InsideSection />
      <GiftAndSocialSection />
      <FinalCTASection />
    </>
  );
}
