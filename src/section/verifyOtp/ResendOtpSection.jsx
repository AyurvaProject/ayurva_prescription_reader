import {
  Box,
  TextField,
  CircularProgress,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { ResendOtp } from "../../apis/auth/Auth";
import { useState, useEffect } from "react";
import { resendOtpSchema } from "../../validation/verifyOtpFormValidation/ResendOtpFormValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
import SendIcon from "@mui/icons-material/Send";

const ResendOtpSection = ({ id, email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    resolver: zodResolver(resendOtpSchema),
    defaultValues: {
      role: "pr",
      newEmail: email,
    },
  });

  const handleResendOtp = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      if (data.newEmail) {
        formData.append("newEmail", data.newEmail);
      }
      if (data.role) {
        formData.append("role", data.role);
      }
      await ResendOtp(id, formData);
      showSnackbar("success", false, "Success. Please Verify your Email.");
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
    <Box
      sx={{ mt: 4 }}
      component="form"
      onSubmit={handleSubmit(handleResendOtp)}
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
          error={!!errors.newEmail}
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
          <InputLabel htmlFor="newEmail">Your Email</InputLabel>
          <FilledInput
            id="newEmail"
            size="small"
            disabled={isSubmitting}
            {...register("newEmail")}
            endAdornment={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
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
          {errors.newEmail && (
            <FormHelperText error>{errors.newEmail.message}</FormHelperText>
          )}
        </FormControl>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        loading={snackbar.loading}
      />
    </Box>
  );
};

export default ResendOtpSection;
