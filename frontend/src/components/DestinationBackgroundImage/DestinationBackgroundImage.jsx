import * as PropTypes from "prop-types";
import * as React from "react";
import { Box, styled } from "@mui/system";

function DestinationBackgroundImage({ imageSrc, direction, children }) {
  const gradientAngle = direction === "topToBottom" ? "180deg" : "0deg";
  const ImageWithGradient = styled(Box)({
    background: `linear-gradient(${gradientAngle}, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 0%, rgba(0,212,255,0) 60%), url(${imageSrc})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "50vh",
    width: "100%",
    borderRadius: "15px",
  });

  return <ImageWithGradient>{children}</ImageWithGradient>;
}

DestinationBackgroundImage.propTypes = {
  direction: PropTypes.oneOf(["topToBottom", "bottomToTop"]),
};

export default DestinationBackgroundImage;
