import MoneyBar from './MoneyBar';
import style from './style.module.scss';

const Header = () => {
  return (
    <>
      <div className={style.header}>
        <img src="/assets/header/billgates.jpg" alt="Bill Gates" />
        <h1>Spend Bill Gates' Money </h1>
      </div>
      <MoneyBar />
    </>
  );
};

export default Header;
