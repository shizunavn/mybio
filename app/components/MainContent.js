// app/components/MainContent.js
"use client";

import { motion } from 'framer-motion';
import ParallaxTilt from 'react-parallax-tilt';
import { FaGithub, FaYoutube, FaFacebook, FaDiscord, FaEnvelope, FaCube } from "react-icons/fa";
import InfoRow from './InfoRow';
import AnimatedText from './AnimatedText';
import { useDevice } from '../context/DeviceContext';

const socialLinksData = [
  { href: "https://www.youtube.com/@Memayybo", icon: <FaYoutube size={24} />, label: "Memayybo" },
  { href: "https://www.facebook.com/profile.php?id=61591530574387", icon: <FaFacebook size={24} />, label: "Vuong Lam Nguyen" },
  { href: "https://github.com/shizunavn", icon: <FaGithub size={24} />, label: "Memaybeo192" },
  { href: "https://namemc.com/profile/Sayuna_VN.1", icon: <FaCube size={24} />, label: "Sayuna_VN" },
];
const infoData = [
    { icon: <FaDiscord size={24} />, text: "lam017367", copyText: "lam017367" },
    { icon: <FaEnvelope size={24} />, text: "nguyenvuonglam74@gmail.com", copyText: "nguyenvuonglam74@gmail.com" },
];

const listItems = [
  ...socialLinksData.map(item => ({ ...item, type: 'social' })),
  ...infoData.map(item => ({ ...item, type: 'info' }))
];

const mainCardVariants = {
  hidden: { 
    clipPath: 'inset(45% 45% 45% 45% round 24px)',
    scale: 0.9,
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 24px)',
    scale: 1,
    opacity: 1,
    transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
    }
  }
};

const introVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3 
    },
  },
};

const listContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.5, 
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
};

const SocialLink = ({ href, icon, label, variants }) => {
  const isMobile = useDevice();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shine-effect interactive-item flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 w-full"
      aria-label={label}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      variants={variants}
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-4">
        <span className={!isMobile ? 'animate-glow' : ''}>{icon}</span>
        <AnimatedText text={label} className="font-medium" />
      </div>
    </motion.a>
  );
};

const MainCard = ({ assetUrls, onAnimationComplete }) => (
  <motion.main 
    className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-black/25 backdrop-blur-lg border border-white/10 overflow-hidden"
    key="main-card"
    variants={mainCardVariants}
    initial="hidden"
    animate="visible"
    onAnimationComplete={onAnimationComplete}
    style={{ willChange: 'transform, clip-path, opacity' }}
  >
    <motion.div 
      variants={introVariants} 
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center gap-6"
    >
      <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          {assetUrls['/avatar.mp4'] && (
            <motion.video
              src={assetUrls['/avatar.mp4']}
              aria-hidden="true" autoPlay loop muted playsInline
              width={120} height={120}
              className="rounded-full border-2 border-white/20"
              style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)'}}
            />
          )}
        </motion.div>
        <div className="flex flex-col gap-3">
          <motion.h1 className="animated-gradient-text text-3xl font-bold tracking-tight">
            Shizuna (Lam)
          </motion.h1>
          <AnimatedText
            text="Just a normal person | Birthday 18/1"
            className="text-md text-white/70 justify-center"
            type="word"
          />
        </div>
    </motion.div>

    <motion.div 
      className="mt-10 flex flex-col gap-3"
      variants={listContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {listItems.map((item) => 
        item.type === 'social' ? (
          <SocialLink key={item.label} variants={listItemVariants} {...item} />
        ) : (
          <InfoRow key={item.text} variants={listItemVariants} {...item} />
        )
      )}
    </motion.div>
  </motion.main>
);

export default function MainContent({ assetUrls, isAnimationDone, setHideParticles, setIsAnimationDone }) {
  const isMobile = useDevice();

  const MainCardComponent = (
    <MainCard 
      assetUrls={assetUrls} 
      onAnimationComplete={() => {
        setIsAnimationDone(true);
        setHideParticles(false);
      }} 
    />
  );

  return isMobile ? (
    <div className="z-10">{MainCardComponent}</div>
  ) : (
    <ParallaxTilt
      className="z-10"
      perspective={1000} 
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.03}
      glareEnable={isAnimationDone}
      glareMaxOpacity={0.2} 
      glarePosition="all"
      transitionSpeed={1500} 
    >
      {MainCardComponent}
    </ParallaxTilt>
  );
}
