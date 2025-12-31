import styles from "./Header.module.css";

function Header({ children }) {
  return (
    <header className={styles.header}>
      <div className={styles["header-container"]}>{children}</div>
    </header>
  );
}

export default Header;
