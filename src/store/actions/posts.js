import {
    SET_POSTS, 
    CREATING_POST,
    POST_CREATED,
} from './actionsTypes'
import axios from 'axios'

export const addPost = post =>{
    return (dispatch)=>{
        // let photo = { uri: post.url_imagem}
        // let formdata = new FormData()
        // console.log(res)
        // formdata.append("usuario", post.usuario)
        // formdata.append("titulo", post.titulo)
        // formdata.append("enunciado", post.enunciado)
        // formdata.append("url_image", post.url_imagem)
            // {
            //     name: post.url_imagem.fileName,
            //     type: post.url_imagem.type,
            //     path: post.url_imagem.path,
            //     uri: post.url_imagem.uri,
            // }
        






        // console.log("CRIANDO POST AQUIIIIIIIIIIIII")
        // console.log(post)
        // console.log("CRIANDO POST AQUIIIIIIIIIIIII")
        dispatch(creatingPost())
        // post.url_imagem = post.url_imagem.base64
        // console.log("JASON PARA O POST ----------> ", post)
        // axios({
        //     url: '/postar/',
        //     baseURL: 'http://192.168.1.32:8001/api',
        //     method: 'post',
        //     headers: {
        //         'Content-Type': "application/json",
        //         // 'Content-Type': 'multipart/form-data',
        //     },
        //     body: {
        //         usuario: post.usuario,
        //         titulo: post.titulo, 
        //         enunciado: post.enunciado,
        //         url_imagem: post.url_imagem
        //     }
        // }).catch(err=> console.log(err)).then(res=>{
        //     // post.url_imagem = res.data.imageUrl
        //     // axios.post('/posts.json', {...post})
        //     //     .catch(err=>console.log(err))
        //     //     .then(res=>{
        //             dispatch(fetchPosts())
        //             dispatch(postCreated())
        //     //     })
        // })

        let flag = true
        axios.post("/postar/",{
            usuario: post.usuario,
                titulo: post.titulo, 
                enunciado: post.enunciado,
                url_imagem: post.url_imagem
            // returnSecureToken: true,
        }).catch(err=>{
                console.log(err); 
                flag=false; 
                return flag
            }).then(res=>{
                if(flag){
                    dispatch(fetchPosts())
                    dispatch(postCreated())
                }
                else{
                    // dispatch(logout())
                }
            })
    }
}

export const addComment = payload =>{
    return (dispatch)=>{
        // axios.get(`/posts/${payload.postId}.json`)
        //     .catch(err=>console.log(err)).then(res=>{
        //         const comments = res.data.comments || []
        //         console.log(res)
        //         comments.push(payload.comment)
        //         axios.patch(`posts/${payload.postId}.json`, {comments}).catch(err=>console.log(err)).then(()=>{dispatch(fetchPosts())})
        //     })



            let flag = true
            axios.post("/comentarios/",{
                usuario: payload.comment.user_id,
                texto_comentario: payload.comment.comment, 
                postagem: payload.postId,
                // returnSecureToken: true,
            }).catch(err=>{
                    console.log(err); 
                    flag=false; 
                    return flag
                }).then(res=>{
                    if(flag){
                        dispatch(fetchPosts())
                        // dispatch(userLogged(user))
                        // dispatch(userLoaded())
                    }
                    else{
                        // dispatch(logout())
                    }
                })
    }
}

export const setPosts = posts=>{
    return{
        type: SET_POSTS,
        payload: posts,
    }
}

export const fetchPosts = () =>{
    return(dispatch=>{
        axios.get('/postagens').catch(err=> console.log(err)).then(res=>{
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            const rawPosts = res.data
            const posts = []
            // console.log()
            // console.log("\n\n\n\n\n\n" + rawPosts);
            for(let key in rawPosts){
                console.log("rawPost ---------> ", rawPosts)
                posts.push({...rawPosts[key], id: rawPosts[key].id})
            }
            dispatch(setPosts(posts))
        })
    })
}

export const creatingPost = ()=>{
    return{
        type: CREATING_POST
    }
}

export const postCreated = ()=>{
    return{
        type: POST_CREATED
    }
}