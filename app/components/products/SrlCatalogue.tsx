import { existsSync } from 'node:fs';
import path from 'node:path';

import SrlRail from '@/app/components/products/SrlRail';
import type { SrlGroup } from '@/app/lib/srl-data';
import { srlGroups } from '@/app/lib/srl-data';

/* Server part: checks which photos exist in /public.
   Defaults to the SRL range; pass other props for another range. */
export default function SrlCatalogue({
  groups = srlGroups,
  imageBase = '/products/srl',
  eyebrow = 'EN 360:2002',
  heading = ['Line that', 'follows you.'],
  initialKey,
  quoteLabel = 'Self-Retracting Lifeline',
}: {
  groups?: SrlGroup[];
  imageBase?: string;
  eyebrow?: string;
  heading?: [string, string];
  initialKey?: string;
  quoteLabel?: string;
}) {
  const hasImage: Record<string, boolean> = {};
  for (const g of groups)
    for (const m of g.items)
      hasImage[m.id] = existsSync(
        path.join(process.cwd(), 'public', imageBase, `${m.id}.jpg`),
      );

  return (
    <SrlRail
      groups={groups}
      hasImage={hasImage}
      imageBase={imageBase}
      eyebrow={eyebrow}
      heading={heading}
      initialKey={initialKey}
      quoteLabel={quoteLabel}
    />
  );
}
