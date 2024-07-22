"use client";
import Image from "next/image";
import Header from "./components/header";
import img from '../../public/home-back.jpg';
import { motion, useScroll } from "framer-motion";

import img2 from '../../public/group.jpg';
import img3 from '../../public/community.jpg'
import greenCircle from '../../public/green-circle-icon.svg';

import * as Aos from 'aos';
import { useEffect } from "react";
import "aos/dist/aos.css";
import Footer from "./components/footer";



export default function Home() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    
    <main className="min-h-screen">
      <motion.div
        className="progress-bar"
        style={{ scaleX: scrollYProgress }}
      />
      <Header />
      <section className={"w-full relative"} id="hero_section" style={{ backgroundImage: `url(${img.src})`, }}>
        <div className="w-full hero-title-div px-16 absolute top-0">
          <div className="title-div  mt-40 text-start" data-aos="fade-right" data-aos-duration="2000">
            <h1 className="hero-logo">Graph  </h1>
            <span className="logo-span"> Community </span>
            <h5 className="slogen">Make your Happy 😊 , Strong Connections  </h5>
          </div>
        </div>
      </section>

      <section className="w-full mt-16" id="about_section" >
        <div className="text-center">
          <span className="hero-title-about">About Us</span>
        </div>
        <div className="flex mt-10 flex-wrap section-main mb-4">
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="h-auto relative" data-aos="zoom-in" data-aos-duration="2000">
              <Image src={img2} alt="group" className="w-100 section-img" />
              <Image src={greenCircle} alt="green" className="absolute up-down green-svg1" />
              <Image src={greenCircle} alt="green" width={100} className="absolute up-down green-svg2" />
            </div>
          </div>
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="text-sm text-grey-dark flex items-center justify-center">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl text-title mb-4">
                  Welcome to Graph Community!
                </h1>
                <p className="text-gray-700 mb-4">
                  At Graph Community, we believe in the power of community-driven
                  knowledge sharing. Just like Stack Overflow has revolutionized how
                  programmers seek help and share insights, we aim to create a vibrant
                  platform where individuals from all backgrounds and expertise levels can
                  come together to exchange knowledge, solve problems, and foster innovation.
                </p>
                <h2 className="text-2xl text-title mb-4">
                  Why choose Graph Community?
                </h2>
                <ul className="list-disc ml-6 mb-6">
                  <li className="text-gray-700">
                    <span className="font-bold">Community-Driven </span>: <p>Our platform is powered by a passionate community of
                      users who actively contribute their expertise and insights to help others.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Quality Content </span>: <p>Say goodbye to sifting through endless forums and
                      outdated documentation. At Graph Community, you&apos;ll find curated
                      content and solutions vetted by experts in the field.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Diverse Topics </span>:<p>From programming languages and frameworks to software
                      development methodologies and industry best practices, Graph Community
                      covers a wide range of topics to cater to all interests and skill levels.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold"> Engagement and Recognition </span>: <p> Earn reputation points, badges, and
                      recognition for your contributions to the community. Whether you&apos;re
                      answering questions, sharing tips, or contributing valuable resources,
                      your efforts won&apos;t go unnoticed.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Collaboration and Learning </span>: <p>Graph Community is more than just a
                      Q&amp;A platform. It&apos;s a place to collaborate on projects, participate in
                      discussions, and learn from the experiences of others.</p>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Join us at Graph Community and be part of a thriving community of
                  knowledge seekers, problem solvers, and tech enthusiasts. Together, let&apos;s
                  empower each other to learn, grow, and succeed in the ever-evolving world of
                  technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full" id="community" >
        <div className="text-center">
          <span className="hero-title-about">Community</span>
        </div>
        <div className="flex mt-10 flex-wrap section-main mb-4">
          <div className="w-full  lg:w-1/2 px-2 mb-4">
          <div className="text-sm text-grey-dark flex items-center justify-center">
              <div className="bg-white rounded-lg p-5">
                <h1 className="text-3xl text-title mb-4">
                  Welcome to Graph Community!
                </h1>
                <p className="text-gray-700 mb-4">
                  At Graph Community, we believe in the power of community-driven
                  knowledge sharing. Just like Stack Overflow has revolutionized how
                  programmers seek help and share insights, we aim to create a vibrant
                  platform where individuals from all backgrounds and expertise levels can
                  come together to exchange knowledge, solve problems, and foster innovation.
                </p>
                <h2 className="text-2xl text-title mb-4">
                  Why choose Graph Community?
                </h2>
                <ul className="list-disc ml-6 mb-6">
                  <li className="text-gray-700">
                    <span className="font-bold">Community-Driven </span>: <p>Our platform is powered by a passionate community of
                      users who actively contribute their expertise and insights to help others.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Quality Content </span>: <p>Say goodbye to sifting through endless forums and
                      outdated documentation. At Graph Community, you&apos;ll find curated
                      content and solutions vetted by experts in the field.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Diverse Topics </span>:<p>From programming languages and frameworks to software
                      development methodologies and industry best practices, Graph Community
                      covers a wide range of topics to cater to all interests and skill levels.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold"> Engagement and Recognition </span>: <p> Earn reputation points, badges, and
                      recognition for your contributions to the community. Whether you&apos;re
                      answering questions, sharing tips, or contributing valuable resources,
                      your efforts won&apos;t go unnoticed.</p>
                  </li>
                  <li className="text-gray-700">
                    <span className="font-bold">Collaboration and Learning </span>: <p>Graph Community is more than just a
                      Q&amp;A platform. It&apos;s a place to collaborate on projects, participate in
                      discussions, and learn from the experiences of others.</p>
                  </li>
                </ul>
                <p className="text-gray-700">
                  Join us at Graph Community and be part of a thriving community of
                  knowledge seekers, problem solvers, and tech enthusiasts. Together, let&apos;s
                  empower each other to learn, grow, and succeed in the ever-evolving world of
                  technology.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  lg:w-1/2 px-2 mb-4">
            <div className="h-100 flex justify-center items-center relative" data-aos="zoom-in" data-aos-duration="2000">
              <Image src={img3} alt="community" className="w-100 section-img" />
              <Image src={greenCircle} alt="green" className="absolute up-down green-svg1" />
              <Image src={greenCircle} alt="green" width={100} className="absolute up-down green-svg2" />
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
