import { Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { db } from "../firebase";
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css";
import { useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    // db構造の配列
    {
      id: "",
      avatar: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);
  useEffect(() => {
    const ref = collection(db, "posts");
    const q = query(ref, orderBy("timestamp", "desc")); // 時刻の降順
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          avatar: doc.data().avatar,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        }))
      );
    });
    return () => { // アンマウントされる時に実行されるクリーンアップ関数
      unSub();
    };
  }, []); // マウント時に1回だけ実行

  return (
    <div className={styles.feed}>
      <TweetInput />
    </div>
  );
};

export default Feed;
