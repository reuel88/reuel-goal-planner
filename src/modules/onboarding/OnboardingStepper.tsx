import { NextPage } from "next";
import Container from "react-bootstrap/Container";
import { Stepper } from "react-form-stepper";
import { useTranslations } from "next-intl";

const OnboardingStepper: NextPage<{ activeStep: number }> = ({ activeStep }) => {
  const t = useTranslations();
  return (
    <Container as="section">
      <Stepper
        steps={[
          { label: t("ONBOARDING.savings") },
          { label: t("ONBOARDING.contributions") }
        ]}
        activeStep={activeStep}
        styleConfig={{
          activeBgColor: "#0d6efd",
          activeTextColor: "#ffffff", // default
          completedBgColor: "#609ffc",
          completedTextColor: "#ffffff", // default
          inactiveBgColor: "#adb5bd",
          inactiveTextColor: "#ffffff", // default
          size: "2em", // default
          circleFontSize: "1em", // default
          labelFontSize: "0.875rem", // default
          borderRadius: "50%", // default
          fontWeight: 500, // default
        }}
      />
    </Container>
  );
};

export default OnboardingStepper;