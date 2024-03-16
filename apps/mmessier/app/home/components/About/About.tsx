import { AboutClient } from './About.client';
import { basicStyles } from './styles';

export const About = () => {
  return (
    <div style={basicStyles.static?.aboutContainer}>
      <div style={basicStyles.static?.aboutTextContainer}>
        <AboutClient />
      </div>
    </div>
  );
};
