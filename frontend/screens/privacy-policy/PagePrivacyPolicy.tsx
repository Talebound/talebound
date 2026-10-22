import React from 'react';
import { Row, Col } from '../../components/Flex/Flex';
import { TitleH2 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';

const PagePrivacyPolicy: React.FC = () => {
  return (
    <Row fullWidth padding="xl">
      <Col>
        <TitleH2>Privacy policy</TitleH2>
        <Text>
          At Talebound, we take your privacy seriously. This Privacy Policy outlines how we collect,
          use, and protect your personal information when you use our website and services.
        </Text>
        <ol>
          <li>
            <Text weight="bold">Information We Collect</Text>
          </li>
          <Text>
            We collect personal information when you register for an account on Talebound, including
            your email address. We also collect information on your usage of our website and
            services, such as the worlds you create, the characters you play, and your interactions
            with other users.
          </Text>
          <br />
          <br />

          <li>
            <Text weight="bold">How We Use Your Information</Text>
          </li>
          <Text>
            We use your email address to communicate with you about your account, send you updates
            about our services, and respond to your inquiries. We also use your information to
            provide, maintain, and improve our website and services.
          </Text>
          <br />
          <br />

          <li>
            <Text weight="bold">Information Security</Text>
          </li>
          <Text>
            We are committed to protecting your personal information. We use industry-standard
            security measures to prevent unauthorized access, disclosure, or alteration of your
            information. However, no method of transmission over the internet is completely secure,
            and we cannot guarantee the absolute security of your information.
          </Text>
          <br />
          <br />

          <li>
            <Text weight="bold">Sharing Your Information</Text>
          </li>
          <Text>
            We do not sell, rent, or share your personal information with third parties, except as
            required by law or to protect the safety, rights, or property of Talebound or our users.
          </Text>
          <br />
          <br />

          <li>
            <Text weight="bold">Changes to This Privacy Policy</Text>
          </li>
          <Text>
            We may update this Privacy Policy from time to time. Any changes will be posted on this
            page, and we encourage you to review this policy periodically to stay informed about our
            privacy practices.
          </Text>
          <br />
          <br />
        </ol>
        <Text>
          <Text weight="bold">Last updated:</Text> 27th April, 2023
        </Text>
      </Col>
    </Row>
  );
};

export default PagePrivacyPolicy;
