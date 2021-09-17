import { MetamaskState, Wallet } from '../interfaces';
import deepmerge from 'deepmerge';
import { getDefaultConfiguration } from '../configuration';
import { SnapConfig } from '@chainsafe/metamask-polkadot-types';

export async function configure(
	wallet: Wallet,
	networkName: string,
	overrides: unknown
): Promise<SnapConfig> {
	const defaultConfig = getDefaultConfiguration(networkName);
	const configuration = overrides
		? deepmerge(defaultConfig, overrides)
		: defaultConfig;
	const state = (await wallet.request({
		method: 'snap_getState',
	})) as MetamaskState;
	state.polkadot.config = configuration;
	wallet.request({
		method: 'snap_updateState',
		params: [state],
	});
	return configuration;
}
