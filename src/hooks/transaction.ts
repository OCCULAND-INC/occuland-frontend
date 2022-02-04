import Moralis from 'moralis';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export async function handleNewTransaction(
  subscription: Moralis.LiveQuerySubscription,
) {
  subscription.on('create', function (data) {
    console.info('new transaction: ', data);
  });
}

export async function useSubscribeToTxQuery(account?: string) {
  const { isAuthenticated } = useMoralis();

  const subscribe = async () => {
    const query = new Moralis.Query('EthTransactions');
    query.equalTo('from_address', account);

    const subscription = await query.subscribe();
    handleNewTransaction(subscription);

    const results = await query.find();
    console.info('user transactions:', results);
  };

  useEffect(() => {
    if (!account || !isAuthenticated) {
      return;
    }

    subscribe();
  }, [isAuthenticated, account]);
}
