// AdSense Component
// Replace 'YOUR_ADSENSE_ID' with your actual AdSense publisher ID

interface AdProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
}

export function AdSense({ slot, format = 'auto' }: AdProps) {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-YOUR_ADSENSE_ID"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}

// Placeholder for when AdSense is not configured
export function AdPlaceholder({ height = '100px' }: { height?: string }) {
  return (
    <div 
      className="my-4 bg-gray-900 flex items-center justify-center text-gray-600"
      style={{ height }}
    >
      <span>Advertisement</span>
    </div>
  );
}
