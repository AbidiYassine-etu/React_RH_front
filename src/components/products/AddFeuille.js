import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";

const AddFeuilleTemps = () => {
    const [successMessage, setSuccessMessage] = useState(""); // Message de succès
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

    const validationSchema = Yup.object({
        commentaire_Feuille: Yup.string(),
        date_Feuille: Yup.date().required("La date est requise"),
        sujet_Feuille: Yup.string().required("Le sujet est requis"),
        heure_Debut: Yup.string()
            .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Heure de début invalide (format HH:mm)")
            .required("L'heure de début est requise"),
        heure_Fin: Yup.string()
            .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Heure de fin invalide (format HH:mm)")
            .required("L'heure de fin est requise"),
        validée: Yup.boolean().required("Le statut de validation est requis"),
        rh_id: Yup.number().required("ID Admin RH requis"),
        employee_id: Yup.number().required("ID Employé requis"),
    });

    const onSubmit = async (values, { resetForm, setSubmitting, setFieldError }) => {
        try {
            const payload = {
                commentaire_Feuille: values.commentaire_Feuille,
                date_Feuille: values.date_Feuille,
                sujet_Feuille: values.sujet_Feuille,
                validée: values.validée,
                rh_id: values.rh_id,
                employee_id: values.employee_id,
                heure_Debut: values.heure_Debut,
                heure_Fin: values.heure_Fin,
            };

            const response = await axios.post("http://localhost:8082/api/feuille-temps/", payload);
            if (response.status === 201) {
                setSuccessMessage(`Feuille de temps ajoutée avec succès! ID: ${response.data.id}`);
                resetForm();
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Erreur lors de l'ajout de la feuille de temps. Veuillez réessayer.";
            setFieldError("general", errorMsg);
            setErrorMessage(errorMsg);
            console.error("Erreur:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: "flex", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sidebar />

            {/* Contenu principal */}
            <section style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
                <div
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        padding: "20px",
                        maxWidth: "800px",
                        margin: "0 auto",
                    }}
                >
                    <div
                        style={{
                            marginBottom: "20px",
                            borderBottom: "2px solid #3f51b5",
                            paddingBottom: "10px",
                        }}
                    >
                        <h2 style={{ color: "#3f51b5", margin: "0" }}>Ajouter une Feuille de Temps</h2>
                    </div>
                    <Formik
                        initialValues={{
                            commentaire_Feuille: "",
                            date_Feuille: "",
                            sujet_Feuille: "",
                            validée: false,
                            rh_id: "",
                            employee_id: "",
                            heure_Debut: "",
                            heure_Fin: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                {successMessage && (
                                    <div
                                        style={{
                                            backgroundColor: "#d4edda",
                                            color: "#155724",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {successMessage}
                                    </div>
                                )}
                                {errorMessage && (
                                    <div
                                        style={{
                                            backgroundColor: "#f8d7da",
                                            color: "#721c24",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {errorMessage}
                                    </div>
                                )}
                                <div style={{ display: "grid", gap: "15px" }}>
                                    <div>
                                        <label htmlFor="date_Feuille" style={{ fontWeight: "bold", color: "#333" }}>
                                            Date
                                        </label>
                                        <Field type="date" name="date_Feuille" className="form-control" />
                                        <ErrorMessage name="date_Feuille" component="div" style={{ color: "red" }} />
                                    </div>

                                    <div>
                                        <label htmlFor="heure_Debut" style={{ fontWeight: "bold", color: "#333" }}>
                                            Heure Début
                                        </label>
                                        <Field type="time" name="heure_Debut" className="form-control" />
                                        <ErrorMessage name="heure_Debut" component="div" style={{ color: "red" }} />
                                    </div>

                                    <div>
                                        <label htmlFor="heure_Fin" style={{ fontWeight: "bold", color: "#333" }}>
                                            Heure Fin
                                        </label>
                                        <Field type="time" name="heure_Fin" className="form-control" />
                                        <ErrorMessage name="heure_Fin" component="div" style={{ color: "red" }} />
                                    </div>

                                    <div>
                                        <label htmlFor="rh_id" style={{ fontWeight: "bold", color: "#333" }}>
                                            ID Admin RH
                                        </label>
                                        <Field type="number" name="rh_id" className="form-control" />
                                        <ErrorMessage name="rh_id" component="div" style={{ color: "red" }} />
                                    </div>

                                    <div>
                                        <label htmlFor="employee_id" style={{ fontWeight: "bold", color: "#333" }}>
                                            ID Employé
                                        </label>
                                        <Field type="number" name="employee_id" className="form-control" />
                                        <ErrorMessage name="employee_id" component="div" style={{ color: "red" }} />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            backgroundColor: "#3f51b5",
                                            color: "#fff",
                                            padding: "10px 20px",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            fontWeight: "bold",
                                            marginTop: "10px",
                                        }}
                                    >
                                        Ajouter
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </div>
    );
};

export default AddFeuilleTemps;
