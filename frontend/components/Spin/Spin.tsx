import React, { PropsWithChildren } from 'react';
import { styled } from '../../styles/stitches.config';
import { Spin as AntdSpin } from 'antd';
import Loading from '../Loading/Loading';

const StyledSpin = styled(AntdSpin, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

  variants: {
    padding: {
      true: {
        paddingTop: '$lg',
      },
    },
  },
});

interface SpinProps extends PropsWithChildren {
  loading?: boolean;
  padding?: boolean;
  children?: React.ReactNode;
}

const Indicator = <Loading />;

const Spin: React.FC<SpinProps> = ({ loading, children, padding = true }) => {
  return (
    <StyledSpin padding={padding} spinning={loading} indicator={Indicator}>
      {children}
    </StyledSpin>
  );
};

export default Spin;
