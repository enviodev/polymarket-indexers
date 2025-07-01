// import {
//     ConditionPreparation,
//   } from './types/ConditionalTokens/ConditionalTokens';
// import { Condition } from './types/schema';

// export function handleConditionPreparation(event: ConditionPreparation): void {
//     // we don't handle conditions with more than 2 outcomes
//     if (event.params.outcomeSlotCount.toI32() != 2) {
//       return;
//     }

//     // new condition
//     const conditionId = event.params.conditionId.toHexString();
//     const condition = new Condition(conditionId);
//     condition.save();
//   }

import { ConditionalTokens } from "generated";

ConditionalTokens.ConditionPreparation.handler(async ({ event, context }) => {
    // we don't handle conditions with more than 2 outcomes
    if (event.params.outcomeSlotCount != 2n) {
        return;
    }

    // new condition
    const condition = {
        id: event.params.conditionId
    };

    context.Condition.set(condition)
});