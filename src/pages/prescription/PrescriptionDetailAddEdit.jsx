import React, { useEffect, useState } from "react";
import {
  CreatePrescriptionDetail,
  UpdatePrescriptionDetail,
  GetPrescriptionDetail,
} from "../../apis/prescriptionDetail/PrescriptionDetail";
import { GetAllProducts } from "../../apis/product/Products";
import { useParams } from "react-router-dom";
import PrescriptionFormSection from "../../section/prescription/PrescriptionDetailFormSection";
import LoadingSection from "../../section/loading/LoadingSection";

const PrescriptionDetailAddEdit = () => {
  const { pres_detail_id, pres_id } = useParams();
  const [presDetail, setPresDetail] = useState({});
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(true);

  useEffect(() => {
    if (pres_detail_id) {
      setIsLoading(true);
      GetPrescriptionDetail(pres_detail_id).then((response) => {
        setPresDetail(response);
        setIsLoading(false);
      });
    }
  }, [pres_detail_id]);

  useEffect(() => {
    setIsProductLoading(true);
    GetAllProducts().then((response) => {
      setProducts(response);
      setIsProductLoading(false);
    });
  }, []);

  const onSubmitHandler = async (data) => {
    if (pres_detail_id) {
      await UpdatePrescriptionDetail(pres_detail_id, data);
    } else {
      await CreatePrescriptionDetail(data);
    }
  };

  if (isLoading || isProductLoading) {
    return <LoadingSection />;
  }
  return (
    <PrescriptionFormSection
      onSubmit={onSubmitHandler}
      initialData={presDetail || undefined}
      presId={pres_id}
      products={products}
    />
  );
};

export default PrescriptionDetailAddEdit;
