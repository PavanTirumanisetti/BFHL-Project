exports.processData = (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input data. Expected 'data' to be an array." });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase()).sort().pop() || '';

    res.json({
        is_success: true,
        user_id: "Tirumanisetti Pavan",
        email: "pavantirumanisetti@gmail.",
        roll_number: "21BCE7495",
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: [highestLowercaseAlphabet]
    });
};

exports.getOperationCode = (req, res) => {
    res.json({ operation_code: 1 });
};
