import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../UserBarPopover/UserBarPopover.module.css';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';
import Iconsvg from '../../shared/components/Icon/Icon';

const UserBarPopover = forwardRef(({ closePopover }, ref) => {
  const { t } = useTranslation();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState('bottom');

  const openSettingModal = () => {
    // closePopover();
    setIsSettingModalOpen(true);
  };
  const closeSettingModal = () => {
    closePopover();
    setIsSettingModalOpen(false);
  };

  const openLogOutModal = () => {
    // closePopover();
    setIsLogOutModalOpen(true);
  };
  const closeLogOutModal = () => setIsLogOutModalOpen(false);

  useEffect(() => {
    const handlePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const isBelow = rect.bottom + rect.height > window.innerHeight;
        if (isBelow) {
          setPopoverPosition('top');
        } else {
          setPopoverPosition('bottom');
        }
      }
    };

    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, [ref]);

  return (
    <div
      // className={css.userPopoverContainer}
      className={`${css.userPopoverContainer} ${css[popoverPosition]}`}
      ref={ref}
    >
      <button className={css.userPopoverBtn} onClick={openSettingModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'settings'} />
        <span>{t('trackerPage.settings')}</span>
      </button>
      <button className={css.userPopoverBtn} onClick={openLogOutModal}>
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'log-out'} />
        <span>{t('trackerPage.logout')}</span>
      </button>
      <UserSettingsModal
        isOpen={isSettingModalOpen}
        closeModal={closeSettingModal}
        closePopover={closePopover}
      />
      <LogOutModal isOpen={isLogOutModalOpen} closeModal={closeLogOutModal} />
    </div>
  );
});

UserBarPopover.displayName = 'UserBarPopover';

export default UserBarPopover;
