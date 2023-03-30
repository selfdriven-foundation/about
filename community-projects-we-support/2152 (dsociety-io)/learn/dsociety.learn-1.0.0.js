import { EntityOS } from '/site/2152/entityos.module.class-1.0.0.js';
const eos = new EntityOS();

//USING LUCID
//https://lucid.spacebudz.io/docs/overview/import/#using-web

import { Lucid } from "https://unpkg.com/lucid-cardano/web/mod.js"
const lucid = await Lucid.new();

const api = await window.cardano.nami.enable();
lucid.selectWallet(api);
console.log(lucid)

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

			var _cardano =
			{
				data: window.cardano,
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

			var learnView = eos.view()

			learnView.add(
			[
				'<div class="dropdown-center">',
					'<button type="button" class="btn btn-outline-warning dropdown-toggle" data-toggle="dropdown" id="learner-connect" aria-expanded="false">',
						'<span class="dropdown-text">',
							'Connect',
						'</span>',
					'</button>',
					'<ul class="dropdown-menu text-center mt-2" style="background-color:transparent; border-color:#3e270d; border-width:1px;" data-scope="learn" data-context="cardano-connect">'
			]);

			_.each(wallets, function (wallet)
			{
				learnView.add(
				[
						'<li class="text-center">',
							'<a href="#" class="entityos-dropdown " style="color:#fadb86; font-size:1.2rem;"',
								' data-name="', wallet.name, '"',
								' data-controller="learn-wallet-show" data-context="wallet" data-scope="cardano-connect">',
								wallet.caption,
							'</a>',
						'</li>'
				]);
			})

			learnView.add(
			[
					'</ul>',
				'</div>'
			]);

			learnView.render('#learn-view');
		}
	}

]);

$(function ()
{
	eos.invoke('learn-init');
});