import { useTranslation } from 'react-i18next';
import css from './AdvantagesSection.module.css';
import UserCount from './CountPeople';

const AdvantagesSection = () => {
  const { t } = useTranslation();
  return (
    <div className={css.advantages_main}>
      <div className={css.advantages_users}>
        <ul className={css.advantages_usersImg}>
          <li className={css.advantages_point}>
            <div className={`${css.user} ${css.user1}`}></div>
          </li>

          <li className={css.advantages_point}>
            <div className={`${css.user} ${css.user2}`}></div>
          </li>

          <li className={css.advantages_point}>
            <div className={`${css.user} ${css.user3}`}></div>
          </li>
        </ul>
        <p className={css.advantagesText}>
          {t('adwantagesSection.our')}{' '}
          <span className={css.textSpan}>{t('adwantagesSection.happy')}</span>{' '}
          {t('adwantagesSection.customers')}
        </p>
      </div>

      <div className={css.advantagesGroup_habits}>
        <ul className={css.advantagesTabs}>
          <li className={css.advantages_habits}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>{t('adwantagesSection.habit')}</p>
          </li>
          <li className={css.advantages_habits}>
            <p className={css.habit_2}>{t('adwantagesSection.statistics')}</p>
          </li>

          <li className={css.advantages_habits}>
            <p className={css.habit_3}>{t('adwantagesSection.rate')}</p>
          </li>
        </ul>
      </div>
      <UserCount />
    </div>
  );
};
export default AdvantagesSection;
