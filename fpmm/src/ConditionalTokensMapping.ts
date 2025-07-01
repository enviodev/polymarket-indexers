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