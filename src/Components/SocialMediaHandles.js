import React, { useEffect, useState } from "react";
import "../css/SocialMediaHandles.css";
import InstagramEmbed from "./InstagramEmbed";
import { FaLinkedin } from "react-icons/fa";
import { db, collection, getDocs } from "../firebase";

const SocialMediaHandles = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "instagramPosts");
        const snapshot = await getDocs(postsCollection);
        const urls = snapshot.docs
          .map(doc => doc.data().url)
          .slice(0, 3); 
        setPosts(urls);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="socialtitle-container">
        <hr className="line" />
        <span className="socialmediaTitle md:text-[1.5rem] sm:text-[1.5rem] text-[1.5rem]">
          Social Media Handles
        </span>
        <hr className="line" />
      </div>
      <div className="social-media">
        <a
          href="https://www.instagram.com/interiit_sports2024?igsh=MmpteTdsMTFnemg2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="../../assets/Instagram.png"
            alt="Instagram"
            className="socialmedialogo"
          />
        </a>
        <a href="https://x.com/interiit_sports?s=09" target="_blank" rel="noopener noreferrer">
          <img
            src="../../assets/TwitterX.png"
            alt="Twitter"
            className="socialmedialogo"
          />
        </a>
        <a
          href="https://www.linkedin.com/company/inter-iit-sports-meet/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="socialmedialogo" />
        </a>
      </div>
      <span className="social-media-cards-title md:text-[64px] sm:text-[40px] text-[30px]">
        Latest stories running around
      </span>
      <hr className="underline" />
      <div className="social-media-cards">
        {posts.map((post, index) => (
          <div className="social-media-card" key={index}>
            <InstagramEmbed url={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaHandles;

