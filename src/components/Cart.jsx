import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";
import { IoCartOutline } from "react-icons/io5";

function Cart() {
  const { toggleCart, getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <span 
      className={styles["cart-btn"]} 
      onClick={() => toggleCart()}
      style={{ position: 'relative', cursor: 'pointer' }}
      data-testid="cart-btn"
    >
      <IoCartOutline size={24} />
      {itemCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontWeight: 'bold',
          }}
        >
          {itemCount}
        </span>
      )}
    </span>
  );
}

export default Cart;
