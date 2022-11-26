import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Score from "../components/score";
import Main from "../components/Main";
import Board from "../components/board";
import AppContext from "../components/AppContext";
import { useContext } from "react";
export default function Home() {
  const context = useContext(AppContext);
  return (
    <div>
      <Main />
    </div>
  );
}
