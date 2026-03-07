/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 * 
 * Usage:
 * <StructuredData data={organizationSchema} />
 */

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

interface StructuredDataProps {
  data: JsonValue;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}





