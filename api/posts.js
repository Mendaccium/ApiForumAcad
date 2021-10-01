module.exports = (app) => {

    const getPostsByIdUser = async (req,res) => {
        const idUser = req.params.id;

        const userExists = await app.database("users").where({id: idUser}).first();

        if(!userExists){
            return res.status(400).json({error: "Id invalido!"});
        }

        const postsExistsByIdUser = await app.database("posts").where({id_user: idUser})

        if(!postsExistsByIdUser){
            return res.status(400).json({error: "Sem postagens!"});
        }


        return res.json({userExists,postsExistsByIdUser});
    }

    const createPost = async (req,res) => {
            const post = {...req.body};

            const idUser = req.params.id;

            const userExists = await app.database("users").where({id: idUser}).first();

            if(!userExists){
            return res.status(400).json({error: "Id invalido!"});
            }



        if(!post.title || !post.content){
            return res.status(400).json({error: "Algum dado não informado!"});
        }

            post.id_user = idUser

            await app
            .database("posts")
            .insert(post)
            .then((_) => res.status(200).send())
            .catch((err) => res.status(500).send(err))

            
        


    }

    const EditPost = async (req,res) => {
        const idPost = req.params.id
        
        const post = {...req.body};

        if(!post.title || !post.content){
            return res.status(400).json({error: "Algum dado não informado!"});
        }
        const postExists = await app.database("posts").where({id: idPost}).first();

        if(!postExists){
            return res.status(400).json({error: "Postagem não existe!"});
        }
        
        await app
            .database("posts")
            .update(post)
            .where({id: idPost})
            .then((_) => res.status(200).send())
            .catch((err) => res.status(500).send(err))


    }

    const deletePost = async (req,res) => {
        const idPost = req.params.id;

        if(!idPost){
            return res.status(400).json({error: "Id do post não informado!"});
        }

        const postExists = await app.database("posts").where({id: idPost}).first();

        if(!postExists){
            return res.status(400).json({error: "Postagem não existe!"});
        }

        await app.database("posts").where({id: idPost}).del();

       return res.status(204).send();

    }

    return {createPost, deletePost,getPostsByIdUser,EditPost}
}