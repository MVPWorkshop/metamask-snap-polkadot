import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { exportSeed } from '../../../src/rpc/exportSeed';
import { WalletMock } from '../wallet.mock.test';

chai.use(sinonChai);

describe('Test rpc handler function: exportSeed', function () {
	const walletStub = new WalletMock();

	afterEach(function () {
		walletStub.reset();
	});

	it('should return seed on positive prompt confirmation and keyring saved in state', async function () {
		walletStub.requestStub.resolves(true);
		walletStub.rpcStubs.snap_getAppKey.resolves(
			'aba2dd1a12eeafda3fda62aa6dfa21ca2aa6dfaba13fda6a22ea2dd1eafda1ca'
		);
		const result = await exportSeed(walletStub);
		expect(walletStub.requestStub).to.have.been.calledOnce;
		expect(walletStub.rpcStubs.snap_getAppKey).to.have.been.calledOnce;
		expect(result).to.be.eq('aba2dd1a12eeafda3fda62aa6dfa21ca');
	});

	it('should not return seed on negative prompt confirmation', async function () {
		walletStub.requestStub.resolves(false);
		const result = await exportSeed(walletStub);
		expect(walletStub.requestStub).to.have.been.calledOnce;
		expect(result).to.be.eq(null);
	});
});
