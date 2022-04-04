import { Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, db } from "../firebase";
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
import { Console } from "console";
import { logout } from "../features/userSlice";
import { async } from "@firebase/util";
import Post from "./Post";

const Feed: React.FC = () => {
  // db構造の配列
  const [posts, setPosts] = useState([
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
    return () => {
      // アンマウントされる時に実行されるクリーンアップ関数
      unSub();
    };
  }, []); // マウント時に1回だけ実行

  return (
    <>
      <div className={styles.feed}>
        <button
          onClick={async () => {
            auth.signOut();
          }}
        >
          ログアウト
        </button>
        <TweetInput />
        {posts[0]?.id && (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatar={post.avatar}
                image={post.image}
                text={post.text}
                timestamp={post.timestamp}
                username={post.username}
              />
            ))}
          </>
        )}
        {/* {posts.map((post) => {
          <Post key={post.id} postId={} />;
        })} */}
      </div>
    </>
  );
};

export default Feed;
