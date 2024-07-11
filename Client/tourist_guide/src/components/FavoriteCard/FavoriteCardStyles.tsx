import { CSSProperties } from "react";

export const cardStyles: CSSProperties = {
  width: 280,
  borderRadius: 16,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
};

export const imageStyles: CSSProperties = {
  height: 240,
  objectFit: "cover",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
};

export const descriptionContainerStyles: CSSProperties = {
  maxHeight: "1000px",
  overflow: "hidden",
  transition: "max-height 0.15s ease-out",
};

export const descriptionContainerCollapsedStyles: CSSProperties = {
  maxHeight: "50px",
};
