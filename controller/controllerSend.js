const { processTransaction } = require('../core/processTransaction');
const { PaymentAccount,PaymentHistory } = require('../models/')

class ControllerSend {
    static async postSend(req,res){
        try {
            const { myAccount,amount,toAddress } = req.body
            // console.log(req.body,'<< body');
            let sender = await PaymentAccount.findByPk(+myAccount)
            // console.log(sender,'<< user transfer');
            if(sender.UserId!==req.user.id){
                res.status(403).json({message:"Forbidden"})
            } else {
                let receiver = await PaymentAccount.findByPk(toAddress)
                if(!sender || !receiver){
                    res.status(404).json({message:'Not Found'})
                } else {
                    let amountSender = sender.amount - Number(amount)
                    let amountReceiver = receiver.amount + Number(amount)
                    // console.log({amount,amountSender,amountReceiver});
                    amountSender = await PaymentAccount.update(
                        {amount:amountSender},
                        {where:{id:myAccount}}
                    )
                    amountReceiver = await PaymentAccount.update(
                        {amount:amountReceiver},
                        {where:{id:toAddress}}
                    )
                    if(!amountSender || !amountReceiver){
                        await PaymentAccount.update(
                            {amount:sender.amount},
                            {where:{id:myAccount}}
                        )
                        await PaymentAccount.update(
                            {amount:receiver.amount},
                            {where:{id:toAddress}}
                        )
                        res.status(400).json({message:'Bad Request'})
                    } else {
                        // console.log({name:'send user',amount, SenderId:req.user.id, toAddress, status: 'send'});
                        await PaymentHistory.create({name:'send user',amount, SenderId:myAccount, toAddress, status: 'send'})
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
        
            }
        } catch (error) {
            console.log(error,'<< error post send');
            res.status(500).json({message:'Internal Server Error'})
        }
    }
    static async getAccountIncludeUser(req,res){
        try {
            let data = await PaymentAccount.findAll(
                {
                    include:PaymentHistory,
                    where:{
                        UserId:req.user.id
                    }
                }
            )
            res.status(200).json(data)
        } catch (error) {
            // console.log(error,'<< error get payment');
            res.status(500).json({message:'Internal Server Error'})
        }
    }
    static async createAccount(req,res){
        try {
            let { amount } = req.body
            let account = await PaymentAccount.create(
                {
                    UserId:req.user.id,
                    amount
                }

            )
            res.status(201).json(account)
        } catch (error) {
            res.status(500).json({message:'Internal Server Error'})
        }
    }
}

module.exports = ControllerSend