import { useState, useEffect } from "react";
import { TextField, Button, Container, FormControl, Snackbar, Alert } from "@mui/material";
import { jsPDF } from "jspdf";
import background from "./assets/el_ancla_first.jpg";
// import CropImage from "./componentes/crop/cropimage";
// import page2Background from "./assets/el_ancla_empty.jpg"
// import { FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';

function MudanzasForm() {
  const [formData, setFormData] = useState({
    nombreCondominio: "",
    nombreAdministracion: "",
    telefonoAdministracion: "",
    emailAdministracion: "",
    nombrePresidenteMesaDirectiva: "",
    telefonoPresidenteMesaDirectiva: "", // Nuevo campo
    emailPresidenteMesaDirectiva: "",
    nombreSecretarioMesaDirectiva: "",
    emailSecretarioMesaDirectiva: "", // Nuevo campo
    telefonoSecretarioMesaDirectiva: "",
    nombreTesoreroMesaDirectiva: "",
    telefonoTesoreroMesaDirectiva: "",
    emailTesoreroMesaDirectiva: "",
    nombreVocal1: "",
    telefonoVocal1: "",
    emailVocal1: "",
    nombreVocal2: "",
    telefonoVocal2: "",
    emailVocal2: "",
    cantidadDepartamentosTorre: "",
    cantidadDepartamentosOcupados: "",
    cantidadDepartamentosTemporales: "",
  });

  // const [imageSrc, setImageSrc] = useState(null);
  // const [croppedImages, setCroppedImages] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState(null);
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 595;
      canvas.height = 842;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, 595, 842);
      setBackgroundImage(canvas.toDataURL("image/jpeg"));
    };
    img.src = background;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setImageSrc(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleCropComplete = (croppedImage) => {
  //   setCroppedImages((prevImages) => [...prevImages, croppedImage]);
  //   setImageSrc(null);
  //   setSnackbarMessage("Imagen agregada correctamente.");
  //   setSnackbarSeverity("success");
  //   setSnackbarOpen(true);
  // };

  // const handleSnackbarClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSnackbarOpen(false);
  // };

  const generatePDF = () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });

    pdf.setFontSize(12);
    let yPosition = 140;
    const lineHeight = 15;

    // Primera página
    if (backgroundImage) {
      pdf.addImage(backgroundImage, "JPEG", 0, 0, 448, 632);
    }

