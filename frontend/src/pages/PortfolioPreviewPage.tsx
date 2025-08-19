import { useEffect, useState } from 'react';
import api from '../lib/api';
import ThemeA from '../themes/ThemeA';
import ThemeB from '../themes/ThemeB';
import ThemeC from '../themes/ThemeC';

export default function PortfolioPreviewPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get('/api/portfolio');
      const wrap = (x: any) => Array.isArray(x) ? x : (x ? [x] : []);
      const arrayOfStrings = (x: any) => Array.isArray(x) ? x : (x && typeof x === 'object' ? Object.values(x) : []);
      const normalized = {
        ...data,
        skills: arrayOfStrings(data.skills),
        achievements: arrayOfStrings(data.achievements),  
        projects: wrap(data.projects),
        certifications: wrap(data.certifications),
        education: wrap(data.education),
        experience: wrap(data.experience),
      };
      setData(normalized);
    };
    load();
  }, []);

  if (!data) return null;

  switch (data.theme) {
    case 'themeB': return <ThemeB data={data} />;
    case 'themeC': return <ThemeC data={data} />;
    default: return <ThemeA data={data} />;
  }
}


