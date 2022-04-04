import { Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import TweetInput from "./TweetInput";
import styles from "./Feed.module.css";

const Feed = () => {
  return (
    <div className={styles.feed}>
      <div>Feed</div>
      <TweetInput />
      <div>
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </div>
    </div>
  );
};

export default Feed;
