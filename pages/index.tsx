import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { NGROK_URL } from '../constants';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [value, setValue] = useState('');
  let pageId: string;
  let accountId: string;
  const login = () => {
    window.FB.login((res) => {
      console.log(res);
      // authResponse:
      //   accessToken: "EAAF7reetv20BAIoazPXVs74xmMmKtZAIzVz5ZB1ifh4hshaPZBZAqFvWM2FgRTv5t3rN48qZAHd5gUtx8PfdAw3zCbZA9xfR4bj4TqZCq9ZArZBBAfZAfW4ljLlhsHSj9S1nkMsFx7G20rK9OBhZCxFIVssq0FtnXZBZCS3W1aRUZAMDLEc4aWOpM5A1XlPiXvrBP7L79McZBRhaXE5C6gLenzWFf3B"
      //   data_access_expiration_time: 1646791548
      //   expiresIn: 6852
      //   graphDomain: "facebook"
      //   signedRequest: "7ql3CajQgoY2BlVQVylqIjRuGQWZPMde27-VOssP_Qo.eyJ1c2VyX2lkIjoiMTEzMjU3NzY3ODYyMjAyIiwiY29kZSI6IkFRRGtPNllmbVZSLUM4X2V2c3N2YXlBUEd3ZmZmcnVwMFlzLXZGUkpEeU82Q3RqZ0I3dXhQNHdoR1lLMS1BZElkb0FvcEw3LWJKa0dtSy1HdDl1M1dDRTZCcWM5LW5CU0t1N0FBMDdBMEN6WVc0SW95ck55TndSSE1TSy1rQ0R6bmNVWEkxQ2dGYjdtcFhUckZOUHllSm4zZjVkNUQ5cE1SQm96ZDVoUm5QQXFrckU0U2JPQWxvb0o5Tkd2VHdpVVFobkVfeDUtc2JPQlo1dm15Qm9wUTlDRnh0aDlHZlJoOHJHVThwTzlxMUkxVDlvN1p3cDFIb3NZUjAwOTgzbE1uTWFSRmdlMDNwZWlWcERPeDlfa1N5STNoM3d4VENmRnNtZXk0Q0JOeDB3ZXppZ0lidmtPbFkwaXFJcWdTbmNueGxBd0pCU1hKV0g1dDZKYkFBOU43QUt6UURsTV9Xa0lXZnpCcmdWTEtIYzVyaE5neHAtNjJMLXg1Q1pQdU9hc3F1NCIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjM5MDE1NTQ4fQ"
      //   userID: "113257767862202"
      // status: "connected"
      if (res.status === 'connected') {
      }
    }),
      {
        scope:
          'public_profile,pages_show_list,business_management,pages_messaging,instagram_basic,instagram_manage_comments,instagram_content_publish,instagram_manage_messages,pages_read_engagement,pages_manage_metadata',
      };
  };

  const logout = () => {
    window.FB.logout();
  };

  const handleOnSubmit = async () => {
    const res = await fetch(`${NGROK_URL}/social/igUsername`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: value }),
    });
    console.log(await res.json());
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <button onClick={() => login()}>justin_song1124</button>
        <button onClick={() => login()}>justin646819299</button>
        <button onClick={() => logout()}>logout</button>
        <input value={value} onChange={(e) => setValue(e.target.value)}></input>
        <button
          onClick={() => {
            handleOnSubmit();
          }}
        >
          submit
        </button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
