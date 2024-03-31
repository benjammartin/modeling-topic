import hero from './hereo';
import heroConfig from './hereo.config.json';
import ctaConfig from './cta.config.json';
import CallToAction from './cta';
import Feature from './feature';

export const configs = {
  hero: heroConfig,
  cta: ctaConfig,
};

interface Components {
  [key: string]: React.ComponentType<any>;
}

export const components: Components = {
  Hero: hero,
  Calltoaction: CallToAction,
  Features: Feature,
};
