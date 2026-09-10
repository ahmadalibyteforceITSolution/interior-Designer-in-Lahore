export function useSeo() {
  function setMeta(page) {
    if (!page) return;

    // Title
    const title = page.metaTitle || (page.title ? `${page.title} | Spaces & Places Lahore` : 'Spaces & Places | Interior Designer & Architects in Lahore');
    document.title = title;

    // Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', page.metaDescription || 'Spaces & Places is Lahore\'s premier interior design, architectural planning, and turnkey construction studio.');

    // Focus Keywords
    let kwMeta = document.querySelector('meta[name="keywords"]');
    if (!kwMeta) {
      kwMeta = document.createElement('meta');
      kwMeta.setAttribute('name', 'keywords');
      document.head.appendChild(kwMeta);
    }
    kwMeta.setAttribute('content', page.focusKeywords || 'Interior Designer Lahore, Architects in Lahore, Luxury Interiors Pakistan');

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', page.canonicalUrl || window.location.href);

    // Robots meta
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', page.indexRobots !== false ? 'index, follow' : 'noindex, nofollow');

    // OpenGraph
    updateOrCreateMeta('property', 'og:title', title);
    updateOrCreateMeta('property', 'og:description', descMeta.getAttribute('content'));
    updateOrCreateMeta('property', 'og:url', window.location.href);
    updateOrCreateMeta('property', 'og:site_name', 'Spaces & Places');
    if (page.ogImage || page.hero?.bgImage) {
      updateOrCreateMeta('property', 'og:image', page.ogImage || page.hero?.bgImage);
    }

    // Schema.org LocalBusiness & Organization Injection
    injectOrganizationSchema();
  }

  function updateOrCreateMeta(attrName, attrVal, content) {
    let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content || '');
  }

  function injectOrganizationSchema() {
    let scriptTag = document.getElementById('schema-org-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'schema-org-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schema = {
      "@context": "https://schema.org",
      "@type": "GeneralContractor",
      "name": "Spaces & Places",
      "image": "https://spacesandplaces.com.pk/uploads/header-logo.webp",
      "telephone": "+92 300 1999967",
      "url": "https://spacesandplaces.com.pk",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gulberg & DHA",
        "addressLocality": "Lahore",
        "addressRegion": "Punjab",
        "postalCode": "54000",
        "addressCountry": "PK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 31.5204,
        "longitude": 74.3587
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      "priceRange": "$$$$"
    };

    scriptTag.textContent = JSON.stringify(schema);
  }

  return {
    setMeta
  };
}
