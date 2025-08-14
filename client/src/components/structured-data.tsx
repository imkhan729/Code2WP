interface StructuredDataProps {
  type: 'Article' | 'Organization' | 'Website' | 'BreadcrumbList';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type
    };

    switch (type) {
      case 'Article':
        return {
          ...baseSchema,
          headline: data.headline,
          description: data.description,
          author: {
            "@type": "Person",
            name: data.author
          },
          publisher: {
            "@type": "Organization",
            name: "Code2WP",
            logo: {
              "@type": "ImageObject",
              url: "https://your-domain.com/logo.png"
            }
          },
          datePublished: data.datePublished,
          dateModified: data.dateModified,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url
          },
          articleSection: data.section,
          keywords: data.keywords
        };

      case 'Organization':
        return {
          ...baseSchema,
          name: data.name,
          url: data.url,
          logo: data.logo,
          description: data.description,
          foundingDate: data.foundingDate,
          sameAs: data.sameAs || []
        };

      case 'Website':
        return {
          ...baseSchema,
          name: data.name,
          url: data.url,
          description: data.description,
          publisher: {
            "@type": "Organization",
            name: data.publisherName
          }
        };

      case 'BreadcrumbList':
        return {
          ...baseSchema,
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      default:
        return baseSchema;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateSchema())
      }}
    />
  );
}