import React, { useEffect, useState } from 'react';

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

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                text: text
            })
        }).then((res) => res.json)
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
                                {
                                    item.comments.map((record) => {
                                        console.log('vvdvdv', record)
                                        return (
                                            <h6><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span>{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    makeComment(e.target[0].value, item._id)
                                }}>
                                    <input
                                        type="text"
                                        placeholder="add a comment"
                                    />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
