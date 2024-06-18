import express from "express";
import{
    showForm,
    showformById,
    createform,
    updateform,
    deleteform
}from "../controllers/form.js";

const router =express.Router();

router.get("/forms",showForm);

router.get("/forms/:id",showformById);

router.post("/forms", createform);

router.put("/forms/:id",  updateform);

router.delete("/forms/:id",  deleteform);

export default router;