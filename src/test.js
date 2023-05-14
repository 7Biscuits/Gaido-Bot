const API_URL = 'https://api-inference.huggingface.co/models/biscuitbutb/biscuitbot-dialogpt-model/';

const payload = {
    inputs: {
        text: "Hello how are you"
    }
};

const headers = {
    'Authorization': 'Bearer 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'
};

async function main() {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data.generated_text;
}

console.log(
    main()
)