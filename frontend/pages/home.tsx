import Head from 'next/head';
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Client } from 'react-hydration-provider';
import { Col } from '../components/Flex/Flex';
import Layout from '../components/Layout/Layout';
import LeftNavbar from '../components/LeftNavbar/LeftNavbar';
import DynamicIcon from '../components/DynamicIcon/DynamicIcon';

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Head>
        <title>Talebound</title>
      </Head>
      <Layout mandatoryLogin={true} navbar={<LeftNavbar />}>
        <Col gap="lg" padding="lg">
          <Client>{user?.email}</Client>
          <Client>Logged in = {isLoggedIn ? 'true' : 'false'}</Client>
          <DynamicIcon icon="GiAlienBug" size="305px" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in
            massa tempor. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Morbi
            enim nunc faucibus a pellentesque sit amet. Pulvinar mattis nunc sed blandit libero
            volutpat sed cras ornare. Metus dictum at tempor commodo ullamcorper a lacus vestibulum.
            Egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam. Amet tellus cras
            adipiscing enim. Dis parturient montes nascetur ridiculus mus. Faucibus turpis in eu mi
            bibendum neque egestas. Aliquet eget sit amet tellus cras adipiscing enim eu. Sagittis
            id consectetur purus ut faucibus pulvinar elementum integer enim. Lorem ipsum dolor sit
            amet consectetur adipiscing.
          </p>

          <p>
            Turpis cursus in hac habitasse platea dictumst quisque. Nisl nisi scelerisque eu
            ultrices vitae. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque
            eu. Accumsan lacus vel facilisis volutpat. Orci porta non pulvinar neque. Nec nam
            aliquam sem et tortor consequat id porta nibh. Quisque egestas diam in arcu cursus
            euismod quis viverra nibh. Tincidunt lobortis feugiat vivamus at augue. Platea dictumst
            quisque sagittis purus sit amet volutpat. Orci eu lobortis elementum nibh tellus
            molestie nunc non blandit.
          </p>

          <p>
            Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Porttitor
            lacus luctus accumsan tortor posuere ac ut consequat. Non pulvinar neque laoreet
            suspendisse interdum consectetur libero id faucibus. Purus gravida quis blandit turpis
            cursus in hac habitasse platea. Sit amet consectetur adipiscing elit pellentesque.
            Adipiscing bibendum est ultricies integer quis auctor elit. Faucibus et molestie ac
            feugiat sed lectus vestibulum mattis ullamcorper. Sit amet nisl purus in mollis nunc
            sed. Pellentesque habitant morbi tristique senectus et netus. Fringilla ut morbi
            tincidunt augue interdum velit euismod in pellentesque. Ipsum dolor sit amet consectetur
            adipiscing elit ut. In nulla posuere sollicitudin aliquam ultrices sagittis orci a
            scelerisque.
          </p>

          <p>
            Tristique senectus et netus et. Fermentum odio eu feugiat pretium nibh ipsum consequat
            nisl. Morbi leo urna molestie at elementum eu. Consectetur adipiscing elit ut aliquam
            purus sit. Quam pellentesque nec nam aliquam sem et. Elementum integer enim neque
            volutpat ac tincidunt vitae. Sagittis purus sit amet volutpat consequat. Amet
            consectetur adipiscing elit ut aliquam purus sit. Mauris pharetra et ultrices neque
            ornare aenean euismod. Semper eget duis at tellus at. Rhoncus dolor purus non enim
            praesent elementum facilisis leo. Integer eget aliquet nibh praesent tristique magna
            sit. Tristique risus nec feugiat in fermentum posuere. Volutpat est velit egestas dui
            id. Sed libero enim sed faucibus turpis in eu mi bibendum. Erat velit scelerisque in
            dictum non consectetur. Pellentesque habitant morbi tristique senectus et netus et.
          </p>

          <p>
            Orci eu lobortis elementum nibh. Interdum varius sit amet mattis. Pulvinar sapien et
            ligula ullamcorper. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt.
            Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Arcu cursus vitae congue
            mauris rhoncus aenean. Elit eget gravida cum sociis natoque penatibus et. Erat velit
            scelerisque in dictum non consectetur a erat. Proin libero nunc consequat interdum
            varius sit amet mattis vulputate. Pellentesque dignissim enim sit amet venenatis urna
            cursus eget nunc. Amet cursus sit amet dictum sit amet justo donec. Arcu dictum varius
            duis at consectetur lorem donec. Eu lobortis elementum nibh tellus. Lectus magna
            fringilla urna porttitor rhoncus dolor. Penatibus et magnis dis parturient montes
            nascetur ridiculus mus mauris. Nisl rhoncus mattis rhoncus urna neque viverra. Sed risus
            pretium quam vulputate dignissim suspendisse in est.
          </p>
        </Col>
      </Layout>
    </>
  );
}
