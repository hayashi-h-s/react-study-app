import { Avatar } from "@material-ui/core";
import styles from "./TweetInput.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import {
  addDoc,
  collection,
  Firestore,
  serverTimestamp,
} from "firebase/firestore";
import App from "../App";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const TweetInput = () => {
  const user = useSelector(selectUser);
  const [tweetImage, setTweetImage] = useState<File | null>(null);
  const [tweetMsg, setTweetMsg] = useState("");
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      // 1つだけの選択 ! はnonNull であること
      setTweetImage(e.target.files![0]);
      e.target.value = ""; // 連続して同じファイルを選択した時は、初期化しないと反応しない
    }
  };
  const sendTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // submitを行った場合にrefreshを防ぐ
    addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: "Japan",
    });

    if (tweetImage) {
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + tweetImage.name;
      const storageRef = ref(storage, `images/${fileName}`);
      const upLoadTweetImage = uploadBytesResumable(storageRef, tweetImage);
      upLoadTweetImage.on(
        // storageのstateの変化に対する後処理
        "state_changed",
        () => {}, // Progresu,
        (err) => {
          alert(err.message);
        },
        async () => {
          await getDownloadURL(ref(storage, `images`)).then((url) => {
            addDoc(collection(db, "posts"), {
              avatar: user.photoUrl,
              image: url,
              text: tweetMsg,
              timestamp: serverTimestamp(), // 現在時刻の追加
              username: user.displayName,
            });
          });
        }
      );
    } else {
      addDoc(collection(db, "posts"), {
        avatar: user.photoUrl,
        image: "",
        text: tweetMsg,
        timestamp: serverTimestamp(), // 現在時刻の追加
        username: user.displayName,
      });
    }
    setTweetImage(null);
    setTweetMsg("");
  };
  return (
    <div className={styles.tweet_form}>
      <Avatar
        className={styles.tweet_avatar}
        src={user.photoUrl}
        onClick={async () => {
          // await auth.signOut();
          await sendTweet;
        }}
      />
    </div>
  );
};

export default TweetInput;
