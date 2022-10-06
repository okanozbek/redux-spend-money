import { useSelector } from 'react-redux';
import {
  selectDiffPrice,
  selectWalletPrice,
} from '../../features/products/productsSlice';
import style from './style.module.scss';

const Footer = () => {
  const receiptItems = useSelector((state) => state.products.receiptItems);
  const walletPrice = useSelector(selectWalletPrice);
  const diffPrice = useSelector(selectDiffPrice);

  const receiptItemsTotalPrice = diffPrice - walletPrice;
  return (
    <>
      {receiptItems.length > 0 && (
        <>
          <div className={style.footer}>
            <h2>Your Receipt</h2>
            <div className={style.receiptWrapper}>
              {receiptItems.map((product) => (
                <div className={style.receiptItems}>
                  <div>{product.name}</div>
                  <div>x{product.count}</div>
                  <div>
                    {Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      notation: 'compact',
                    }).format(product.count * product.price)}
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <h3 className={style.walletPrice}>
              TOTAL : $
              {Intl.NumberFormat('en-US').format(receiptItemsTotalPrice)}
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default Footer;
