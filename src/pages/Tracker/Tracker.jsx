import { Helmet } from "react-helmet-async";
import Logo from "../../components/Logo/Logo";
import UniversalModal from "../../modals/Modal/Modal";
import UserPanel from "../../components/UserMenu/UserMenu";

const Tracker = () => {
  return (
    <>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Logo />
      <h2>Tracker Page</h2>
      <UniversalModal>
        <h2>Модальне Вікно</h2>
      </UniversalModal>
      <UserPanel />
    </>
  );
};

export default Tracker;
