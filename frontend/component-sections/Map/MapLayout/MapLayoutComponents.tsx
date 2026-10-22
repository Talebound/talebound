import { styled } from '../../../styles/stitches.config';
import { Col, Row } from '../../../components/Flex/Flex';

export const MapWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  transition: '0.3s all',
  minWidth: '300px',
  overflow: 'hidden',
});

export const MapLayerContainer = styled('div', {
  height: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexGrow: 1,
  position: 'relative',
  transition: '0.3s all',
  overflow: 'hidden',
  userSelect: 'none',
});

export const MapLayers = styled('div', {
  height: '100%',
});

export const MapLayerImage = styled('img', {
  position: 'absolute',
  transition: '0.3s all',
  top: 0,
});

export const MapLayerOverlay = styled('div', {
  zIndex: 8,
  boxSizing: 'border-box',
  position: 'absolute',
  width: '250px',
  maxHeight: 'calc(100% - 2 * $sm)',
  top: 0,
  right: 0,
  margin: '$sm',
  padding: '$sm',
  paddingTop: 'calc($xl + $sm)',
  transition: '0.3s all',
  backgroundColor: '$white',
  opacity: 0.8,
  borderRadius: '$md',
});

export const MapLayerOverlayButtons = styled(Row, {
  zIndex: 9,
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
  margin: 'calc(2 * $sm)',
});

export const MapSidebarSolid = styled(Col, {
  height: '100%',
  transition: '0.3s all',
  // backgroundColor: '$white',
});

export const MapSidebarSection = styled(Col, {
  flexGrow: 1,
  minHeight: '75px',
  // flexBasis: '25%',
  transition: '0.3s all',
  backgroundColor: '$white',
  overflowY: 'auto',
});
