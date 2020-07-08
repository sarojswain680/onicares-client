import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Home = () => {
    const [data, setData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        fetch('/allPost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
            .then(result => {
                console.log(result.data)
                setData(result.data)
            })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch((err) => {
                console.log(err)
            })
    }
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then((res) => res.json())
            .then((result) => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="home">
            {
                data.map((item, index) => {
                    return (
                        <div key={index} className="card home-card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card image">
                                <img src={item.photo} style={{ maxWidth: "500px" }} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: 'red' }}>favorite</i>
                                {
                                    item.likes.includes(user._id) ?
                                        <i className="material-icons" onClick={() => unlikePost(item._id)}>thumb_down</i>
                                        :
                                        <i className="material-icons" onClick={() => likePost(item._id)}>thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.description}</p>
                                <input
                                    type="text"
                                    placeholder="add a comment"
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
