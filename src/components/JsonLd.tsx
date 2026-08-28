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
      "@type": "WebPage",
      "@id": webpageId,
      url: pageUrl,
      name: SITE.defaultTitle,
      description: SITE.description,
      isPartOf: { "@id": websiteId },
      about: {
        "@type": "Thing",
        name: `${PROJECT.name} by ${PROJECT.developer}`,
        description: `${PROJECT.communityType} in ${PROJECT.region}, ${PROJECT.province}.`,
      },
      primaryImageOfPage: { "@id": imageId },
      inLanguage: "en-CA",
      dateModified: PROJECT.verificationDateIso,
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
