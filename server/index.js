import express from "express";
import axios from "axios";
import firebase from "./firebase.js";
import { getFirestore, collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


const headers = {
    'Content-Type': 'application/json',
  "User-Agent": "HassanKha4432",
  Authorization:
    "bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjpzS3dsMnlsV0VtMjVmcXhwTU40cWY4MXE2OWFFdWFyMnpLMUdhVGxjdWNZIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzA3MjQxNDY0LjkyNDA2MSwiaWF0IjoxNzA3MTU1MDY0LjkyNDA2MSwianRpIjoiQzdSNkItM3dNaVd6ZFdsS1RYTUl5ZUIxQWl6S05nIiwiY2lkIjoiZUxDTmlwMmRIZ0lNdlBtU3hZTEZwUSIsImxpZCI6InQyX3J2ZGZxY3h1OSIsImFpZCI6InQyX3J2ZGZxY3h1OSIsImxjYSI6MTcwNTAwMjQ4NjA1Mywic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.Q1n8bOqjVUMVkWloZC7D1JxzNxrQCLu3ClmtRbTk1R-jN8bkFDGdggSOgLDP1FR-8xW17sQQc5TVuyb89R_vpA2lEYAsqlcAhquF7aP9psUojoBl2jSta2jTDEKqvh5pQSQZ9MN7ybCNgJwe4gtJuMIv1DsxAZeBHgpZOn-LLoS0_dwSAgv50SR2twczM2nlnI-c4ctjqaaMauZReWAxTaULQnm34weuqCYlNkXWEWcco61tox_mT1bw4KB3fz1prdJnmcwfM6RoW-KWcIc9ankOsb6OLqyEDKBFXAtyOlBHKGZqKAibkSSigFTcDkbYgb3TcCrQtnp72Af4OybglQ",
};


const axiosConfig = {
  headers,
};



app.post("/fetch-and-store", async (req, res) => {

  try {
    
    const redditApiUrl =
      `https://oauth.reddit.com/r/wwe/${req.body.Type}?after=` + req.body.data;



    const response = await axios.get(redditApiUrl, axiosConfig);

    const responseData = {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    };

    const dataFromReddit = responseData.data;
    const children = dataFromReddit.data;
    const firestore = getFirestore(firebase);
    const collectionRef = collection(firestore, req.body.Type);

    const documentRef = doc(firestore, req.body.Type,req.body.data == '' ? 'begin' : req.body.data);
    const documentSnapshot = await getDoc(documentRef);

    if (!documentSnapshot.exists()) {
      const childrenData = dataFromReddit.data.children || [];
      await setDoc(documentRef, { children: childrenData , after: children.after });
      const document = await getDoc(documentRef);
      console.log(document);
      res.json({ success: true, children: document.data() });
    } else {
      res.json({ success: true, children: documentSnapshot.data() });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});