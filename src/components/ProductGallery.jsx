import { MdNavigateNext } from "react-icons/md";
import styles from "./ProductGallery.module.css";
import { GrFormPrevious } from "react-icons/gr";
import { useState } from "react";
function ProductGallery({ product }) {
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const gallery = product.gallery;

  function handleActiveThumbInc() {
    setActiveThumbnail((cur) => {
      if (cur >= gallery.length - 1) {
        return 0;
      } else {
        return cur + 1;
      }
    });
  }

  function handleActiveThumbDec() {
    setActiveThumbnail((cur) => {
      if (cur === 0) {
        return gallery.length - 1;
      } else {
        return cur - 1;
      }
    });
  }

  return (
    <div className={styles["product-gallery"]} data-testid="product-gallery">
      <div className={styles["product-gallery-thumbnails"]}>
        {gallery.map((img, i) => {
          return (
            <div
              key={i}
              onClick={() => setActiveThumbnail(i)}
              className={`${styles["product-gallery-thumbnail"]} ${
                activeThumbnail === i
                  ? styles["product-gallery-thumbnail--active"]
                  : ""
              } `}
            >
              <img src={img} alt={product.name} />{" "}
            </div>
          );
        })}
      </div>
      <div className={styles["product-gallery-main"]}>
        <img
          className={styles["product-gallery-main-image"]}
          src={gallery[activeThumbnail]}
          alt={product.name}
        />
        <div>
          <div
            onClick={handleActiveThumbDec}
            className={`${styles["product-gallery-nav--prev"]} ${styles["product-gallery-nav"]}`}
          >
            <GrFormPrevious />
          </div>
          <div
            onClick={handleActiveThumbInc}
            className={`${styles["product-gallery-nav--next"]} ${styles["product-gallery-nav"]}`}
          >
            <MdNavigateNext />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGallery;
