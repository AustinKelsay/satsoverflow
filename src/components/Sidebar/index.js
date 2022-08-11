import React from "react";
import { Link } from "next/link";
import styles from "./styles.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <p>Questions</p>
      <p>Tags</p>
      <p>Users</p>
    </div>
  );
};

export default Sidebar;
