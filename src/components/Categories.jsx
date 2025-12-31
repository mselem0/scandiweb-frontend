import { Link, useLocation } from "react-router-dom";
import styles from "./Categories.module.css";
import { useCategories } from "../context/CategoriesContext";

function Categories() {
  const { categories } = useCategories();
  const location = useLocation();

  return (
    <nav className={styles["header-nav"]}>
      {categories.map((category) => {
        const isActive = location.pathname === `/categories/${category.slug}`;
        
        return (
          <Link
            key={category.slug}
            to={`/categories/${category.slug}`}
            className={`${styles["header-nav-link"]} ${isActive ? styles["header-nav-link--active"] : ""}`}
            data-testid={isActive ? "active-category-link" : "category-link"}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Categories;
