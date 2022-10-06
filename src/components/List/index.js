import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es';
import { fetchProducts } from '../../features/products/productsSlice';
import { selectItems } from '../../features/products/productsSlice';
import Card from './Card';
import style from './style.module.scss';

const List = () => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={style.productList}>
      {items.map((product, index) => (
        <Card product={product} key={index} />
      ))}
    </div>
  );
};

export default List;
