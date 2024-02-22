import emailjs from "emailjs-com";

const sendEmail = async (templateParams) => {
  try {
    
    const serviceId = "service_uerbqtc";
    const templateId = "template_98gao7l";
    const userId = "iwIuwWy30GASAaa0m";

    await emailjs.send(serviceId, templateId, templateParams, userId);

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export default sendEmail;