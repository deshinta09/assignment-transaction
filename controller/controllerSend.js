const { processTransaction } = require('../core/processTransaction');
const { PaymentAccount,User,PaymentHistory } = require('../models/')

class ControllerSend {
    static async postSend(req,res){
        try {
            const { amount,toAddress } = req.body
            let sender = await PaymentAccount.findByPk(req.user.id)
            let receiver = await PaymentAccount.findByPk(toAddress)
            if(!sender || !receiver){
                res.status(500).json({message:'Internal Server Error'})
            } else {
                let amountSender = sender.amount - Number(amount)
                let amountReceiver = receiver.amount + Number(amount)
                // console.log({amount,amountSender,amountReceiver});
                amountSender = await PaymentAccount.update(
                    {amount:amountSender},
                    {where:{id:req.user.id}}
                )
                amountReceiver = await PaymentAccount.update(
                    {amount:amountReceiver},
                    {where:{id:toAddress}}
                )
                if(!amountSender || !amountReceiver){
                    await PaymentAccount.update(
                        {amount:sender.amount},
                        {where:{id:req.user.id}}
                    )
                    await PaymentAccount.update(
                        {amount:receiver.amount},
                        {where:{id:toAddress}}
                    )
                    res.status(400).json({message:'Bad Request'})
                } else {
                    await PaymentHistory.create({name:'send user',amount, SenderId:req.user.id, toAddress, status: 'send'})
                    let transaction = { amount:req.body.amount, currency:'USD'}
                    processTransaction(transaction)
                    .then((processedTransaction) => {
                        // console.log('transaction processing completed for:', processedTransaction);
                        res.status(201).json({message:'transaction processing completed for:', processedTransaction})
                    })
                    .catch((error) => {
                        console.error('transaction processing failed:', error);
                        res.status(500).json({message:'Internal Server Error'})
                    });
                }

            }
    
        } catch (error) {
            res.status(500).json({message:'Internal Server Error'})
        }
    }
    static async getAccountIncludeUser(req,res){
        try {
            let data = await PaymentAccount.findAll({include:PaymentHistory})
            res.status(200).json(data)
        } catch (error) {
            // console.log(error,'<< error get payment');
            res.status(500).json({message:'Internal Server Error'})
        }
    }
}

module.exports = ControllerSend