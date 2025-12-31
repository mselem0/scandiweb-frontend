import { MdShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <MdShoppingBag size={24} color="var(--color-primary-green)" />
    </Link>
  );
}

export default Logo;
