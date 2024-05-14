const fs = require('fs');

//import { OpenAIEmbeddings } from "langchain/embeddings/openai"

const { OpenAIEmbeddings } = require("langchain/embeddings/openai")
const { PineconeClient } = require("@pinecone-database/pinecone")
const { PineconeStore } = require("langchain/vectorstores/pinecone")
const { DirectoryLoader } = require("langchain/document_loaders/fs/directory")
const { TextLoader } = require("langchain/document_loaders/fs/text")
const { CharacterTextSplitter } = require("langchain/text_splitter");
import OpenAI from 'openai';

const langDoc = require("langchain/document");


(async () => {
    const pc = new PineconeClient();
    await pc.init({
      apiKey: process.env.PINECONE_API_KEY,
    });
  
    // referencing index we want to upload to
    const pineconeIndex = pc.index('faq2');
  
    // loading txt
    const loader = new DirectoryLoader("./scripts/open_ai_embedding", {
        ".txt": (path: string) => new TextLoader(path),
    });
    const docs = await loader.load();
  
    // splitting pdf into chunks
    const splitter = new CharacterTextSplitter({
      separator: "£",
    //   chunkSize: 2000,
    //   chunkOverlap: 200,
    });
    const splitDocs = await splitter.splitDocuments(docs);
  
    // uploading chunks to pinecone
    await PineconeStore.fromDocuments(splitDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });
  })();

  // ts-node scripts/pineconeUploader.ts

  
  // Watch the directory for new text files
//   fs.watch('./scripts/open_ai_embedding/', (eventType, filename) => {
//       if (eventType === 'rename' && filename) {
//           const filePath = `./scripts/open_ai_embedding/${filename}`;
//           if (filename.endsWith('.txt')) {
//               processNewTextFile(filePath)
//                   .then(() => console.log('Text file processed and embeddings uploaded successfully.'))
//                   .catch(err => console.error('Error processing text file:', err));
//           }
//       }
//   });
  
  