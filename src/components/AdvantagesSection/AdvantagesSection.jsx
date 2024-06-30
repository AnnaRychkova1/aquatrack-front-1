import css from './AdvantagesSection.module.css';
import UserCount from './CountPeople';

const AdvantagesSection = () => {
  return (
    <div className={css.advantages_main}>
      <UserCount />

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
          Our <span className={css.textSpan}>happy</span> customers
        </p>
      </div>

      <div className={css.advantagesGroup_habits}>
        <ul className={css.advantagesTabs}>
          <li className={css.advantages_habits}>
            <div className={css.ellipse}></div>
            <p className={css.habit_1}>Habit drive</p>
          </li>
          <li className={css.advantages_habits}>
            <p className={css.habit_2}>View statistics</p>
          </li>

          <li className={css.advantages_habits}>
            <p className={css.habit_3}>Personal rate setting</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AdvantagesSection;
