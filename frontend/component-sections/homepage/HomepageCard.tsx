import React from 'react';
import { styled } from '../../styles/stitches.config';

const CardImage = styled('div', {
  variants: {
    image: {
      1: {
        backgroundImage: 'url("../assets/images/dnd.png")',
      },
      2: {
        backgroundImage: 'url("../assets/images/fantasy_world.png")',
      },
      3: {
        backgroundImage: 'url("../assets/images/adventure.png")',
      },
      4: {
        backgroundImage: 'url("../assets/images/sci-fi.png")',
      },
      5: {
        backgroundImage: 'url("../assets/images/world_building.png")',
      },
      6: {
        backgroundImage: 'url("../assets/images/open_source.png")',
      },
    },
  },
});

const CardContent = styled('div', {
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
  gap: '$xs',
  width: '400px',
  fontSize: '$md',

  '@xl': {
    width: '500px',
    fontSize: '$md',
  },
  '@media(max-width: 400px)': {
    width: '300px',
    fontSize: '$sm',
    height: '200px',
  },
});

const CardHeader = styled('h3', {
  fontFamily: '$heading',
  color: '$primary',
  textDecoration: 'underline',
  '@media(max-width: 400px)': {
    fontSize: '$lg',
  },
});

const Card = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$md',
  height: '200px',
  flexGrow: '1',
  padding: '$0',
  boxSizing: 'border-box',
  transition: 'all 0.4s',
  backgroundColor: '$white100',

  '@xsMax': {
    flexDirection: 'column',
    height: '400px',
  },
  '@media(max-width: 400px)': {
    width: '300px',
  },

  [`& ${CardImage}`]: {
    height: '200px',
    width: '400px',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'all 0.4s',

    '@smMax': {
      width: '100px',
      backgroundSize: '200%',
    },
    '@xsMax': {
      width: '400px',
      backgroundSize: '100%',
    },
    '@media(max-width: 400px)': {
      width: '300px',
    },
    '@sm': {
      width: '400px',
      backgroundSize: '100%',
    },
    '@md': {
      width: '100px',
      backgroundSize: '200%',
    },
    '@media(min-width: 1600px)': {
      width: '200px',
      backgroundSize: '100%',
    },
  },

  '@media (hover: hover)': {
    [`&:hover`]: {
      transform: 'scale(1.05)',
    },
  },

  [`&:hover ${CardImage}`]: {
    backgroundSize: '125%',

    '@smMax': {
      backgroundSize: '225%',
    },
    '@xsMax': {
      backgroundSize: '125%',
    },
    '@sm': {
      backgroundSize: '125%',
    },
    '@md': {
      backgroundSize: '275%',
    },
    '@media(min-width: 1600px)': {
      backgroundSize: '175%',
    },
  },

  variants: {
    cardType: {
      left: {
        maskImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',
        paddingRight: '70px',

        '@xsMax': {
          paddingRight: '$0',
          maskImage: 'none',
        },
      },
      right: {
        maskImage:
          'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 1) 100%)',
        textAlign: 'right',
        paddingLeft: '70px',

        '@mdMax': {
          flexDirection: 'row-reverse',
          maskImage:
            'linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',
          textAlign: 'left',
          paddingLeft: '$0',
          paddingRight: '70px',
        },

        '@xsMax': {
          flexDirection: 'column-reverse',
          paddingRight: '$0',
          maskImage: 'none',
          justifyContent: 'flex-end',
        },
      },
    },
  },
});

export interface HomepageCardProps {
  image: '1' | '2' | '3' | '4' | '5' | '6';
  cardType: 'left' | 'right';
  heading: string;
  text: string;
}

const HomepageCard: React.FC<HomepageCardProps> = ({ image, cardType, heading, text }) => {
  return (
    <Card cardType={cardType}>
      {cardType === 'left' && <CardImage image={image} />}
      <CardContent>
        <CardHeader>{heading}</CardHeader>
        {text}
      </CardContent>
      {cardType === 'right' && <CardImage image={image} />}
    </Card>
  );
};

export default HomepageCard;
