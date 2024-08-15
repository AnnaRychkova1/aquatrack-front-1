import css from './Section.module.css';
import Logo from '../../components/Logo/Logo';

const Section = ({ children }) => {
  return (
    <section className={css.container}>
      <Logo />
      {children}
    </section>
  );
};

export default Section;
