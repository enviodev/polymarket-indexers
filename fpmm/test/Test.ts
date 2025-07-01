import assert from "assert";
import { 
  TestHelpers,
  ConditionalTokens_ConditionPreparation
} from "generated";
const { MockDb, ConditionalTokens } = TestHelpers;

describe("ConditionalTokens contract ConditionPreparation event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for ConditionalTokens contract ConditionPreparation event
  const event = ConditionalTokens.ConditionPreparation.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("ConditionalTokens_ConditionPreparation is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await ConditionalTokens.ConditionPreparation.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualConditionalTokensConditionPreparation = mockDbUpdated.entities.ConditionalTokens_ConditionPreparation.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedConditionalTokensConditionPreparation: ConditionalTokens_ConditionPreparation = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      conditionId: event.params.conditionId,
      oracle: event.params.oracle,
      questionId: event.params.questionId,
      outcomeSlotCount: event.params.outcomeSlotCount,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualConditionalTokensConditionPreparation, expectedConditionalTokensConditionPreparation, "Actual ConditionalTokensConditionPreparation should be the same as the expectedConditionalTokensConditionPreparation");
  });
});
