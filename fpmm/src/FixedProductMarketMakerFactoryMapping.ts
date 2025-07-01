import { FixedProductMarketMakerFactory, FixedProductMarketMaker, BigDecimal } from 'generated';
import { CONDITIONAL_TOKENS } from './constants';
import { getCollateralDetails } from './utils/collateralTokens';
import { timestampToDay } from './utils/time';

// FixedProductMarketMakerTemplate.create(address);
FixedProductMarketMakerFactory.FixedProductMarketMakerCreation.contractRegister(async ({ event, context }) => {
    let address = event.params.fixedProductMarketMaker;
    context.addFixedProductMarketMakerFactory(address);
});

FixedProductMarketMakerFactory.FixedProductMarketMakerCreation.handler(async ({ event, context }) => {
    let address = event.params.fixedProductMarketMaker;
    let conditionalTokensAddress = event.params.conditionalTokens.toLowerCase();

    if (
        conditionalTokensAddress !=
        CONDITIONAL_TOKENS.toLowerCase()
    ) {
        context.log.info(`cannot index market maker ${address}: using conditional tokens ${conditionalTokensAddress}`);
        return;
    }

    let conditionIds = event.params.conditionIds;
    let outcomeTokenCount = 1;
    let conditions: string[] = []

    for (let i = 0; i < conditionIds.length; i += 1) {
        let conditionIdStr = conditionIds[i];

        let condition = await context.Condition.get(conditionIdStr);
        if (condition == null) {
            // not sure why this is an error since this logs often due to the fact that the condition is only created if it has 2 outcomes
            context.log.error(`failed to create market maker ${address}: condition ${conditionIdStr} not prepared`);
            return;
        }

        conditions = conditions.concat([conditionIdStr]);
    }


    let fixedProductMarketMaker: FixedProductMarketMaker = {
        id: address,
        creator: event.params.creator,
        creationTimestamp: BigInt(event.block.timestamp),
        creationTransactionHash: event.transaction.hash,
        conditionalTokenAddress: conditionalTokensAddress,
        conditions: conditions,
        collateralToken_id: event.params.collateralToken,
        fee: event.params.fee,
        outcomeSlotCount: outcomeTokenCount,
        totalSupply: 0n,
        outcomeTokenAmounts: new Array<bigint>(outcomeTokenCount).fill(0n),
        outcomeTokenPrices: new Array<BigDecimal>(outcomeTokenCount).fill(new BigDecimal(0)),
        lastActiveDay: BigInt(Math.floor(timestampToDay(event.block.timestamp))),
        collateralVolume: 0n,
        scaledCollateralVolume: new BigDecimal(0),
        collateralBuyVolume: 0n,
        scaledCollateralBuyVolume: new BigDecimal(0),
        collateralSellVolume: 0n,
        scaledCollateralSellVolume: new BigDecimal(0),
        liquidityParameter: 0n,
        scaledLiquidityParameter: new BigDecimal(0),
        feeVolume: 0n,
        scaledFeeVolume: new BigDecimal(0),
        tradesQuantity: 0n,
        buysQuantity: 0n,
        sellsQuantity: 0n,
        liquidityAddQuantity: 0n,
        liquidityRemoveQuantity: 0n,
    }

    await getCollateralDetails(event.params.collateralToken, context);

    context.FixedProductMarketMaker.set(fixedProductMarketMaker);
});

