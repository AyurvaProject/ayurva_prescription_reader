import {
  Box,
  Divider,
  Typography,
  Card,
  TextField,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import { verifyOtpSchema } from "../../validation/verifyOtpFormValidation/VerifyOtpFormValidation";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VerifyOtp } from "../../apis/auth/Auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ResendOtpSection from "./ResendOtpSection";
// import { GetOnePharmacist } from "../../apis/auth/Auth";
import { GetOnePr } from "../../apis/auth/Auth";
import { is } from "zod/locales";
// import { pharmacistSchema } from "../../validation/signupFormValidation/SignUpFormValidation";
// import logo from "../../assets/img/l";

const VerifyOtpSection = ({ id }) => {
  const [email, setEmail] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResendOtp, setShowResendOtp] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });

  useEffect(() => {
    GetOnePr(id)
      .then((res) => {
        setEmail(res.pr_email);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [id]);

  const showSnackbar = (severity, loading = false, message) => {
    setSnackbar({
      open: true,
      message: loading ? "Processing..." : message,
      severity,
      loading,
    });

    if (!loading) {
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      role: "pr",
    },
  });

  const handleVerifyOtp = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (data.otp) {
        formData.append("otp", data.otp);
      }

      if (data.role) {
        formData.append("role", data.role);
      }

      await VerifyOtp(formData, id);
      showSnackbar("success", false, "Success. Your email is verified.");
      reset();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showSnackbar(
          "error",
          false,
          error.response.data.message ||
            "Something Went Wrong. Please try Again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ height: "100vh", maxWidth: "100vw", p: 4 }}>
      <Card
        sx={{
          maxMidth: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            marginBottom: 5,
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src="/logo.png"
              alt="logo"
              style={{ width: "100px", height: "100px" }}
              //style={{ width: "80px", height: "80px" }}
            ></img>
          </Box>
          <Box>
            <Typography variant="h4">Email Verification</Typography>
            <Typography variant="h6" color="gray">
              Please find the verification code sent to your email
            </Typography>
            <Divider sx={{ marginTop: "5px" }}></Divider>
          </Box>
        </Box>
        <Box
          sx={{ maxWidth: "100%" }}
          component="form"
          onSubmit={handleSubmit(handleVerifyOtp)}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
            }}
          >
            <FormControl
              variant="filled"
              fullWidth
              error={!!errors.otp}
              sx={{
                "& .MuiFilledInput-root": {
                  "&:before": {
                    borderBottom: "none",
                  },
                  "&:after": {
                    borderBottom: "none",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                },
              }}
            >
              <InputLabel htmlFor="otp">OTP</InputLabel>
              <FilledInput
                id="otp"
                size="small"
                type="number"
                disabled={isSubmitting}
                {...register("otp")}
                endAdornment={
                  isSubmitting ? (
                    <InputAdornment position="end">
                      <CircularProgress size={24} />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        aria-label="toggle password visibility"
                        type="submit"
                        edge="end"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              />
              {errors.otp && (
                <FormHelperText error>{errors.otp.message}</FormHelperText>
              )}
            </FormControl>
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="caption">
              Didn't get the OTP?{" "}
              <Box
                component="span"
                sx={{
                  cursor: "pointer",
                  color: "text.primary",
                  "&:hover": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
                onClick={() => {
                  setShowResendOtp(true);
                }}
              >
                Click here
              </Box>
            </Typography>
            {/* <Link>Didn't get the OTP? Click here</Link> */}
          </Box>
        </Box>

        {showResendOtp && <ResendOtpSection email={email} id={id} />}
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

export default VerifyOtpSection;
