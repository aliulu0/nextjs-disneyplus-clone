/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import Logo from "../public/images/logo.png";
import styles from "../styles/Header.module.css";
import { AiFillHome, AiFillStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { RiMovie2Fill } from "react-icons/ri";
import { TbDeviceTvOld } from "react-icons/tb";
import { useRouter } from "next/router";
import { useAuth } from "../context/UserContext";
function Header() {
  const router = useRouter();
  const { currentUser, logOut, logIn } = useAuth();
  return (
    <div className={styles.nav}>
      <div onClick={() => router.reload()}>
        <Image className={styles.headerLogo} src={Logo} alt="logo" />
      </div>

      {currentUser.id !== undefined && (
        <div className={styles.navMenu}>
          <a onClick={() => router.push("/home")}>
            <div className={styles.headerImage}>
              <AiFillHome />
            </div>
            <span>home</span>
          </a>
          <a onClick={() => router.push("/search/")}>
            <div className={styles.headerImage}>
              <FiSearch />
            </div>
            <span>search</span>
          </a>
          <a>
            <div className={styles.headerImage}>
              <BsPlusLg />
            </div>
            <span>Watchlist</span>
          </a>
          <a>
            <div className={styles.headerImage}>
              <AiFillStar />
            </div>
            <span>originals</span>
          </a>
          <a onClick={() => router.push("/movies/")}>
            <div className={styles.headerImage}>
              <RiMovie2Fill />
            </div>
            <span>movies</span>
          </a>
          <a onClick={() => router.push("/series/")}>
            <div className={styles.headerImage}>
              <TbDeviceTvOld />
            </div>
            <span>series</span>
          </a>
        </div>
      )}
      {currentUser.id !== undefined ? (
        <img
          className={styles.headerUserImg}
          src={currentUser?.avatar}
          alt="userImage"
          onClick={logOut}
        />
      ) : (
        <button className={styles.headerBtn} onClick={logIn}>
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
