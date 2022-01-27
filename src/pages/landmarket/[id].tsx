import { GetServerSideProps } from 'next';

import LandContainer from '~/components/pages/Land/LandContainer';
import { getStringifiedParams } from '~/lib/utils/routes';

interface Props {
  id: string;
  x: string;
  y: string;
}

function LandmarketDetailPage({ id, x, y }: Props) {
  console.info('id', id);
  return <LandContainer x={x} y={y} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, x, y } = getStringifiedParams(context.query);

  return {
    props: {
      id,
      x,
      y,
    },
  };
};

export default LandmarketDetailPage;
