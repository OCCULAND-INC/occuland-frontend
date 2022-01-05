import { GetServerSideProps } from 'next';

import LandContainer from '~/components/pages/Land/LandContainer';
import { getStringifiedParams } from '~/lib/utils/routes';

interface Props {
  id: string;
}

function LandmarketDetailPage({ id }: Props) {
  return <LandContainer />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = getStringifiedParams(context.query);

  return {
    props: {
      id,
    },
  };
};

export default LandmarketDetailPage;
