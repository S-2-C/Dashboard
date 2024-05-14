import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { pull } from "langchain/hub";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";


async function getEmbed(
  query: string,
  indexName: string,
  k = 2,
  threshold = null
) {
  if (!process.env.PINCONE_API_KEY) {
    console.log("Pinecone API key is missing!");
    throw new Error("No Pinecone Key");
  }
  const pinecone = new Pinecone({
    apiKey: process.env.PINCONE_API_KEY,
  });

  if (!process.env.OPENAI_API_KEY) {
    console.log("OPENAI API key is missing!");
    throw new Error("No Open AI Key");
  }
  const llm = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
    temperature: 0,
  });

  const pineconeIndex = pinecone.Index(indexName);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY,
      modelName: "text-embedding-3-small",
      dimensions: 1536,
      maxRetries: 0,
    }),
    { pineconeIndex, namespace: "preguntas_con_respuestas" }
  );

  const retriever = vectorStore.asRetriever();
  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const retrievedDocs = await retriever.getRelevantDocuments(query);
  console.log("Retrieved documents:", retrievedDocs);
  
  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });


  console.log("Invoking ragChain...");
  const ragChainResult = await ragChain.invoke({ question: query, context: retrievedDocs});
  console.log(query);
  console.log("RagChain result:", ragChainResult);

  return { ragChainResult, retrievedDocs };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question");
  if (!question) {
    console.log("No question provided!");
    throw new Error("No Question");
  }

  try {
    console.log("Fetching response...");
    const { ragChainResult, retrievedDocs } = await getEmbed(question, "faq", 5);
    console.log("Response:", ragChainResult);
    return Response.json({ ragChainResult, retrievedDocs });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("Pinecone Error!", {
      status: 500,
    });
  }
}
