import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

async function getEmbed(
  query: string,
  indexName: string,
  k = 2,
  threshold = 0.5
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

  const resultsWithScore = await vectorStore.similaritySearchWithScore(
    query,
    k
  );

  let filteredResults = resultsWithScore;

  // Filter results to only include those with a score >= threshold
  if (threshold) {
    filteredResults = resultsWithScore.filter(
      ([_, score]) => score >= threshold
    );
  }

  const input = JSON.stringify({
    query: query,
    context: filteredResults,
  });

  console.log("Input:", input);

  const ragChainResult = await llm.invoke(input).then((response) => {
    return response.content;
  });

  console.log("RagChain Result:", ragChainResult);

  return { ragChainResult, retrievedDocs: filteredResults };
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
    const { ragChainResult, retrievedDocs } = await getEmbed(
      question,
      "faq",
      5
    );
    return Response.json({ ragChainResult, retrievedDocs });
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response("Pinecone Error!", {
      status: 500,
    });
  }
}
