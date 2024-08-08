import Logo from '../../components/Logo/Logo';
import css from './Section.module.css';

const Section = ({ children }) => {
  return (
    <section className={css.container}>
      <Logo />
      {children}
    </section>
  );
};

export default Section;
