import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
  Stack,
  FormHelperText,
  FilledInput,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signupFormSchema } from "../../validation/signUpFormValidation/SignUpFormValidation";
// import { FileInputField } from "../../component/fileUpload/FileInputField";
import { FileUpload } from "../../component/fileUpload/FileUpload";
import { SignUp } from "../../apis/auth/Auth";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";

const SignUpFormSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });
  const navigate = useNavigate();

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
    control,
  } = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      role: "pr",
    },
  });

  const handleFileChange = async (fieldName, file) => {
    setValue(fieldName, file);
    await trigger(fieldName);
  };

  const handleClearFile = (fieldName) => {
    setValue(fieldName, null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (data.pr_nic_front) {
        formData.append("files", data.pr_nic_front);
      }
      if (data.pr_nic_back) {
        formData.append("files", data.pr_nic_back);
      }

      if (data.qualification_doc) {
        formData.append("files", data.qualification_doc);
      }

      if (data.pr_profile_pic) {
        formData.append("files", data.pr_profile_pic);
      }

      if (data.user_name) {
        formData.append("user_name", data.user_name);
      }

      if (data.pr_name) {
        formData.append("pr_name", data.pr_name);
      }

      if (data.pr_email) {
        formData.append("pr_email", data.pr_email);
      }

      if (data.pr_contact_no) {
        formData.append("pr_contact_no", data.pr_contact_no);
      }

      if (data.password) {
        formData.append("password", data.password);
      }

      if (data.pr_address_l1) {
        formData.append("pr_address_l1", data.pr_address_l1);
      }

      if (data.pr_address_l2) {
        formData.append("pr_address_l2", data.pr_address_l2);
      }

      if (data.pr_address_l3) {
        formData.append("pr_address_l3", data.pr_address_l3);
      }

      if (data.pr_district) {
        formData.append("pr_district", data.pr_district);
      }

      if (data.pr_bio) {
        formData.append("pr_bio", data.pr_bio);
      }

      const response = await SignUp(formData);
      console.log(response);
      showSnackbar("success", false, "Success. Please Verify your Email.");
      reset();
      navigate(`/verifyOtp/${response.user.id}`);
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

  const handleCloseSnackbar = () => {
    setError("");
    setSuccess(false);
  };

  return (
    <Box
      sx={{ maxWidth: "100%" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Basic Information
      </Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          {...register("user_name")}
          error={!!errors.user_name}
          helperText={errors.user_name?.message}
          size="small"
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
        />
        <TextField
          label="Your Full Name"
          variant="filled"
          fullWidth
          {...register("pr_name")}
          error={!!errors.pr_name}
          helperText={errors.pr_name?.message}
          size="small"
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
        />
        <TextField
          label="Your Email"
          variant="filled"
          fullWidth
          type="email"
          {...register("pr_email")}
          error={!!errors.pr_email}
          helperText={errors.pr_email?.message}
          size="small"
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
        />
        <TextField
          label="Your Contact Number"
          variant="filled"
          fullWidth
          {...register("pr_contact_no")}
          error={!!errors.pr_contact_no}
          helperText={errors.pr_contact_no?.message}
          size="small"
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
        />
        <FormControl
          variant="filled"
          fullWidth
          error={!!errors.password}
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
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
            id="password"
            size="small"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          variant="filled"
          fullWidth
          error={!!errors.confirmPassword}
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
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <FilledInput
            size="small"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                  size="small"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
          {errors.confirmPassword && (
            <FormHelperText error>
              {errors.confirmPassword.message}
            </FormHelperText>
          )}
        </FormControl>

        <Box sx={{ gridColumn: "1 / -1" }}>
          <TextField
            label="Bio"
            variant="filled"
            multiline
            rows={4}
            fullWidth
            size="small"
            {...register("pr_bio")}
            error={!!errors.pr_bio}
            helperText={errors.pr_bio?.message}
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
          />
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Location Details
      </Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}
      >
        <TextField
          label="Address Line 1"
          variant="filled"
          fullWidth
          {...register("pr_address_l1")}
          error={!!errors.pr_address_l1}
          helperText={errors.pr_address_l1?.message}
          size="small"
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
        />
        <TextField
          label="Address Line 2"
          variant="filled"
          fullWidth
          {...register("pr_address_l2")}
          error={!!errors.pr_address_l2}
          helperText={errors.pr_address_l2?.message}
          size="small"
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
        />
        <TextField
          label="City"
          variant="filled"
          fullWidth
          {...register("pr_address_l3")}
          error={!!errors.pr_address_l3}
          helperText={errors.pr_address_l3?.message}
          size="small"
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
        />
        <TextField
          label="District"
          variant="filled"
          fullWidth
          {...register("pr_district")}
          error={!!errors.pr_district}
          helperText={errors.pr_district?.message}
          size="small"
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
        />
      </Box>
      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Required Documents
      </Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}
      >
        <FileUpload
          name="pr_profile_pic"
          label="Profile Picture"
          description="Upload another image of yourself (JPEG, PNG, WEBP)"
          control={control}
          maxSize={5 * 1024 * 1024}
          mediaType="image"
          enableCrop={true}
          cropAspectRatio={1 / 1}
          onFileChange={(file) => handleFileChange("pr_profile_pic", file)}
          error={errors.pr_profile_pic?.message}
          standalone={false}
        />
        <FileUpload
          name="qualification_doc"
          label="Qualification Document"
          description="Upload another image of your qualification (JPEG, PNG, WEBP)"
          control={control}
          maxSize={5 * 1024 * 1024}
          mediaType="image"
          enableCrop={false}
          onFileChange={(file) => handleFileChange("qualification_doc", file)}
          error={errors.qualification_doc?.message}
          standalone={false}
        />
        <FileUpload
          name="pr_nic_front"
          label="NIC Front"
          description="Upload another image of the front of your NIC (JPEG, PNG, WEBP)"
          control={control}
          maxSize={5 * 1024 * 1024}
          mediaType="image"
          enableCrop={false}
          onFileChange={(file) => handleFileChange("pr_nic_front", file)}
          error={errors.pr_nic_front?.message}
          standalone={false}
        />

        <FileUpload
          name="pr_nic_back"
          label="NIC Back"
          description="Upload another image of the back of your NIC (JPEG, PNG, WEBP)"
          control={control}
          maxSize={5 * 1024 * 1024}
          mediaType="image"
          enableCrop={false}
          onFileChange={(file) => handleFileChange("pr_nic_back", file)}
          error={errors.pr_nic_back?.message}
          standalone={false}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          onClick={() => reset()}
          disabled={isSubmitting}
          sx={{ width: "160px" }}
        >
          Reset
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          endIcon={isSubmitting ? <CircularProgress size={12} /> : null}
          sx={{ width: "160px" }}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Box>
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

export default SignUpFormSection;
