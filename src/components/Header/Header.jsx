import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { useTour } from '@reactour/tour';
import { useState } from 'react';
import DeveloperModal from '../../modals/DeveloperModal/DeveloperModal';

const Header = () => {
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

  const openDeveloperModal = () => setIsDeveloperModalOpen(true);
  const closeDeveloperModal = () => setIsDeveloperModalOpen(false);

  const { i18n } = useTranslation();
  const { setIsOpen } = useTour();
  const { isLoggedIn } = useAuth();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className={css.headerContainer}>
        <button
          type="button"
          className={`${css.languages} ${
            i18n.language === 'en' ? css.activeLanguage : ''
          }`}
          onClick={() => changeLanguage('en')}
        >
          En
        </button>
        <button
          type="button"
          className={`${css.languages} ${
            i18n.language === 'uk' ? css.activeLanguage : ''
          }`}
          onClick={() => changeLanguage('uk')}
        >
          Ua
        </button>
        {isLoggedIn && (
          <button
            className={`first-step ${css.tour}`}
            onClick={() => setIsOpen(true)}
          >
            App Guide
          </button>
        )}
        <button
          type="button"
          className={css.developers}
          onClick={openDeveloperModal}
        >
          Developers
        </button>
      </div>
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        closeModal={closeDeveloperModal}
      />
    </>
  );
};

export default Header;
