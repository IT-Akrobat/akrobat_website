import type { Metadata } from 'next';

import SectorPage from '@/app/components/projects/SectorPage';
import { sectors } from '@/app/lib/projects-data';

const sector = sectors.find((s) => s.id === 'international')!;

export const metadata: Metadata = {
  title: `${sector.label} projects`,
  description: sector.blurb,
};

export default function Page() {
  return <SectorPage sector={sector} />;
}
