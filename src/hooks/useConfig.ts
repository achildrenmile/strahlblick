import { useState, useEffect } from 'react';

interface ParentSiteConfig {
  parentSiteUrl: string;
  parentSiteLogo: string;
  parentSiteName: string;
}

interface ConfigState {
  config: ParentSiteConfig | null;
  loading: boolean;
}

const defaultConfig: ParentSiteConfig = {
  parentSiteUrl: '',
  parentSiteLogo: '',
  parentSiteName: '',
};

export function useConfig() {
  const [state, setState] = useState<ConfigState>({
    config: null,
    loading: true,
  });

  useEffect(() => {
    fetch('/config.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Config not found');
        }
        return response.json();
      })
      .then((data: ParentSiteConfig) => {
        setState({
          config: {
            parentSiteUrl: data.parentSiteUrl || '',
            parentSiteLogo: data.parentSiteLogo || '',
            parentSiteName: data.parentSiteName || '',
          },
          loading: false,
        });
      })
      .catch(() => {
        setState({
          config: defaultConfig,
          loading: false,
        });
      });
  }, []);

  return state;
}
