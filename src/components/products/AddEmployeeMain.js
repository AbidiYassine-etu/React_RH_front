import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddEmployeeMain = () => {
    const [successMessage, setSuccessMessage] = useState(""); // Message de succès
    const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur

    // Schéma de validation avec Yup
    const validationSchema = Yup.object({
        nom: Yup.string().required("Nom requis"),
        prenom: Yup.string().required("Prénom requis"),
        email: Yup.string().email("Email invalide").required("Email requis"),
        dateDebut: Yup.date().required("Date de début requise"),
        dateFin: Yup.date().required("Date de fin requise"),
    });

    // Fonction de soumission
    const onSubmit = async (values, { resetForm, setSubmitting, setFieldError }) => {
        try {
            const payload = {
                nom: values.nom,
                prenom: values.prenom,
                email: values.email,
                date_Debut: values.dateDebut,
                date_Fin: values.dateFin,
            };

            const response = await axios.post("http://localhost:8082/conges/addConges", payload);
            if (response.status === 201) {
                setSuccessMessage(`Congé ajouté avec succès! ID: ${response.data.id}, Du ${response.data.date_Debut} au ${response.data.date_Fin}`);
                resetForm();
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Erreur lors de l'ajout du congé. Veuillez réessayer.";
            setFieldError("general", errorMsg);
            setErrorMessage(errorMsg);
            console.error("Erreur:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
            <div
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    maxWidth: "800px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        marginBottom: "20px",
                        borderBottom: "2px solid #3f51b5",
                        paddingBottom: "10px",
                    }}
                >
                    <h2 style={{ color: "#3f51b5", margin: "0" }}>Ajouter un Congé</h2>
                </div>
                <Formik
                    initialValues={{
                        nom: "",
                        prenom: "",
                        email: "",
                        dateDebut: "",
                        dateFin: "",
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
                                    <label htmlFor="nom" style={{ fontWeight: "bold", color: "#333" }}>
                                        Nom
                                    </label>
                                    <Field type="text" name="nom" placeholder="Tapez ici" className="form-control" />
                                    <ErrorMessage name="nom" component="div" style={{ color: "red" }} />
                                </div>

                                <div>
                                    <label htmlFor="prenom" style={{ fontWeight: "bold", color: "#333" }}>
                                        Prénom
                                    </label>
                                    <Field type="text" name="prenom" placeholder="Tapez ici" className="form-control" />
                                    <ErrorMessage name="prenom" component="div" style={{ color: "red" }} />
                                </div>

                                <div>
                                    <label htmlFor="email" style={{ fontWeight: "bold", color: "#333" }}>
                                        Email
                                    </label>
                                    <Field type="email" name="email" placeholder="Tapez ici" className="form-control" />
                                    <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                                </div>

                                <div>
                                    <label htmlFor="dateDebut" style={{ fontWeight: "bold", color: "#333" }}>
                                        Date Début
                                    </label>
                                    <Field type="date" name="dateDebut" className="form-control" />
                                    <ErrorMessage name="dateDebut" component="div" style={{ color: "red" }} />
                                </div>

                                <div>
                                    <label htmlFor="dateFin" style={{ fontWeight: "bold", color: "#333" }}>
                                        Date Fin
                                    </label>
                                    <Field type="date" name="dateFin" className="form-control" />
                                    <ErrorMessage name="dateFin" component="div" style={{ color: "red" }} />
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
        </div>
    );
};

export default AddEmployeeMain;
