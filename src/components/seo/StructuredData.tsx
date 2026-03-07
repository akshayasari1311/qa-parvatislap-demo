/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 *
 * Usage:
 * <StructuredData data={organizationSchema} />
 */

interface StructuredDataProps {
  data: unknown;
}

function removeUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(removeUndefined);
  }

  if (value && typeof value === "object") {
    const cleaned: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(value)) {
      if (nestedValue !== undefined) {
        cleaned[key] = removeUndefined(nestedValue);
      }
    }

    return cleaned;
  }

  return value;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(removeUndefined(data)) }}
    />
  );
}





