    import {PDFParse} from "pdf-parse";
import { bucket } from "../config/firebase.js";

const startChat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file found" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "only PDF files are allowed" });
    }

    let pdfText = "";

    try{   
        console.log(req.file.buffer) 
        const pdfData = new PDFParse({data: req.file.buffer})
        const result = await pdfData.getText();
        pdfText = result.text
    }
    catch(error){
        console.error("Failed to parse PDF:", error);
        return res.status(500).json({ error: "Could not read text from the provided PDF." });
    }

    // groq api call 

    const safeOriginalName = req.file.originalname.replace(/\s+/g, '_');
    const fileName = `upload/${Date.now()}_${safeOriginalName}`;
    // const file = bucket.file(fileName);

    // const stream = file.createWriteStream({
    //   metadata: {
    //     contentType: req.file.mimetype,
    //   },
    // });

    // stream.on("error", (error) => {
    //   console.error(`Firebase Storage error: ${error}`);
    //   res.status(500).json({ error: `fail to upload file on Firebase` });
    // });

    // stream.on("finish", async () => {
    //   await file.makePublic(); // ???
      const publicUrl = `https://storage.googleapis.com/${fileName}`;
    //   const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      res.status(200).json({
        message: "PDF uploaded succesfull",
        URL: publicUrl,
        fileName: fileName,
        text: pdfText      
      });
    // });

    // stream.end(req.file.buffer);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default startChat;
