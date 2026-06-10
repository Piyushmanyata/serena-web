import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEED_PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/constants";
import ProductClient from "./ProductClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEED_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return {};

  return {
    title: `${product.name} — SERENA Jewellery Jar`,
    description: product.description,
    openGraph: {
      title: `${product.name} — SERENA Jewellery Jar`,
      description: product.description,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  const related = getRelatedProducts(product, 3);
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_URL}/opengraph-image`,
    brand: {
      "@type": "Brand",
      name: "SERENA",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/shop/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} related={related} isLowStock={isLowStock} />
    </>
  );
}
