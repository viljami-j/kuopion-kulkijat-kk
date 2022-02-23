import { CardMedia, styled } from "@mui/material";

const DestinationCardImage = styled(CardMedia)(
  ({ theme }) => `
  padding: ${theme.spacing(1)};
  border-radius: 15px;
`
);

export default DestinationCardImage;
