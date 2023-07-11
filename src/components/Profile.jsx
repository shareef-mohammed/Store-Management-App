import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { instance } from '../insatnce'

const Profile = () => {
    const [employee, setEmployee] = useState()
    const [file, setFile] = useState()
    const [fresh, setFresh] = useState(false)
    const [err, setErr] = useState('')

    const {id} = useParams()
    useEffect(() => {
        axios.get(`${instance}/api/get-profiles/${id}`)
        .then((res) => {
            console.log(res.data)
            setEmployee(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [fresh])

    const uploadImage = async (file) => {
        try {
            console.log('object')
          const formData = new FormData();
          formData.append("file", file);
        //   formData.append("resource_type", "auto");
        //   formData.append("filename_override", file.name);
        //   const bufferToDataUrl = (buffer, type) => {
        //     return `data:${type};base64,${buffer.toString("base64")}`;
        //   };
        //   const dataUrl = bufferToDataUrl(file, file.type);
        //   console.log(dataUrl)
        //   formData.append("file", dataUrl);
          formData.append("upload_preset", "zcenmmpy");
          formData.append("cloud_name", "dqd1le2ao");
      
          const response = await fetch("https://api.cloudinary.com/v1_1/dqd1le2ao/raw/upload", {
            method: "POST",
            body: formData,
          });
      
          if (response.ok) {
            const data = await response.json();
            const postImage = data.secure_url;
            return postImage;
          } else {
            return "err";
          }
        } catch (err) {
          return "err";
        }
      };
    const uploadFile = async(e) => {
        let data = {}
        if (file?.name) { 
            const postImage = await uploadImage(file);
            console.log(postImage)
            if (postImage == "err") {
              return setErr("Data adding failed");
            }
            data.files = postImage
        }
        console.log(data)
        if(!file) {
            e.preventDefault()
            return
        }
        axios.patch(`${instance}/api/edit-profile/${id}`, data)
        .then((res) => {
            console.log(res.data)
            setFresh(!fresh)
            setFile(null)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    console.log(file)
  return (
    <div className='flex justify-center'>
        <div className='text-center'>
            <img width={300} height={300} src={employee?.profilePic} alt=" Profile Picture" />
            <p className='font-semibold text-lg py-4'>{employee?.name}</p>
            <div>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} name="" id="" />
                <button className='rounded px-3 py-1 border' onClick={uploadFile}>Upload</button>
                {err && <p className='text-red-600'>{err}</p>}
            </div>

            {employee?.files && employee?.files.map((file, index) => (
                <a className='w-full ml-3 underline text-blue-600' key={index} href={file}>FILE - {index + 1}</a>
            ))}
        </div>
    </div>
  )
}

export default Profile