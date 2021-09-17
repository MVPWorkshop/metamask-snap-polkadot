import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import { WalletMock } from '../wallet.mock.test';
import { getAddress } from '../../../src/rpc/getAddress';
import { testAppKey } from './keyPairTestConstants';
import { westendConfiguration } from '../../../src/configuration/predefined';

chai.use(sinonChai);

describe('Test rpc handler function: getAddress', function () {
	const walletStub = new WalletMock();

	afterEach(function () {
		walletStub.reset();
	});

	it('should return valid address with westend configuration', async function () {
		walletStub.rpcStubs.snap_getAppKey.resolves(testAppKey);
		walletStub.rpcStubs.snap_getState.resolves({
			polkadot: { configuration: westendConfiguration },
		});
		const result = await getAddress(walletStub);
		expect(walletStub.rpcStubs.snap_getState).to.have.been.calledOnce;
		expect(result).to.be.eq('5DW5CXHWbM13Az7aetLQVUEviNq8WeXFQanHNPVMmzyRYKvX');
	});
});
