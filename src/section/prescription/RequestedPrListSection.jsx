import React, { useEffect, useState } from "react";
import DataGridComponent from "../../component/datagrid/DataGrid";
import {
  GetAllPendingPrs,
  AssignPrForPrescriptiption,
} from "../../apis/prescription/Prescription";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../component/snackbar/CustomSnackbar";
const RequestedPrListSection = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
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

  useEffect(() => {
    setLoading(true);
    GetAllPendingPrs().then((response) => {
      setPrescriptions(response);
      setLoading(false);
    });
  }, []);

  const assignPr = async (id) => {
    try {
      await AssignPrForPrescriptiption(id);
      showSnackbar("success", false, "Prescription assigned successfully");
      GetAllPendingPrs().then((response) => {
        setPrescriptions(response);
        setLoading(false);
      });
    } catch (error) {
      showSnackbar("error", false, error.response.data.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "pres_uploaded_date", headerName: "Uploaded Date", flex: 0.5 },
    { field: "pres_uploaded_time", headerName: "Uploaded Time", flex: 0.5 },
    { field: "user_name", headerName: "User Name", flex: 0.5 },
    {
      field: "active",
      headerName: "Active",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          color={params.value === true ? "success" : "error"}
          variant="filled"
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => (
        <Chip
          label={
            params.value == "pending"
              ? "Pending"
              : params.value == "assigned"
              ? "Assigned"
              : params.value == "completed"
              ? "Completed"
              : "Cancelled"
          }
          color={
            params.value == "pending"
              ? "warning"
              : params.value == "assigned"
              ? "info"
              : params.value == "completed"
              ? "success"
              : "error"
          }
          variant="filled"
          size="small"
        />
      ),
    },
    {
      field: "view",
      headerName: "View",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => {
            navigate(`/singlePrescription/${params.row.id}`);
          }}
        >
          View
        </Button>
      ),
    },
    {
      field: "assign",
      headerName: "Assign",
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          disabled={params.row.active === false}
          size="small"
          onClick={() => {
            assignPr(params.row.id);
          }}
        >
          Assign
        </Button>
      ),
    },
  ];

  const rows = prescriptions.map((pr) => ({
    id: pr.pres_id,
    pres_uploaded_date: pr.pres_uploaded_date,
    pres_uploaded_time: pr.pres_uploaded_time,
    user_name: pr.user.user_name,
    active: pr.pres_active_status,
    status: pr.pres_status,
  }));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Requested Prescription List
      </Typography>
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

export default RequestedPrListSection;
