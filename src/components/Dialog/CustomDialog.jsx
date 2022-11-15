import {
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  DialogActions,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

export default function CustomDialog(props) {
  const {
    content,
    title,
    color,
    maxWidth,
    titleBGColor,
    open,
    handleClose,
    ZIndex,
    scroll,
    dialogFooter,
    hideCloseBtn,
    fullScreen,
    ...rest
  } = props;
  let titleBGColorTemp = titleBGColor;
  switch (titleBGColor) {
    case "info":
      titleBGColorTemp = "#00ACC1";
      break;
    case "success":
      titleBGColorTemp = "#4CAF50";
      break;
    case "danger":
    case "error":
      titleBGColorTemp = "#F44336";
      break;
    case "warning":
      titleBGColorTemp = "#FF9800";
      break;
    case "primary":
      titleBGColorTemp = "#B5004F";
      break;
    default:
      titleBGColorTemp = "#00ACC1";
      break;
  }

  let colorPercent = "87%";

  if (maxWidth === "xs" || maxWidth === "sm") {
    colorPercent = "80%";
  }

  const materialTheme = createTheme({
    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            lineHeight: 1.6,
            fontSize: "1.25rem",
            fontWeight: "normal",
            color: color ?? "white",
            padding: "16px 24px !important",
            background: `linear-gradient(45deg, ${titleBGColorTemp} ${colorPercent}, #5A5A5A 10%)`,
          },
        },
      },
    },
  });

  return (
    <Dialog
      maxWidth={maxWidth}
      fullWidth
      scroll={scroll}
      open={open}
      style={{ zIndex: ZIndex }}
      onClose={handleClose}
      fullScreen={fullScreen}
      {...rest}
    >
      <ThemeProvider theme={materialTheme}>
        <DialogTitle>
          <Grid
            item
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {title}
            <MDTypography>
              <CloseIcon
                fontSize="large"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={handleClose}
              />
            </MDTypography>
          </Grid>
        </DialogTitle>
      </ThemeProvider>
      <DialogContent>{content}</DialogContent>
      {dialogFooter !== null && (
        <DialogActions>
          {!hideCloseBtn ? (
            <MDButton onClick={handleClose} title="Close this dialog.">
              Close
            </MDButton>
          ) : (
            <p />
          )}
          {dialogFooter}
        </DialogActions>
      )}
    </Dialog>
  );
}

// Setting default props for the Header
CustomDialog.defaultProps = {
  hideCloseBtn: false,
  fullScreen: false,
  open: false,
  maxWidth: "sm",
  color: "white",
  ZIndex: 1200,
  scroll: "body",
  titleBGColor: "info",
  dialogFooter: null,
};

// Typechecking props for the Header
CustomDialog.propTypes = {
  content: PropTypes.node.isRequired,
  dialogFooter: PropTypes.node,
  fullScreen: PropTypes.bool,
  open: PropTypes.bool,
  hideCloseBtn: PropTypes.bool,
  title: PropTypes.node.isRequired,
  maxWidth: PropTypes.string,
  color: PropTypes.string,
  ZIndex: PropTypes.number,
  scroll: PropTypes.string,
  titleBGColor: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};
