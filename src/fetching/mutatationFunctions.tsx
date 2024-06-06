import { generateClient } from "aws-amplify/api";
import { updateUser } from "@/graphql/mutations";


export const askForHelp = async (email: string, askingForHelp: boolean) => {
    const client = generateClient();

    try {
        const result = await client.graphql({
            query: updateUser,
            variables: {
                input: {
                    id: email,
                    needsHelp: askingForHelp
                }
            }
        });
    
        return result;
    } catch (error) {
        console.error(error);
    }
}