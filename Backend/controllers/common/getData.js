const Sem5 = require("../../model/Sem5");

exports.getData = async (req, res) => {
    try {
        // Ensure that authentication logic is implemented before fetching data if needed

        // Fetch all records from the "Sem5" collection
        const sem5Records = await Sem5.find({}).exec();

        console.log("Data fetched successfully");

        return res.status(200).json({
            success: true,
            message: 'Data fetched successfully',
            data: sem5Records
        });
    } catch (error) {
        console.error('Error in getData:', error);

        return res.status(500).json({
            success: false,
            message: 'Error in getData',
            error: error.message
        });
    }
};