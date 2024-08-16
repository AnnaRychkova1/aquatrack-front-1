import { useTranslation } from 'react-i18next';
import css from './DeveloperModal.module.css';
import data from './developersData';
import Developer from '../../components/Developer/Developer';

const DeveloperModal = () => {
  const { t } = useTranslation();
  return (
    <div className={css.devWrapperModal}>
      <h2 className={css.devTitle}>{t('modals.createdTeam')}</h2>
      <ul className={css.developersList}>
        {data.map((developer, index) => (
          <li className={css.devItem} key={`${developer.id}-${index}`}>
            <Developer id={developer.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeveloperModal;
