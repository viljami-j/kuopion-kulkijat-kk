import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";

DestinationDescriptionTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export function DestinationDescriptionTextField({ value, onChange }) {
  const descriptionCharactersLeft = 500 - value.length;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        mb: 3,
      }}
    >
      <TextField
        id="description"
        label="Kuvaus"
        variant="outlined"
        multiline
        rows={10}
        inputProps={{ maxLength: 500 }}
        value={value}
        onChange={onChange}
        sx={{ width: "100%" }}
      />
      <Typography>{descriptionCharactersLeft} merkkiä jäljellä.</Typography>
    </Box>
  );
}
