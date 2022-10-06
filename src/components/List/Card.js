import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  buyProduct,
  selectWalletPrice,
  sellProduct,
  updateCount,
} from '../../features/products/productsSlice';
import style from './style.module.scss';

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const walletPrice = useSelector(selectWalletPrice);
  const [count, setCount] = useState(product.count);

  useEffect(() => {
    if (product.count !== count) {
      dispatch(updateCount({ ...product, count }));
    }
  }, [count, product, dispatch]);

  const handleChangeValue = (value, item) => {
    const maxAmount = Math.floor(walletPrice / item.price + count);

    if (value <= 0) {
      setCount(0);
    } else if (value <= maxAmount) {
      setCount(value);
    } else if (value >= maxAmount) {
      setCount(maxAmount);
    }
  };

  return (
    <div className={style.card}>
      <img src={product.image} alt={product.name} />
      <div className={style.cardDetail}>
        <p>{product.name}</p>
        <span>${new Intl.NumberFormat('en-US').format(product.price)}</span>
      </div>
      <div className={style.cardFooter}>
        <div className={style.sellButton}>
          <button
            disabled={count === 0}
            onClick={() => {
              sellProduct({ id: product.id });
              setCount(count - 1);
            }}
          >
            Sell
          </button>
        </div>
        <div className={style.counterInput}>
          <input
            value={count}
            onChange={({ target }) =>
              handleChangeValue(parseInt(target.value), product)
            }
            type="number"
            min={0}
          />
        </div>
        <div className={style.buyButton}>
          <button
            disabled={!Math.floor(walletPrice / product.price) > 0}
            onClick={() => {
              buyProduct({ id: product.id });
              setCount(count + 1);
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
