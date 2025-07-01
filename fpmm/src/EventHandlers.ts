/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  ConditionalTokens,
  ConditionalTokens_ConditionPreparation,
  FixedProductMarketMakerFactory,
  FixedProductMarketMakerFactory_FPMMBuy,
  FixedProductMarketMakerFactory_FPMMFundingAdded,
  FixedProductMarketMakerFactory_FPMMFundingRemoved,
  FixedProductMarketMakerFactory_FPMMSell,
  FixedProductMarketMakerFactory_FixedProductMarketMakerCreation,
} from "generated";

ConditionalTokens.ConditionPreparation.handler(async ({ event, context }) => {
  const entity: ConditionalTokens_ConditionPreparation = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    conditionId: event.params.conditionId,
    oracle: event.params.oracle,
    questionId: event.params.questionId,
    outcomeSlotCount: event.params.outcomeSlotCount,
  };

  context.ConditionalTokens_ConditionPreparation.set(entity);
});

FixedProductMarketMakerFactory.FPMMBuy.handler(async ({ event, context }) => {
  const entity: FixedProductMarketMakerFactory_FPMMBuy = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    buyer: event.params.buyer,
    investmentAmount: event.params.investmentAmount,
    feeAmount: event.params.feeAmount,
    outcomeIndex: event.params.outcomeIndex,
    outcomeTokensBought: event.params.outcomeTokensBought,
  };

  context.FixedProductMarketMakerFactory_FPMMBuy.set(entity);
});

FixedProductMarketMakerFactory.FPMMFundingAdded.handler(async ({ event, context }) => {
  const entity: FixedProductMarketMakerFactory_FPMMFundingAdded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    funder: event.params.funder,
    amountsAdded: event.params.amountsAdded,
    sharesMinted: event.params.sharesMinted,
  };

  context.FixedProductMarketMakerFactory_FPMMFundingAdded.set(entity);
});

FixedProductMarketMakerFactory.FPMMFundingRemoved.handler(async ({ event, context }) => {
  const entity: FixedProductMarketMakerFactory_FPMMFundingRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    funder: event.params.funder,
    amountsRemoved: event.params.amountsRemoved,
    collateralRemovedFromFeePool: event.params.collateralRemovedFromFeePool,
    sharesBurnt: event.params.sharesBurnt,
  };

  context.FixedProductMarketMakerFactory_FPMMFundingRemoved.set(entity);
});

FixedProductMarketMakerFactory.FPMMSell.handler(async ({ event, context }) => {
  const entity: FixedProductMarketMakerFactory_FPMMSell = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    seller: event.params.seller,
    returnAmount: event.params.returnAmount,
    feeAmount: event.params.feeAmount,
    outcomeIndex: event.params.outcomeIndex,
    outcomeTokensSold: event.params.outcomeTokensSold,
  };

  context.FixedProductMarketMakerFactory_FPMMSell.set(entity);
});

FixedProductMarketMakerFactory.FixedProductMarketMakerCreation.handler(async ({ event, context }) => {
  const entity: FixedProductMarketMakerFactory_FixedProductMarketMakerCreation = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    creator: event.params.creator,
    fixedProductMarketMaker: event.params.fixedProductMarketMaker,
    conditionalTokens: event.params.conditionalTokens,
    collateralToken: event.params.collateralToken,
    conditionIds: event.params.conditionIds,
    fee: event.params.fee,
  };

  context.FixedProductMarketMakerFactory_FixedProductMarketMakerCreation.set(entity);
});
