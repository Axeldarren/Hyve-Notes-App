import { Link } from "react-router-dom";
import Image from "../components/Image";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { getUserLevel } from "../utils/nectarUtils";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";

const Homepage = () => {
  const [nectarBalance, setNectarBalance] = useState(0);
  const [userLevel, setUserLevel] = useState("");
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = res.data;
        const userNectar = user.nectar || 0;
        setNectarBalance(userNectar);
        setUserLevel(getUserLevel(userNectar));
        getUserLevel(userNectar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [getToken]);

  const levelInfo = [
    { level: "Worker Bee", range: "0-9 Nectar", description: "The starting level for all users. Share notes to earn more Nectar!" },
    { level: "Soldier Bee", range: "10-49 Nectar", description: "You’re getting stronger! Keep sharing to protect the Hive!" },
    { level: "Royal Bee", range: "50-99 Nectar", description: "You’ve earned respect in the Hive. Share your wisdom with others!" },
    { level: "Queen Bee", range: "100+ Nectar", description: "You’ve reached the highest honor in the Hive! Your knowledge is legendary." },
  ];

  const getLevelClass = (level) => {
    return level === userLevel ? "bg-green-50 border-2 border-green-500" : "bg-white";
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="brown-hyve font-bold">Featured Notes</span>
      </div>
      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="">
          <h1 className="color-hyve text-2xl md:text-5xl lg:text-5xl font-bold">
            Knowledge, Shared Instantly
          </h1>
          <p className="mt-8 text-md md:text-xl">
            <span className="font-bold">Hyve</span> makes your learning journey easier by sharing notes with everyone!
            <br />
          </p>

          {/* Currency (Nectar) display */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-lg font-medium text-gray-600">Nectar Balance:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-yellow-500">{nectarBalance}</span>
              <Image src="Nectar.png" alt="Nectar Coin" className="w-6 h-6" />
            </div>
            <div>
              Level: {userLevel} 🐝
            </div>
          </div>

        </div>

        {/* animated button */}
        <Link to="write" className="hidden md:block relative">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-widest animate-spin animatedButton"
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Earn More Nectars 🍯•
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share Your Notes 🐝•
              </textPath>
            </text>
          </svg>
          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-hyve rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>
      {/* Display Nectar Levels horizontally with highlight */}
      <div className="mt-8 flex gap-8 justify-center">
        {levelInfo.map((level, index) => (
          <div
            key={index}
            className={`flex flex-col items-center border p-4 rounded-xl shadow-md w-64 text-center ${getLevelClass(level.level)}`}
          >
            <h3 className="font-semibold text-lg text-hyve">{level.level}</h3>
            <p className="text-sm text-gray-600">{level.range}</p>
            <p className="text-xs text-gray-500">{level.description}</p>
          </div>
        ))}
      </div>
      {/* CATEGORIES */}
      <MainCategories />
      {/* FEATURED POSTS */}
      <FeaturedPosts />
      {/* POST LIST */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;
