import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tabs.module.css";

export function Tabs() {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div className={styles.tabs}>
      <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};
