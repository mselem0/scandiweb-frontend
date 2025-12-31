import styles from "./MainContent.module.css";
function MainContent({ children }) {
  return <div className={styles["main-content"]}>{children}</div>;
}

export default MainContent;
