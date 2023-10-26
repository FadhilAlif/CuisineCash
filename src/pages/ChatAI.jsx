import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { NavBar } from "../components/Component";
import OpenAI from "openai";

const ChatAI = () => {
  const [command, setCommand] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Perform OpenAI chat completion
    const res = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful virtual assistant who can provide information about various foods.",
        },
        { role: "user", content: command },
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    setResult(res.choices[0]?.message?.content || "No response from the AI");
    console.log(res);
    setLoading(false);
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-4 col-md-8">
        <h4 className="text-center">
          <strong>Chat AI</strong>
        </h4>
        <div className="chat-container">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mt-4 mb-3">
              <Form.Control
                as="textarea"
                placeholder="Ask me about food..."
                value={command}
                onChange={(e) => setCommand(e.target.value)}
              />
            </InputGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="result-container mt-4">
            {loading ? (
              <ThreeDots color="#ff7a28" height={80} width={80} />
            ) : (
              <div className="response">
                <h5>
                  <strong>AI Response :</strong>
                </h5>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
