import Faqs from "../models/faqModels.js"


export const createFaq=async(req,res)=>{
    try {
        const faq=new Faqs({
          ...req.body
        })
        await faq.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getFaq=async(req,res)=>{
    try {
        const faq=await Faqs.find({})
        res.json(faq)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateFaq=async(req,res)=>{
    try {
        const {id}=req.params
        const faq=await Faqs.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteFaq=async(req,res)=>{
    try {
        const {id}=req.params
        const faq=await Faqs.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdFaq=async(req,res)=>{
    try {
        const {id}=req.params
        const faq=await Faqs.findById(id)
        res.json(faq)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}