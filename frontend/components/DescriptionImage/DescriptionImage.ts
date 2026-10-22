import { styled } from '../../styles/stitches.config';

const DescriptionImage = styled('img', {
  marginBottom: '$sm',
  borderRadius: '$md',

  variants: {
    float: {
      left: {
        float: 'left',
        marginRight: '$sm',
      },
      right: {
        float: 'right',
        marginLeft: '$sm',
      },
    },

    circle: {
      true: {
        borderRadius: '50%',
      },
    },
  },
});

export default DescriptionImage;
