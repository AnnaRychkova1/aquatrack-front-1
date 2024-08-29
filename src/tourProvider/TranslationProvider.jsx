import { useTranslation } from 'react-i18next';
import { TourProvider } from '@reactour/tour';
import { getSteps } from './steps';

const TranslationProvider = ({ children }) => {
  const { t } = useTranslation();
  const styles = {
    maskWrapper: base => ({
      ...base,
      // color: 'rgba(5, 36, 16, 0.8)',
    }),
    maskArea: base => ({
      ...base,
      rx: '1.7em',
    }),
    highlightedArea: (base, { x, y }) => ({
      ...base,
      x: x + 10,
      y: y + 10,
    }),
    popover: base => ({
      ...base,
      boxShadow: '0 0 3em rgba(6, 10, 9, 0.5)',
      backgroundColor: 'rgb(228, 244, 230)',
      borderRadius: '1.7em',
      fontWeight: '600',
      letterSpacing: '0.02em',
      color: '#012c04',
      paddingTop: '34px',
      '--reactour-accent': 'green',
    }),
    badge: base => ({
      ...base,
      color: '#012c04',
      backgroundColor: 'lightgreen',
      lineHeight: '1.75',
    }),

    controls: base => ({ ...base }),
    close: base => ({ ...base, right: 15, top: 15 }),
  };

  return (
    <TourProvider steps={getSteps(t)} styles={styles}>
      {children}
    </TourProvider>
  );
};

export default TranslationProvider;
