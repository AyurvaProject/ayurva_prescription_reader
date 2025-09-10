import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Stack,
  IconButton,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import InfoIcon from "@mui/icons-material/Info";
import { GetCurrentUser } from "../../apis/auth/Auth";
import {
  GetOnePres,
  AssignPrForPrescriptiption,
} from "../../apis/prescription/Prescription";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
import PrescriptionDetailListSection from "./PrescriptionDetailListSection";
import LoadingSection from "../loading/LoadingSection";

const SinglePrescriptionSection = ({ id, refreshPendingList }) => {
  const [pres, setPres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });

  const showSnackbar = (severity, loading = false, message) => {
    setSnackbar({
      open: true,
      message: loading ? "Processing..." : message,
      severity,
      loading,
    });
    if (!loading)
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
  };

  useEffect(() => {
    GetOnePres(id).then((res) => {
      setPres(res);
      setLoading(false);
    });
  }, [id]);

  const assignPr = async () => {
    setAssigning(true);
    try {
      await AssignPrForPrescriptiption(pres.pres_id);
      showSnackbar("success", false, "Prescription assigned successfully");
      refreshPendingList && refreshPendingList();
    } catch (error) {
      showSnackbar(
        "error",
        false,
        error.response?.data?.message || "Error assigning prescription"
      );
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return <LoadingSection />;
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Prescription #{pres.pres_id}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={assignPr}
            disabled={
              assigning ||
              pres.pr_id != null ||
              !GetCurrentUser() ||
              !pres.pres_active_status
            }
          >
            {assigning ? "Assigning..." : "Assign to Me"}
          </Button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => {}}
            disabled={GetCurrentUser()?.id != pres.pr_id || !GetCurrentUser()}
          >
            Read
          </Button> */}
        </Stack>
      </Box>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* Prescription Image Section */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <img
              src={
                imgIndex === 0
                  ? pres.pres_img_01
                  : pres.pres_img_02 || pres.pres_img_01
              }
              alt="Prescription"
              style={{ width: "100%", borderRadius: "12px" }}
            />
            {pres.pres_img_02 && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                mt={2}
              >
                <IconButton onClick={() => setImgIndex(imgIndex === 0 ? 1 : 0)}>
                  <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="subtitle2">Switch Image</Typography>
                <IconButton onClick={() => setImgIndex(imgIndex === 0 ? 1 : 0)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* User Info Section */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Uploaded By
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
              <Avatar
                src={pres.user.user_profile_pic}
                alt={pres.user.user_name}
                sx={{ width: 56, height: 56 }}
              />
              <Typography variant="h6">{pres.user.user_name}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon fontSize="small" />
              <Typography variant="body2">{pres.user.user_email}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" mt={1}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">{pres.user.user_contact}</Typography>
            </Stack>
            {pres.pres_description && (
              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <InfoIcon fontSize="small" />
                <Typography variant="body2">{pres.pres_description}</Typography>
              </Stack>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Uploaded on: {pres.pres_uploaded_date} at{" "}
              {pres.pres_uploaded_time}
            </Typography>
            <Typography
              variant="body2"
              color={
                pres.pres_status === "pending" ? "warning.main" : "success.main"
              }
            >
              Status: {pres.pres_status.toUpperCase()}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: 3, mt: 3 }}>
        <CardContent>
          <PrescriptionDetailListSection id={id} />
        </CardContent>
      </Card>
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        loading={snackbar.loading}
      />
    </Box>
  );
};

export default SinglePrescriptionSection;
