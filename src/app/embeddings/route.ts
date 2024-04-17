import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";

async function getEmbed(
  query: string,
  indexName: string,
  k = 2,
  threshold = null
) {
  if (!process.env.PINCONE_API_KEY) {
    throw new Error("No Key");
  }
  const pinecone = new Pinecone({
    apiKey: process.env.PINCONE_API_KEY,
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

  // Perform the similarity search with score
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

  // Return the filtered results
  return filteredResults;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question");
  if (!question) {
    throw new Error("No Question");
  }

  try {
    const response = await getEmbed(question, "faq", 5);
    return Response.json(response);
  } catch (error) {
    return new Response("Pinecone Error!", {
      status: 500,
    });
  }
}
