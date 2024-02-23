import { Router } from 'express'
import { createFaq, deleteFaq, getByIdFaq, getFaq, updateFaq } from '../controller/faqController.js'

export const FaqRouter = Router()


FaqRouter.get("/faq",getFaq)
FaqRouter.get("/faq/:id", getByIdFaq)
FaqRouter.post("/faq", createFaq)
FaqRouter.delete("/faq/:id", deleteFaq)
FaqRouter.put("/faq/:id", updateFaq)

