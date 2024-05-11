function processTransaction(transaction) {
    return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        // Simulate long running process
        setTimeout(() => {
            // After 30 seconds, we assume the transaction is processed successfully
            console.log('transaction processed for:', transaction);
            resolve(transaction);
            return 'Transaction processing started for:', transaction
        }, 30000); // 30 seconds
    });
}

// Example usage
// let transaction = { amount: 100, currency: 'USD' }; // Sample transaction input
// processTransaction(transaction)
//     .then((processedTransaction) => {
//         console.log('transaction processing completed for:', processedTransaction);
//     })
//     .catch((error) => {
//         console.error('transaction processing failed:', error);
//     });

module.exports = {
    processTransaction
}