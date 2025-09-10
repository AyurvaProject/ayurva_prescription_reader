import React, { useEffect, useState } from "react";
import {
  GetPrescriptionDetailsByPrescriptionId,
  DeletePrescriptionDetail,
} from "../../apis/prescriptionDetail/PrescriptionDetail";
import {
  ChangePrescriptionStatus,
  GetOnePres,
} from "../../apis/prescription/Prescription";
import { GetCurrentUser } from "../../apis/auth/Auth";
import DataGridComponent from "../../component/datagrid/DataGrid";
import {
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
import LoadingSection from "../loading/LoadingSection";

const PrescriptionDetailListSection = ({ id }) => {
  const navigate = useNavigate();
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [prescription, setPrescription] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
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

  useEffect(() => {
    setIsLoading(true);
    GetPrescriptionDetailsByPrescriptionId(id).then((response) => {
      setPrescriptionDetails(response);
    });
    GetOnePres(id).then((response) => {
      setPrescription(response);
    });
    setIsLoading(false);
  }, [id, isDeleting]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "product_license_no",
      headerName: "Product License No",
      flex: 0.6,
    },
    { field: "mg", headerName: "Mg (Miligrams)", flex: 0.3 },
    { field: "ml", headerName: "Ml (Milliliters)", flex: 0.3 },
    { field: "quantity", headerName: "Quantity", flex: 0.2 },
    { field: "days", headerName: "No. of Days", flex: 0.2 },
    { field: "times", headerName: "No. of Times", flex: 0.3 },
    { field: "frequency", headerName: "Frequency", flex: 0.3 },
    { field: "moment_of_take", headerName: "Moment of Take", flex: 0.3 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          sx={{ justifyContent: "center", alignItems: "center", my: 1 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              navigate(`/prescriptionDetail/edit/${id}/${params.row.id}`);
            }}
            disabled={
              isDeleting ||
              prescription.pres_status !== "pending" ||
              !prescription.pres_active_status ||
              !GetCurrentUser() ||
              GetCurrentUser()?.id !== prescription.pr_id
            }
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => {
              handleDelete(params.row.id);
            }}
            disabled={
              isDeleting ||
              prescription.pres_status !== "pending" ||
              !prescription.pres_active_status ||
              !GetCurrentUser() ||
              GetCurrentUser()?.id !== prescription.pr_id
            }
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const rows = prescriptionDetails.map((prescriptionDetail) => ({
    id: prescriptionDetail.prescription_detail_id,
    product_license_no: prescriptionDetail.product_license_no,
    mg: prescriptionDetail.mg,
    ml: prescriptionDetail.ml,
    quantity: prescriptionDetail.quantity,
    days: prescriptionDetail.days,
    times: prescriptionDetail.times,
    frequency: prescriptionDetail.frequency,
    moment_of_take: prescriptionDetail.moment_of_take,
  }));

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await DeletePrescriptionDetail(id);
      setIsDeleting(false);
      showSnackbar(
        "success",
        false,
        "Prescription detail deleted successfully"
      );
    } catch (error) {
      console.error(error);
      showSnackbar("error", false, error.response.data.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setIsStatusUpdating(true);
      await ChangePrescriptionStatus(id, status);
      setIsStatusUpdating(false);
      showSnackbar(
        "success",
        false,
        "Prescription status updated successfully"
      );
    } catch (error) {
      console.error(error);
      showSnackbar("error", false, error.response.data.message);
    }
  };

  if (isLoading) {
    return <LoadingSection />;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Prescription Details</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/prescriptionDetail/add/${id}`)}
            disabled={
              isStatusUpdating ||
              prescription.pres_status !== "pending" ||
              !GetCurrentUser() ||
              GetCurrentUser()?.id !== prescription.pr_id ||
              !prescription.pres_active_status
            }
          >
            Add Product Info
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              prescriptionDetails.length === 0 ||
              isStatusUpdating ||
              prescription.pres_status !== "pending" ||
              !GetCurrentUser() ||
              GetCurrentUser()?.id !== prescription.pr_id ||
              !prescription.pres_active_status
            }
            onClick={() => handleStatusChange(id, "read")}
            startIcon={isStatusUpdating ? <CircularProgress size={20} /> : null}
          >
            Finish Reading
          </Button>
        </Stack>
      </Box>

      <Divider sx={{ my: 2 }} />

      <DataGridComponent columns={columns} rows={rows} />

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

export default PrescriptionDetailListSection;
