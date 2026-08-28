import { PROJECT, SITE } from "@/data/project";
import { FAQS } from "@/data/faqs";
import { getPublisher } from "@/data/publisher";
import { absoluteUrl } from "@/lib/site";

export function JsonLd() {
  const publisher = getPublisher();
  const pageUrl = absoluteUrl("/");
  const orgId = `${pageUrl}#publisher`;
  const websiteId = `${pageUrl}#website`;
  const webpageId = `${pageUrl}#webpage`;
  const imageId = `${pageUrl}#hero-image`;
  const placeId = `${pageUrl}#cornerstone`;
  const cityId = `${pageUrl}#brampton`;

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: publisher.displayName || SITE.name,
      url: pageUrl,
      email: publisher.email || undefined,
      telephone: publisher.phone || undefined,
      description:
        "Independent informational publisher covering Cornerstone by Primont Homes in Northwest Brampton. Not affiliated with Primont Homes.",
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE.name,
      url: pageUrl,
      description: SITE.description,
      publisher: { "@id": orgId },
      inLanguage: "en-CA",
    },
    {
      "@type": "City",
      "@id": cityId,
      name: PROJECT.city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: PROJECT.province,
        containedInPlace: { "@type": "Country", name: PROJECT.country },
      },
    },
    {
      "@type": "Residence",
      "@id": placeId,
      name: `${PROJECT.name} by ${PROJECT.developer}`,
      alternateName: ["Cornerstone Brampton", "Cornerstone Primont Homes"],
      description: SITE.description,
      url: pageUrl,
      image: absoluteUrl("/images/hero.jpg"),
      address: {
        "@type": "PostalAddress",
        addressLocality: PROJECT.city,
        addressRegion: "ON",
        addressCountry: "CA",
      },
      containedInPlace: { "@id": cityId },
      brand: {
        "@type": "Organization",
        name: PROJECT.developer,
        url: PROJECT.officialDeveloperUrl,
      },
      additionalProperty: [
        { "@type": "PropertyValue", name: "Status", value: PROJECT.status },
        { "@type": "PropertyValue", name: "Release", value: PROJECT.releaseTimingDisplay },
        { "@type": "PropertyValue", name: "Home types", value: PROJECT.housingTypesCurrent.join(", ") },
        { "@type": "PropertyValue", name: "Bedrooms", value: PROJECT.bedroomsDisplay },
        { "@type": "PropertyValue", name: "Pricing", value: PROJECT.pricingDisplay },
      ],
      citation: PROJECT.officialProjectUrl,
    },
    {
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: SITE.defaultTitle,
      description: SITE.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": placeId },
      primaryImageOfPage: { "@id": imageId },
      inLanguage: "en-CA",
      dateModified: PROJECT.verificationDateIso,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#overview h2", "#direct-answer"],
      },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      mainEntity: { "@id": placeId },
      citation: PROJECT.officialProjectUrl,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Cornerstone Brampton",
          item: pageUrl,
        },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: absoluteUrl("/images/hero.jpg"),
      contentUrl: absoluteUrl("/images/hero.jpg"),
      caption: "Artist's concept of Cornerstone townhomes in Northwest Brampton.",
      creditText: "Project rendering. Artist's concept; not a photograph of completed homes.",
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faq`,
      isPartOf: { "@id": webpageId },
      mainEntity: FAQS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
