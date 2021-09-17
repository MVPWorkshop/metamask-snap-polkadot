import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { WalletMock } from '../wallet.mock.test';
import {
	kusamaConfiguration,
	westendConfiguration,
} from '../../../src/configuration/predefined';
import { configure } from '../../../src/rpc/configure';
import { EmptyMetamaskState } from '../../../src/interfaces';
import { SnapConfig } from '@chainsafe/metamask-polkadot-types';

chai.use(sinonChai);

describe('Test rpc handler function: configure', function () {
	const walletStub = new WalletMock();

	afterEach(function () {
		walletStub.reset();
	});

	it('should set predefined kusama configuration', async function () {
		// stubs
		walletStub.rpcStubs.snap_getState.resolves(EmptyMetamaskState());
		walletStub.rpcStubs.snap_updateState.returnsArg(0);
		// tested method
		const result = await configure(walletStub, 'kusama', {});
		// assertions
		expect(result).to.be.deep.eq(kusamaConfiguration);
		expect(
			walletStub.rpcStubs.snap_updateState
		).to.have.been.calledOnceWithExactly({
			polkadot: {
				config: kusamaConfiguration,
				transactions: [],
			},
		});
		expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnce;
	});

	it('should set predefined westend configuration', async function () {
		// stubs
		walletStub.rpcStubs.snap_getState.resolves(EmptyMetamaskState());
		walletStub.rpcStubs.snap_updateState.returnsArg(0);
		// tested method
		const result = await configure(walletStub, 'westend', {});
		// assertions
		expect(result).to.be.deep.eq(westendConfiguration);
		expect(
			walletStub.rpcStubs.snap_updateState
		).to.have.been.calledOnceWithExactly({
			polkadot: {
				config: westendConfiguration,
				transactions: [],
			},
		});
		expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnce;
	});

	it('should set custom configuration', async function () {
		// stubs
		walletStub.rpcStubs.snap_getState.resolves(EmptyMetamaskState());
		walletStub.rpcStubs.snap_updateState.returnsArg(0);
		const customConfiguration: SnapConfig = {
			addressPrefix: 1,
			networkName: 'test-network',
			unit: {
				customViewUrl: 'custom-view-url',
				decimals: 1,
				image: 'image',
				symbol: 'TST',
			},
			wsRpcUrl: 'ws-rpc-url',
		};
		// tested method
		const result = await configure(
			walletStub,
			'test-network',
			customConfiguration
		);
		// assertions
		expect(result).to.be.deep.eq(customConfiguration);
		expect(
			walletStub.rpcStubs.snap_updateState
		).to.have.been.calledOnceWithExactly({
			polkadot: {
				config: customConfiguration,
				transactions: [],
			},
		});
		expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnce;
	});

	it('should set predefined kusama configuration with additional property override', async function () {
		// stubs
		walletStub.rpcStubs.snap_getState.resolves(EmptyMetamaskState());
		walletStub.rpcStubs.snap_updateState.returnsArg(0);
		// tested method
		const customConfiguration = kusamaConfiguration;
		customConfiguration.unit.symbol = 'TST_KSM';
		const result = await configure(walletStub, 'kusama', {
			unit: { symbol: 'TST_KSM' },
		} as SnapConfig);
		// assertions
		expect(result).to.be.deep.eq(customConfiguration);
		expect(
			walletStub.rpcStubs.snap_updateState
		).to.have.been.calledOnceWithExactly({
			polkadot: {
				config: customConfiguration,
				transactions: [],
			},
		});
		expect(walletStub.rpcStubs.snap_updateState).to.have.been.calledOnce;
	});
});