// Nuevo título
  pdf.setFontSize(18); // Puedes ajustar el tamaño de la fuente del título si lo deseas
  pdf.text(`Datos del condominio`, 155, 120);
  yPosition += lineHeight; // Ajusta la posición para el siguiente texto

  pdf.setFontSize(12); // Restaura el tamaño de fuente para los datos

    pdf.text(`Nombre del Condominio: ${formData.nombreCondominio}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Nombre de la Administración: ${formData.nombreAdministracion}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Teléfono de la Administración: ${formData.telefonoAdministracion}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email de la Administración: ${formData.emailAdministracion}`, 25, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Presidente de la Mesa Directiva: ${formData.nombrePresidenteMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Teléfono del Presidente: ${formData.telefonoPresidenteMesaDirectiva}`, 25, yPosition); // Nuevo campo
    yPosition += lineHeight;
    pdf.text(`Email del Presidente: ${formData.emailPresidenteMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Secretario de la Mesa Directiva: ${formData.nombreSecretarioMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email del Secretario: ${formData.emailSecretarioMesaDirectiva}`, 25, yPosition); // Nuevo campo
    yPosition += lineHeight;
    pdf.text(`Teléfono del Secretario: ${formData.telefonoSecretarioMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Tesorero de la Mesa Directiva: ${formData.nombreTesoreroMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Teléfono del Tesorero: ${formData.telefonoTesoreroMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email del Tesorero: ${formData.emailTesoreroMesaDirectiva}`, 25, yPosition);
    yPosition += lineHeight*2;

    // Segunda página
    // pdf.addPage();
    // if (page2Background) {
    //   pdf.addImage(page2Background, "JPEG", 0, 0, 595, 842);
    // }
    // yPosition = 70; // Reinicia la posición Y para la segunda página
    pdf.text(`Vocal: ${formData.nombreVocal1}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Teléfono del Vocal: ${formData.telefonoVocal1}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email del Vocal: ${formData.emailVocal1}`, 25, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Vocal: ${formData.nombreVocal2}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Teléfono del Vocal: ${formData.telefonoVocal2}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Email del Vocal: ${formData.emailVocal2}`, 25, yPosition);
    yPosition += lineHeight * 2;

    pdf.text(`Cantidad de Departamentos en la Torre: ${formData.cantidadDepartamentosTorre}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Cantidad de Departamentos Ocupados: ${formData.cantidadDepartamentosOcupados}`, 25, yPosition);
    yPosition += lineHeight;
    pdf.text(`Cantidad de Departamentos para Alojamientos Temporales: ${formData.cantidadDepartamentosTemporales}`, 25, yPosition);

    // Páginas para las imágenes recortadas
    // croppedImages.forEach((img) => {
    //   pdf.addPage();
    //   pdf.addImage(page2Background, "JPEG", 0, 0, 595, 842);
    //   pdf.addImage(img, "PNG", 50, 150, 295, 202);
    // });

    pdf.save(`Informacion_Condominio_${formData.nombreCondominio}.pdf`);

    setFormData({
      nombreCondominio: "",
      nombreAdministracion: "",
      telefonoAdministracion: "",
      emailAdministracion: "",
      nombrePresidenteMesaDirectiva: "",
      telefonoPresidenteMesaDirectiva: "", // Nuevo campo
      emailPresidenteMesaDirectiva: "",
      nombreSecretarioMesaDirectiva: "",
      emailSecretarioMesaDirectiva: "", // Nuevo campo
      telefonoSecretarioMesaDirectiva: "",
      nombreTesoreroMesaDirectiva: "",
      telefonoTesoreroMesaDirectiva: "",
      emailTesoreroMesaDirectiva: "",
      nombreVocal1: "",
      telefonoVocal1: "",
      emailVocal1: "",
      nombreVocal2: "",
      telefonoVocal2: "",
      emailVocal2: "",
      cantidadDepartamentosTorre: "",
      cantidadDepartamentosOcupados: "",
      cantidadDepartamentosTemporales: "",
    });

    // setCroppedImages([]);
  };

  return (
    <Container>
      <form>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Condominio"
            name="nombreCondominio"
            value={formData.nombreCondominio}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre de la Administración"
            name="nombreAdministracion"
            value={formData.nombreAdministracion}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono de la Administración"
            name="telefonoAdministracion"
            value={formData.telefonoAdministracion}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email de la Administración"
            name="emailAdministracion"
            value={formData.emailAdministracion}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Presidente de la Mesa Directiva"
            name="nombrePresidenteMesaDirectiva"
            value={formData.nombrePresidenteMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono del Presidente de la Mesa Directiva"
            name="telefonoPresidenteMesaDirectiva"
            value={formData.telefonoPresidenteMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Correo del Presidente de la Mesa Directiva"
            name="emailPresidenteMesaDirectiva"
            value={formData.emailPresidenteMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Secretario de la Mesa Directiva"
            name="nombreSecretarioMesaDirectiva"
            value={formData.nombreSecretarioMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Correo del Secretario de la Mesa Directiva"
            name="emailSecretarioMesaDirectiva"
            value={formData.emailSecretarioMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono del Secretario de la Mesa Directiva"
            name="telefonoSecretarioMesaDirectiva"
            value={formData.telefonoSecretarioMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Tesorero de la Mesa Directiva"
            name="nombreTesoreroMesaDirectiva"
            value={formData.nombreTesoreroMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono del Tesorero de la Mesa Directiva"
            name="telefonoTesoreroMesaDirectiva"
            value={formData.telefonoTesoreroMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email del Tesorero de la Mesa Directiva"
            name="emailTesoreroMesaDirectiva"
            value={formData.emailTesoreroMesaDirectiva}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Vocal"
            name="nombreVocal1"
            value={formData.nombreVocal1}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono del Vocal"
            name="telefonoVocal1"
            value={formData.telefonoVocal1}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email del Vocal"
            name="emailVocal1"
            value={formData.emailVocal1}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Nombre del Vocal"
            name="nombreVocal2"
            value={formData.nombreVocal2}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Teléfono del Vocal"
            name="telefonoVocal2"
            value={formData.telefonoVocal2}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email del Vocal"
            name="emailVocal2"
            value={formData.emailVocal2}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="¿Cuántos departamentos conforman la torre?"
            name="cantidadDepartamentosTorre"
            value={formData.cantidadDepartamentosTorre}
            onChange={handleChange}
            type="number"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="¿Cuántos departamentos están en ocupación?"
            name="cantidadDepartamentosOcupados"
            value={formData.cantidadDepartamentosOcupados}
            onChange={handleChange}
            type="number"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="¿Cuántos departamentos están destinados para alojamientos temporales?"
            name="cantidadDepartamentosTemporales"
            value={formData.cantidadDepartamentosTemporales}
            onChange={handleChange}
            type="number"
          />
        </FormControl>

        {/* <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '20px' }} />
        {imageSrc && (
          <CropImage
            imageSrc={imageSrc}
            onCropCompleteCallback={handleCropComplete}
            onClose={() => setImageSrc(null)}
          />
        )} */}
        <Button variant="contained" style={{ marginTop: "20px" }} onClick={generatePDF}>
          Generar PDF
        </Button >
        {/* Snackbar para la confirmación */}
        {/* <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar> */}
      </form>
    </Container>
  );
}

export default MudanzasForm;