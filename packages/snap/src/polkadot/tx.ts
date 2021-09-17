import { MetamaskState, Wallet } from '../interfaces';
import { Transaction } from '@chainsafe/metamask-polkadot-types';

export async function saveTxToState(
	wallet: Wallet,
	tx: Transaction
): Promise<void> {
	const state = (await wallet.request({
		method: 'snap_getState',
	})) as MetamaskState;
	state.polkadot.transactions.push(tx);
	await wallet.request({
		method: 'snap_updateState',
		params: [state],
	});
}

export async function updateTxInState(
	wallet: Wallet,
	transaction: Transaction
) {
	const state = (await wallet.request({
		method: 'snap_getState',
	})) as MetamaskState;
	const index = state.polkadot.transactions.findIndex(
		(tx) => tx.hash === transaction.hash
	);
	if (index >= 0) {
		state.polkadot.transactions[index] = transaction;
		await wallet.request({
			method: 'snap_updateState',
			params: [state],
		});
	}
}
