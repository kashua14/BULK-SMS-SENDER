import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";
import CustomDialog from "components/Dialog/CustomDialog";
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [openDialog, setOpenDialog] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [receipts, setReceipts] = useState("");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  function handleSendMessage() {
    const MessageRequest = {
      username: "sandbox",
      to: receipts,
      message: editorValue,
    };
    console.log("MessageRequest: ", MessageRequest);
    fetch("httpd://api.sandbox.africastalking.com/version1/messaging", {
      body: MessageRequest,
      headers: {
        Accept: "application/json",
        Apikey: "1fe060a47e09eca6f368acc5668545b21471dc9ebb86042ffd7e4242e55b520f",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
      .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          console.log(json);
          return json;
        })
      )
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Richard Davis
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                CEO / Co-Founder
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <MDBox display="flex" justifyContent="flex-end">
              <MDButton variant="gradient" color="info" onClick={() => setOpenDialog(!openDialog)}>
                Send Message
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
        {children}
      </Card>
      <CustomDialog
        handleClose={() => setOpenDialog(false)}
        open={openDialog}
        maxWidth="md"
        titleBGColor="success"
        title="Send a message to your customers"
        content={
          <MDBox mt={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormField
                  type="number"
                  label="Receipt(s)"
                  value={receipts}
                  onChange={(e) => setReceipts(e.target.value)}
                />
                <MDTypography variant="caption" color="text">
                  Separate the phone numbers of the receipts with a comma.
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormField
                  multiline
                  type="text"
                  label="Message"
                  value={editorValue}
                  placeholder="Type your message here..."
                  onChange={(e) => setEditorValue(e.target.value)}
                />
              </Grid>
            </Grid>
          </MDBox>
        }
        dialogFooter={
          <MDButton
            color="success"
            variant="text"
            title="Send message to the receipt(s)"
            onClick={() => handleSendMessage()}
          >
            Send Message
          </MDButton>
        }
      />
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
