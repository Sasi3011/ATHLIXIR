import geminiService from '../services/geminiService.js';

// Define predefined responses
const predefinedResponses = {
    "suggestion for athlete": "For athletes, focus on balanced nutrition, proper hydration, consistent training, adequate rest, and injury prevention. Would you like specific advice on any of these areas?",
    "check my health records": "To check your health records, please navigate to the 'Health Records' section from the main menu.",
    // Add more predefined responses here as needed
};

export const handleChat = async (req, res) => {
    try {
        const { message, history } = req.body;
        
        if (!message) {
            return res.status(400).json({
                success: false,
                error: 'Message is required'
            });
        }

        // Check for predefined responses (case-insensitive)
        const lowerCaseMessage = message.toLowerCase().trim();
        if (predefinedResponses[lowerCaseMessage]) {
            return res.json({
                success: true,
                data: predefinedResponses[lowerCaseMessage]
            });
        }

        // If no predefined response, call Gemini service
        const response = await geminiService.generateResponse(message, history || []);
        
        if (!response.success) {
            return res.status(500).json({
                success: false,
                error: response.error
            });
        }

        return res.json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Chat Controller Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message || 'Internal server error'
        });
    }
};
