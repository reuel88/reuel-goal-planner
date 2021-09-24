import { createContext, FunctionComponent, useContext, useReducer } from "react";

const ACTIONS = {
  SET_SAVINGS: "set-savings",
  SET_CONTRIBUTIONS: "set-contributions"
};

type actionType = typeof ACTIONS.SET_SAVINGS | typeof ACTIONS.SET_CONTRIBUTIONS;

interface payloadType {
  savingValue?: number | null,
  contributionValue?: number | null,
  contributionPeriod?: string | null,
}

function reducer(state: any, { type, payload }: { type: actionType, payload: payloadType }) {
  switch (type) {
    case ACTIONS.SET_SAVINGS:
      return {
        ...state,
        savingValue: payload.savingValue
      };
    case ACTIONS.SET_CONTRIBUTIONS:
      return {
        ...state,
        contributionValue: payload.contributionValue,
        contributionPeriod: payload.contributionPeriod,
      };
    default:
      return state;
  }
}

export interface OnboardingContent {
  state: any,
  setSavings: (savings: number) => any,
  setContributions: (contributions: number, period: string) => any,
}

const OnboardingContext = createContext<OnboardingContent | null>(null);

export function useOnboarding() {
  return useContext(OnboardingContext);
}

export const OnboardingProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  function setSavings(savings: number) {
    return dispatch({
      type: ACTIONS.SET_SAVINGS,
      payload: {
        savingValue: savings
      }
    });
  }

  function setContributions(contributions: number, period: string) {
    return dispatch({
      type: ACTIONS.SET_CONTRIBUTIONS,
      payload: {
        contributionValue: contributions,
        contributionPeriod: period
      }
    });
  }

  const value: OnboardingContent = {
    state,
    setSavings,
    setContributions
  };

  return (<OnboardingContext.Provider value={value}>
    {children}
  </OnboardingContext.Provider>);
};

export function withOnboarding(Component: FunctionComponent) {
  return function WithOnboarding(props: any) {
    return (<OnboardingProvider>
      <Component {...props} />
    </OnboardingProvider>);
  };
}
