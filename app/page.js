"use client"
import { useState } from "react"
import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBR8v3oygAV193Gti3sJVOu_WH7XzZJIbk",
  authDomain: "my-first-firestore-c11.firebaseapp.com",
  projectId: "my-first-firestore-c11",
  storageBucket: "my-first-firestore-c11.appspot.com",
  messagingSenderId: "1054861120782",
  appId: "1:1054861120782:web:3c1911ec7a670cb775735f",
}

export default function Home() {

  const [file, setFile] = useState()
  const [uploadedFile, setUploadedFile] = useState()

  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    // connect to storage:
    const app = initializeApp(firebaseConfig) // connects to project
    const storage = getStorage(app) // connects to storage
    // create a reference to our file in storage using filename
    const filename = e.target.files[0].name
    const imageRef = ref(storage, 'photos/' + filename)
    // use Todd's hack to get the URL for that file
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-c11.appspot.com/o/photos%2F${filename}?alt=media`
    // upload
    uploadBytes(imageRef, e.target.files[0])
      .then(() => setUploadedFile(url))
      .catch(alert)

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Upload a Photo</h1>
      <input type="file" accept="image/*" onChange={handleFile} />
      {file && 
      <div className="w-1/2 h-1/2 rounded">
        <h2 className="text-xl font-semibold">Image from computer:</h2>
        <img src={URL.createObjectURL(file)} className="object-cover" />
      </div>
      }
      {uploadedFile && 
      <div className="w-1/2 h-1/2 rounded">
        <h2 className="text-xl font-semibold">Image from storage:</h2>
        <img src={uploadedFile} className="object-cover" />
      </div>
      }
    </main>
  )
}
