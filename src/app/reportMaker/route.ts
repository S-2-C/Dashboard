import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { pull } from "langchain/hub";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("content");


  const chatModel = new ChatOpenAI({});

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an AI assistant tasked with generating comprehensive and formal reports based on call center performance metrics. Each report should include a detailed analysis of the metrics provided, conclusions based on the data, and actionable recommendations for improvement. Ensure that your reports are clear, professional, and suitable for presentation to stakeholders. Make sure you dont use any special characters just write a pragraphs and subtittles without any character or markdown.."],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel);

  if (!question) {
    console.log("No question provided!");
    throw new Error("No Question");
  }

  try {
    const ragChainResult = await chain.invoke({ input: question });
    return Response.json({ ragChainResult });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("Report Error Error!", {
      status: 500,
    });
  }
}
