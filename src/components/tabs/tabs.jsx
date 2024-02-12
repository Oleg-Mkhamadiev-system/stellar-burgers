import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tabs.module.css";
import PropTypes from 'prop-types';

export function Tabs({ current, setCurrent }) {
  //const [current, setCurrent] = React.useState("Булки");
  return (
    <div className={styles.tabs}>
      <Tab value="Булки" active={current === "Булки"}
      onClick={() => setCurrent("Булки")}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"}
      onClick={() => setCurrent("Соусы")}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"}
      onClick={() => setCurrent("Начинки")}>
        Начинки
      </Tab>
    </div>
  );
};

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  setCurrent: PropTypes.func.isRequired
};
