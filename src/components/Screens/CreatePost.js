import M from 'materialize-css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const history = useHistory()
    // dlrmn0ttw

    const postDetails = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "Onicare")
        data.append("cloud_name", "dlrmn0ttw")
        fetch("https://api.cloudinary.com/v1_1/dlrmn0ttw/image/upload", {
            method: "POST",
            body: data
        })
            .then((res) => res.json())
            .then((datafinal) => {
                // console.log(datafinal.url)
                // setUrl(datafinal.url)

                fetch("http://localhost:5000/createpost", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        photo: datafinal.url
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.error) {
                            return M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                        } else {
                            M.toast({ html: data.message, classes: "#00695c teal darken-3" })
                            history.push("/")
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="card input-filed" style={{ margin: "10px auto", maxWidth: "500px", padding: "20px", textAlign: 'center' }}>
            <input type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light #1e88e5 blue darken-1" onClick={(e) => postDetails(e)}>{"Create"}
            </button>
        </div>
    )
}

export default CreatePost;