import { useSelector } from 'react-redux/es';
import style from './style.module.scss';
import { useSpring, animated } from 'react-spring';
import { selectWalletPrice } from '../../features/products/productsSlice';

const MoneyBar = () => {
  const walletPrice = useSelector(selectWalletPrice);

  return (
    <div className={style.moneyBar}>
      <Balance balance={walletPrice} />
    </div>
  );
};

function Balance({ balance }) {
  const props = useSpring({ val: balance, from: { val: 0 } });
  let balanceLength = balance.toString().length;
  return (
    <>
      <animated.span className="money">
        {props.val.to((val) =>
          Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumSignificantDigits:
              balanceLength === 12 ? balanceLength - 1 : balanceLength,
          }).format(val)
        )}
      </animated.span>
    </>
  );
}

export default MoneyBar;
