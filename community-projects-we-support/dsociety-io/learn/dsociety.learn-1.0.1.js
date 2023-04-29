import { EntityOS } from '/site/2152/entityos.module.class-1.0.0.js';
const eos = new EntityOS();

//USING LUCID
//https://lucid.spacebudz.io/docs/overview/import/#using-web

import { Lucid } from "https://unpkg.com/lucid-cardano/web/mod.js"
//import { Lucid } from "https://unpkg.com/lucid-cardano@0.8.8/web/mod.js"

//const lucid = await Lucid.new();
const wallet = await window.cardano.nami.enable();
const networkId = await wallet.getNetworkId();
//console.log(lucid)
console.log(networkId)
console.log(wallet)
//wallet.getUtxos().then(function(data)
wallet.getBalance().then(function(dataAsCBORHex)
{
	console.log(dataAsCBORHex)

	var dataAsBuffer = hex2buffer(dataAsCBORHex);
	var data = CBOR.decode(dataAsBuffer)
	var lovelace = data[0];
	var otherAssets = data[1];
	console.log(otherAssets)

	var _otherAssets = {};

	if (otherAssets != undefined)
	{
		_.each(otherAssets, function (otherAssetValue, otherAssetKey)
		{
			_.each(otherAssetValue, function  (_otherAssetValue, _otherAssetKey)
			{
				_otherAssets[chars2Text(_otherAssetKey)] = _otherAssetValue;
			});
		})
	}

	console.log(lovelace);
	console.log(_otherAssets);

	//const balance = wasm.Value.from_bytes(Buffer.from(res, 'hex'));
   //const lovelaces = balance.coin().to_str();

   //console.log(lovelaces);
	
})

//lucid.selectWallet(api);
//console.log(lucid)


/*
const tx = await lucid.wallet.newTx()
  .payToAddress("addr1q9n7j9ds8chy262hne6n8l328rpen3kswddwzz0recgz3fss7rl25m0ae9sqsqku577nxd6528kect3ldkt9rc5nvg9s5rs03l", {lovelace: 2000000n})
  .complete();
const signedTx = await lucid.sign().complete();
const txHash = await signedTx.submit();
*/

eos.add(
[
	{
		name: 'learn-init',
		code: function ()
		{
			console.log('We have an opportunity to descentralise & rehumanise our society.')
			eos.invoke('learn-init-cardano');
		}
	},
	{
		name: 'learn-init-cardano',
		code: function ()
		{
			console.log(window.cardano);

            var cardanoData = window.cardano;
            if (cardanoData == undefined) {cardanoData = {}}

			var _cardano =
			{
				data: cardanoData,
				wallets:
				[
					{
						name: 'eternl',
						names: ['eternl', 'ccvault'],
						caption: 'Eternl'
					},
					{
						name: 'flint',
						caption: 'Flint'
					},
					{
						name: 'gerowallet',
						caption: 'Gero Wallet'
					},
					{
						name: 'nami',
						caption: 'Nami'
					},
					{
						name: 'nufi',
						caption: 'NuFi'
					},
					{
						name: 'typhon',
						names: ['typhon', 'typhoncip30'],
						caption: 'Typhon'
					},
					{
						name: 'yoroi',
						caption: 'Yoroi'
					}		
				]
			};

			//Check for Wallets

			_.each(_cardano.wallets, function (_wallet)
			{
				_wallet.enabled = (_cardano.data[_wallet.name] != undefined)
			});

			eos.set(
			{
				scope: 'learn',
				context: 'cardano',
				value: _cardano
			});

			var wallets = eos.set(
			{
				scope: 'learn',
				context: 'wallets',
				value: _.filter(_cardano.wallets, function (_wallet) {return _wallet.enabled})
			});

			console.log(_cardano);
			console.log(wallets)

            if (wallets.length == 0)
            {
			    var learnView = eos.view()

                learnView.add(
                [
                    '<div class="text-center mt-6">',
                        '<div class="fw-bold" style="color:#fadb86; font-size:1.2rem;">There no wallets available to connect to, please install a wallet to continue.</div>',
                        '<div class="mt-4"><a href="/wallets" style="color:#fadb86; font-size:1.2rem;">Cardano Wallets <i class="fe fe-arrow-right"></a></div>',
                    '</div>'
                ]);

                learnView.render('#learn-view');
            }
            else
            {
                var learnConnectWalletsView = eos.view()

                _.each(wallets, function (wallet)
                {
                    learnConnectWalletsView.add(
                    [
                        '<div class="text-center">',
                            '<a href="#" class="entityos-click"',
                                ' data-name="', wallet.name, '"',
                                ' data-controller="learn-wallet-show" data-context="wallet" data-scope="learn-wallet-connect">',
                                wallet.caption,
                            '</a>',
                        '</div>'
                    ]);
                });

                $('#learn-connect').removeClass('disabled').popover(
                {
                    content: learnConnectWalletsView.get(),
                    html: true,
                    placement: 'bottom',
                    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><div class="popover-body"></div></div>',
                    offset: [0,10],
					sanitize: false
                });
            }

			
		}
	},
    {
		name: 'learn-wallet-show',
		code: function (param)
		{
			eos.invoke('util-view-popover-hide')
			console.log('Connect to Wallet.')
			console.log(param);
			var walletName = entityos._util.param.get(param.dataContext, 'name').value;

            const api = window.cardano[walletName].enable().then(function ()
			{
				lucid.selectWallet(api);
            	console.log(lucid)

				const privateKey = lucid.utils.generatePrivateKey(); // Bech32 encoded private key
				console.log(privateKey);

				lucid.currentSlot()
				.then(function (data) {
					console.log(data)
				})
				.reject(function (data) {
					console.log(data)
				})
			});
           
		}
	}

]);

$(function ()
{
	eos.invoke('learn-init');
});