import React, { useState, useEffect } from "react";
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
  Autocomplete,
  Divider,
} from "@mui/material";
import { prescriptionDetailFormSchema } from "../../validation/prescriptionDetailFormValidation/PrescriptionDetailFormValidation";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetAllProducts } from "../../apis/product/Products";

const PrescriptionFormSection = ({
  initialData = null,
  onSubmit,
  presId,
  products,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
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
    control,
  } = useForm({
    resolver: zodResolver(prescriptionDetailFormSchema),
    defaultValues: {
      product_license_no: initialData?.product_license_no || "",
      mg: initialData?.mg || 0,
      ml: initialData?.ml || 0,
      quantity: initialData?.quantity || 0,
      days: initialData?.days || 0,
      times: initialData?.times || 0,
      frequency: initialData?.frequency || "",
      insructions: initialData?.insructions || "",
      moment_of_take: initialData?.moment_of_take || "",
      pres_id: Number(presId),
    },
  });
  const selectedProduct = watch("product_license_no");

  console.log("Form Data: ", getValues());

  const onSubmitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      showSnackbar("success", false, "Prescription updated successfully");
    } catch (error) {
      showSnackbar("error", false, error.response.data.message);
    }
    setIsSubmitting(false);
  };

  const productOptions = products.map((product) => ({
    label: product.product_name,
    value: product.product_license_no,
  }));
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Read Prescription</Typography>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{ maxWidth: "100%" }}
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <Autocomplete
            options={productOptions}
            getOptionLabel={(option) => `${option.label} (${option.value})`}
            value={
              productOptions.find((opt) => opt.value === selectedProduct) ||
              null
            }
            onChange={(event, newValue) => {
              setValue("product_license_no", newValue ? newValue.value : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Product"
                variant="filled"
                size="small"
                error={!!errors.product_license_no}
                helperText={errors.product_license_no?.message}
              />
            )}
          />
          <TextField
            label="Amount of mg"
            variant="filled"
            type="number"
            fullWidth
            {...register("mg", { valueAsNumber: true })}
            error={!!errors.mg}
            helperText={errors.mg?.message}
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
            label="Amount of ml"
            variant="filled"
            type="number"
            fullWidth
            {...register("ml", { valueAsNumber: true })}
            error={!!errors.ml}
            helperText={errors.ml?.message}
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
            label="Quantity"
            variant="filled"
            type="number"
            fullWidth
            {...register("quantity", { valueAsNumber: true })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
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
            label="Number of days"
            variant="filled"
            type="number"
            fullWidth
            {...register("days", { valueAsNumber: true })}
            error={!!errors.days}
            helperText={errors.days?.message}
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
            label="Number of times"
            variant="filled"
            type="number"
            fullWidth
            {...register("times", { valueAsNumber: true })}
            error={!!errors.times}
            helperText={errors.times?.message}
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
            label="Frequency"
            variant="filled"
            fullWidth
            {...register("frequency")}
            error={!!errors.frequency}
            helperText={errors.frequency?.message}
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
            label="Moment of take"
            variant="filled"
            fullWidth
            {...register("moment_of_take")}
            error={!!errors.moment_of_take}
            helperText={errors.moment_of_take?.message}
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
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField
              label="Instructions"
              variant="filled"
              multiline
              rows={4}
              fullWidth
              size="small"
              {...register("insructions")}
              error={!!errors.insructions}
              helperText={errors.insructions?.message}
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

export default PrescriptionFormSection;
