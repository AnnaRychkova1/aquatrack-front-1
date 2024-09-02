import { useTranslation } from 'react-i18next';
import { TourProvider } from '@reactour/tour';
import { getSteps } from './steps';
import styles from './styles';

const GuideProvider = ({ children }) => {
  const { t } = useTranslation();

  return (
    <TourProvider steps={getSteps(t)} styles={styles}>
      {children}
    </TourProvider>
  );
};

export default GuideProvider;
