import { Audio } from '@remotion/media';
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';

type Scene = {
  image: string;
  title: string;
  subtitle: string;
};

const SCENES: Scene[] = [
  {
    image: 'video/europe/01-eiffel.jpg',
    title: '巴黎 · 法国',
    subtitle: '晨光与铁塔',
  },
  {
    image: 'video/europe/02-venice.jpg',
    title: '威尼斯 · 意大利',
    subtitle: '水巷里的慢节奏',
  },
  {
    image: 'video/europe/03-hallstatt.jpg',
    title: '哈尔施塔特 · 奥地利',
    subtitle: '湖面与山间村落',
  },
  {
    image: 'video/europe/04-geirangerfjord.jpg',
    title: '盖朗厄尔峡湾 · 挪威',
    subtitle: '北欧冷色系风景',
  },
  {
    image: 'video/europe/05-jungfrau.jpg',
    title: '少女峰 · 瑞士',
    subtitle: '雪线之上的宁静',
  },
  {
    image: 'video/europe/06-cinque-terre.jpg',
    title: '五渔村 · 意大利',
    subtitle: '海边彩色山城',
  },
];

const FPS = 30;
const SCENE_DURATION = 180;
const TRANSITION_DURATION = 24;

export const EUROPE_VIDEO_DURATION_FRAMES =
  SCENES.length * SCENE_DURATION - (SCENES.length - 1) * TRANSITION_DURATION;

const subtitleStyle: React.CSSProperties = {
  marginTop: 12,
  fontFamily: '"Noto Sans SC", "Microsoft YaHei", sans-serif',
  letterSpacing: 1.5,
  fontSize: 28,
  color: 'rgba(255, 255, 255, 0.9)',
};

const titleStyle: React.CSSProperties = {
  fontFamily: '"Noto Serif SC", "Songti SC", serif',
  fontSize: 64,
  letterSpacing: 2,
  color: '#fff',
  textShadow: '0 6px 24px rgba(0,0,0,0.38)',
  margin: 0,
};

const IntroCard = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 18, 80, 110], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const y = interpolate(frame, [0, 110], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          background:
            'linear-gradient(120deg, rgba(22,28,39,0.55), rgba(26,22,16,0.45))',
          border: '1px solid rgba(255,255,255,0.24)',
          borderRadius: 18,
          padding: '34px 52px',
          backdropFilter: 'blur(3px)',
        }}
      >
        <h1 style={{ ...titleStyle, fontSize: 72 }}>欧洲旅行氛围片</h1>
        <p style={{ ...subtitleStyle, fontSize: 30, marginTop: 18 }}>
          30 秒沉浸式风景漫游
        </p>
      </div>
    </AbsoluteFill>
  );
};

const OutroCard = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 24, 72], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          padding: '20px 36px',
          background: 'rgba(10, 12, 16, 0.35)',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <h2 style={titleStyle}>下一站，继续出发</h2>
        <p style={subtitleStyle}>Europe Travel Mood Reel</p>
      </div>
    </AbsoluteFill>
  );
};

const SceneCard = ({
  scene,
  index,
  isFirst,
  isLast,
}: {
  scene: Scene;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const frame = useCurrentFrame();
  const progress = frame / (SCENE_DURATION - 1);

  const scaleStart = index % 2 === 0 ? 1.07 : 1.14;
  const scaleEnd = index % 2 === 0 ? 1.16 : 1.06;
  const panXStart = index % 2 === 0 ? -4 : 4;
  const panXEnd = -panXStart;
  const panYStart = index % 3 === 0 ? -2 : 2;
  const panYEnd = -panYStart;

  const scale = interpolate(progress, [0, 1], [scaleStart, scaleEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panX = interpolate(progress, [0, 1], [panXStart, panXEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const panY = interpolate(progress, [0, 1], [panYStart, panYEnd], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeIn = isFirst
    ? 1
    : interpolate(frame, [0, TRANSITION_DURATION], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const fadeOut = isLast
    ? 1
    : interpolate(
        frame,
        [SCENE_DURATION - TRANSITION_DURATION, SCENE_DURATION],
        [1, 0],
        {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        },
      );
  const opacity = Math.min(fadeIn, fadeOut);

  const captionOpacity = interpolate(frame, [16, 40, 148, 170], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ opacity, overflow: 'hidden' }}>
      <Img
        src={staticFile(scene.image)}
        style={{
          width: '112%',
          height: '112%',
          objectFit: 'cover',
          transform: `translate(${panX}%, ${panY}%) scale(${scale})`,
          filter: 'saturate(1.12) contrast(1.07) brightness(0.9)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.42) 88%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0, transparent 30%), radial-gradient(circle at 80% 70%, rgba(255,170,120,0.07) 0, transparent 30%)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 92,
          bottom: 78,
          opacity: captionOpacity,
          padding: '18px 24px',
          borderRadius: 14,
          background: 'rgba(16, 19, 24, 0.36)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(2px)',
        }}
      >
        <h2 style={titleStyle}>{scene.title}</h2>
        <p style={subtitleStyle}>{scene.subtitle}</p>
      </div>
    </AbsoluteFill>
  );
};

export const EuropeTravelMood30s = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#090c11' }}>
      <Audio src={staticFile('video/audio/clair-de-lune.ogg')} volume={0.32} />

      {SCENES.map((scene, index) => {
        const from = index * (SCENE_DURATION - TRANSITION_DURATION);
        return (
          <Sequence
            key={scene.image}
            from={from}
            durationInFrames={SCENE_DURATION}
            premountFor={FPS}
          >
            <SceneCard
              scene={scene}
              index={index}
              isFirst={index === 0}
              isLast={index === SCENES.length - 1}
            />
          </Sequence>
        );
      })}

      <Sequence from={18} durationInFrames={112} premountFor={FPS}>
        <IntroCard />
      </Sequence>
      <Sequence from={EUROPE_VIDEO_DURATION_FRAMES - 84} durationInFrames={84}>
        <OutroCard />
      </Sequence>
    </AbsoluteFill>
  );
};
