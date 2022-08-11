import React from "react";
import { Link } from "next/link";
import { FaStackOverflow } from "react-icons/fa";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <FaStackOverflow size={35} color={"orange"} />
    </div>
  );
};

export default Header;
