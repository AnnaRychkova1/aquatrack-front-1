import css from './Page.module.css';

const Page = ({ children }) => {
  return <div className={css.page}>{children}</div>;
};

export default Page;
