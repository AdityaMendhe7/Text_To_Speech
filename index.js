// THIS IS A NEST FILE ADD THIS TO YOUR REPO



async audio_converter() {
    const greetings = await getConnection()
        .createQueryBuilder()
        .select("BD")
        .from(bankDetails, "BD")
        .getMany();

    for (let element of greetings) {
        // Check if the element ID is within the range to be excluded
        if (element.id >= 196 && element.id <= 1298) {
            continue; // Skip the update process for this element
        }

        var bankName = element.bank_name.toLowerCase();
        bankName = bankName.replace(/co op/g, " co-operative ");
        bankName = bankName.replace(/ co-op /g, " co-operative ");
        bankName = bankName.replace(/co op./g, " co-operative ");
        bankName = bankName.replace(/ cooperative /g, " co-operative ");
        bankName = bankName.replace(/ co-op. /g, " co-operative ");
        bankName = bankName.replace(/ ltd. /g, " limited ");
        bankName = bankName.replace(/ ltd /g, " limited ");
        bankName = bankName.replace(/ ltd./g, " limited ");
        bankName = bankName.replace(/ ltd/g, " limited ");
        bankName = bankName.replace(/ co operative /g, " co-operative ");
        bankName = bankName.replace(/ coop. /g, " co-operative ");
        bankName = bankName.replace(/ coop /g, " co-operative ");
        bankName = bankName.replace(/ pvt. /g, " private ");

        // Construct the initial answer string in the new specified format
        var answer = `ಖಚಿತವಾಗಿ, ನಾನು ನಿಮಗೆ ${bankName} ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು.`;

        // Append contact number if available
        if (element.customer_care) {
            answer = `${answer} ನೀವು ${element.customer_care} ನಲ್ಲಿ ಸಂಪರ್ಕಿಸಬಹುದು.`;
        }

        // Append email ID if available
        if (element.email_Id) {
            answer = `${answer} ಅಥವಾ ಇಮೇಲ್ ಐ ಡಿ ${element.email_Id} ಗೆ ಬರೆಯಿರಿ.`;
        }

        // Generate the audio link
        var link = await this.dynamicVoiceAPI(answer);
        var BucketStore = await this.BucketStore(link);

        // Prepare the update object
        const BankDetails = new bankDetails();
        BankDetails.audio_te = BucketStore;

        try {
            await this.createQueryBuilder()
                .update(bankDetails)
                .set(BankDetails)
                .where("id = :id", { id: element.id })
                .execute();
        } catch (error) {
            this.logger.error(error);
        }

        console.log(element.bank_name);
    }
}