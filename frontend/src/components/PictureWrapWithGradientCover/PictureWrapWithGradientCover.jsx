import * as React from "react";
import { styled, Box } from "@mui/system";

// could use a better name, but I was too lazy to make it into a more general component that could've been better named
export default function PictureWrapWithGradientCover({
  imageSrc,
  wrappedElement,
  gradientType,
}) {
  const HorizontalGradient = styled(Box)({
    background: `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%), url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "611px",
    width: "92%",
    borderRadius: "15px",
  });

  const RisingGradient = styled(Box)({
    background: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%), url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "611px",
    width: "100%",
    borderRadius: "15px",
  });

  if (gradientType) {
    if (gradientType === "horizontal")
      return <HorizontalGradient>{wrappedElement}</HorizontalGradient>;
    if (gradientType === "rising")
      return <RisingGradient>{wrappedElement}</RisingGradient>;
  }
}
