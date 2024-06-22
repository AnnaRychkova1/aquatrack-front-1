// const AdvantagesSection = () => {
//   return <section>AdvantagesSection</section>;
// };

// export default AdvantagesSection;

import css from "./AdvantagesSection.module.css";
// import user_1 from "../../assets/images/png/customer-1.png";
// import user_2 from "../../assets/images/png/customer-2.png";
// import user_3 from "../../assets/images/png/customer-3.png";

// import user_1 from "../../assets/images/png/customerbig-1.png";
// import user_2 from "../../assets/images/png/customerbig-2.png";
// import user_3 from "../../assets/images/png/customerbig-3.png";

export const AdvantagesSection = () => {
  return (
    <div className={css.advantages_main}>
      <div className={css.advantages_users}>
        {/* <ul className={css.advantages_usersImg}>
          <li className={css.advantages_point}>
            <div className={css.user}>

            </div>
            <img className={css.user} src={user_1} alt="user1" />
          </li>

          <li className={css.advantages_point}>
            <img className={css.user} src={user_2} alt="user2" />
          </li>

          <li className={css.advantages_point}>
            <img className={css.user} src={user_3} alt="user3" />
          </li>
        </ul> */}

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
