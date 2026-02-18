import { Composition, registerRoot } from 'remotion';
import {
  EUROPE_VIDEO_DURATION_FRAMES,
  EuropeTravelMood30s,
} from './EuropeTravelMood30s';

const RemotionRoot = () => {
  return (
    <Composition
      id="EuropeTravelMood30s"
      component={EuropeTravelMood30s}
      fps={30}
      width={1920}
      height={1080}
      durationInFrames={EUROPE_VIDEO_DURATION_FRAMES}
    />
  );
};

registerRoot(RemotionRoot);
