import UniversalModal from '../Modal/Modal';
import css from './DeveloperModal.module.css';
import data from './developersData';
import Developer from '../../components/Developer/Developer';
import { useTranslation } from 'react-i18next';

const DeveloperModal = ({ isOpen, closeModal }) => {
  const { t } = useTranslation();
  const addModalClassName = isOpen ? css.devModal : '';
  const addOverlayClassName = isOpen ? css.devOverlay : '';
  return (
    <UniversalModal
      isOpen={isOpen}
      closeModal={closeModal}
      addModalClassName={addModalClassName}
      addOverlayClassName={addOverlayClassName}
    >
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
    </UniversalModal>
  );
};

export default DeveloperModal;
