const languageCodeMap = {
    cpp: 54,
    python: 92,
    javascript: 93,
    java: 91
};

function isBase64(str) {
    try {
        return btoa(atob(str)) === str; // This checks if the string is base64-encoded
    } catch (err) {
        return false;
    }
}

async function getSubmission(tokenId, callback) {
    const url = `https://ce.judge0.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Corrected header
            'X-RapidAPI-Key': '1bd52518ecmsh5adae963dde2692p1d757bjsncf42efd33815', // Replace with actual key
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
        
    } catch (error) {
        callback({ apiStatus: 'error', message: JSON.stringify(error) });
    }
}

export async function makeSubmission({ code, language, callback, stdin }) {
    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
    const httpOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '1bd52518ecmsh5adae963dde2692p1d757bjsncf42efd33815', // Replace with actual key
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
            language_id: languageCodeMap[language], // Map language to its ID
            source_code: btoa(code), // Encode code in base64
            stdin: btoa(stdin) // Encode input in base64
        })
    };

    try {
        callback({ apiStatus: 'loading' }); // Notify loading

        const response = await fetch(url, httpOptions);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode = 1; // Initial status: 'In Queue'
        let apiSubmissionResult;

        while (statusCode === 1 || statusCode === 2) {
            try {
                // Fixed: removed re-declaration of apiSubmissionResult and added callback to getSubmission
                apiSubmissionResult = await getSubmission(tokenId, callback);
                statusCode = apiSubmissionResult.status.id;
            } catch (error) {
                callback({ apiStatus: 'error', message: JSON.stringify(error) });
                return;
            }
        }

        // Success callback with API data
        if (apiSubmissionResult) {
            callback({ apiStatus: 'success', data: apiSubmissionResult });
        }
    } catch (error) {
        callback({
            apiStatus: 'error',
            message: error.message || JSON.stringify(error)
        });
        console.error("Error in makeSubmission:", error);
    }
}
