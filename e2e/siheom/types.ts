export type ActionStepDefinitionDict = Record<
  string,
  (target: Locator, ...args: readonly any[]) => Promise<void>
>;

export type AssertionStepDefinitionDict = Record<
  string,
  (target: Locator, ...args: readonly any[]) => Promise<void>
>;

export type GivenStep = {
  given: 'render' | 'viewport';
  log: string;
  args?: readonly any[];
};

export type Locator = {
  role: string;
  name: string | RegExp;
};

export type ActionStep<ActionsDict extends ActionStepDefinitionDict> = {
  action: keyof ActionsDict;
  target: Locator;
  log: string;
  args?: readonly any[];
};

export type AssertionStep<AssertionsDict extends AssertionStepDefinitionDict> =
  {
    assert: keyof AssertionsDict;
    target: Locator;
    log: string;
    args?: readonly any[];
  };

export type Step<
  ActionsDict extends ActionStepDefinitionDict = Record<string, never>,
  AssertionsDict extends AssertionStepDefinitionDict = Record<string, never>,
> = GivenStep | ActionStep<ActionsDict> | AssertionStep<AssertionsDict>;
