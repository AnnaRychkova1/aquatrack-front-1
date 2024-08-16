import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import css from '../UserBarPopover/UserBarPopover.module.css';
import styles from '../../modals/Modal/Modal.module.css';
import LogOutModal from '../../modals/LogOutModal/LogOutModal';
import UserSettingsModal from '../../modals/UserSettingsModal/UserSettingsModal';
import Iconsvg from '../../shared/components/Icon/Icon';
import { useModalContext } from '../../context/useModalContext';

const UserBarPopover = forwardRef(({ closePopover }, ref) => {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const [popoverPosition, setPopoverPosition] = useState('bottom');

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
      className={`${css.userPopoverContainer} ${css[popoverPosition]}`}
      ref={ref}
    >
      <button
        className={css.userPopoverBtn}
        onClick={() => {
          openModal(<UserSettingsModal closePopover={closePopover} />, {
            modalClassName: styles.settingModal,
            overlayClassName: styles.settingOverlay,
          });
        }}
      >
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'settings'} />
        <span>{t('trackerPage.settings')}</span>
      </button>
      <button
        className={css.userPopoverBtn}
        onClick={() => {
          openModal(<LogOutModal closePopover={closePopover} />);
        }}
      >
        <Iconsvg className={css.userPopoverBtnIcon} iconName={'log-out'} />
        <span>{t('trackerPage.logout')}</span>
      </button>
    </div>
  );
});

UserBarPopover.displayName = 'UserBarPopover';

export default UserBarPopover;
