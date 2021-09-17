import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { EmptyMetamaskState } from '../../../src/interfaces';
import { WalletMock } from '../wallet.mock.test';
import { getKeyPair } from '../../../src/polkadot/account';
import { hexToU8a } from '@polkadot/util';
import {
	testAddress,
	testAppKey,
	testPublicKey,
} from '../rpc/keyPairTestConstants';
import { westendConfiguration } from '../../../src/configuration/predefined';

chai.use(sinonChai);

describe('Test account function: getKeyPair', function () {
	const walletStub = new WalletMock();

	afterEach(function () {
		walletStub.reset();
	});

	it('should return keypair', async function () {
		walletStub.rpcStubs.snap_getState.resolves({
			polkadot: { configuration: westendConfiguration },
		});
		walletStub.rpcStubs.snap_getAppKey.resolves(testAppKey);
		walletStub.rpcStubs.snap_updateState.returnsArg(0);
		const result = await getKeyPair(walletStub);
		expect(walletStub.rpcStubs.snap_getAppKey).to.have.been.calledOnce;
		expect(result.address).to.be.eq(testAddress);
		expect(result.publicKey).to.be.deep.eq(hexToU8a(testPublicKey));
	});
});
