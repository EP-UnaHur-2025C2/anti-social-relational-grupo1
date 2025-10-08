const { Post } = require('../db/models');

// Todos los posts
const getPosts = async (_, res) => {
    try{
        const data = await Post.findAll({});
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los posteos", detalle: error.message});
    }
};

// Post por id
const getPostById = async (req,res) => {
    try{
        const {id} = req.params;
        const foundPost = await Post.findByPk(id);

        if(!foundPost) return res.status(404).json({ error: "Post no encontrado" });
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post" });
    }
}

// crear post
const createPost = async (req, res) => {
    try {
        const descripcion = req.body.texto;
        if(!descripcion) return res.status(400).json({ error: "El post debe tener una descripcion"});
        const newPost = await Post.create(req.body);


        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el post"})
    }
}

// actualizar post con id
const updatePost = async (req, res) => {
    try{
        const {id} = req.params
        const updated = await Post.update(req.body, {where: { id } });
        if(updated[0] === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const updatedPost = await post.findByPk(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el post" })
    }
}

// eliminar post

const deletePost = async (res, req) => {
    try{
        const {id} = req.params
        const deleted = await Post.destroy({
            where: {id}
        });

        if(!deleted) return res.status(404).json({ error: "Post no encontrado"});
        res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error){
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
}

// falta post con post-img y tags

module.exports = {getPosts, getPostById, createPost, updatePost, deletePost};